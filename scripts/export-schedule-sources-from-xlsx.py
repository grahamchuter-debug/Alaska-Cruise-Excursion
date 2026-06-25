#!/usr/bin/env python3
"""Export CruiseTimetables URLs from the master xlsx into data/schedule-sources/{slug}.csv"""

from __future__ import annotations

import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "data" / "schedule-sources"

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

MONTH_LABELS = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
]

SHEET_TO_SLUG = {
    "Juneau": "juneau",
    "Sitka": "sitka",
    "Skagway": "skagway",
    "Ketchican": "ketchikan",
    "icystrait": "icy-strait",
    "Wardcove": "ward-cove",
    "Haines": "haines",
    "Seward": "seward",
    "Whittier": "whittier",
}

SKIP_SHEETS = {"Denali"}  # land extension only — not a cruise ship port


def col_index(letters: str) -> int:
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch) - 64)
    return n


def excel_month_label(serial: str) -> str:
    base = datetime(1899, 12, 30)
    dt = base + timedelta(days=float(serial))
    return f"{MONTH_LABELS[dt.month - 1]} {dt.year}"


def normalize_url(raw: str) -> str:
    url = raw.strip()
    if not url:
        return ""
    if not url.startswith("http"):
        url = f"https://www.{url.lstrip('/')}" if "cruisetimetables" in url else f"https://{url}"
    if url.startswith("https://") and not url.startswith("https://www."):
        url = url.replace("https://", "https://www.", 1)
    return url


def read_workbook(path: Path):
    with zipfile.ZipFile(path) as z:
        shared: list[str] = []
        if "xl/sharedStrings.xml" in z.namelist():
            sst = ET.fromstring(z.read("xl/sharedStrings.xml"))
            for si in sst.findall(".//m:si", NS):
                shared.append("".join((t.text or "") for t in si.findall(".//m:t", NS)))

        rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        rid_map = {
            rel.attrib["Id"]: "xl/" + rel.attrib["Target"].lstrip("/")
            for rel in rels
        }

        wb = ET.fromstring(z.read("xl/workbook.xml"))
        sheets = []
        for sh in wb.findall(".//m:sheets/m:sheet", NS):
            name = sh.attrib["name"]
            rid = sh.attrib[f"{{{REL_NS}}}id"]
            sheets.append((name, rid_map[rid]))

        def read_sheet(target: str) -> list[list[str]]:
            root = ET.fromstring(z.read(target))
            rows: list[list[str]] = []
            for row in root.findall(".//m:sheetData/m:row", NS):
                cells: dict[int, str] = {}
                for cell in row.findall("m:c", NS):
                    ref = cell.attrib.get("r", "")
                    letters = re.match(r"([A-Z]+)", ref)
                    if not letters:
                        continue
                    idx = col_index(letters.group(1))
                    value_el = cell.find("m:v", NS)
                    if value_el is None:
                        continue
                    if cell.attrib.get("t") == "s":
                        cells[idx] = shared[int(value_el.text)]
                    else:
                        cells[idx] = value_el.text or ""
                if cells:
                    max_col = max(cells)
                    rows.append([cells.get(i, "") for i in range(1, max_col + 1)])
            return rows

        return [(name, read_sheet(target)) for name, target in sheets]


def sheet_to_csv_lines(sheet_name: str, rows: list[list[str]]) -> list[str]:
    header_name = sheet_name if sheet_name != "Keywest" else "Key West"
    lines = [f"{header_name},"]
    for row in rows[1:]:
        if len(row) < 2:
            continue
        month_raw, url_raw = row[0].strip(), row[1].strip()
        if not month_raw and not url_raw:
            continue
        if month_raw.replace(".", "", 1).isdigit():
            month_label = excel_month_label(month_raw)
        else:
            month_label = month_raw
        if not url_raw:
            continue
        if url_raw.lower().startswith("no visit") or url_raw.lower().startswith("no vist"):
            lines.append(f"{month_label},{url_raw}")
            continue
        url = normalize_url(url_raw)
        if "cruisetimetables.com" not in url:
            continue
        lines.append(f"{month_label},{url}")
    return lines


def main() -> int:
    xlsx = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Downloads" / "Alaska Ship Schedule.xlsx"
    if not xlsx.exists():
        print(f"Missing file: {xlsx}", file=sys.stderr)
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    sheets = read_workbook(xlsx)
    written = 0
    skipped = 0

    for sheet_name, rows in sheets:
        if sheet_name in SKIP_SHEETS:
            print(f"skip {sheet_name} (not a cruise ship port)")
            skipped += 1
            continue
        slug = SHEET_TO_SLUG.get(sheet_name)
        if not slug:
            print(f"warn: no slug mapping for sheet {sheet_name!r}", file=sys.stderr)
            continue
        lines = sheet_to_csv_lines(sheet_name, rows)
        url_rows = sum(1 for line in lines[1:] if line.split(",", 1)[1].strip().startswith("http"))
        out = OUT_DIR / f"{slug}.csv"
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"wrote {slug}.csv ({url_rows} URLs)")
        written += 1

    print(f"\nDone: {written} CSV files written, {skipped} skipped.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

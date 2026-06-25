/** Normalize paths for static export with trailingSlash: true. */
export function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function absoluteUrl(baseUrl: string, path: string): string {
  const normalized = withTrailingSlash(path);
  return normalized === "/" ? baseUrl : `${baseUrl}${normalized}`;
}

/** Standard Caribbean hub ports linked from cruise line planning pages. */
export const CARIBBEAN_HUB_PORT_SLUGS = [
  "cozumel",
  "st-thomas",
  "aruba",
  "nassau",
  "grand-cayman",
  "roatan",
  "puerto-plata",
  "costa-maya",
  "st-maarten",
  "ocho-rios",
  "puerto-limon",
] as const;

export type CaribbeanHubPortSlug = (typeof CARIBBEAN_HUB_PORT_SLUGS)[number];

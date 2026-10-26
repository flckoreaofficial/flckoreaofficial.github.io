import { renderDocument, escapeAttribute } from "./render";
import { copyFile, writeFile, mkdir } from "node:fs/promises";
import { routes } from "../src/navigation";
import { company } from "../src/company";
const root = new URL("../", import.meta.url);
const initialYear = new Date().getFullYear();
await copyFile(new URL("FLC.png", root), new URL("public/flc-logo.png", root));
await mkdir(new URL("en/", root), { recursive: true });
for (const { page, locale, file } of routes) {
  const html = renderDocument(
    page,
    initialYear,
    locale === "en" ? "../" : "./",
    locale,
  );
  await writeFile(new URL(file, root), html, "utf8");
}
const urls = routes
  .map(
    ({ file }) =>
      `<url><loc>${escapeAttribute(company.siteUrl)}/${file.replace(/(^|\/)index\.html$/, "$1")}</loc></url>`,
  )
  .join("\n  ");
await writeFile(
  new URL("public/sitemap.xml", root),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls}\n</urlset>\n`,
  "utf8",
);
console.log(`Pre-rendered ${routes.length} Korean and English React pages.`);

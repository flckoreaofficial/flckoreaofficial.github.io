import { renderDocument, escapeAttribute } from "./render";
import { copyFile, writeFile } from "node:fs/promises";
import { pages } from "../src/navigation";
import { company } from "../src/company";

const root = new URL("../", import.meta.url);
const initialYear = new Date().getFullYear();

// Keep the original logo untouched and use one stable public URL in HTML and React.
await copyFile(new URL("FLC.png", root), new URL("public/flc-logo.png", root));

for (const page of pages) {
  const html = renderDocument(page, initialYear);
  await writeFile(new URL(page.file, root), html, "utf8");
}

const urls = pages
  .map(
    (page) =>
      `<url><loc>${escapeAttribute(company.siteUrl)}/${page.id === "home" ? "" : page.file}</loc></url>`,
  )
  .join("\n  ");
await writeFile(
  new URL("public/sitemap.xml", root),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls}\n</urlset>\n`,
  "utf8",
);
console.log(`Pre-rendered ${pages.length} React pages.`);

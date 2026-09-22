import { renderToString } from "react-dom/server";
import { StrictMode } from "react";
import { App } from "../src/App";
import type { SitePage } from "../src/navigation";
import { company } from "../src/company";

export function escapeAttribute(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
}

export function renderDocument(
  page: SitePage,
  initialYear = new Date().getFullYear(),
  assetBase = "./",
): string {
  const title =
    page.id === "home"
      ? "FLC | 정밀한 연결, 반도체의 다음을 열다"
      : `${page.label} | FLC 에프엘씨`;
  const url = `${company.siteUrl}/${page.id === "home" ? "" : page.file}`;
  const markup = renderToString(
    <StrictMode>
      <App page={page} initialYear={initialYear} assetBase={assetBase} />
    </StrictMode>,
  );
  const html = `<!doctype html>
<!-- Generated from React components. Edit src/pages, src/components, or src/company.ts. -->
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#082448" />
  <title>${escapeAttribute(title)}</title>
  <meta name="description" content="${escapeAttribute(page.description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:site_name" content="FLC · 주식회사 에프엘씨" />
  <meta property="og:title" content="${escapeAttribute(title)}" />
  <meta property="og:description" content="${escapeAttribute(page.description)}" />
  <meta property="og:url" content="${escapeAttribute(url)}" />
  <link rel="canonical" href="${escapeAttribute(url)}" />
  <link rel="icon" type="image/png" href="${escapeAttribute(assetBase)}flc-logo.png" />
  <link rel="stylesheet" href="/src/style.css" />
</head>
<body>
<div id="root" data-page="${page.id}" data-year="${initialYear}" data-asset-base="${escapeAttribute(assetBase)}">${markup}</div>
<script type="module" src="/src/main.tsx"></script>
</body>
</html>
`;
  return html;
}

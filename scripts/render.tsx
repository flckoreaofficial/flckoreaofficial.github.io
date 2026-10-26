import { renderToString } from "react-dom/server";
import { StrictMode } from "react";
import { App } from "../src/App";
import type { SitePage } from "../src/navigation";
import { company } from "../src/company";
import { translate, documentPath } from "../src/i18n";
import type { Locale } from "../src/i18n";
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
  locale: Locale = "ko",
): string {
  const t = <T,>(value: T) => translate(value, locale);
  const title =
    page.id === "home"
      ? locale === "en"
        ? "FLC | Semiconductor Equipment & Core Components"
        : "FLC | 반도체 후공정 장비와 핵심 부품"
      : `${t(page.label)} | ${locale === "en" ? "FLC" : "FLC 에프엘씨"}`;
  const pageUrl = (language: Locale) =>
    `${company.siteUrl}/${page.id === "home" ? (language === "en" ? "en/" : "") : documentPath(page.file, language)}`;
  const url = pageUrl(locale);
  const markup = renderToString(
    <StrictMode>
      <App
        page={page}
        initialYear={initialYear}
        assetBase={assetBase}
        locale={locale}
      />
    </StrictMode>,
  );
  return `<!doctype html>
<!-- Generated from React components. Edit src/pages, src/components, or src/company.ts. -->
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#082448" />
<title>${escapeAttribute(title)}</title>
<meta name="description" content="${escapeAttribute(t(page.description))}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="${locale === "en" ? "en_US" : "ko_KR"}" />
<meta property="og:locale:alternate" content="${locale === "en" ? "ko_KR" : "en_US"}" />
<meta property="og:site_name" content="${locale === "en" ? "FLC Inc." : "FLC · 주식회사 에프엘씨"}" />
<meta property="og:title" content="${escapeAttribute(title)}" />
<meta property="og:description" content="${escapeAttribute(t(page.description))}" />
<meta property="og:url" content="${escapeAttribute(url)}" />
<link rel="canonical" href="${escapeAttribute(url)}" />
<link rel="alternate" hreflang="ko" href="${escapeAttribute(pageUrl("ko"))}" />
<link rel="alternate" hreflang="en" href="${escapeAttribute(pageUrl("en"))}" />
<link rel="alternate" hreflang="x-default" href="${escapeAttribute(pageUrl("ko"))}" />
<link rel="icon" type="image/png" href="${escapeAttribute(assetBase)}flc-logo.png" />
<link rel="stylesheet" href="/src/style.css" />
</head>
<body>
<div id="root" data-page="${page.id}" data-locale="${locale}" data-year="${initialYear}" data-asset-base="${escapeAttribute(assetBase)}">${markup}</div>
<script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

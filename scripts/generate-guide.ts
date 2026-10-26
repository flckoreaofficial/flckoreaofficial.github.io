import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { products, sourceDate, categories } from "../src/products";
import { company } from "../src/company";
import { translate, translateData } from "../src/i18n";
import type { Locale } from "../src/i18n";
const esc = (v: string) =>
  v.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const logo = (await readFile("FLC.png")).toString("base64");
await mkdir("public/downloads", { recursive: true });
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "msedge",
  headless: true,
});
try {
  for (const locale of ["ko", "en"] as Locale[]) {
    const t = (value: string) => translate(value, locale);
    const localCompany = {
      ...translateData(company, locale),
      telephone: locale === "en" ? "+82-41-537-8115" : company.telephone,
    };
    const sections = await Promise.all(
      translateData(products, locale).map(async (p) => {
        const image = (
          await readFile(resolve(`public/products/${p.id}.png`))
        ).toString("base64");
        return `<section><header>FLC · ${esc(p.category)}<span>${esc(p.status)}</span></header><h1>${esc(p.name)}</h1><h2>${esc(p.model)}</h2><img class="product" src="data:image/png;base64,${image}"/><h3>${esc(p.summary)}</h3><p>${esc(p.description)}</p><table>${p.specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</table><h3>${esc(t("옵션·맞춤 제작 범위"))}</h3><p>${esc(p.customization)}</p><p class="note">${esc(p.note)}</p><footer>FLC Product items · ${sourceDate} · ${locale === "en" ? "Source pp." : "원자료"} ${p.sourcePages}<br/>${localCompany.telephone} · ${localCompany.email}</footer></section>`;
      }),
    );
    const coverNote =
      locale === "en"
        ? `Revised October 26, 2026 / Product information as of ${sourceDate}. Based on FLC Product items. Development targets are not completed supply specifications. Contact us to confirm current availability and application conditions. Actual specifications depend on your equipment and process.`
        : `개정일: 2026.10.26 / 제품 정보 기준: ${sourceDate}. 회사 제공 Product items의 내용을 바탕으로 정리했습니다. 개발 목표는 공급 완료 사양과 구분하며, 현재 공급 가능 여부와 적용 조건은 상담 시 확인합니다. 실제 사양은 고객의 장비·공정 조건에 따라 달라질 수 있습니다.`;
    const html = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><title>${esc(t("FLC 회사·제품 안내서"))}</title><style>@page{size:A4;margin:18mm}*{box-sizing:border-box}body{font-family:'Malgun Gothic',Arial,sans-serif;color:#162d47;font-size:10px;line-height:1.6;margin:0}section{break-after:page}section:last-child{break-after:auto}h1{font-size:25px;line-height:1.25;margin:20px 0 5px}h2{font-size:13px;color:#0866be;margin:0 0 12px}h3{font-size:12px;margin:15px 0 6px}header{border-bottom:2px solid #0866be;padding-bottom:10px;color:#0866be;font-size:9px}header span{float:right;max-width:48%;text-align:right}img.product{display:block;max-width:100%;width:100%;height:165px;object-fit:contain;margin:16px 0}table{width:100%;border-collapse:collapse;margin-top:15px}th,td{border-bottom:1px solid #dae2ec;text-align:left;padding:6px 9px}th{width:30%;background:#f4f7fb}.note{padding:10px;background:#f4f7fb;margin-top:16px;font-size:9px}footer{margin-top:15px;padding-top:8px;border-top:1px solid #dae2ec;font-size:9px;color:#526779}.logo{width:140px}.cover h1{font-size:32px;margin-top:40px}.cover ul{padding-left:20px;line-height:2.2}.cover{min-height:900px}</style></head><body><section class="cover"><img class="logo" src="data:image/png;base64,${logo}"/><h1>${esc(t("반도체 후공정 장비와"))}<br/>${esc(t("핵심 부품, FLC"))}</h1><h2>${esc(t("FLC 회사·제품 안내서"))}</h2><p>${esc(t("주식회사 에프엘씨는 2020년 설립된 반도체·디스플레이 장비 및 부품 개발 기업입니다. 장비 개발과 부품 국산화, 고객 맞춤형 제작을 추진합니다."))}</p><table>${[
      ["회사명", localCompany.name],
      ["설립일", localCompany.established],
      ["대표자", localCompany.representative],
      ["사업자등록번호", localCompany.businessNumber],
      ["주소", localCompany.address],
      ["대표 전화", localCompany.telephone],
      ["이메일", localCompany.email],
    ]
      .map(([k, v]) => `<tr><th>${esc(t(k))}</th><td>${esc(v)}</td></tr>`)
      .join(
        "",
      )}</table><h3>${esc(t("사업 분야"))}</h3><ul>${categories.map((c) => `<li>${esc(t(c))}</li>`).join("")}</ul><p class="note">${esc(coverNote)}</p><footer>${company.siteUrl}/${locale === "en" ? "en/" : ""}<br/>${localCompany.telephone} · ${localCompany.email}</footer></section>${sections.join("")}</body></html>`;
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: `public/downloads/flc-product-guide${locale === "en" ? "-en" : ""}.pdf`,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    await page.close();
    console.log(`Generated ${locale} company/product guide.`);
  }
} finally {
  await browser.close();
}

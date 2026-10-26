import { useEffect, useState } from "react";
import { sources } from "../company";
import { useLocale } from "../LocaleContext";
import { external } from "./content";
function CopyrightYear({ initialYear }: { initialYear: number }) {
  const [year, setYear] = useState(initialYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span id="copyright-year">{year}</span>;
}
export function Footer({
  initialYear,
  assetBase,
}: {
  initialYear: number;
  assetBase: string;
}) {
  const { t, company, navigation } = useLocale();
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="grid gap-10 pb-10 lg:grid-cols-[1.15fr_2fr] lg:gap-20">
          <div>
            <a
              className="brand footer-brand"
              href="./index.html"
              aria-label={t("FLC 에프엘씨 홈")}
            >
              <img
                src={`${assetBase}flc-logo.png`}
                width="200"
                height="100"
                alt={t("FLC 에프엘씨 공식 로고")}
                loading="lazy"
              />
            </a>
            <p className="mt-5 text-sm font-semibold text-ink">
              {company.name}
            </p>
            <p
              className="mt-3 max-w-sm text-xs leading-7 text-slate-500"
              data-company-address=""
            >
              {company.address}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {t("대표이사")} {company.representative}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {t("사업자등록번호")} {company.businessNumber}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              <a href={`tel:${company.telephone}`}>{company.telephone}</a>
            </p>
            <p className="mt-2 text-xs text-slate-500">
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </div>
          <nav className="footer-nav" aria-label={t("하단 메뉴")}>
            {navigation.map((group) => (
              <div key={group.id}>
                <h2>{group.label}</h2>
                {group.pages.map((p) => (
                  <a key={p.id} href={`./${p.file}`}>
                    {p.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © <CopyrightYear initialYear={initialYear} /> FLC. All rights
            reserved.
          </p>
          <span>PRECISION CONNECTS POSSIBILITY.</span>
          <details className="sources">
            <summary>{t("기업정보 출처")}</summary>
            <div className="sources-content">
              <p>{t("회사 로고·주소: 회사 제공 (2026.09.22)")}</p>
              <p>
                {t(
                  "제품·연락처: 회사 제공 Product items (표지 기준 2026.09.23)",
                )}
              </p>
              {external(sources.company, "넥스트라운드 · 기업 소개")}
              {external(sources.patent, "Google Patents · 특허 공보")}
              <p>{t("공개 자료 확인일: 2026.09.19")}</p>
            </div>
          </details>
        </div>
      </div>
    </footer>
  );
}

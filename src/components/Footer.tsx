import { Fragment, useEffect, useState } from "react";
import { navigation } from "../navigation";
import { company, sources } from "../company";
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
  return (
    <>
      <footer className="site-footer">
        <div className="shell">
          <div className="grid gap-10 pb-10 lg:grid-cols-[1.15fr_2fr] lg:gap-20">
            <div>
              <a
                className="brand footer-brand"
                href="./index.html"
                aria-label="FLC 에프엘씨 홈"
              >
                <img
                  src={`${assetBase}flc-logo.png`}
                  width="200"
                  height="100"
                  alt="FLC 에프엘씨 공식 로고"
                  loading="lazy"
                />
              </a>
              <p className="mt-5 text-sm font-semibold text-ink">
                주식회사 에프엘씨
              </p>
              <p
                className="mt-3 max-w-sm text-xs leading-7 text-slate-500"
                data-company-address=""
              >
                {company.address}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                대표이사 {company.representative}
              </p>
            </div>
            <nav className="footer-nav" aria-label="하단 메뉴">
              {navigation.map((group) => (
                <Fragment key={group.id}>
                  <div>
                    <h2>{group.label}</h2>
                    {group.pages.map((page) => (
                      <Fragment key={page.id}>
                        <a href={`./${page.file}`}>{page.label}</a>
                      </Fragment>
                    ))}
                  </div>
                </Fragment>
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
              <summary>기업정보 출처</summary>
              <div className="sources-content">
                <p>회사 로고·주소: 회사 제공 (2026.09.22)</p>
                {external(sources.company, "넥스트라운드 · 기업 소개")}
                {external(sources.patent, "Google Patents · 특허 공보")}
                <p>공개 자료 확인일: 2026.09.19</p>
              </div>
            </details>
          </div>
        </div>
      </footer>
    </>
  );
}

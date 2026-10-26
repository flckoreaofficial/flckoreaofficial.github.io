import { useEffect } from "react";
import type { SitePage } from "./navigation";
import type { Locale } from "./i18n";
import { LocaleContext, useLocale } from "./LocaleContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { contactBand } from "./components/content";
import { HomePage } from "./pages/HomePage";
import { PageContent } from "./pages/PageContent";
export interface AppProps {
  page: SitePage;
  initialYear: number;
  assetBase: string;
  locale?: Locale;
}
function Subpage({ page, assetBase }: { page: SitePage; assetBase: string }) {
  const { t, navigation } = useLocale();
  const group = navigation.find(
    (g) => g.id === page.groupId || g.pages.some((p) => p.id === page.id),
  );
  if (!group) throw new Error(`Unknown page: ${page.id}`);
  return (
    <main id="main">
      <nav
        className="section-nav"
        aria-label={`${group.label} ${t("하위 메뉴")}`}
      >
        <div className="shell">
          {group.pages.map((item) => (
            <a
              key={item.id}
              href={`./${item.file}`}
              aria-current={item.id === page.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          {!group.pages.some((item) => item.id === page.id) && (
            <a href={`./${page.file}`} aria-current="page">
              {t(page.label)}
            </a>
          )}
        </div>
      </nav>
      <section className="page-hero">
        <div className="shell relative z-10">
          <nav aria-label={t("현재 위치")} className="breadcrumb">
            <a href="./index.html">{t("홈")}</a>
            <span aria-hidden="true">/</span>
            <span>{group.label}</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t(page.label)}</span>
          </nav>
          <p className="eyebrow mt-10">{page.english}</p>
          <h1>{t(page.label)}</h1>
          <p className="page-description">{t(page.description)}</p>
        </div>
        <span className="page-watermark" aria-hidden="true">
          FLC.
        </span>
      </section>
      <section className="section page-content">
        <div className="shell">
          <PageContent page={page} assetBase={assetBase} />
        </div>
      </section>
      {contactBand()}
    </main>
  );
}
export function App({ page, initialYear, assetBase, locale = "ko" }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add("js");
    return () => document.documentElement.classList.remove("js");
  }, []);
  return (
    <LocaleContext.Provider value={locale}>
      <Header page={page} assetBase={assetBase} />
      {page.id === "home" ? (
        <HomePage assetBase={assetBase} />
      ) : (
        <Subpage page={page} assetBase={assetBase} />
      )}
      <Footer initialYear={initialYear} assetBase={assetBase} />
    </LocaleContext.Provider>
  );
}

import { useEffect } from "react";
import type { SitePage } from "./navigation";
import { navigation } from "./navigation";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { contactBand } from "./components/content";
import { HomePage } from "./pages/HomePage";
import { PageContent } from "./pages/PageContent";

export interface AppProps {
  page: SitePage;
  initialYear: number;
  assetBase: string;
}

function Subpage({ page, assetBase }: { page: SitePage; assetBase: string }) {
  const group = navigation.find((group) =>
    group.pages.some((item) => item.id === page.id),
  );
  if (!group) throw new Error(`Unknown page: ${page.id}`);
  return (
    <main id="main">
      <nav className="section-nav" aria-label={`${group.label} 하위 메뉴`}>
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
        </div>
      </nav>
      <section className="page-hero">
        <div className="shell relative z-10">
          <nav aria-label="현재 위치" className="breadcrumb">
            <a href="./index.html">홈</a>
            <span aria-hidden="true">/</span>
            <span>{group.label}</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.label}</span>
          </nav>
          <p className="eyebrow mt-10">{page.english}</p>
          <h1>{page.label}</h1>
          <p className="page-description">{page.description}</p>
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

export function App({ page, initialYear, assetBase }: AppProps) {
  useEffect(() => {
    // Collapse mobile navigation only once React has attached its event handlers.
    document.documentElement.classList.add("js");
    return () => document.documentElement.classList.remove("js");
  }, []);
  return (
    <>
      <Header page={page} assetBase={assetBase} />
      {page.id === "home" ? (
        <HomePage assetBase={assetBase} />
      ) : (
        <Subpage page={page} assetBase={assetBase} />
      )}
      <Footer initialYear={initialYear} assetBase={assetBase} />
    </>
  );
}

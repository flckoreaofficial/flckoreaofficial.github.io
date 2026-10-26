import { useEffect, useState } from "react";
import type { Locale } from "../i18n";
export function LanguageSwitch({
  file,
  locale,
}: {
  file: string;
  locale: Locale;
}) {
  const [suffix, setSuffix] = useState("");
  useEffect(() => {
    const sync = () => setSuffix(window.location.search + window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return (
    <nav
      className="language-switch"
      aria-label={locale === "en" ? "Language" : "언어 선택"}
    >
      <a
        href={`${locale === "en" ? "../" : "./"}${file}${suffix}`}
        hrefLang="ko"
        lang="ko"
        aria-current={locale === "ko" ? "true" : undefined}
        aria-label="한국어로 보기"
      >
        KOR
      </a>
      <span aria-hidden="true">/</span>
      <a
        href={`${locale === "en" ? "./" : "./en/"}${file}${suffix}`}
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "true" : undefined}
        aria-label="View in English"
      >
        ENG
      </a>
    </nav>
  );
}

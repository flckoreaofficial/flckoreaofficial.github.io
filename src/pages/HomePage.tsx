import { useLocale } from "../LocaleContext";
import { link, sectionTitle, contactBand } from "../components/content";
import { arrow, diagonal } from "../components/icons";
import { ProductCard } from "./Products";
export function HomePage({ assetBase }: { assetBase: string }) {
  const { t, products, categories } = useLocale();
  const featured = [
    "zsd-1",
    "thin-die-ejector",
    "magnetic-collet",
    "saw-kit",
  ].map((id) => products.find((p) => p.id === id)!);
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow text-sky-200">
              <span className="live-dot" /> FLC SEMICONDUCTOR SOLUTIONS
            </p>
            <h1 id="hero-title">
              {t("반도체 후공정 장비와")}
              <br />
              <span>{t("핵심 부품, FLC")}</span>
            </h1>
            <p className="hero-description">
              {t("Die Bonding부터 Saw Singulation까지.")}
              <br />
              {t("고객의 장비 사양과 공정 조건에 맞춘")}
              <br />
              {t("제품과 기술을 제공합니다.")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {link("product-solutions.html", "제품 살펴보기")}
              {link("support-contact.html", "기술 문의", "btn-ghost")}
            </div>
            <div className="hero-caption">
              <span /> PRECISION CONNECTS POSSIBILITY
            </div>
          </div>
          <figure className="hero-visual equipment-hero">
            <div className="visual-top">
              STACK DIE BONDING <span>+</span>
            </div>
            <div className="equipment-image">
              <img
                src={`${assetBase}products/zsd-1.png`}
                width="890"
                height="697"
                alt={t("FLC Stack Die Bonder ZSD-1 장비")}
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <strong>ZSD-1</strong>
              <span>{t("Dual Head · Collet / Ejector 자동 교체")}</span>
            </figcaption>
          </figure>
        </div>
        <div className="shell hero-bottom">
          <span>EQUIPMENT. PARTS. PROCESS SOLUTIONS.</span>
          <a href="#business">{t("사업 분야 살펴보기 ↓")}</a>
        </div>
      </section>
      <section id="business" className="section">
        <div className="shell">
          {sectionTitle(
            "OUR BUSINESS",
            "공정의 시작부터, 완성까지.",
            "장비와 공정 부품, 핵심 소재를 함께 개발합니다.",
          )}
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                "정밀한 칩 적층과 패키지 분리를 위한 Die Bonder 및 Saw Singulation 장비를 개발합니다.",
                "zsd-1",
              ],
              [
                "Ejector, Collet, Conversion Kit 등 생산 현장의 요구에 맞춘 공정 부품을 제공합니다.",
                "magnetic-collet",
              ],
              [
                "첨단 패키징 공정의 열 제어와 칩 핸들링, EMI 차폐에 필요한 부품을 개발합니다.",
                "pulse-heater",
              ],
            ].map(([description, image], i) => (
              <a
                className="business-card"
                key={image}
                href={`./product-${i + 1}.html`}
              >
                <div className="business-top">
                  <span>0{i + 1}</span>
                  {diagonal}
                </div>
                <img
                  src={`${assetBase}products/${image}.png`}
                  width="360"
                  height="220"
                  loading="lazy"
                  alt={categories[i]}
                />
                <h3>{categories[i]}</h3>
                <p>{t(description)}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-mist">
        <div className="shell">
          {sectionTitle(
            "FEATURED PRODUCTS",
            "현장의 요구에 답하는 제품",
            <a className="text-link" href="./product-solutions.html">
              {t("전체 11개 제품 보기")}
              {arrow}
            </a>,
          )}
          <div className="featured-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} assetBase={assetBase} />
            ))}
          </div>
          <p className="source-note">
            {t(
              "제품 상태는 2026.09.23 소개자료 기준입니다. 최신 공급 조건은 상담 시 확인해 주세요.",
            )}
          </p>
        </div>
      </section>
      <section className="technology-feature">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow text-sky-200">TECHNOLOGY & DEVELOPMENT</p>
            <h2 className="section-title mt-5 text-white">
              {t("작은 칩의 움직임까지,")}
              <br />
              <span className="text-sky-300">
                {t("공정에 맞게 설계합니다.")}
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-blue-100/75">
              {t("칩 분리와 픽업, 본딩, 부품 교체의 요구사항을 분석하고")}
              <br />
              {t("고객의 장비 환경에 맞는 구조와 사양을 개발합니다.")}
            </p>
            {link(
              "technology-core.html",
              "핵심기술 살펴보기",
              "btn-white mt-8",
            )}
          </div>
          <div className="technology-links">
            {[
              [
                "Thin Die 핸들링",
                "얇은 칩의 분리·픽업을 위한 Ejector와 Collet",
              ],
              ["부품 자동 교체", "Collet·Ejector 교체 구조와 장비 연동"],
              ["고객 사양 맞춤 설계", "장비 모델과 Device 조건별 부품 개발"],
            ].map(([title, desc], i) => (
              <a href="./technology-core.html" key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{t(title)}</h3>
                  <p>{t(desc)}</p>
                </div>
                {diagonal}
              </a>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="section">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">ABOUT FLC</p>
            <h2 className="section-title mt-5">
              {t("고객의 공정에서 출발하는")}
              <br />
              {t("장비와 부품 개발.")}
            </h2>
            <p className="intro-copy mt-6">
              {t(
                "주식회사 에프엘씨는 2020년 설립된 반도체·디스플레이 장비 및 부품 개발 기업입니다. 장비 개발과 부품 국산화, 고객 맞춤형 제작을 추진합니다.",
              )}
            </p>
            {link("company-overview.html", "회사소개", "btn-outline mt-7")}
          </div>
          <div className="company-facts">
            <div>
              <span>ESTABLISHED</span>
              <strong>2020.07.20</strong>
            </div>
            <div>
              <span>DEVELOPMENT</span>
              <strong>{t("장비 · 부품 · 소재")}</strong>
            </div>
            <div>
              <span>CAPABILITIES</span>
              <strong>{t("설계부터 제조·기술 지원까지")}</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-mist">
        <div className="shell">
          {sectionTitle(
            "LET’S WORK TOGETHER",
            "어떤 공정을 검토하고 계신가요?",
            "제품 선정부터 기존 장비 개선, 신규 부품 개발까지 상담해 드립니다.",
          )}
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                "제품·견적 상담",
                "필요한 제품과 적용 조건을 알려주세요.",
                "support-contact.html",
              ],
              [
                "맞춤형 개발",
                "장비와 공정에 맞는 개발 절차를 확인하세요.",
                "technology-research.html",
              ],
              [
                "회사·제품 자료",
                "제품 개요와 개발·공급 상태를 확인하세요.",
                "support-downloads.html",
              ],
            ].map(([title, desc, file]) => (
              <a key={file} className="quick-card bg-white" href={`./${file}`}>
                <h3>{t(title)}</h3>
                <p>{t(desc)}</p>
                {arrow}
              </a>
            ))}
          </div>
        </div>
      </section>
      {contactBand()}
    </main>
  );
}

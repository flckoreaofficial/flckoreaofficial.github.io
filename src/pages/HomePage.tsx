import { Fragment } from "react";
import type { ReactNode } from "react";
import { arrow, diagonal, chip } from "../components/icons";
import { marker, link, sectionTitle, contactBand } from "../components/content";

function productCards(): ReactNode {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((number) => (
          <Fragment key={number}>
            <a className="product-card group" href={`./product-${number}.html`}>
              <div className="product-visual">
                <span className="product-number">0{number}</span>
                <div className="product-placeholder">
                  {chip}
                  <span>PRODUCT IMAGE</span>
                </div>
                <div className="image-marker">{marker("제품 이미지")}</div>
              </div>
              <div className="p-6 lg:p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">
                    제품{number}
                  </h3>
                  <span className="circle-arrow">{diagonal}</span>
                </div>
                <div className="mt-3 text-sm">
                  {marker("제품명 · 주요 소개")}
                </div>
              </div>
            </a>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export function HomePage({ assetBase }: { assetBase: string }): ReactNode {
  return (
    <>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true"></div>
          <div className="shell hero-inner">
            <div className="hero-copy">
              <p className="eyebrow text-sky-200">
                <span className="live-dot"></span> FLC SEMICONDUCTOR SOLUTIONS
              </p>
              <h1 id="hero-title">
                정밀한 연결,
                <br />
                반도체의 <span>다음을 열다.</span>
              </h1>
              <p className="hero-description">
                현장의 경험과 기술의 깊이로.
                <br />
                반도체 후공정의 새로운 가능성을 만들어갑니다.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                {link("product-solutions.html", "제품 · 솔루션 보기")}
                {link("company-overview.html", "FLC 알아보기", "btn-ghost")}
              </div>
              <div className="hero-caption">
                <span></span> PRECISION CONNECTS POSSIBILITY
              </div>
            </div>
            <figure className="hero-visual">
              <div className="orbital orbital-one" aria-hidden="true"></div>
              <div className="orbital orbital-two" aria-hidden="true"></div>
              <img
                src={`${assetBase}wafer.svg`}
                width="740"
                height="660"
                alt="웨이퍼와 적층 반도체 칩을 표현한 패키징 기술 개념도"
                fetchPriority="high"
              />
              <div className="visual-top">
                01 / DIE BONDING TECHNOLOGY <span>+</span>
              </div>
              <figcaption>반도체 패키징 기술 개념도</figcaption>
            </figure>
          </div>
          <div className="shell hero-bottom">
            <span>FROM A SINGLE DIE. TO NEW POSSIBILITIES.</span>
            <a href="#about">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section className="bg-white">
          <div className="shell fact-strip">
            <div>
              <span>ESTABLISHED</span>
              <strong>
                2020<span>년 설립</span>
              </strong>
            </div>
            <div>
              <span>OUR EXPERTISE</span>
              <strong>Die Bonding</strong>
            </div>
            <div>
              <span>OUR ORIGIN</span>
              <strong>
                SK하이닉스<span>사내벤처 출발</span>
              </strong>
            </div>
            <a href="./company-overview.html" className="fact-link">
              에프엘씨 소개 {diagonal}
            </a>
          </div>
        </section>
        <section id="about" className="section bg-mist">
          <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="about-art" aria-hidden="true">
              <div className="art-grid"></div>
              <div className="layer layer-one"></div>
              <div className="layer layer-two"></div>
              <div className="layer layer-three"></div>
              <span className="art-cross">+</span>
              <div className="art-caption">
                PRECISION
                <br />
                <strong>IN EVERY CONNECTION.</strong>
              </div>
              <span className="art-code">FLC / SEMICONDUCTOR</span>
            </div>
            <div>
              <p className="eyebrow">ABOUT FLC</p>
              <h2 className="section-title mt-5">
                작은 칩 하나에서,
                <br />더 큰 가능성으로.
              </h2>
              <p className="mt-6 text-sm leading-8 text-slate-600">
                에프엘씨는 반도체 후공정의 다이 본딩 장비와 부품, 부자재를
                개발하는 기술 기업입니다.
              </p>
              <p className="mt-4 text-sm leading-8 text-slate-600">
                SK하이닉스 사내벤처에서 시작한 현장 경험을 바탕으로, 고객의
                공정에 맞춘 기술 개발과 장비·부품의 국산화를 추구합니다.
              </p>
              <a href="./company-overview.html" className="text-link mt-8">
                회사소개 {arrow}
              </a>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="shell">
            {sectionTitle(
              "PRODUCTS & SOLUTIONS",
              <>
                공정에 맞는 기술.
                <br />
                가능성을 넓히는 솔루션.
              </>,
              <>
                장비에서 부품, 부자재까지.
                <br />
                고객의 제조 환경을 이해하는 기술을 개발합니다.
              </>,
            )}
            {productCards()}
            <a href="./product-solutions.html" className="solution-band">
              <span className="text-xs font-medium tracking-wider text-brand">
                CUSTOMIZED SOLUTIONS
              </span>
              <strong>고객의 공정에서 출발하는 맞춤형 솔루션</strong>
              {arrow}
            </a>
          </div>
        </section>
        <section className="technology-feature">
          <div className="shell grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-sky-200">TECHNOLOGY & INNOVATION</p>
              <h2 className="section-title mt-5 text-white">
                정밀하게 쌓고,
                <br />
                <span className="text-sky-300">끊임없이 연구합니다.</span>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-8 text-blue-100/75">
                반도체 패키징의 핵심인 다이 본딩 공정.
                <br />
                장비와 공정 부품의 연구개발을 통해 기술의 내일을 준비합니다.
              </p>
              {link(
                "technology-core.html",
                "핵심기술 살펴보기",
                "btn-white mt-8",
              )}
            </div>
            <div className="technology-links">
              <a href="./technology-core.html">
                <span>01</span>
                <div>
                  <h3>핵심기술</h3>
                  <p>다이 본딩 공정 기술</p>
                </div>
                {diagonal}
              </a>
              <a href="./technology-research.html">
                <span>02</span>
                <div>
                  <h3>연구개발</h3>
                  <p>장비와 공정 부품 연구</p>
                </div>
                {diagonal}
              </a>
              <a href="./technology-resources.html">
                <span>03</span>
                <div>
                  <h3>기술자료</h3>
                  <p>기술 및 특허 관련 자료</p>
                </div>
                {diagonal}
              </a>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="shell">
            {sectionTitle(
              "FLC CONNECTION",
              "에프엘씨와 연결되는 곳.",
              "기업 소식부터 채용, 방문 안내까지.",
            )}
            <div className="grid gap-5 md:grid-cols-3">
              <a className="quick-card" href="./support-notices.html">
                <span className="eyebrow">NEWS & NOTICE</span>
                <h3>새로운 소식</h3>
                <p>에프엘씨의 공지사항을 확인하세요.</p>
                {arrow}
              </a>
              <a className="quick-card" href="./careers-jobs.html">
                <span className="eyebrow">CAREERS</span>
                <h3>함께하는 내일</h3>
                <p>채용정보와 인재상을 확인하세요.</p>
                {arrow}
              </a>
              <a className="quick-card" href="./company-location.html">
                <span className="eyebrow">VISIT FLC</span>
                <h3>오시는길</h3>
                <p>충남 천안시 서북구 직산읍 금곡로 74-10</p>
                {arrow}
              </a>
            </div>
          </div>
        </section>
        {contactBand()}
      </main>
    </>
  );
}

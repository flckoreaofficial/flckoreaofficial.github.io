import { useState } from "react";
import { useLocale } from "../LocaleContext";
import { productHref, inquiryHref, sourceDate } from "../products";
import type { Product } from "../products";
import { arrow } from "../components/icons";
import { field } from "../components/content";
export function Status({ product }: { product: Product }) {
  const { t } = useLocale();
  const tone =
    product.status === t("개발 중")
      ? "development"
      : product.status === t("샘플 평가")
        ? "evaluation"
        : product.status === t("공급 사양 상담")
          ? "consult"
          : "production";
  return <span className={`status-badge ${tone}`}>{product.status}</span>;
}
export function ProductCard({
  product,
  assetBase,
}: {
  product: Product;
  assetBase: string;
}) {
  const { t } = useLocale();
  return (
    <article className="product-card catalog-card">
      <a
        href={productHref(product)}
        className="product-visual"
        aria-label={`${product.name} — ${t("상세 보기")}`}
      >
        <img
          src={`${assetBase}products/${product.id}.png`}
          alt={product.name}
          loading="lazy"
          width="480"
          height="320"
        />
      </a>
      <div className="catalog-card-copy">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow">{product.model}</p>
          <Status product={product} />
        </div>
        <h2>
          <a href={productHref(product)}>{product.name}</a>
        </h2>
        <p className="catalog-summary">{product.summary}</p>
        <p className="process-tags">{product.processes.join(" · ")}</p>
        <div className="card-actions">
          <a href={productHref(product)}>
            {t("상세 보기")}
            {arrow}
          </a>
          <a href={inquiryHref(product)}>{t("제품 문의 ↗")}</a>
        </div>
      </div>
    </article>
  );
}
export function ProductCatalog({
  assetBase,
  initialCategory = "전체",
}: {
  assetBase: string;
  initialCategory?: string;
}) {
  const { t, products, categories, processes } = useLocale();
  const [category, setCategory] = useState(t(initialCategory));
  const [process, setProcess] = useState(t("전체 공정"));
  const [query, setQuery] = useState("");
  const shown = products.filter(
    (p) =>
      (category === t("전체") || p.category === category) &&
      (process === t("전체 공정") || p.processes.includes(process)) &&
      `${p.name} ${p.model} ${p.summary}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  function reset() {
    setCategory(t("전체"));
    setProcess(t("전체 공정"));
    setQuery("");
  }
  return (
    <>
      <p className="intro-copy">
        {t(
          "반도체 후공정 장비부터 교체용 툴과 핵심 부자재까지, 적용 공정과 제품 유형에 따라 FLC의 제품을 찾아보세요.",
        )}
      </p>
      <div className="catalog-controls interactive-only">
        <div
          className="category-filters"
          role="group"
          aria-label={t("제품 분류")}
        >
          {[t("전체"), ...categories].map((c) => (
            <button
              type="button"
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="search-controls">
          <label>
            {t("적용 공정")}
            <select
              value={process}
              onChange={(e) => setProcess(e.target.value)}
            >
              <option>{t("전체 공정")}</option>
              {processes.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label>
            {t("제품 검색")}
            <input
              type="search"
              placeholder={t("제품명 또는 모델명 (예: ZSD-1)")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <button type="button" className="reset-button" onClick={reset}>
            {t("필터 초기화")}
          </button>
        </div>
      </div>
      <div className="catalog-meta">
        <p role="status">
          {t("총")} <strong>{shown.length}</strong> {t("개 제품")}
        </p>
        <p>
          {t("제품 상태 기준:")} {sourceDate}
        </p>
      </div>
      {shown.length ? (
        <div className="catalog-grid">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} assetBase={assetBase} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <h2>{t("검색 조건에 맞는 제품이 없습니다.")}</h2>
          <p>{t("다른 제품명이나 공정을 선택해 주세요.")}</p>
          <button type="button" className="btn btn-primary" onClick={reset}>
            {t("전체 제품 보기")}
          </button>
        </div>
      )}
      <p className="source-note">
        {t(
          "상태와 사양은 제품 소개자료 기준입니다. 현재 공급 가능 여부와 적용 조건은 제품별 상담을 통해 확인해 주세요.",
        )}
      </p>
    </>
  );
}
export function ProductDetail({
  product: p,
  assetBase,
}: {
  product: Product;
  assetBase: string;
}) {
  const { t, categories, locale } = useLocale();
  return (
    <>
      <div className="product-detail-grid">
        <figure className="detail-image">
          <img
            src={`${assetBase}products/${p.id}.png`}
            alt={p.name}
            width="720"
            height="540"
            fetchPriority="high"
          />
          <figcaption>
            {p.imageCaption || `${p.name} ${t("· FLC 제품 소개자료 이미지")}`}
          </figcaption>
        </figure>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{p.category}</span>
            <Status product={p} />
          </div>
          <h2 className="detail-title">{p.summary}</h2>
          <p className="intro-copy">{p.description}</p>
          <dl className="info-list mt-6">
            {field("모델·제품군", p.model)}
            {field("적용 공정", p.processes.join(" / "))}
            {field("상태 기준일", sourceDate)}
          </dl>
          <a className="btn btn-primary mt-7" href={inquiryHref(p)}>
            {t("제품·사양 상담")}
            {arrow}
          </a>
        </div>
      </div>
      <nav className="detail-jumps" aria-label={t("제품 상세 항목")}>
        <a href="#features">{t("주요 특징")}</a>
        <a href="#specifications">{t("주요 사양")}</a>
        <a href="#customization">{t("맞춤 제작")}</a>
        <a href="#related-resources">{t("관련 자료")}</a>
      </nav>
      <section id="features" className="detail-section">
        <h2 className="content-title">{t("주요 특징")}</h2>
        <div className="feature-grid">
          {p.features.map((feature, i) => (
            <div className="feature-item" key={feature}>
              <span>0{i + 1}</span>
              <h3>{feature}</h3>
            </div>
          ))}
        </div>
      </section>
      <section id="specifications" className="detail-section">
        <h2 className="content-title">
          {t(
            p.status === t("개발 중") ? "개발 목표 및 검토 사양" : "주요 사양",
          )}
        </h2>
        <dl className="info-list">
          {p.specs.map(([key, value]) => (
            <div className="info-row" key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="spec-note">{p.note}</p>
      </section>
      <section id="customization" className="detail-section info-card">
        <h2>{t("옵션·맞춤 제작 범위")}</h2>
        <p>{p.customization}</p>
        <a className="text-link mt-5" href={inquiryHref(p)}>
          {t("적용 검토 요청")}
          {arrow}
        </a>
      </section>
      <section id="related-resources" className="detail-section">
        <h2 className="content-title">{t("관련 자료")}</h2>
        <a
          href={`${assetBase}downloads/flc-product-guide${locale === "en" ? "-en" : ""}.pdf`}
          download
          className="document-row"
        >
          <span className="file-icon">PDF</span>
          <div>
            <h3>{t("FLC 회사·제품 안내서")}</h3>
            <p>{t("한국어 · 전체 제품 개요와 개발·공급 상태")}</p>
          </div>
          <span className="document-status">{t("다운로드 ↓")}</span>
        </a>
        <p className="source-note">
          {t("사양 출처: FLC Product items,")} {sourceDate},{" "}
          {locale === "en" ? "pp. " : ""}
          {p.sourcePages}
          {t("페이지. 상세 도면과 평가 자료는 기술 상담으로 안내합니다.")}
        </p>
      </section>
      <a
        href={`./product-${categories.indexOf(p.category) + 1}.html`}
        className="text-link"
      >
        ← {p.category} {t("목록으로")}
      </a>
    </>
  );
}

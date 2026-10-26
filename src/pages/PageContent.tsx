import { useLocale } from "../LocaleContext";
import type { SitePage } from "../navigation";
import { sourceDate } from "../products";
import {
  milestones,
  capabilities,
  technologies,
  developmentSteps,
} from "../companyContent";
import { pin } from "../components/icons";
import { AddressCopy } from "../components/AddressCopy";
import { link, external, field, telephone, email } from "../components/content";
import { ProductCatalog, ProductDetail } from "./Products";
import { ContactPage } from "./ContactPage";
function History() {
  const { t } = useLocale();
  return (
    <>
      <ol className="timeline">
        {milestones.map(([year, title, desc]) => (
          <li key={year}>
            <span className="timeline-year">{year}</span>
            <div>
              <h2>{t(title)}</h2>
              <p>{t(desc)}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="source-note">
        {sourceDate} ·{" "}
        {t(
          "소개자료의 과거 이력입니다. 인증 이력이 현재 유효한 인증을 의미하지는 않습니다.",
        )}
      </p>
      <a href="./technology-research.html" className="text-link mt-6">
        {t("진행 중인 개발과 로드맵 보기 ↗")}
      </a>
    </>
  );
}
function Capabilities() {
  const { t } = useLocale();
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {capabilities.map(([title, desc], i) => (
        <article className="info-card" key={title}>
          <span className="eyebrow">CAPABILITY 0{i + 1}</span>
          <h2 className="mt-5">{t(title)}</h2>
          <p>{t(desc)}</p>
        </article>
      ))}
    </div>
  );
}
function Location() {
  const { t } = useLocale();
  const query = encodeURIComponent("충남 천안시 서북구 직산읍 금곡로 74-10");
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="location-panel">
          <div className="location-pattern" aria-hidden="true" />
          <div className="location-pin">{pin}</div>
          <p className="eyebrow text-brand">CHEONAN, KOREA</p>
          <h2>{t("주식회사 에프엘씨")}</h2>
          <p className="mt-3 text-sm text-slate-500">
            {t("직산읍 금곡로 74-10")}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {external(
              `https://map.naver.com/p/search/${query}`,
              "네이버 지도",
              "btn btn-white",
            )}
            {external(
              `https://map.kakao.com/?q=${query}`,
              "카카오맵",
              "btn btn-white",
            )}
          </div>
          <p className="mt-5 text-xs text-slate-500">
            {t("지도 서비스에서 실제 위치와 경로를 확인하세요.")}
          </p>
        </div>
        <div className="self-center">
          <p className="eyebrow">VISIT FLC</p>
          <h2 className="mt-5 text-2xl font-semibold">
            {t("에프엘씨를 찾아오시는 길")}
          </h2>
          <AddressCopy />
          <dl className="info-list mt-7">
            {field("대표 전화", telephone())}
            {field("이메일", email())}
          </dl>
        </div>
      </div>
      <article className="info-card mt-10">
        <h2>{t("방문 안내")}</h2>
        <p>
          {t(
            "장비·부품 상담이나 방문을 계획하고 계시면 대표 전화 또는 이메일로 방문 일정과 상담 내용을 먼저 알려주세요. 교통편과 차량 진입·주차 안내는 방문 상담 시 확인해 주세요.",
          )}
        </p>
      </article>
    </>
  );
}
function Development() {
  const { t } = useLocale();
  return (
    <>
      <h2 className="content-title">{t("맞춤형 개발 절차")}</h2>
      <p className="intro-copy">
        {t(
          "장비 환경과 목표 조건을 먼저 이해하고, 설계·샘플 평가를 거쳐 적용 사양을 구체화합니다. 제품 특성에 따라 검토 범위와 절차를 조정합니다.",
        )}
      </p>
      <ol className="development-steps">
        {developmentSteps.map(([title, desc], i) => (
          <li key={title}>
            <span>0{i + 1}</span>
            <h3>{t(title)}</h3>
            <p>{t(desc)}</p>
          </li>
        ))}
      </ol>
      <section className="detail-section">
        <h2 className="content-title">{t("공정 개선 검토 사례")}</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            [
              "HBM Thin Die 픽업",
              "Bump 표면과 픽업 조건에 맞는 칩 분리 구조가 필요합니다.",
              "Ejector·M-Collet 설계 검토",
              "자료에 개발 및 양산 적용 이력이 제시되어 있습니다.",
            ],
            [
              "Eject Hood 구조 개선",
              "일체형 Hood의 교체 범위와 장비별 부품 차이를 검토합니다.",
              "분리형 Hood와 공용 Body 적용",
              "교체 부품을 줄이는 구조를 적용합니다. 개선 정도는 장비 조건별 평가가 필요합니다.",
            ],
            [
              "Wafer Chuck Table",
              "웨이퍼 면내 두께 편차와 지지 구조를 검토합니다.",
              "척 구조·접착 방식 및 체결·급수 조건 검토",
              "자료에 시험 결과가 제시되어 있으며, 실제 조건에서 TTV를 평가합니다.",
            ],
            [
              "Saw Kit 맞춤 제작",
              "신규 패키지의 규격과 배열에 맞는 제품 전환이 필요합니다.",
              "Picker·Chuck Table 등 Kit 설계",
              "자료 기준 맞춤형 Kit의 양산 적용 이력이 있습니다.",
            ],
          ].map(([title, problem, solution, result]) => (
            <article className="info-card case-card" key={title}>
              <h3>{t(title)}</h3>
              <dl>
                <dt>{t("공정 요구")}</dt>
                <dd>{t(problem)}</dd>
                <dt>{t("적용 방향")}</dt>
                <dd>{t(solution)}</dd>
                <dt>{t("적용·평가")}</dt>
                <dd>{t(result)}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>
      <section className="detail-section">
        <p className="eyebrow">DEVELOPMENT ROADMAP</p>
        <h2 className="content-title mt-4">
          {t("첨단 패키징을 향한 개발 방향")}
        </h2>
        <p className="spec-note">
          {t("기준일")} {sourceDate}
          {t(
            ". 아래 일정은 소개자료의 개발 목표이며 완료 실적 또는 공급 확약이 아닙니다.",
          )}
        </p>
        <div className="roadmap">
          {[
            [
              "2026년 4분기 목표",
              "HBM TC Bonder · Interconnection",
              "HBM 적층용 TC Bonding과 Impulse Printing Interconnection Module 개발",
            ],
            [
              "2027년 2분기 목표",
              "Saw 자동화 옵션",
              "AI Vision 및 OHT·AMR 물류 자동화 대응 개발",
            ],
            [
              "2027년 3분기 목표",
              "2.5D·FO-WLP Bonder",
              "MCPD-1의 다양한 칩·기판 및 고정밀 본딩 구성 개발",
            ],
            [
              "중장기 개발 방향",
              "Hybrid Bonding · 검사·세정",
              "Hybrid Bonder, Wafer·Bump 검사, Laser·CO₂ 세정과 Interconnection 기술 검토",
            ],
          ].map(([time, title, desc]) => (
            <article key={title}>
              <span>{t(time)}</span>
              <h3>{t(title)}</h3>
              <p>{t(desc)}</p>
            </article>
          ))}
        </div>
      </section>
      {link("support-contact.html", "맞춤형 개발 문의")}
    </>
  );
}
function Resources({
  assetBase,
  technical = false,
}: {
  assetBase: string;
  technical?: boolean;
}) {
  const { t, locale } = useLocale();
  return (
    <>
      <p className="intro-copy">
        {t(
          technical
            ? "적용 장비와 공정 조건에 따른 제품 선정 기준을 확인하세요. 상세 도면과 평가 자료는 제품별 기술 상담으로 안내합니다."
            : "회사 개요와 11개 제품의 특징, 개발·공급 상태를 정리한 안내서를 제공합니다.",
        )}
      </p>
      <a
        className="document-row mt-8"
        href={`${assetBase}downloads/flc-product-guide${locale === "en" ? "-en" : ""}.pdf`}
        download
      >
        <span className="file-icon">PDF</span>
        <div>
          <h2>{t("FLC 회사·제품 안내서")}</h2>
          <p>
            {t("전체 제품 · 한국어 · 개정 2026.10.26 · 제품 정보 기준")}{" "}
            {sourceDate}
          </p>
        </div>
        <span className="document-status">{t("다운로드 ↓")}</span>
      </a>
      <a
        className="document-row"
        href={`${assetBase}downloads/flc-selection-guide${locale === "en" ? "-en" : ""}.txt`}
        download
      >
        <span className="file-icon">TXT</span>
        <div>
          <h2>{t("제품 선정·기술 문의 체크리스트")}</h2>
          <p>
            {t(
              "전체 제품 · 한국어 · 개정 2026.10.26 · 장비·공정 조건 정리 양식",
            )}
          </p>
        </div>
        <span className="document-status">{t("다운로드 ↓")}</span>
      </a>
      <div className="grid gap-5 mt-10 md:grid-cols-2">
        <article className="info-card">
          <h2>{t("제품별 상세 자료")}</h2>
          <p>
            {t(
              "상세 사양서, 도면, 소재별 평가 자료가 필요하시면 적용 제품과 사용 목적을 알려주세요. 제공 가능한 자료를 안내합니다.",
            )}
          </p>
          {link("support-contact.html", "자료 요청", "btn-outline mt-5")}
        </article>
        <article className="info-card">
          <h2>{t("인증자료")}</h2>
          <p>
            {t(
              "회사 인증자료가 필요한 경우 문의해 주세요. 인증명과 유효기간을 확인한 자료를 안내합니다.",
            )}
          </p>
          {link("support-contact.html", "인증자료 문의", "btn-outline mt-5")}
        </article>
      </div>
      {technical && (
        <section className="detail-section">
          <h2 className="content-title">{t("제품 선정 시 확인할 조건")}</h2>
          <dl className="info-list">
            {field(
              "Ejector·Collet",
              "칩 크기·두께, Bump 조건, 흡착 패턴, 장비 모델과 Motion",
            )}
            {field(
              "Back Grind Parts",
              "웨이퍼 규격, 장비 모델, P.C.D Hole, 냉각수 유입 위치",
            )}
            {field("Saw Kit", "패키지 크기·배열, 장비 구조, 흡착·이송 조건")}
            {field(
              "세라믹 부품",
              "목표 온도와 주기, 접촉부 형상, 소재·표면저항 조건",
            )}
            {field("EMI Back Plate", "장비, 대응 Target, 재질·치수·체결 구조")}
          </dl>
        </section>
      )}
    </>
  );
}
export function PageContent({
  page,
  assetBase,
}: {
  page: SitePage;
  assetBase: string;
}) {
  const { t, company, products, categories } = useLocale();
  const product = products.find((p) => page.id === `product-${p.id}`);
  if (product) return <ProductDetail product={product} assetBase={assetBase} />;
  switch (page.id) {
    case "company-overview":
      return (
        <>
          <p className="eyebrow">FLC INC.</p>
          <h2 className="section-title mt-4">
            {t("고객의 공정 요구에 맞춰")}
            <br />
            {t("장비와 부품을 개발합니다.")}
          </h2>
          <p className="intro-copy mt-6">
            {t(
              "주식회사 에프엘씨는 2020년 설립된 반도체·디스플레이 장비 및 부품 개발 기업입니다. Die Bonder 장비와 공정용 Tool·Kit, 핵심 부자재를 중심으로 장비 개발과 부품 국산화, 고객 맞춤형 제작을 추진하고 있습니다.",
            )}
          </p>
          <dl className="info-list mt-10">
            {field("회사명", "주식회사 에프엘씨 / FLC Inc.")}
            {field("설립일", company.established)}
            {field("대표자", company.representative)}
            {field(
              "사업 분야",
              "반도체·디스플레이 장비, 부품·부자재 개발 및 제조",
            )}
            {field(
              "주요 제품",
              "Die Bonder / Ejector / Collet / Saw Kit / 세라믹 부품",
            )}
            {field("사업자번호", company.businessNumber)}
            {field("대표 전화", telephone())}
            {field("이메일", email())}
            {field("소재지", company.address)}
          </dl>
          <section className="detail-section">
            <h2 className="content-title">{t("개발·제조 역량")}</h2>
            <Capabilities />
          </section>
          <section className="detail-section">
            <h2 className="content-title">{t("경영 방향")}</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                [
                  "환경을 고려한 개발",
                  "제품 개발 과정에서 환경과 자원 사용을 고려합니다.",
                ],
                ["사람과 함께 성장", "인재 육성과 공정한 거래를 지향합니다."],
                [
                  "책임 있는 경영",
                  "전문성과 투명성을 갖춘 경영 체계를 지향합니다.",
                ],
              ].map(([title, desc]) => (
                <article className="value-card" key={title}>
                  <h3>{t(title)}</h3>
                  <p className="mt-4 text-sm leading-7">{t(desc)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="detail-section">
            <h2 className="content-title">{t("회사 연혁")}</h2>
            <History />
          </section>
          <section className="detail-section">
            <h2 className="content-title">{t("오시는길")}</h2>
            <Location />
          </section>
        </>
      );
    case "company-history":
      return <History />;
    case "company-organization":
      return (
        <>
          <p className="intro-copy mb-8">
            {t(
              "장비 설계, 공정 부품 개발, 제조·조립, 품질과 현장 대응을 연결해 고객의 공정 요구를 검토합니다.",
            )}
          </p>
          <Capabilities />
          <div className="info-card mt-8">
            <h2>{t("고객 공정에서 시작하는 협업")}</h2>
            <p>
              {t(
                "적용 장비와 제품 조건을 공유해 주시면 필요한 설계·평가 범위를 검토합니다. 개발 담당 분야 간 협업으로 부품과 장비의 연결 조건을 함께 확인합니다.",
              )}
            </p>
            {link(
              "technology-research.html",
              "개발 절차 보기",
              "btn-outline mt-5",
            )}
          </div>
        </>
      );
    case "company-location":
      return <Location />;
    case "product-solutions":
      return <ProductCatalog assetBase={assetBase} />;
    case "product-1":
    case "product-2":
    case "product-3":
      return (
        <ProductCatalog
          key={page.id}
          assetBase={assetBase}
          initialCategory={categories[Number(page.id.slice(-1)) - 1]}
        />
      );
    case "technology-core":
      return (
        <>
          <p className="intro-copy mb-10">
            {t(
              "칩 분리와 픽업, 본딩, 부품 교체 과정의 요구사항을 분석하고 고객의 장비 환경에 맞는 구조와 사양을 개발합니다.",
            )}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {technologies.map(([title, desc, id], i) => (
              <article className="info-card technology-card" key={id}>
                <span className="eyebrow">TECHNOLOGY 0{i + 1}</span>
                <img
                  src={`${assetBase}products/${id}.png`}
                  alt={products.find((p) => p.id === id)!.name}
                  width="480"
                  height="260"
                  loading="lazy"
                />
                <h2>{t(title)}</h2>
                <p>{t(desc)}</p>
                <a className="text-link mt-6" href={`./product-${id}.html`}>
                  {t("연결 제품 살펴보기 ↗")}
                </a>
              </article>
            ))}
          </div>
          <div className="mt-10">
            {link("technology-research.html", "맞춤형 개발·적용 사례 보기")}
          </div>
        </>
      );
    case "technology-research":
      return <Development />;
    case "technology-resources":
      return <Resources assetBase={assetBase} technical />;
    case "support-downloads":
      return <Resources assetBase={assetBase} />;
    case "support-contact":
      return <ContactPage />;
    case "support-notices":
      return (
        <article className="info-card">
          <h2>{t("제품 및 기술 안내")}</h2>
          <p>
            {t(
              "제품 정보와 개발·공급 상태는 제품소개에서, 기술 상담은 문의하기에서 확인하실 수 있습니다.",
            )}
          </p>
          {link("product-solutions.html", "제품소개", "btn-outline mt-5")}
        </article>
      );
    case "careers-jobs":
      return (
        <article className="info-card">
          <h2>{t("채용 관련 문의")}</h2>
          <p>
            {t(
              "채용 공고와 모집 직무에 관한 사항은 대표 이메일로 문의해 주세요.",
            )}
          </p>
          <div className="mt-6">{email()}</div>
        </article>
      );
    case "careers-values":
      return (
        <>
          <h2 className="content-title">{t("사람과 함께 성장하는 기술")}</h2>
          <p className="intro-copy">
            {t(
              "에프엘씨는 장비·부품 개발 과정에서 분야 간 협업과 인재 육성을 지향합니다.",
            )}
          </p>
          <div className="mt-8">
            <Capabilities />
          </div>
        </>
      );
    default:
      throw new Error(`Missing page: ${page.id}`);
  }
}

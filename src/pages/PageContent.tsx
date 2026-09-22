import { Fragment } from "react";
import type { ReactNode } from "react";
import { company, sources } from "../company";
import type { SitePage } from "../navigation";
import { pin, chip } from "../components/icons";
import { AddressCopy } from "../components/AddressCopy";
import {
  marker,
  link,
  external,
  field,
  telephone,
  email,
} from "../components/content";

function history(): ReactNode {
  return (
    <>
      <ol className="timeline">
        <li>
          <span className="timeline-year">
            2020<small>07</small>
          </span>
          <div>
            <h2>주식회사 에프엘씨 설립</h2>
            <p>
              SK하이닉스 사내벤처에서 출발해 반도체 후공정 장비·부품 개발에
              도전했습니다.
            </p>
          </div>
        </li>
        <li>
          <span className="timeline-year">
            2024<small>01</small>
          </span>
          <div>
            <h2>반도체 공정 부품 연구개발</h2>
            <p>
              반도체 제조공정용 흡착패드 및 탈부착방법 관련 특허를 출원했습니다.
            </p>
          </div>
        </li>
        <li>
          <span className="timeline-year">
            2025<small>08</small>
          </span>
          <div>
            <h2>공정 부품 기술 특허 등록</h2>
            <p>흡착패드 및 탈부착방법 특허 등록 · 등록번호 10-2849314</p>
            {external(sources.patent, "관련 특허 보기")}
          </div>
        </li>
        <li>
          <span className="timeline-year">NEXT</span>
          <div>
            <h2>추가 연혁</h2>
            <p>{marker("연도 · 주요 성과 · 상세 내용")}</p>
          </div>
        </li>
      </ol>
    </>
  );
}

function location(): ReactNode {
  const query = encodeURIComponent("충남 천안시 서북구 직산읍 금곡로 74-10");
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="location-panel">
          <div className="location-pattern" aria-hidden="true"></div>
          <div className="location-pin">{pin}</div>
          <p className="eyebrow text-brand">CHEONAN, KOREA</p>
          <h2>주식회사 에프엘씨</h2>
          <p className="mt-3 text-sm text-slate-500">직산읍 금곡로 74-10</p>
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
            지도 서비스에서 실제 위치와 경로를 확인하세요.
          </p>
        </div>
        <div className="self-center">
          <p className="eyebrow">VISIT FLC</p>
          <h2 className="mt-5 text-2xl font-semibold">
            에프엘씨를 찾아오시는 길
          </h2>
          <AddressCopy />
        </div>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="info-card">
          <h2>대중교통 안내</h2>
          <p>{marker("가까운 역 · 버스 정류장 · 도보 경로")}</p>
        </article>
        <article className="info-card">
          <h2>차량 방문 안내</h2>
          <p>{marker("차량 진입 경로 · 주차장 · 방문 절차")}</p>
        </article>
      </div>
    </>
  );
}

function product(page: SitePage): ReactNode {
  const number = page.id.slice(-1);
  return (
    <>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div className="product-detail-visual">
          <span className="product-number">0{number}</span>
          {chip}
          <p>{marker("실제 제품 이미지")}</p>
        </div>
        <div>
          <p className="eyebrow">PRODUCT 0{number}</p>
          <h2 className="mt-5 text-3xl font-semibold">{page.label}</h2>
          <div className="mt-5">{marker("공식 제품명 · 모델명")}</div>
          <p className="mt-7 text-sm leading-8">
            {marker("제품 개요 · 적용 공정 · 주요 용도")}
          </p>
          <dl className="info-list mt-8">
            {field("적용 분야", marker("적용 공정 및 대상"))}
            {field("제품 특장점", marker("핵심 기능 및 장점"))}
            {field("관련 자료", marker("카탈로그 · 사양서 파일"))}
          </dl>
          {link("support-contact.html", "제품 문의 안내", "btn-outline mt-7")}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="content-title">제품 사양</h2>
        <dl className="info-list">
          {field("사양 항목 1", marker("항목명 · 수치 · 단위"))}
          {field("사양 항목 2", marker("항목명 · 수치 · 단위"))}
          {field("사양 항목 3", marker("항목명 · 수치 · 단위"))}
        </dl>
      </div>
    </>
  );
}

function documentList(kind: "technical" | "downloads"): ReactNode {
  return (
    <>
      <div className="mb-8 flex items-end justify-between gap-5">
        <div>
          <p className="eyebrow">
            {kind === "technical" ? "TECHNICAL LIBRARY" : "FLC DOWNLOAD CENTER"}
          </p>
          <h2 className="content-title mt-3">
            {kind === "technical" ? "기술 관련 자료" : "회사 · 제품 자료"}
          </h2>
        </div>
        <span className="text-xs text-slate-500">자료 안내</span>
      </div>
      <div className="document-list">
        {(kind === "technical"
          ? ["기술 소개서", "공정 기술자료"]
          : ["회사소개서", "제품 카탈로그", "인증 및 기타 자료"]
        ).map((title, index) => (
          <Fragment key={title}>
            <article className="document-row">
              <span className="document-index">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{marker("자료 제목 · 파일 · 등록일")}</p>
              </div>
              <span className="document-status">파일 등록 예정</span>
            </article>
          </Fragment>
        ))}
      </div>
      {kind === "technical" ? (
        <>
          <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/50 p-7">
            <p className="eyebrow">PUBLIC REFERENCE</p>
            <h3 className="mt-3 text-base font-semibold">
              반도체 제조공정용 흡착패드 및 이의 탈부착방법
            </h3>
            <p className="mt-3 text-sm text-slate-500">
              공개 특허 공보 · 등록번호 10-2849314
            </p>
            {external(sources.patent, "특허 원문 보기", "text-link mt-5")}
          </div>
        </>
      ) : (
        ""
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
}): ReactNode {
  if (/^product-[123]$/.test(page.id)) return product(page);
  switch (page.id) {
    case "company-overview":
      return (
        <>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="eyebrow">FOUR LEAF CLOVER</p>
              <h2 className="section-title mt-5">
                반도체의 다음 단계,
                <br />그 중심에 에프엘씨.
              </h2>
              <p className="mt-6 text-sm leading-8 text-slate-600">
                에프엘씨는 반도체 후공정의 다이 본딩 장비와 부품, 부자재를
                개발하는 기술 기업입니다. 현장 경험을 기반으로 고객별 제조
                환경에 대응하는 솔루션과 국산화를 추구합니다.
              </p>
              <div className="mt-7">
                {marker("경영이념 · 비전 · 대표 인사말")}
              </div>
            </div>
            <dl className="info-list">
              {field("회사명", company.name)}
              {field("대표이사", company.representative)}
              {field("설립일", company.established)}
              {field("주요 사업", "반도체 장비 · 부품 · 부자재 개발 및 공급")}
              {field("주소", company.address)}
              {field("대표전화", telephone())}
            </dl>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {["장비 개발", "부품 · 부자재", "고객 맞춤형 솔루션"].map(
              (title, i) => (
                <Fragment key={title}>
                  <article className="info-card">
                    <span className="eyebrow">0{i + 1}</span>
                    <h2 className="mt-4">{title}</h2>
                    <p>
                      {
                        [
                          "다이 본딩 공정에 대응하는 장비 기술",
                          "고객의 제품과 공정에 필요한 부품",
                          "다양한 제조 환경을 위한 통합 대응",
                        ][i]
                      }
                    </p>
                  </article>
                </Fragment>
              ),
            )}
          </div>
        </>
      );
    case "company-history":
      return history();
    case "company-organization":
      return (
        <>
          <div className="text-center">
            <p className="eyebrow">OUR ORGANIZATION</p>
            <h2 className="content-title mt-4">에프엘씨 조직도</h2>
            <p className="mt-3 text-sm text-slate-500">
              {marker("실제 부서 구성과 보고 체계")}
            </p>
          </div>
          <div className="org-chart">
            <div className="org-leader">
              <span>대표이사</span>
              <strong>우중범</strong>
            </div>
            <div className="org-connector" aria-hidden="true"></div>
            <div className="org-departments">
              {[1, 2, 3].map((n) => (
                <Fragment key={n}>
                  <article>
                    <span className="eyebrow">DEPARTMENT 0{n}</span>
                    <h3>{marker("부서명")}</h3>
                    <p>{marker("주요 업무 · 담당 역할")}</p>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="editor-note">
            {marker(
              "조직도는 구성용 레이아웃이며, 실제 부서 수와 연결 관계에 맞춰 수정",
            )}
          </div>
        </>
      );
    case "company-location":
      return location();
    case "product-solutions":
      return (
        <>
          <div className="max-w-3xl">
            <p className="eyebrow">CUSTOMIZED FOR YOUR PROCESS</p>
            <h2 className="section-title mt-5">
              공정을 이해하고,
              <br />
              필요한 해답을 만듭니다.
            </h2>
            <p className="mt-6 text-sm leading-8 text-slate-600">
              다이 본딩 공정에 필요한 장비와 부품, 부자재를 고객의 제품 및 공정
              요구에 맞춰 개발·공급합니다. 제조 현장의 경험과 장비 기술을 연결해
              다양한 반도체 제품에 대응하는 솔루션을 지향합니다.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["장비 솔루션", "공정 부품 솔루션", "맞춤형 기술 대응"].map(
              (title, i) => (
                <Fragment key={title}>
                  <article className="info-card">
                    <span className="eyebrow">SOLUTION 0{i + 1}</span>
                    <h2 className="mt-4">{title}</h2>
                    <p>{marker("솔루션 상세 설명 · 적용 사례")}</p>
                  </article>
                </Fragment>
              ),
            )}
          </div>
          <div className="editor-note mt-8">
            {marker("제공 범위 · 도입 절차 · 검증된 성과")}
          </div>
        </>
      );
    case "technology-core":
      return (
        <>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">DIE BONDING</p>
              <h2 className="section-title mt-5">
                작은 칩 하나에도,
                <br />
                깊이 있는 기술.
              </h2>
              <p className="mt-6 text-sm leading-8 text-slate-600">
                다이 본딩은 반도체 칩을 기판이나 다른 칩 위에 부착하는 패키징
                공정입니다. 에프엘씨는 이 공정에 필요한 장비와 부품 기술에
                집중합니다.
              </p>
              <div className="mt-7">
                {marker("핵심기술의 차별성 · 적용 공정 · 정량 성능")}
              </div>
            </div>
            <figure className="rounded-2xl bg-navy p-5">
              <img
                src={`${assetBase}wafer.svg`}
                width="740"
                height="660"
                alt="다이 본딩 공정의 적층 칩 개념도"
                className="blue-wafer"
              />
              <figcaption className="pb-4 text-center text-xs text-blue-100/70">
                공정 이해를 위한 개념도 · 실제 제품 사양과 무관
              </figcaption>
            </figure>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["공정에 대한 이해", "고객에 맞춘 개발", "지속적인 기술 연구"].map(
              (title, i) => (
                <Fragment key={title}>
                  <article className="info-card">
                    <span className="eyebrow">0{i + 1}</span>
                    <h2 className="mt-4">{title}</h2>
                    <p>{marker("세부 기술 설명")}</p>
                  </article>
                </Fragment>
              ),
            )}
          </div>
        </>
      );
    case "technology-research":
      return (
        <>
          <div className="max-w-3xl">
            <p className="eyebrow">RESEARCH & DEVELOPMENT</p>
            <h2 className="section-title mt-5">
              현장의 과제를,
              <br />
              기술의 진전으로.
            </h2>
            <p className="mt-6 text-sm leading-8 text-slate-600">
              반도체 후공정 장비와 공정 부품의 연구개발을 통해 고객의 제조
              환경에 필요한 기술을 준비합니다.
            </p>
          </div>
          <article className="research-card mt-10">
            <span className="eyebrow">PATENT / 10-2849314</span>
            <h2 className="mt-5 text-xl font-semibold leading-relaxed">
              반도체 제조공정용 흡착패드 및 이의 탈부착방법
            </h2>
            <dl className="info-list mt-6">
              {field("출원일", "2024년 1월 10일")}
              {field("등록일", "2025년 8월 25일")}
              {field("출원인", company.name)}
            </dl>
            {external(sources.patent, "공개 특허 원문 확인", "text-link mt-5")}
          </article>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="info-card">
              <h2>주요 연구 과제</h2>
              <p>{marker("과제명 · 연구 기간 · 연구 내용")}</p>
            </article>
            <article className="info-card">
              <h2>연구개발 성과</h2>
              <p>{marker("보유 특허 · 인증 · 연구 실적")}</p>
            </article>
          </div>
        </>
      );
    case "technology-resources":
      return documentList("technical");
    case "support-downloads":
      return documentList("downloads");
    case "support-notices":
      return (
        <>
          <div className="mb-8">
            <p className="eyebrow">FLC NEWSROOM</p>
            <h2 className="content-title mt-3">공지사항</h2>
          </div>
          <div className="notice-table">
            <div className="notice-head">
              <span>구분</span>
              <span>제목</span>
              <span>등록일</span>
            </div>
            <article className="notice-row">
              <span className="notice-badge">공지</span>
              <div>
                <h3>{marker("공지 제목")}</h3>
                <p className="mt-3 text-xs text-slate-500">
                  {marker("공지 본문 · 첨부파일")}
                </p>
              </div>
              <span className="text-xs">{marker("날짜")}</span>
            </article>
          </div>
          <div className="editor-note mt-7">
            {marker("게시할 공지사항 내용을 등록")}
          </div>
        </>
      );
    case "support-contact":
      return (
        <>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">LET’S CONNECT</p>
              <h2 className="section-title mt-5">
                더 나은 공정을 향한
                <br />
                대화의 시작.
              </h2>
              <p className="mt-6 text-sm leading-8 text-slate-600">
                제품 및 기술 관련 문의를 위한 연락처와 회사 정보를 안내합니다.
              </p>
              <dl className="info-list mt-8">
                {field("이메일", email())}
                {field("대표전화", telephone())}
                {field("상담 가능 시간", marker("요일 · 운영 시간"))}
              </dl>
            </div>
            <div className="contact-info-card">
              <span className="contact-pin">{pin}</span>
              <h2 className="mt-5 text-xl font-semibold">주식회사 에프엘씨</h2>
              <p className="mt-5 text-sm leading-8" data-company-address="">
                {company.address}
              </p>
              <p className="mt-3 text-sm text-slate-500">대표이사 우중범</p>
              {link(
                "company-location.html",
                "오시는길 확인",
                "btn-outline mt-8",
              )}
              <div className="mt-8">
                {marker("문의 담당 부서 · 문의 시 필요한 정보")}
              </div>
            </div>
          </div>
        </>
      );
    case "careers-jobs":
      return (
        <>
          <div className="recruit-banner">
            <p className="eyebrow text-sky-200">BUILD THE NEXT, TOGETHER</p>
            <h2 className="mt-5 text-3xl font-semibold leading-relaxed text-white">
              함께 만들어갈
              <br />
              반도체 기술의 내일.
            </h2>
          </div>
          <h2 className="content-title mt-10">채용 공고</h2>
          <article className="job-card">
            <div>
              <span className="eyebrow">RECRUITMENT</span>
              <h3 className="mt-4 text-lg font-semibold">
                {marker("채용 직무 · 공고 제목")}
              </h3>
              <p className="mt-4 text-sm">
                {marker("경력 구분 · 고용 형태 · 접수 기간")}
              </p>
            </div>
            <span className="text-sm text-slate-500">
              {marker("모집 상태")}
            </span>
          </article>
          <dl className="info-list mt-7">
            {field("담당 업무", marker("업무 내용"))}
            {field("지원 자격", marker("필수 요건 · 우대사항"))}
            {field("지원 방법", marker("지원 이메일 또는 채용 페이지 주소"))}
            {field("채용 절차", marker("전형 단계 및 안내"))}
          </dl>
        </>
      );
    case "careers-values":
      return (
        <>
          <div className="text-center">
            <p className="eyebrow">PEOPLE AT FLC</p>
            <h2 className="section-title mt-5">에프엘씨의 인재상</h2>
            <p className="mt-5">{marker("인재상 소개 문구")}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <Fragment key={n}>
                <article className="value-card">
                  <span className="value-number">0{n}</span>
                  <h3 className="mt-7">{marker("인재상 키워드")}</h3>
                  <p className="mt-5 text-sm leading-7">
                    {marker("핵심 가치 · 행동 기준")}
                  </p>
                </article>
              </Fragment>
            ))}
          </div>
          <div className="mt-10 info-card">
            <h2>함께 일하는 문화</h2>
            <p>{marker("조직 문화 · 성장 지원 · 복리후생")}</p>
          </div>
        </>
      );
    default:
      throw new Error(`Missing page template: ${page.id}`);
  }
}

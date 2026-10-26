import { products } from "./products";
import { documentPath } from "./i18n";
import type { Locale } from "./i18n";
export interface SitePage {
  id: string;
  file: string;
  label: string;
  english: string;
  description: string;
  groupId?: string;
}
export interface NavigationGroup {
  id: string;
  label: string;
  english: string;
  pages: SitePage[];
}
function page(
  id: string,
  label: string,
  english: string,
  description: string,
  groupId?: string,
): SitePage {
  return { id, file: `${id}.html`, label, english, description, groupId };
}
export const home: SitePage = {
  id: "home",
  file: "index.html",
  label: "홈",
  english: "SEMICONDUCTOR EQUIPMENT & PARTS",
  description:
    "반도체 후공정 장비와 핵심 부품, FLC. Die Bonder, Ejector, Collet과 세라믹 부품의 제품 정보 및 기술 상담을 안내합니다.",
};
export const navigation: NavigationGroup[] = [
  {
    id: "company",
    label: "회사소개",
    english: "ABOUT FLC",
    pages: [
      page(
        "company-overview",
        "회사개요",
        "COMPANY OVERVIEW",
        "고객의 공정 요구에 맞춰 장비와 부품을 개발합니다.",
      ),
      page(
        "company-history",
        "회사연혁",
        "OUR HISTORY",
        "장비 개발과 공정 부품 국산화의 발자취입니다.",
      ),
      page(
        "company-organization",
        "개발·제조 역량",
        "OUR CAPABILITIES",
        "설계부터 제조, 품질과 현장 기술 대응까지 함께합니다.",
      ),
      page(
        "company-location",
        "오시는길",
        "LOCATION",
        "에프엘씨를 찾아오시는 길을 안내합니다.",
      ),
    ],
  },
  {
    id: "products",
    label: "제품소개",
    english: "PRODUCTS",
    pages: [
      page(
        "product-solutions",
        "전체 제품",
        "PRODUCT EXPLORER",
        "공정과 장비 조건에 맞는 제품을 확인하세요.",
      ),
      page(
        "product-1",
        "반도체 장비",
        "SEMICONDUCTOR EQUIPMENT",
        "정밀한 칩 적층과 패키지 분리를 위한 장비를 개발합니다.",
      ),
      page(
        "product-2",
        "공정 부품·툴",
        "PROCESS PARTS & TOOLS",
        "생산 현장의 요구에 맞춘 Ejector, Collet, Conversion Kit를 제공합니다.",
      ),
      page(
        "product-3",
        "세라믹·소재 부품",
        "CERAMIC & MATERIALS",
        "첨단 패키징의 열 제어, 칩 핸들링과 EMI 차폐를 위한 부품입니다.",
      ),
    ],
  },
  {
    id: "technology",
    label: "기술·개발",
    english: "TECHNOLOGY & DEVELOPMENT",
    pages: [
      page(
        "technology-core",
        "핵심기술",
        "CORE TECHNOLOGY",
        "장비와 부품을 함께 검토해 공정에 맞는 해법을 제안합니다.",
      ),
      page(
        "technology-research",
        "맞춤형 개발·로드맵",
        "RESEARCH & DEVELOPMENT",
        "고객의 장비 환경에 맞는 구조와 사양을 개발합니다.",
      ),
    ],
  },
  {
    id: "resources",
    label: "자료실",
    english: "RESOURCES",
    pages: [
      page(
        "support-downloads",
        "제품·회사 자료",
        "DOWNLOADS",
        "FLC의 회사 및 제품 자료를 확인하세요.",
      ),
      page(
        "technology-resources",
        "기술자료",
        "TECHNICAL RESOURCES",
        "제품 선정과 공정 검토에 필요한 정보를 안내합니다.",
      ),
    ],
  },
  {
    id: "contact",
    label: "문의하기",
    english: "CONTACT FLC",
    pages: [
      page(
        "support-contact",
        "문의하기",
        "CONTACT US",
        "제품 도입부터 맞춤형 부품 개발까지 상담해 드립니다.",
      ),
    ],
  },
];
// Preserve previously available URLs without promoting unprepared news/careers content.
const legacyPages = [
  page(
    "support-notices",
    "공지사항",
    "NOTICE",
    "제품 및 기술 관련 안내입니다.",
    "resources",
  ),
  page(
    "careers-jobs",
    "채용정보",
    "CAREERS",
    "채용 관련 사항은 대표 연락처로 문의해 주세요.",
    "company",
  ),
  page(
    "careers-values",
    "인재상",
    "OUR PEOPLE",
    "기술을 이해하고 함께 성장하는 사람들.",
    "company",
  ),
];
export const pages: SitePage[] = [
  home,
  ...navigation.flatMap((group) =>
    group.pages.map((p) => ({ ...p, groupId: group.id })),
  ),
  ...products.map((p) =>
    page(`product-${p.id}`, p.name, p.model, p.summary, "products"),
  ),
  ...legacyPages,
];
export function pageGroup(page: SitePage) {
  return navigation.find(
    (group) =>
      group.id === page.groupId || group.pages.some((p) => p.id === page.id),
  );
}

export const routes = (["ko", "en"] as Locale[]).flatMap((locale) =>
  pages.map((page) => ({
    page,
    locale,
    file: documentPath(page.file, locale),
  })),
);

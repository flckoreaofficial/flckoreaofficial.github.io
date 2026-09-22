export interface SitePage {
  id: string;
  file: string;
  label: string;
  english: string;
  description: string;
}

export interface NavigationGroup {
  id: string;
  label: string;
  english: string;
  pages: SitePage[];
}

function page(id: string, label: string, english: string, description: string): SitePage {
  return { id, file: `${id}.html`, label, english, description };
}

export const home: SitePage = {
  id: 'home', file: 'index.html', label: '홈', english: 'PRECISION CONNECTS POSSIBILITY',
  description: '반도체 후공정의 다이 본딩 장비, 부품, 부자재를 개발하는 주식회사 에프엘씨입니다.',
};

export const navigation: NavigationGroup[] = [
  { id: 'company', label: '회사소개', english: 'ABOUT FLC', pages: [
    page('company-overview', '회사개요', 'COMPANY OVERVIEW', '현장의 경험을 기술의 가능성으로 연결합니다.'),
    page('company-history', '회사연혁', 'OUR HISTORY', '에프엘씨가 걸어온 기술과 도전의 발자취입니다.'),
    page('company-organization', '조직도', 'ORGANIZATION', '에프엘씨의 조직을 소개합니다.'),
    page('company-location', '오시는길', 'LOCATION', '에프엘씨를 찾아오시는 길을 안내합니다.'),
  ] },
  { id: 'products', label: '제품/솔루션', english: 'PRODUCTS & SOLUTIONS', pages: [
    page('product-1', '제품1', 'PRODUCT 01', '에프엘씨의 제품을 소개합니다.'),
    page('product-2', '제품2', 'PRODUCT 02', '에프엘씨의 제품을 소개합니다.'),
    page('product-3', '제품3', 'PRODUCT 03', '에프엘씨의 제품을 소개합니다.'),
    page('product-solutions', '기술/솔루션', 'TECHNOLOGY & SOLUTIONS', '고객의 공정을 이해하고, 필요한 솔루션을 개발합니다.'),
  ] },
  { id: 'technology', label: '기술', english: 'TECHNOLOGY', pages: [
    page('technology-core', '핵심기술', 'CORE TECHNOLOGY', '반도체 패키징의 핵심, 다이 본딩 기술에 집중합니다.'),
    page('technology-research', '연구개발', 'RESEARCH & DEVELOPMENT', '지속적인 연구를 통해 공정 기술의 가능성을 넓힙니다.'),
    page('technology-resources', '기술자료', 'TECHNICAL RESOURCES', '에프엘씨의 기술을 이해할 수 있는 자료를 안내합니다.'),
  ] },
  { id: 'support', label: '고객지원', english: 'CUSTOMER SUPPORT', pages: [
    page('support-notices', '공지사항', 'NOTICE', '에프엘씨의 소식과 안내를 전해드립니다.'),
    page('support-downloads', '자료실', 'DOWNLOADS', '회사 및 제품 관련 자료를 확인하세요.'),
    page('support-contact', '문의하기', 'CONTACT US', '에프엘씨의 기업정보와 문의 안내입니다.'),
  ] },
  { id: 'careers', label: '채용', english: 'CAREERS', pages: [
    page('careers-jobs', '채용정보', 'OPEN POSITIONS', '에프엘씨의 채용 공고를 안내합니다.'),
    page('careers-values', '인재상', 'OUR PEOPLE', '에프엘씨의 인재상과 일하는 방식을 소개합니다.'),
  ] },
];

export const pages = [home, ...navigation.flatMap((group) => group.pages)];

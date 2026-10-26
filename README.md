# FLC 회사 홈페이지

React 19 + TypeScript + Vite + Tailwind CSS 4로 구현한 정적 B2B 기업 홈페이지입니다. 기존 17개 페이지의 주소와 공통 디자인을 활용하고 제품 상세 11개를 추가해 한국어 28개와 영어 28개, 총 56개 HTML 페이지를 생성합니다. GitHub Pages의 하위 경로와 JavaScript 비활성 환경에서 회사·제품 본문을 열람할 수 있습니다.

## 실행

Node.js 22.12 이상에서 실행합니다. Windows PowerShell의 실행 정책에 따라 `npm` 대신 `npm.cmd`를 사용할 수 있습니다.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

개발 서버 기본 주소는 http://127.0.0.1:5173 입니다. HTML을 더블클릭하지 말고 로컬 서버로 확인하세요. `dev`·`build` 전에 React 본문과 사이트맵을 자동 생성합니다.

## 화면 구성

- 회사소개: 회사개요, 연혁, 개발·제조 역량, 오시는길. 회사개요에서도 각 내용을 요약·연결합니다.
- 제품소개: 전체 제품과 반도체 장비 / 공정 부품·툴 / 세라믹·소재 부품. 제품명·모델 검색과 공정 필터를 제공합니다.
- 제품 상세: 11개 제품의 원본 이미지, 특징, 공정, 사양, 개발·공급 상태, 맞춤 제작, 자료, 문의 링크.
- 기술·개발: 핵심기술, 맞춤형 개발 절차, 적용 검토 사례, 개발 목표 로드맵.
- 자료실: 회사·제품 안내 PDF와 기술 문의 체크리스트, 상세 자료 요청.
- 문의하기: 관심 제품 자동 선택과 이메일 초안 작성.

`product-1.html` / `product-2.html` / `product-3.html`은 제품 분류로, `product-solutions.html`은 전체 제품 목록으로 사용합니다. 제품 상세는 `product-zsd-1.html` 등의 독립 주소입니다. 공지·채용의 기존 URL은 안내 화면으로 유지하고 상단 메뉴에서는 제외했습니다.

## 문의 방식

현재는 별도 서버·메일 전송 API가 없는 정적 사이트입니다. 문의 양식은 브라우저에서 이메일 초안을 생성하며 **서버에 저장하거나 자동 발송하지 않습니다**. 사용자가 이메일 앱에서 확인 후 직접 전송합니다. 도면·사양서·사진도 이메일 앱에서 첨부합니다. 이메일 앱을 사용할 수 없으면 생성된 본문을 복사할 수 있습니다. 입력 변경 시 오래된 초안을 지웁니다.

관심 제품은 `support-contact.html?product=thin-die-ejector`와 같이 제품 ID로 전달합니다. 잘못된 ID는 미정으로 처리합니다. JavaScript가 없을 때도 전화·이메일 연락처는 표시됩니다.

## 원본 수정

루트 HTML은 생성 결과이므로 직접 편집하지 마세요.

| 파일 | 역할 |
| --- | --- |
| `src/company.ts` | 회사명, 연락처, 확정 주소, 도메인 |
| `src/products.ts` | 11개 제품의 내용·사양·상태·출처 페이지 |
| `src/navigation.ts` | 메뉴, 기존·신규 페이지 목록 |
| `src/pages/HomePage.tsx` | 메인 화면 |
| `src/pages/PageContent.tsx` | 회사·기술·자료실 등 본문 |
| `src/pages/Products.tsx` | 검색·필터·제품 카드·상세 |
| `src/pages/ContactPage.tsx` | 이메일 문의 초안 |
| `src/style.css` | 기존 테마와 반응형 스타일 |
| `public/products/` | PDF에서 추출한 이미지 11개 |
| `public/downloads/` | 실제 배포하는 안내서·체크리스트 |

자료 기준과 제외한 수치는 [CONTENT_SOURCES.md](./CONTENT_SOURCES.md)에 기록했습니다. 원본 PDF는 배포 파일에 포함하지 않습니다.

## 제품 이미지와 안내서 갱신

제품 내용 수정 후 PDF도 재생성하고 사이트를 빌드하세요. 안내서 생성은 설치된 Edge를 기본으로 사용합니다. 다른 Playwright 브라우저는 `PLAYWRIGHT_CHANNEL` 환경변수로 지정할 수 있습니다.

```sh
npx tsx scripts/generate-guide.ts
npm run build
```

PDF 이미지 재추출은 PyMuPDF가 있는 Python 환경에서 실행합니다. 별도의 원본 파일 경로가 필요하며, 일반 사이트 빌드에는 Python이 필요하지 않습니다.

```sh
python scripts/extract-products.py "원본 PDF 경로"
```

추출 스크립트는 PDF의 제품 이미지와 투명도를 보존합니다. Saw Kit는 구성품 번호를 포함한 원본 도면 영역을 사용합니다. 공식 로고는 기존 `FLC.png`를 그대로 유지합니다.

## 검증

```sh
npm run check
npm run test:e2e
npm run test:dev
```

Windows Edge:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm.cmd run test:e2e -- --workers=2
npm.cmd run test:dev
```

테스트는 한국어·영어 56개 페이지 직접 접속, React 연결, PC·모바일 메뉴, 320px 화면, 제품 필터·검색, 문의 제품 선택과 이메일 초안, 실제 다운로드, 주소 복사, JavaScript 비활성 열람을 검증합니다. 스크린샷은 `test-results/`에 저장합니다.

## 기존 GitHub Pages 배포

- 저장소: https://github.com/flckoreaofficial/flckoreaofficial.github.io
- 기존 배포 주소: https://flckoreaofficial.github.io/
- `.github/workflows/deploy.yml`의 GitHub Actions 배포 구성을 유지합니다.
- Pages 설정은 Source를 GitHub Actions로 지정합니다. `main`에 소스를 push하면 기존 워크플로가 빌드·배포합니다.
- `node_modules`, `dist`, `test-results`, `.work`, `.tmp-tools`는 저장소에서 제외합니다.

이번 작업은 로컬 소스와 빌드 결과를 수정하며 원격 push나 운영 배포는 수행하지 않습니다. 상대경로 링크와 자원을 유지하므로 저장소 하위 경로 배포도 지원합니다. 도메인을 변경하면 `src/company.ts`와 `public/robots.txt`를 함께 수정하세요.

## 한국어 / 영어

헤더의 KOR / ENG 링크로 같은 페이지의 언어를 바꿉니다. 한국어는 기존 루트 URL, 영어는 `en/`의 동일 파일명을 사용합니다. 예: `/product-zsd-1.html` ↔ `/en/product-zsd-1.html`. 문의 제품의 쿼리 문자열과 페이지 내 위치도 JavaScript 연결 후 유지합니다. 모바일 메뉴가 닫혀 있어도 언어 선택은 항상 보입니다.

언어는 URL로 결정합니다. 브라우저 언어나 저장 설정에 따라 강제로 이동하지 않습니다. 각 언어의 HTML을 미리 생성하므로 JavaScript 없이도 본문을 읽고 언어를 바꿀 수 있습니다. 제목, 설명, `lang`, Open Graph locale, canonical, hreflang과 사이트맵도 언어별로 생성합니다.

- `src/locales/en.ts`: 한국어 원문과 영어 번역 매핑
- `src/i18n.ts`: 텍스트·구조화 데이터 번역과 언어 경로 함수
- `src/LocaleContext.tsx`: 공유 컴포넌트의 현재 언어와 제품·회사 데이터
- `src/components/LanguageSwitch.tsx`: 페이지·쿼리·해시를 유지하는 언어 링크
- `src/companyContent.ts`: 양 언어에서 공유하는 회사·기술 콘텐츠
- `en/*.html`: 생성된 영어 페이지. 직접 수정하지 마세요.

한국어 원문을 수정하면 대응하는 영어 번역도 갱신하세요. 새 제품과 페이지는 언어별로 함께 생성됩니다. 영어 전화는 `+82-41-537-8115`, 주소와 대표자명은 영문으로 표시합니다. 영어 문의 양식은 영어 제목·본문의 이메일 초안을 만듭니다.

`npx tsx scripts/generate-guide.ts`는 한국어·영어 안내서를 함께 생성합니다. 영문 자료는 `flc-product-guide-en.pdf` 및 `flc-selection-guide-en.txt`입니다. 일반 CI 빌드는 저장된 파일을 복사하므로 PDF 생성용 브라우저는 배포 서버에 필요하지 않습니다.

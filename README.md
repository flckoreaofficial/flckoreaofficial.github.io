# FLC 회사 홈페이지

**React 19 + TypeScript + Vite + Tailwind CSS 4**로 만든 읽기 전용 회사 홈페이지입니다. React 컴포넌트에서 **17개의 정적 HTML 페이지**를 미리 생성하고, 브라우저에서는 `hydrateRoot`로 React 이벤트를 연결합니다. 배포 후 실행할 서버·데이터베이스·API 키가 필요 없으며, GitHub Pages에서 각 페이지의 직접 접속·새로고침과 JavaScript 비활성 상태를 지원합니다.

- 저장소: https://github.com/flckoreaofficial/flckoreaofficial.github.io
- 배포 주소: https://flckoreaofficial.github.io/
- 공식 로고: 루트의 `FLC.png` 원본 사용
- 주소: **충남 천안시 서북구 직산읍 금곡로 74-10, (주)에프엘씨**
- 미제공 정보는 사용자 요청에 따라 화면에 **`@@수정필요@@`**로 표시
- 출처 및 확정 여부: [CONTENT_SOURCES.md](./CONTENT_SOURCES.md)

## 실행 및 빌드

Node.js **22.12 이상**을 사용합니다. 로컬 HTML 파일을 더블클릭하지 말고 아래 서버로 확인하세요.

```sh
npm ci
npm run dev
```

기본 주소는 `http://127.0.0.1:5173`입니다. `predev` 단계에서 페이지를 자동 생성합니다.

```sh
npm run generate   # React 컴포넌트 → 17개 HTML + sitemap.xml + 로고 복사
npm run check      # 앱·생성 스크립트·Vite 설정·테스트 TypeScript 검사
npm run build      # React 페이지 사전 생성 + 타입 검사 + Tailwind/Vite 빌드
npm run preview    # dist/의 실제 배포 결과 확인
```

개발 서버는 React Fast Refresh를 지원하며 컴포넌트와 CSS 수정을 즉시 반영합니다. 브라우저에서 새로고침할 때도 최신 React 컴포넌트로 HTML을 생성하므로 변경 전 HTML과 충돌하지 않습니다. 페이지 추가·파일명 변경·로고 원본 교체 후에는 `npm run generate`를 실행하고 개발 서버를 재시작하세요.

React Router의 SPA 경로 대신 기존 `.html` 주소를 유지합니다. 페이지 이동은 일반 링크로 처리하고, 메뉴·주소 복사는 React의 `useState`, `useRef`, 이벤트 핸들러로 관리합니다. GitHub Pages에 별도 경로 재작성이나 404 우회 설정이 필요하지 않습니다.

## 메뉴 구조

| 상위 메뉴 | 하위 메뉴 | 페이지 파일 |
| --- | --- | --- |
| 홈 | — | `index.html` |
| 회사소개 | 회사개요 / 회사연혁 / 조직도 / 오시는길 | `company-overview.html` / `company-history.html` / `company-organization.html` / `company-location.html` |
| 제품/솔루션 | 제품1 / 제품2 / 제품3 / 기술/솔루션 | `product-1.html` / `product-2.html` / `product-3.html` / `product-solutions.html` |
| 기술 | 핵심기술 / 연구개발 / 기술자료 | `technology-core.html` / `technology-research.html` / `technology-resources.html` |
| 고객지원 | 공지사항 / 자료실 / 문의하기 | `support-notices.html` / `support-downloads.html` / `support-contact.html` |
| 채용 | 채용정보 / 인재상 | `careers-jobs.html` / `careers-values.html` |

PC에서는 상위 메뉴를 클릭하거나 Enter/Space로 하위 메뉴를 엽니다. 모바일에서는 메뉴 버튼과 상위 메뉴를 순서대로 누릅니다. Escape는 열린 하위 메뉴부터 닫으며, 바깥 영역 클릭과 화면 크기 변경도 처리합니다.

## 내용을 채우는 방법

**루트의 HTML 파일은 생성 결과입니다. 직접 수정하면 다음 생성 시 덮어써집니다.** 아래 원본 파일을 수정한 다음 `npm run generate` 또는 `npm run build`를 실행하세요.

| 원본 파일 | 수정 항목 |
| --- | --- |
| `src/company.ts` | 회사명, 대표, 설립일, 주소, 이메일, 대표전화, 배포 도메인 |
| `src/navigation.ts` | 상위·하위 메뉴명, 페이지명, 영문 제목, 소개 문구 |
| `src/App.tsx` | 공통 레이아웃, 홈/하위 페이지 선택, 하위 메뉴 |
| `src/pages/HomePage.tsx` | 홈 화면 및 제품 소개 카드 |
| `src/pages/PageContent.tsx` | 회사·제품·기술·고객지원·채용 페이지 본문 |
| `src/components/Header.tsx` | 공통 헤더, React 상태로 관리하는 모바일 메뉴와 드롭다운 |
| `src/components/Footer.tsx` | 공통 푸터, 연도, 출처 |
| `src/components/AddressCopy.tsx` | 주소 복사 및 권한 차단 시 수동 복사 안내 |
| `src/components/content.tsx`, `icons.tsx` | 공통 JSX 요소, 수정 표시, 링크, 아이콘 |
| `src/style.css` | Tailwind 테마, 블루 색상, 반응형 레이아웃, 컴포넌트 스타일 |
| `src/main.tsx` | 현재 페이지 정보를 읽어 React를 사전 생성된 HTML에 연결 |
| `FLC.png` | 공식 회사 로고. 생성 시 `public/flc-logo.png`로 원본 그대로 복사 |
| `public/wafer.svg` | 반도체 패키징 개념 일러스트 |
| `scripts/render.tsx` | React 서버 렌더링으로 HTML 문서 및 메타정보 생성 (빌드·개발 전용) |
| `scripts/generate.tsx` | 17개 HTML·sitemap 생성, 로고 복사 |
| `vite.config.ts` | React·Tailwind 플러그인, 개발 중 HTML 생성, 다중 페이지 빌드 |

페이지 컴포넌트의 `marker('입력 항목')`은 화면에 `@@수정필요@@`와 항목 설명을 표시합니다. 확정 정보가 생기면 해당 호출을 실제 텍스트나 JSX 컴포넌트로 교체합니다. 공식 제품명을 넣을 때는 `src/navigation.ts`의 메뉴명도 같이 변경하세요. 생성된 HTML의 `#root` 내용은 React와 일치해야 하므로 HTML 결과물을 수동 편집하거나 포맷하지 마세요.

`src/company.ts`에 이메일·전화번호를 입력하면 문의 페이지와 관련 정보에 실제 `mailto:`·`tel:` 링크가 생성됩니다. 문의 폼이나 서버 전송 기능은 없으며, 연락처를 통한 문의 안내 구조입니다. 자료 파일은 `public/downloads/` 등에 추가하고 실제 파일이 생긴 뒤 다운로드 링크를 연결하세요.

## @@수정필요@@ 항목

| 영역 | 추가할 정보 |
| --- | --- |
| 회사개요 | 경영이념, 비전, 대표 인사말, 대표전화 |
| 회사연혁 | 추가 연도와 성과 |
| 조직도 | 실제 부서 수, 부서명, 보고 체계, 담당 업무 |
| 오시는길 | 대중교통, 차량 진입·주차·방문 절차 |
| 제품1~3 | 제품명, 모델명, 사진, 개요, 적용 분야, 특장점, 사양, 자료 |
| 기술/솔루션 | 상세 솔루션, 적용 사례, 제공 범위, 도입 절차 |
| 핵심기술·연구개발 | 차별성, 성능, 과제, 실적, 특허·인증 추가 정보 |
| 기술자료·자료실 | 문서명, 실제 파일, 등록일 |
| 공지사항 | 제목, 본문, 날짜, 첨부파일 |
| 문의하기 | 이메일, 대표전화, 상담시간, 담당 부서 |
| 채용정보 | 모집 직무, 업무, 요건, 기간, 전형, 지원 방법 |
| 인재상 | 키워드, 가치와 행동 기준, 조직문화, 복리후생 |

조직도와 채용 등은 구성용 레이아웃입니다. 임의의 부서·채용 상태·제품 사양을 실제 정보로 기재하지 않았습니다. 다운로드 파일이 없는 항목에는 동작하지 않는 다운로드 버튼을 만들지 않았습니다.

## GitHub Pages 배포

1. 소스, `FLC.png`, 생성된 HTML, `package-lock.json`, `.github/workflows/deploy.yml`을 `main` 브랜치에 올립니다. `node_modules/`, `dist/`, `test-results/`는 제외됩니다.
2. 저장소 **Settings → Pages → Build and deployment → Source → GitHub Actions**로 설정합니다.
3. `main`에 push하면 자동으로 빌드·배포됩니다. 수동 재실행은 **Actions → Deploy FLC to GitHub Pages → Run workflow**를 사용합니다.
4. Actions가 성공하면 https://flckoreaofficial.github.io/ 를 확인합니다.

GitHub Free의 무료 Pages를 이용하려면 Public 저장소를 사용합니다. 별도 API 키나 개인 액세스 토큰을 코드에 넣지 않습니다.

모든 내부 링크와 빌드 자원은 상대 경로라 저장소 하위 경로에서도 작동합니다. 도메인을 바꾸면 `src/company.ts`의 `siteUrl`과 `public/robots.txt`를 수정하세요. canonical·og:url·sitemap은 페이지 생성 시 반영됩니다.

설정 참고: [Tailwind Vite 설치](https://tailwindcss.com/docs/installation/using-vite), [GitHub Pages 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 검증

```sh
npx playwright install chromium
npm run test:e2e
npm run test:dev
```

Windows에 설치된 Edge로 실행할 때:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:e2e
npm run test:dev
```

실제 빌드를 `/flc-preview/` 하위 경로에서 실행합니다. 17개 페이지의 직접 접속 및 React hydration 오류, PC·모바일 메뉴, 키보드 탐색, 주소 복사와 권한 차단 시 대체 동작, 지도 링크, 320px 화면, 로고·자원 로딩, JavaScript 비활성 상태를 검증합니다. 스크린샷은 `test-results/`에 생성됩니다.

Google Fonts의 Noto Sans KR을 사용하며, 연결이 안 되면 시스템 글꼴로 표시됩니다. Tailwind CSS는 빌드에 포함되므로 CDN 접속이나 런타임 Tailwind 로더가 필요하지 않습니다.

`test:dev`는 개발 서버의 React 연결과 새로고침을 검사합니다. 생성된 HTML에 임시로 이전 내용이 남아 있어도 최신 컴포넌트로 응답하는지 확인하며, 이 과정에서 사용한 생성 파일은 검사 후 복원합니다.

# FLC 회사 소개 홈페이지

우중범 대표의 주식회사 에프엘씨를 소개하는 읽기 전용 홈페이지입니다. **TypeScript + Vite**로 구성했고, 콘텐츠는 HTML에 포함되어 JavaScript가 꺼져 있어도 읽을 수 있습니다. 서버, 데이터베이스, 유료 서비스, API 키가 필요하지 않습니다.

- 저장소: https://github.com/flckoreaofficial/flckoreaofficial.github.io
- 배포 후 주소: https://flckoreaofficial.github.io/
- 반응형 화면, 모바일 메뉴, 키보드 탐색, 모션 감소 설정 지원
- 회사소개 / 사업분야 / 핵심기술 / 기업연혁 / 기업정보
- 확인된 공개 자료의 출처는 [CONTENT_SOURCES.md](./CONTENT_SOURCES.md) 참조

## 로컬 실행

Node.js 22.12 이상을 설치한 뒤 프로젝트 폴더에서 실행합니다.

```sh
npm ci
npm run dev
```

표시된 로컬 주소(기본 `http://127.0.0.1:5173`)를 엽니다.

```sh
npm run build
npm run preview
```

`build`는 TypeScript 검사 후 `dist/`를 생성합니다. HTML 파일을 직접 더블클릭하는 대신 로컬 서버로 확인하세요.

## GitHub Pages 무료 배포

GitHub Free에서는 저장소를 **Public**으로 설정합니다. 이 저장소 이름은 계정명과 일치하므로 `/저장소명/` 없이 루트 주소에 배포됩니다.

1. 소스 파일과 `package-lock.json`, `.github/workflows/deploy.yml`을 해당 저장소의 `main` 브랜치에 올립니다. `node_modules/`와 `dist/`는 올리지 않습니다.
2. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
3. **Actions → Deploy FLC to GitHub Pages → Run workflow**를 실행합니다. 이후에는 `main`에 push할 때마다 자동으로 배포됩니다.
4. 배포 작업이 성공하면 https://flckoreaofficial.github.io/ 를 확인합니다.

워크플로는 저장소에 제공되는 `GITHUB_TOKEN`으로 실행되며 개인 액세스 토큰을 코드에 넣을 필요가 없습니다. 기본 브랜치를 다른 이름으로 사용하면 워크플로의 `branches: [main]`도 변경하세요.

처음 로컬 저장소를 연결하는 경우:

```sh
git init -b main
git remote add origin https://github.com/flckoreaofficial/flckoreaofficial.github.io.git
git add .
git commit -m "Build FLC company website"
git push -u origin main
```

이미 Git 저장소라면 `git init`을 다시 할 필요가 없습니다. `origin`이 있으면 `git remote -v`로 연결 주소를 먼저 확인하세요. GitHub 로그인이나 저장소 권한은 본인 계정으로 설정합니다.

참고: [GitHub Pages 게시 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [Vite 정적 배포](https://vite.dev/guide/static-deploy).

## 수정할 파일

| 파일 | 용도 |
| --- | --- |
| `index.html` | 회사 소개, 연혁, 제목, 검색·공유 메타 정보 |
| `src/company.ts` | 회사에서 확인한 상세 주소, 이메일, 전화번호. 빈 값은 표시하지 않음 |
| `src/style.css` | 색상, 글꼴, 레이아웃, 모바일 화면 |
| `src/main.ts` | 모바일 메뉴, 현재 섹션 표시, 연락처 표시 |
| `public/wafer.svg` | 직접 제작한 반도체 패키징 개념 일러스트 |
| `public/favicon.svg` | 임시 FLC 파비콘 |
| `public/robots.txt`, `public/sitemap.xml` | 검색 엔진 설정 |
| `.github/workflows/deploy.yml` | 자동 빌드 및 배포 |

현재 주소는 사용자 요청에 따라 ‘충청남도 천안시’까지만 표시하며 전화·이메일은 확인 후 추가하도록 비워 두었습니다. 공식 로고가 제공되면 임시 워드마크를 교체하세요. 상세 주소·연락처를 HTML에도 반영하면 JavaScript가 꺼진 경우에도 해당 추가 정보가 표시됩니다.

Noto Sans KR 글꼴은 Google Fonts에서 가져옵니다. 연결이 안 되면 시스템 글꼴로 표시되며, 본문·이미지·메뉴는 외부 서비스 응답 없이 작동합니다. 직접 제작한 SVG와 CSS 개념도에는 외부 사진 라이선스가 필요하지 않습니다.

다른 도메인으로 옮길 경우 `index.html`의 canonical/og:url, `robots.txt`, `sitemap.xml`의 주소를 함께 변경하세요. 단일 페이지 내부 앵커를 사용하므로 SPA 라우팅이나 404 우회 설정은 필요하지 않습니다.

## 브라우저 검증

```sh
npx playwright install chromium
npm run test:e2e
```

Windows에 설치된 Edge를 사용할 수도 있습니다.

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:e2e
```

실제 빌드를 `/flc-preview/` 하위 경로로 제공해 상대 경로 리소스, PC·모바일, 메뉴와 Escape 키, 섹션 링크, 작은 화면의 넘침, JavaScript 비활성 상태를 검증합니다. 화면 캡처는 `test-results/`에 생성됩니다.

# 오늘의 아하!

Next.js App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL 기반의 생활 상식 퀴즈 MVP입니다.

## 실행

```bash
pnpm install
pnpm dev
```

기본 주소는 `http://localhost:3000`입니다.

## 환경변수

`.env.local`에 아래 값을 설정하면 Supabase 데이터가 사용됩니다. 값이 없으면 로컬 샘플 데이터로 화면을 확인할 수 있습니다.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=jdw9302@naver.com
ADSENSE_PUBLISHER_ID=
NEXT_PUBLIC_ADSENSE_SLOT_ID=
```

배포 후 AdSense 심사를 요청할 때는 `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 바꾸고,
`ADSENSE_PUBLISHER_ID`에는 AdSense에서 발급받은 실제 `pub-...` 값을 넣어야 합니다.
실제 publisher ID가 없으면 `/ads.txt`는 404를 반환하므로 가짜 값이 노출되지 않습니다.

## Supabase 설정

1. Supabase SQL Editor에서 `supabase/schema.sql`을 실행합니다.
2. 개발 확인용 데이터가 필요하면 `supabase/seed.sql`을 실행합니다.
3. 공개 퀴즈는 `is_published = true`이고 `published_at` 값이 있는 항목만 sitemap에 포함됩니다.

## 구현된 페이지

- `/`: 메인, 오늘의 퀴즈, 인기/최신 퀴즈, 카테고리
- `/today`: 날짜 기반 deterministic 오늘의 퀴즈
- `/quiz`: 전체 퀴즈 목록, 카테고리/난이도 필터용 구조
- `/quiz/[slug]`: 고유 URL, 퀴즈 풀이, 정답 표시, 자세한 해설, JSON-LD, 관련 퀴즈
- `/category/[slug]`: 카테고리별 퀴즈
- `/search`: 제목, 질문, 태그, 요약 기반 검색
- `/bookmarks`: localStorage 기반 북마크
- `/about`, `/privacy`, `/terms`, `/contact`
- `/admin`, `/admin/quizzes`, `/admin/quizzes/new`, `/admin/quizzes/[id]/edit`, `/admin/categories`

## SEO와 광고

- `generateMetadata`로 퀴즈별 title/description/canonical을 생성합니다.
- `src/app/sitemap.ts`와 `src/app/robots.ts`로 동적 sitemap.xml, robots.txt를 제공합니다.
- `AdSlot` 컴포넌트는 실제 AdSense publisher ID와 slot ID가 설정된 경우에만 광고 단위를 렌더링합니다. 값이 없을 때는 광고 placeholder를 노출하지 않습니다.

## 관리자 MVP

관리자 화면은 초기 구조와 폼 UI만 제공합니다. 운영 배포 전에는 `ADMIN_PASSWORD` 또는 Supabase Auth를 이용한 서버 측 보호와 실제 insert/update 액션을 연결하세요.

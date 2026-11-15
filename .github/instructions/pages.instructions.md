---
description: "Next.js page and API route standards"
applyTo: "ws-nextjs-app/pages/**"
---
# Next.js Pages Standards

## Routing
- Pages must end in `.page.tsx`/`.page.ts` and API routes in `.api.ts`/`.api.tsx`; other files in `pages/` (components, tests, fixtures, helpers) are not routes. See `pageExtensions` in `ws-nextjs-app/next.config.js`.
- Service pages live under `ws-nextjs-app/pages/[service]/**`. Optional variants use a `[[...variant]]` segment; resolve them with `deriveVariant` from `#utilities/deriveVariant`.

## getServerSideProps
- Wrap `getServerSideProps` in `withRequestProps` from `#utilities/pageRequests/withRequestProps`. It merges request props (`isAmp`, `isLite`, `isApp`, `toggles`, `pathname`, etc.) into the returned props, so don't derive these yourself.
- Fetch BFF data with `getPageData` from `#utilities/pageRequests/getPageData`. The flow continues through `src/app/routes/utils/fetchDataFromBFF/index.ts` and `src/app/routes/utils/fetchPageData/index.js`.
- Set `context.res.statusCode` (and any headers such as `Cache-Control`) on `context.res`. Downstream infrastructure relies on this response metadata, so preserve it when refactoring.
- Where the page type already reports non-200 responses with `sendCustomMetric` (`NON_200_RESPONSE`), keep doing so for new error paths.
- Use `ws-nextjs-app/pages/[service]/live/[id]/[[...variant]].page.tsx` as a reference.

## Data and contracts
- BFF contracts are aligned with `fabl-modules`; see the page READMEs (e.g. `pages/[service]/articles/README.md`, `pages/[service]/live/[id]/README.md`).
- For local development, `pages/api/local/[service]/[pageType]/[id]/[[...optionalParams]]/index.api.ts` serves fixture JSON from `data/**`.

## Rendering
- Every page must work in canonical, AMP and Lite renders where the page type supports them. Check `isAmp`/`isLite` from request props rather than parsing the URL.
- Be service-aware: check behaviour for an RTL service (e.g. `arabic`) and a service with variants (e.g. `serbian`) when routing or data handling changes.
- Page-level components follow the same standards as `src/app/components/**` (see `component-standards.instructions.md` and `styling-standards.instructions.md`), including SCSS Modules for new styling.

## Testing
- Next.js unit tests: `cd ws-nextjs-app && yarn test`.
- Integration tests (Canonical, AMP, Lite): `yarn test:integration` from the repo root.

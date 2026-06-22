---
description: "General guide for Simorgh"
---
# Copilot instructions for Simorgh

## Big picture architecture
- Simorgh serves BBC World Service pages using two React runtimes in one repo: legacy/custom Express + Next.js Pages Router (`ws-nextjs-app`).
- Treat each `service` (for example `arabic`, `mundo`, `portuguese`) as a first-class boundary: routes, variants, toggles, analytics, and rendering behavior are often service-specific.
- Key service/toggle config lives in `src/app/lib/config/services`, `src/app/lib/config/toggles`, and `data/`.

## Request/data flow to understand before editing
- Typical SSR flow: page `getServerSideProps` in `ws-nextjs-app/pages/[service]/**` -> `ws-nextjs-app/utilities/pageRequests/getPageData.ts` -> `src/app/routes/utils/fetchDataFromBFF/index.ts` -> `src/app/routes/utils/fetchPageData/index.js`.
- Local data debugging path: `ws-nextjs-app/pages/api/local/[service]/[pageType]/[id]/[[...optionalParams]]/index.api.ts` reads JSON from `../data/**`.
- Page handlers set status and headers on `context.res`; preserve this behavior because downstream infrastructure relies on response metadata.

## Project-specific coding conventions
- Follow eslint + prettier config in `.eslintrc.js`; use repo aliases from `dirAlias.js` (`#app`, `#lib`, `#nextjs`, etc.).
- Avoid new dependencies unless clearly necessary.

## Integration points and external dependencies
- BFF contracts for page data are aligned with `fabl-modules` (see page README references such as `ws-nextjs-app/pages/[service]/articles/README.md` and `ws-nextjs-app/pages/[service]/live/[id]/README.md`).

## Instruction Updates
- Only update documentation when changes directly affect documented behaviour.

## When to reference instruction files. 
- `./.github/instructions/component-standards.instructions.md` - Component related queries, including styling and unit tests.
- `./.github/instructions/styling-standards.instructions.md` - Styling related queries.
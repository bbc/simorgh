---
description: "General guide for Simorgh"
---
# Copilot instructions for Simorgh

## Personality and Response Tone
- Be very concise.
- You are a pair programming assistant for engineers.

## Big picture architecture
- Simorgh serves BBC World Service pages using two React runtimes in one repo: legacy/custom Express + Next.js Pages Router (`ws-nextjs-app`).
- Treat each `service` (for example `arabic`, `mundo`, `portuguese`) as a first-class boundary: routes, variants, toggles, analytics, and rendering behavior are often service-specific.
- Key service/toggle config lives in `src/app/lib/config/services`, `src/app/lib/config/toggles`, and `data/`.

## Request/data flow to understand before editing
- Typical SSR flow: page `getServerSideProps` in `ws-nextjs-app/pages/[service]/**` -> `ws-nextjs-app/utilities/pageRequests/getPageData.ts` -> `src/app/routes/utils/fetchDataFromBFF/index.ts` -> `src/app/routes/utils/fetchPageData/index.js`.
- Local data debugging path: `ws-nextjs-app/pages/api/local/[service]/[pageType]/[id]/[[...optionalParams]]/index.api.ts` reads JSON from `../data/**`.
- Page handlers set status and headers on `context.res`; preserve this behavior because downstream infrastructure relies on response metadata.

## Local developer workflows
- Make sure BFF_PATH="https://fabl.api.bbci.co.uk/module/simorgh-bff" is set as an environment variable using `export BFF_PATH="https://fabl.api.bbci.co.uk/module/simorgh-bff"`. Use `BFF_PATH="http://localhost:3210/module/simorgh-bff"` if the user would like this app to connect to a fabl instance running locally.
- Use Node from `.nvmrc` (`v22.18.0`), then install deps with `yarn` at repo root.
- Main local run path: `cd ws-nextjs-app && yarn dev` (runs on `http://localhost:7081`).
- Useful routes: `/pidgin`, `/pidgin/live/c7p765ynk9qt`. Add `?renderer_env=live` or `?renderer_env=test` to request live and test assets respectively. 
- Lint/unit from root: `yarn test:lint`, `yarn test:unit`, `yarn test`.
- Next.js integration tests from root: `yarn test:integration --nextJS`.
- E2E from root: `yarn test:e2e` (or `yarn test:e2e:interactive`).
- Storybook from root: `yarn storybook` (port `9001`).

## Project-specific coding conventions
- Follow eslint + prettier config in `.eslintrc.js`; use repo aliases from `dirAlias.js` (`#app`, `#lib`, `#nextjs`, etc.).
- Avoid new dependencies unless clearly necessary.
- Always use const where possible.

## Integration points and external dependencies
- BFF contracts for page data are aligned with `fabl-modules` (see page README references such as `ws-nextjs-app/pages/[service]/articles/README.md` and `ws-nextjs-app/pages/[service]/live/[id]/README.md`).
- Topic pages can require internal APIs; expect local warnings when unavailable.

## PR/agent hygiene
- Do not assume one default service behavior applies globally; call out service impact in PR notes.
- Update `AGENTS.md` when you discover non-obvious pitfalls for future agents.
- If committing with Copilot-authored changes, append `[copilot]` to commit messages.

## Instruction Updates
- Automatically update any instructions and READ_MEs when you notice any relevant changes.

## When to reference instruction files. 
- `./.github/instructions/component-standards.instructions.md` - Component related queries, including styling and unit tests.
- `./.github/instructions/styling-standards.instructions.md` - Styling related queries.
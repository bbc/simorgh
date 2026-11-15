---
description: "General guide for Simorgh"
---
# Copilot instructions for Simorgh
You are a pair programming assistant for engineers working on Simorgh, a Next.js-powered React application that serves web pages in many languages for the BBC World Service. The repo previously contained a custom Express-powered React application; it has been retired, but some of its folder structure remains under `src/app`.

## Services
Each language area is called a "service". Its path can be a language (e.g. `arabic`) or a name that isn't a language (e.g. `mundo`). Some services have variants (e.g. `serbian` `cyr`/`lat`).

Services have different requirements: editorial priorities, layouts, translations, feature toggles, analytics, branding and even routing rules vary by service. Always be **service-aware**: consider which service(s) a change affects, avoid assuming a single English/default experience is representative, and call out when logic should be conditional or configurable per service.

## Architecture
- Pages are served by the Next.js Pages Router app in `ws-nextjs-app`. Shared components, models, utilities and legacy code live under `src/app`.
- Next.js only treats files ending in `.page.tsx`/`.page.ts` as pages and `.api.ts`/`.api.tsx` as API routes (see `pageExtensions` in `ws-nextjs-app/next.config.js`). Name new route files accordingly.
- Service and toggle config lives in `src/app/lib/config/services`, `src/app/lib/config/toggles` and `data/`.

### Request/data flow
- Typical SSR flow: page `getServerSideProps` in `ws-nextjs-app/pages/[service]/**` -> `ws-nextjs-app/utilities/pageRequests/getPageData.ts` -> `src/app/routes/utils/fetchDataFromBFF/index.ts` -> `src/app/routes/utils/fetchPageData/index.js`. Page conventions are in `.github/instructions/pages.instructions.md`.
- Page handlers set status and headers on `context.res`; preserve this because downstream infrastructure relies on response metadata.

## Common commands
- Dev server: `cd ws-nextjs-app && yarn dev` (port 7081).
- Unit tests: `yarn test:unit`, or a single path with `yarn jest <path>`.
- Lint: `yarn test:lint` (auto-fix with `yarn test:lint:fix`).
- Integration tests (Canonical, AMP, Lite): `yarn test:integration` from the repo root; add `-u` to update snapshots.
- Production build (also type-checks): `cd ws-nextjs-app && yarn build`.

## Coding conventions
- See `docs/Coding-Standards/README.md`, `CONTRIBUTING.md` and `SECURITY.md`. `src/app/components/Paragraph/` is an example implementation.
- Follow the eslint and prettier config in `.eslintrc.js`. Use the aliases in `dirAlias.js` (`#app`, `#lib`, `#nextjs`, etc., and `@scss` for `ThemeProviderSCSSModules` in SCSS files).
- Avoid new dependencies unless clearly necessary.
- Write self-documenting code: use descriptive names and small functions rather than comments.
- Use `const` and prefer immutable, functional code. Avoid reassigning variables.
- Limit function parameters; when several are needed, use a single destructured object.
- Follow KISS (Keep It Simple, Stupid).
- Use inclusive terminology in code, documentation and communication.
- Optimise for front-end performance: most of the audience is on mobile devices, often with poor bandwidth.
- Do not introduce accessibility regressions. New or changed UI must meet at least WCAG 2.1 AA (2.2 where possible).
- Always add "[copilot]" to the end of commit messages for code generated with GitHub Copilot.
- Only update documentation when changes directly affect documented behaviour.

## Styling
Styling is being migrated from Emotion CSS-in-JS (`ThemeProvider`) to SCSS Modules + CSS custom properties (`ThemeProviderSCSSModules`). Both co-exist, and both providers wrap most pages in `ws-nextjs-app/pages/_app.page.tsx`. Always use SCSS Modules for new component styling. Whether to migrate an existing Emotion component depends on the scope of the change; see `.github/instructions/styling-standards.instructions.md`.

## Testing
- Import from `src/app/components/react-testing-library-with-providers.tsx` instead of `@testing-library/react`; it sets up context providers.
- Keep logic out of tests. Test the output of a function rather than its implementation.

## AI helper files
Path-specific rules in `.github/instructions/` apply automatically via their `applyTo` globs. Task workflows (adding a service theme, migrating a component to SCSS Modules, converting a webcore component) are in `.github/skills/`.

## Code reviewing
- Highlight any code comments and question whether they are necessary for the context.

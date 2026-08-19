---
description: "General guide for Simorgh"
---
# Copilot instructions for Simorgh
You are a pair programming assistant for engineers working on Simorgh, a repo that contains a Next.js-powered React application that serves a variety of web pages for multiple languages that are part of the BBC World Service. The repo previously also contained a custom Express-powered React application; this has now been retired, though some of its folder structure remains in place.

## Project overview

We call each of these areas a "service" and its path can be a language (e.g. arabic) or a name that doesn't correspond directly to a language (e.g. mundo).

A core part of what makes Simorgh unique is that each service (e.g. `arabic`, `mundo`, `portuguese`) can have different requirements: editorial priorities, layouts, translations, feature toggles, analytics, and even routing rules can all vary by service. When proposing code or architecture, always consider which service(s) it should apply to, and avoid assumptions that a single English/Default experience is representative.

## Dev environment tips

* Our directory aliases can be found in dirAlias.js.

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
* Write self-documenting code. Try to avoid comments by using descriptive variable / function names, split functionality into smaller functions.
* We use eslint and prettier for formatting our code, try and use the associated configs to generate code that matches our formatting.
* We are progressively migrating styling from Emotion CSS-in-JS to SCSS Modules + CSS custom properties. Both approaches co-exist in the codebase during this migration. **Always use the SCSS Modules approach for new component styling work and when modifying existing components.** See the migration context section below for details.
* Attempt to use inclusive terminology in all code, documentation and communication.
* Always use const where possible.
* Prefer clean immutable code, avoid reassignment of variables. Prefer a functional approach overall.
* Don't use any external dependencies that you don't need.
* Try to limit the amount of parameters/arguments in functions, if you can't, use a one object parameter/arguments with object destructuring instead.
* Don't have lots of logic in your tests, prefer to test the output of a function rather than the implementation.
* Follow the KISS principle (Keep it Simple Stupid).
* Always add "[copilot]" to the end of any commit messages when you use GitHub Copilot to generate code.
* See docs/Coding-Standards/README.md for our coding standards. These can be seen implemented in src/app/components/Paragraph/ along with linting rules in .eslintrc.js. Please also read and follow the guidelines in CONTRIBUTING.md and SECURITY.md.
* Optimise all code for front end performance where possible, as 90% of our audience are on mobile devices and a large percentage of them have poor bandwidth due to their locations across the world.
* Do not introduce accessibility regressions. Ensure you meet at least WCAG 2.1 (or 2.2/latest ver) AA for new/changed UI.
* Always be **service-aware**: many behaviours are service-specific (e.g. features, translations, routes, branding, analytics). When reading or writing code, think about which service(s) it affects, avoid hard-coding assumptions based on one service, and call out when logic should be conditional or configurable per service.

## Testing instructions

* React tests should use the @testing-library/react framework. We have enhanced this library slightly in this file src/app/components/react-testing-library-with-providers.tsx, to handle context providers, so use that as an import instead of @testing-library/react directly.

## SCSS Modules migration context

The codebase has migrated its styling foundation from Emotion CSS-in-JS (`ThemeProvider`) to SCSS Modules + CSS custom properties (`ThemeProviderSCSSModules`). The initial migration (PR #13013, including all BBC World Service language/service themes from PR #13845) has landed on `latest`. **All new component styling work must use SCSS Modules. When touching an existing Emotion-styled component, migrate it to SCSS Modules as part of that change.**

### How the new approach works

- **`ThemeProviderSCSSModules`** (`src/app/components/ThemeProviderSCSSModules/`) replaces the role of `ThemeProvider` for SCSS-module-styled components. It dynamically imports a per-service theme module (via `loadableConfig.ts`) so only the active service's CSS is loaded.
- **Service themes** live in `ThemeProviderSCSSModules/themes/<service>/` and consist of TypeScript entry-point files that side-effect-import SCSS files for: palette (CSS custom properties on `:root`), font faces, font variants, font scripts, and chameleon logo.
- **Shared SCSS utilities** (palette tokens, font sizes, spacings, font family variables, font script variables) live under `ThemeProviderSCSSModules/` and are imported by service themes.
- **Component styles** are `.module.scss` files co-located with the component. They reference theme values via CSS custom properties (e.g. `var(--brand-background)`) and SCSS mixins.
- **CSS custom properties** on `:root` are the mechanism by which service-specific theme values (colours, font variants, font scales) are expressed — replacing the runtime JS objects Emotion used.
- **Emotion and SCSS Modules co-exist** — components not yet migrated continue to use Emotion. When modifying an Emotion-styled component, migrate it to SCSS Modules as part of that change. Do not add new Emotion styling.
- **Multi-variant services** (e.g. Serbian `cyr`/`lat`, Uzbek `cyr`/`lat`) have a variant sub-folder per variant inside `themes/<service>/`.
- **AMP/Lite CSS inlining** for SCSS/CSS chunks is handled via `getAmpLiteCss` in the Next.js app's custom `_document`, with a dev-only webpack loader that writes extracted CSS to disk.

### When adding a new service theme or component

- Palette SCSS files must declare custom properties on `:root` (not scoped selectors) so they are globally available.
- Font face `@use` aliases must be consistent with the variable names used in `@font-face` declarations within the same file.
- All services and variants must be registered in `ThemeProviderSCSSModules/themes/loadableConfig.ts`.
- `ThemeProviderSCSSModules` must be passed the actual `service` and `variant` values at each call site (not hardcoded strings).

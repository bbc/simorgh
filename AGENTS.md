# Simorgh AGENTS.md

You are an expert Senior Software Engineer for Simorgh, the BBC's World Service website.

This file describes common mistakes and confusion points an AI agent might encounter in this project. If something in the project surprises you, alert the developer working with you and add a note here so future agents avoid the same issue.

## Project overview

Simorgh is a monorepo of **two independent React applications** that serve BBC World Service pages (e.g. https://www.bbc.com/arabic, https://www.bbc.com/portuguese):

| App | Location | Powered by |
|-----|----------|-----------|
| Legacy SSR app | [src/](src/) | Custom Express server |
| Modern app | [ws-nextjs-app/](ws-nextjs-app/) | Next.js |

Both apps share components, contexts, models and styling conventions through path aliases. Be aware which app your change affects — they have independent build and test flows.

We call each language/edition area a **service** (e.g. `arabic`, `mundo`, `portuguese`, `news`, `pidgin`). A service path may be a language or a brand name that doesn't map directly to a language. Each service can differ in editorial priorities, layouts, translations, feature toggles, analytics, branding, fonts, RTL/LTR direction and routing rules. **Always be service-aware**: do not assume an English/Default experience is representative. Check [src/app/lib/config/services/](src/app/lib/config/services/) for per-service config.

## Dev environment

- Run `nvm use` to pick up the correct Node version, then `yarn` to install.
- `yarn dev` serves the app locally.
- Path aliases (used in imports) are defined in [dirAlias.js](dirAlias.js). Common ones: `#app` → `src/app`, `#nextjs` → `ws-nextjs-app/`, `#pages` → `src/app/pages/`, `#lib` → `src/app/lib/`, `#data` → `data/`, `#testHelpers` → `src/testHelpers/`, `@scss` → `src/app/components/ThemeProviderSCSSModules`.
- Environment configs live in [envConfig/](envConfig/) (`local.env`, `test.env`, `live.env`, `preview1.env`, `preview2.env`); `.env` is generated at build time and git-ignored.

## Repository layout (key directories)

- [src/app/pages/](src/app/pages/) — Express-app page containers (ArticlePage, HomePage, LiveRadioPage, MediaArticlePage, MostReadPage, OnDemandAudioPage, OnDemandTvPage, TopicPage, ErrorPage, …).
- [src/app/components/](src/app/components/) — Shared React components (Emotion).
- [src/app/legacy/psammead/](src/app/legacy/psammead/) — Vendored BBC Psammead component library. Prefer composing existing Psammead components over rewriting them.
- [src/app/lib/config/services/](src/app/lib/config/services/) — One file per service (~62 files); each exports a `service` config (lang, dir, brandName, translations, analytics, font script, toggles, etc.).
- [src/app/lib/config/toggles/](src/app/lib/config/toggles/) — Feature toggles per environment.
- [src/server/](src/server/) — Express server (Document template, routing, middleware).
- [src/integration/](src/integration/) — Integration tests for SSR rendering. Tests run separately for the **AMP**, **Canonical** and **Lite** platforms via distinct Jest projects in [jest.config.js](jest.config.js).
- [ws-nextjs-app/](ws-nextjs-app/) — Next.js app. Pages live under [ws-nextjs-app/pages/](ws-nextjs-app/pages/), with per-service routes in `pages/[service]/` (articles, av-embeds, homepage, live, my-news, onDemandAudio, onDemandTv, topics, watch, wrapped, …) and shared utilities in [ws-nextjs-app/utilities/](ws-nextjs-app/utilities/). Page files use the `*.page.tsx` suffix (Next `pageExtensions` config).
- [data/](data/) — Per-service content fixtures.
- [cypress/](cypress/) — End-to-end tests.

## Coding standards

- Read and follow [docs/Coding-Standards/README.md](docs/Coding-Standards/README.md), [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). [src/app/components/Paragraph/](src/app/components/Paragraph/) is a reference implementation.
- Write self-documenting code: descriptive names, small functions, minimal comments.
- Prefer clean, immutable, functional code. Use `const`; avoid reassignment.
- Limit function parameters; if more are needed, take a single object argument with destructuring.
- Use inclusive terminology in code, comments and commit messages.
- **Styling**: use Emotion with **object-styles syntax** (`@emotion/react` `css` prop). The one exception is [src/app/components/ThemeProviderSCSSModules/](src/app/components/ThemeProviderSCSSModules/) which uses SCSS modules (`*.module.scss`, aliased `@scss`); new code should use Emotion.
- Don't add external dependencies you don't need.
- Optimise for front-end performance — ~90% of our audience is on mobile, often on poor bandwidth.
- Don't introduce accessibility regressions. New/changed UI must meet at least WCAG 2.1 AA (or latest).
- **Be service-aware**: think about which service(s) a change affects (RTL/LTR, translations, routes, branding, analytics). Avoid hard-coding English/Default assumptions; make logic conditional or configurable per service when needed.

## Component conventions

A typical component directory ([src/app/components/Paragraph/](src/app/components/Paragraph/)):

```
ComponentName/
  index.tsx          # FC<Props>, Emotion css prop, object-styles
  index.test.tsx     # Jest + custom RTL wrapper (see Testing)
  index.stories.tsx  # Storybook story
  README.md          # Optional component docs
```

## Testing

- `yarn test` runs the full suite (lint, dependency checks, unit, integration, e2e).
- `yarn test:unit` / `yarn test:unit:watch` / `yarn test:unit:updatesnapshots` for Jest unit tests.
- `yarn test:integration` for SSR integration tests (runs across AMP, Canonical and Lite as separate Jest projects).
- `yarn test:e2e` runs Cypress (`yarn test:e2e:interactive` for the UI). Cypress also runs in GitHub Actions on PRs — useful to run locally once unit/integration are green.
- `yarn test:lint` (and `:fix`) for ESLint.
- `yarn test:puppeteer` for headless-browser tests.
- Test files are colocated as `*.test.{ts,tsx,js,jsx}`; client-only tests use `*.client.test.{ts,tsx,js,jsx}` (happy-dom env).
- **Always import the custom RTL wrapper** [src/app/components/react-testing-library-with-providers.tsx](src/app/components/react-testing-library-with-providers.tsx) instead of `@testing-library/react` directly — it sets up Service, User, Toggle, EventTracking, Account and Theme providers.
- Don't put lots of logic in tests; assert on output, not implementation.
- `yarn test:linkey` generates per-service test files under `src/app/lib/config/services/*.test.js`. These are temporary — `yarn test:linkey:cleanup` removes them. **Never commit them.**

## Documentation index

Prefer linking to these rather than duplicating their content:

- [README.md](README.md) — high-level architecture, page render lifecycle.
- [docs/Coding-Standards/README.md](docs/Coding-Standards/README.md) — index of style guides (Clean Code, Naming, React Components, Styles, Testing, Lite-Page-JS, …).
- [docs/Test-Strategy-Info.mdx](docs/Test-Strategy-Info.mdx) — test taxonomy and coverage expectations.
- [docs/JavaScript-Bundling-Strategy.mdx](docs/JavaScript-Bundling-Strategy.mdx) — webpack, code-splitting, loadable components.
- [docs/A11y-Testing-Cross-Device.mdx](docs/A11y-Testing-Cross-Device.mdx) — accessibility testing.
- [docs/Media-Player-Guide.mdx](docs/Media-Player-Guide.mdx) — video/audio embed patterns.
- [docs/Writing-Storybook-Stories.mdx](docs/Writing-Storybook-Stories.mdx) — story patterns.
- [docs/Rendering-Ads.mdx](docs/Rendering-Ads.mdx) — ad and AMP-specific rendering.
- [docs/Troubleshooting.mdx](docs/Troubleshooting.mdx) — common issues.
- [docs/Recommended-Tools.mdx](docs/Recommended-Tools.mdx) — IDE/extension setup.

## PR instructions

- Always add `[copilot]` to the end of any commit message generated with the help of GitHub Copilot.
- Keep this AGENTS.md file up to date when codebase changes invalidate notes here, or when you discover a non-obvious pitfall.

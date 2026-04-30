---
description: "Use when editing files inside ws-nextjs-app/. Covers Next.js page filename conventions, data fetching, the [service] dynamic segment, sharing code with the Express app, and how this differs from src/."
applyTo: ["ws-nextjs-app/**"]
---

# Next.js app (`ws-nextjs-app/`) conventions

`ws-nextjs-app/` is the **Next.js** application, separate from the Express SSR app in [src/](../../src/). They share components, contexts and types via path aliases (`#app`, `#nextjs`, `#lib`, …) defined in [dirAlias.js](../../dirAlias.js).

## Routing & file naming

- Pages live under [ws-nextjs-app/pages/](../../ws-nextjs-app/pages/). Per-service routes are under [ws-nextjs-app/pages/[service]/](../../ws-nextjs-app/pages/%5Bservice%5D/) (articles, av-embeds, homepage, live, my-news, onDemandAudio, onDemandTv, popular, send, topics, watch, wrapped, …).
- Page files use the **`*.page.tsx`** suffix (e.g. `wrapped.page.tsx`, `_app.page.tsx`, `_document.page.tsx`, `_error.page.tsx`). The Next config `pageExtensions` filters to this suffix so non-page tsx files are ignored by routing — name accordingly.
- API routes live under [ws-nextjs-app/pages/api/](../../ws-nextjs-app/pages/api/).

## Data fetching

- Use `getServerSideProps` for pages that need request-time data (most BBC pages). Avoid `getStaticProps` unless the content is genuinely static across services.
- Resolve the service from the dynamic `[service]` route param, validate it against the `Services` union from [src/app/models/types/global.ts](../../src/app/models/types/global.ts), and 404 unknown services.
- Use shared utilities in [ws-nextjs-app/utilities/](../../ws-nextjs-app/utilities/) before reaching for new dependencies.

## Sharing with the Express app

- Import shared React components from `#app/components/...` rather than duplicating them.
- Service config (`#app/lib/config/services`) and feature toggles (`#app/lib/config/toggles`) are shared — don't fork them here.
- The custom RTL wrapper at [src/app/components/react-testing-library-with-providers.tsx](../../src/app/components/react-testing-library-with-providers.tsx) is also used for tests in this app.

## Tests

- Unit tests are colocated and run via the root `yarn test:unit`.
- Integration tests for this app live under [ws-nextjs-app/integration/](../../ws-nextjs-app/integration/) and are picked up by [jest.config.js](../../jest.config.js).
- The app has its own `jest.config.ts` and `next.config.js` — read them before changing build behaviour.

## Pitfalls

- Don't add Express-specific middleware or `src/server/` imports here; this app is served by Next, not the custom Express server.
- The Next app and Express app have **independent build outputs** — verify your change builds in both if it touches shared code.

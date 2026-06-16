---
description: "Use when adding, editing, or reviewing per-service configuration files under src/app/lib/config/services. Covers the DefaultServiceConfig shape, RTL/LTR direction, translations, font script, analytics, and registration in the services index."
applyTo: ["src/app/lib/config/services/**", "src/app/lib/config/toggles/**"]
---

# Service config conventions

Each Simorgh **service** (language/edition such as `arabic`, `mundo`, `portuguese`, `news`, `pidgin`) has one config file under [src/app/lib/config/services/](../../src/app/lib/config/services/) that exports a `service` object keyed by variant (commonly `default`).

## Shape

A service config typically includes (see [arabic.ts](../../src/app/lib/config/services/arabic.ts) and [mundo.ts](../../src/app/lib/config/services/mundo.ts) for full examples):

- `lang` — BCP-47 code (e.g. `ar`, `es`, `pt-BR`).
- `dir` — `'rtl'` or `'ltr'`. Drives layout, mirroring, and bidirectional handling. Don't omit.
- `articleAuthor`, `articleTimestampPrefix`, `atiAnalyticsAppName`, `atiAnalyticsProducerId`, `atiAnalyticsProducerName`, `chartbeatDomain` — analytics & content metadata. Match existing services exactly; these are wired into BBC analytics pipelines.
- `brandName`, `product`, `serviceLocalizedName` — branding strings shown in UI.
- `script` — imported font script (e.g. `arabicFontScript`, `latinDiacriticsFontScript`). Determines GEL font stack.
- `translations` — large object of localized strings. Add new keys to **all** services, not just the one you're editing, to avoid runtime gaps.
- `navigation` — top-nav items.
- `mostRead` — limits, header text, frequency.
- Per-service feature flags (e.g. `showAdPlaceholder`, `showRelatedTopics`).

## Required workflow when adding a new service

1. Add a TypeScript file `src/app/lib/config/services/<service>.ts` that exports a `service: DefaultServiceConfig` object.
2. Register it in [src/app/lib/config/services/index.ts](../../src/app/lib/config/services/index.ts) (the `services` record drives the `Services` union).
3. Add the service to the `Services` union in [src/app/models/types/global.ts](../../src/app/models/types/global.ts) if not already present.
4. Add per-service content fixtures under [data/<service>/](../../data/) (mirror an existing service's structure).
5. Add toggles (if needed) in [src/app/lib/config/toggles/](../../src/app/lib/config/toggles/) per environment.
6. Run `yarn test:unit` — service config integrity tests will fail loudly if a key is missing.

## Editing existing config

- Don't change `dir`, `lang`, `atiAnalyticsProducerId/Name`, or analytics domains without product owner sign-off.
- When you add a new translation key, add it across **every** service file, even if the value is the English fallback — partial coverage produces missing-string regressions.
- Reuse shared translation modules (e.g. [russianUkrainianSharedTranslations.ts](../../src/app/lib/config/services/russianUkrainianSharedTranslations.ts)) instead of duplicating.

## RTL services

- RTL services include `arabic`, `pashto`, `persian`, `urdu`. Any change to UI behaviour gated on a service should be tested against at least one RTL service.

## Type safety

- `DefaultServiceConfig` (defined in [defaultServiceVariants.ts](../../src/app/lib/config/services/defaultServiceVariants.ts) area) is the source of truth. Don't widen it with `as any`. Add the field to the type if you genuinely need it.

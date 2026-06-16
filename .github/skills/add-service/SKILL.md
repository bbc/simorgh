---
name: add-service
description: 'Add a new BBC World Service language/edition (a "service") to Simorgh. Creates the service config under src/app/lib/config/services, registers it in the services index and Services union, scaffolds matching data fixtures under data/, and adds default toggles. Use when the user asks to add or scaffold a new service, language, or edition.'
argument-hint: 'service-name BCP47-lang dir(rtl|ltr)'
---

# Add a new Simorgh service

Adding a service is a multi-file, cross-cutting change. Follow this procedure to keep all sites and tests consistent.

## When to use

- The user asks to "add a new service", "scaffold service X", "add a new language", or "add an edition".

## Inputs

- **service-name**: lowercase, no spaces (e.g. `swahili`, `mundo`, `portuguese`). Becomes the URL path segment and config key.
- **lang**: BCP-47 language code (e.g. `sw`, `pt-BR`, `ar`).
- **dir**: `rtl` or `ltr`.
- **brand & analytics fields**: confirm with the user — `brandName`, `atiAnalyticsProducerId`, `atiAnalyticsProducerName`, `chartbeatDomain`, fonts (`script`).

## Procedure

1. **Pick a sibling service to mirror.** For an LTR Latin service, copy [src/app/lib/config/services/mundo.ts](../../../src/app/lib/config/services/mundo.ts). For RTL, copy [src/app/lib/config/services/arabic.ts](../../../src/app/lib/config/services/arabic.ts). For non-Latin LTR, pick a closest match (e.g. `hindi`, `thai`).
2. **Create `src/app/lib/config/services/<service-name>.ts`** with the copied config. Update:
   - `lang`, `dir`, `brandName`, `serviceLocalizedName`, `product`.
   - All analytics IDs (`atiAnalyticsProducerId`, `atiAnalyticsProducerName`, `chartbeatDomain`, `twitterCreator`, …).
   - `script` import (e.g. `arabicFontScript`, `latinDiacriticsFontScript`).
   - `translations` — translate each value. **Do not leave English fallbacks silently** — flag any keys you can't translate so the developer can fill them in.
   - `navigation`, `mostRead`, `radioSchedule`, etc. as appropriate; remove sections the new service doesn't need.
3. **Register the service** in [src/app/lib/config/services/index.ts](../../../src/app/lib/config/services/index.ts) (add `"<service-name>": ''` to the `services` record, alphabetically).
4. **Add to the `Services` union** in [src/app/models/types/global.ts](../../../src/app/models/types/global.ts) if not already a member.
5. **Scaffold data fixtures** under `data/<service-name>/` mirroring an existing service. At minimum copy the structure of `data/<sibling-service>/` and replace IDs/strings — do not commit copy-pasted English content as live data; mark fixtures clearly if they're placeholders.
6. **Toggles**: add the new service to per-environment files in [src/app/lib/config/toggles/](../../../src/app/lib/config/toggles/) only if a toggle requires per-service configuration.
7. **Run validation**:
   - `yarn test:lint`
   - `yarn test:unit` (service config integrity tests will catch missing keys)
   - `yarn build:local` to verify it bundles
8. **Manual smoke tests**: visit `/<service-name>` in `yarn dev` and verify direction, fonts, and translations render.

## Don't

- Don't widen `DefaultServiceConfig` with `any` to fit a missing field. Add the field to the type.
- Don't fork shared translation modules (e.g. [russianUkrainianSharedTranslations.ts](../../../src/app/lib/config/services/russianUkrainianSharedTranslations.ts)); reuse them.
- Don't commit `yarn test:linkey`-generated `*.test.js` files.
- Don't ship analytics IDs you invented — confirm them with the developer.

## References

- Service config primer: [.github/instructions/service-config.instructions.md](../../instructions/service-config.instructions.md)
- Reference services: [arabic.ts](../../../src/app/lib/config/services/arabic.ts), [mundo.ts](../../../src/app/lib/config/services/mundo.ts), [news.ts](../../../src/app/lib/config/services/news.ts)

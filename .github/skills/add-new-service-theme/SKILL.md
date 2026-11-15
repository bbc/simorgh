---
name: add-new-service-theme
description: Adds a theme for a new World Service language/service. Covers the SCSS Modules theme (ThemeProviderSCSSModules) and the Emotion theme (ThemeProvider) that must exist alongside it during the migration. Use this when asked to add or set up a theme for a new service.
---

# Skill: Add a New Service Theme

## Purpose
Styling is being migrated from Emotion (`ThemeProvider`) to SCSS Modules + CSS custom properties (`ThemeProviderSCSSModules`). Both providers wrap pages in `ws-nextjs-app/pages/_app.page.tsx` (AV embeds use only the Emotion one), and many components still use Emotion. A new service therefore needs **both** themes, with matching palette, fonts and logo.

Reference implementations:
- Single theme: `mundo`, in `src/app/components/ThemeProviderSCSSModules/themes/mundo/` and `src/app/components/ThemeProvider/themes/mundo.ts`.
- Service with variants: `serbian`, in `src/app/components/ThemeProviderSCSSModules/themes/serbian/` and `src/app/components/ThemeProvider/themes/serbian/`.

## Prerequisites
Theme registries are typed `Record<Services, …>`, so the build won't compile until the service is known. Check these exist first. If they don't, stop and ask whether to add them as part of this change:
- The service name in `ServicesWithNoVariants` (or a new `ServicesWithVariants` member, with its variants) in `src/app/models/types/global.ts`.
- Service config in `src/app/lib/config/services/<service>.ts`.

## How the SCSS theming system works
Each service has a TypeScript entry point (`themes/<service>/<service>.ts`). It side-effect-imports SCSS files for font faces, font variants, font script, palette and (optionally) PWA typography, then exports `withThemeProvider({ brandSVG })`. `themes/loadableConfig.ts` lazy-loads the entry point so only the active service's CSS is shipped.

## Steps
1. **SCSS palette:** create `ThemeProviderSCSSModules/themes/<service>/palette.scss`, importing `../../palette.scss`. Declare custom properties on `:root`, not on a scoped selector, so they are global.
2. **SCSS entry point:** create `ThemeProviderSCSSModules/themes/<service>/<service>.ts`, importing, in this order:
   - Font face SCSS files from `../../fontFaces/`.
   - The font variant SCSS file from `../../fontVariants/`.
   - `./palette.scss`.
   - The font script SCSS file from `../../fontScripts/`.
   - `../../pwaTypography/reith.scss`, only if the service uses PWA typography (see step 6). It must come after the font variant import so it wins the cascade.
   - `withThemeProvider` from `#app/components/ThemeProviderSCSSModules/withThemeProvider`.
   - `brandSVG` from `../../chameleonLogos/<service>`.

   If creating a new font variant SCSS file under `ThemeProviderSCSSModules/fontVariants/`, load `./fontVariantAliases.scss` from it so the shared `--gel-font-variant-*` fallback aliases are available. In font face files, keep `@use` aliases consistent with the variable names used in the `@font-face` declarations.
3. **Chameleon logos:** create `ThemeProviderSCSSModules/chameleonLogos/<service>.tsx` and `ThemeProvider/chameleonLogos/<service>.tsx`. This is easy to miss.
4. **Emotion theme:** create `ThemeProvider/themes/<service>.ts` with the same palette, font faces, font variants and script as the SCSS theme, following `mundo.ts`.
5. **Register both themes:** add the service to `ThemeProviderSCSSModules/themes/loadableConfig.ts` and `ThemeProvider/themes/loadableConfig.ts`, following the `mundo` entry. This is easy to miss.
6. **PWA typography (optional):** if the service needs PWA typography, export `pwaTheme = getPWATypographyTheme(<script>)` from the Emotion theme and pass it to `withThemeProvider(theme, pwaTheme)`, as in `ThemeProvider/themes/azeri.ts`. Add the matching SCSS import from step 2. `ThemeProviderSCSSModules/themes/pwaTypography.test.ts` fails if the two disagree.
7. Present the result for feedback and iterate.

## Services with variants
Use one entry-point file per variant rather than one per service:
- SCSS: `themes/<service>/<variant>.ts` with a shared `themes/<service>/palette.scss` (e.g. `serbian/cyr.ts`, `serbian/lat.ts`).
- Emotion: `themes/<service>/base.ts` with the shared theme, and `themes/<service>/<variant>.ts` merging the variant's script into it.
- Register each variant in both `loadableConfig.ts` files as a nested `{ <variant>: loadable(...) }` object, following `serbian`.

## Verify
- `yarn jest src/app/components/ThemeProviderSCSSModules src/app/components/ThemeProvider`
- `cd ws-nextjs-app && yarn build`, which type-checks the `Record<Services, …>` registries.
- Load a page for the service with `cd ws-nextjs-app && yarn dev` and check the brand colours, fonts and logo.

## Checklist
- [ ] Service is in the `Services` type and has config in `src/app/lib/config/services/`
- [ ] SCSS `palette.scss` declares custom properties on `:root`
- [ ] SCSS entry point imports font faces, variant, palette, script and `brandSVG` (plus PWA typography after the variant, if used)
- [ ] Any new font variant file loads `fontVariantAliases.scss`
- [ ] Chameleon logo created for both providers
- [ ] Emotion theme created with matching values
- [ ] Both `loadableConfig.ts` files updated (nested by variant if applicable)
- [ ] PWA typography matches between providers (`pwaTypography.test.ts` passes)

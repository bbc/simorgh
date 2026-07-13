---
name: add-new-service-theme
description: Adds a new World Service language/service theme to the SCSS modules theming system (ThemeProviderSCSSModules). Use this when asked to add or set up a theme for a new service.
---

# Skill: Add a New Service Theme (SCSS Modules)

## Purpose
All existing World Service language themes have been migrated from Emotion CSS-in-JS to SCSS modules + CSS custom properties (`ThemeProviderSCSSModules`). This skill covers creating a theme for a **new** service using that same system going forward.

The Mundo theme is the best reference implementation to follow: `src/app/components/ThemeProviderSCSSModules/themes/mundo/`

## When to Use
Use this skill when a new World Service language/service is being added and needs a theme set up under the SCSS modules theming system.

## How the theming system works
For the Mundo theme, there is a directory including the main theme file itself: src/app/components/ThemeProviderSCSSModules/themes/mundo/mundo.ts; this file imports various SCSS files and relies on their side-effects to either import relevant resources or set CSS custom properties to apply runtime theme customisations.

The theme is made available to be dynamically imported in src/app/components/ThemeProviderSCSSModules/themes/loadableConfig.ts.

## Steps
1. Inspect the mundo theme as a guide: `src/app/components/ThemeProviderSCSSModules/themes/mundo/`
2. Create a new directory for the service under `src/app/components/ThemeProviderSCSSModules/themes/<service>/`
3. Create `palette.scss` in that directory, mapping the service's palette tokens to CSS custom properties (use `src/app/components/ThemeProviderSCSSModules/themes/mundo/palette.scss` as a guide, importing from `../../palette.scss`)
4. Create the main `<service>.ts` theme entrypoint, importing:
   - The appropriate font face SCSS files from `../../fontFaces/`
   - The appropriate font variant SCSS file from `../../fontVariants/`
   - The appropriate font script SCSS file from `../../fontScripts/`
   - `./palette.scss`
   - `withThemeProvider` from `#app/components/ThemeProviderSCSSModules/withThemeProvider`
   - `brandSVG` from `../../chameleonLogos/<service>` (see step 5)
5. **Create the chameleon logo** at `src/app/components/ThemeProviderSCSSModules/chameleonLogos/<service>.tsx` — this step is easy to miss and must not be skipped
6. **Register the theme in `loadableConfig.ts`** at `src/app/components/ThemeProviderSCSSModules/themes/loadableConfig.ts`, adding a new entry following the same pattern as `mundo` — this step is easy to miss and must not be skipped
7. Present this for feedback and iterate.

## Checklist
Before considering a new service theme complete, verify all of the following:
- [ ] `themes/<service>/palette.scss` created with correct CSS custom properties
- [ ] `themes/<service>/<service>.ts` created, importing font faces, variants, script, palette, and brandSVG
- [ ] `chameleonLogos/<service>.tsx` created
- [ ] `themes/loadableConfig.ts` updated to include the new service

# Skill: Convert Service Theme to SCSS Modules

## Purpose
Previously, I iteratively developed a solution to replicate the Emotion theming implemention to customise our site for each World Service language theme; this moves from using Emotion CSS-in-JS to SCSS modules removing the need for the Emotion framework long term. Please see this PR up until this commit to see the first working implementation for the Mundo theme only: https://github.com/bbc/simorgh/pull/13013/changes/f34f953aa43bba019de40a3b240102190cff638b

This skill is intended to be ran to migrate each language service theme one at a time and allow human to assess the migration.

## When to Use
Use this skill when migrating a service's theme to the SCSS modules system.

## How the new theming system was migrated
For the Mundo theme, there is a directory including the main theme file itself: src/app/components/ThemeProviderSCSSModules/themes/mundo/mundo.ts; this file imports various scss files and relies on their side-effects to either import relevant resoures or set css custom properties to apply runtime theme customisations.

The original theme file in emotion can be found here: src/app/components/ThemeProvider/themes/mundo.ts; it imports various strings that can later be used to compose Emotion css to be used on a React component. The theme is available via a ThemeProvider and is retrieved to access theme specific config when styling a react component.

The final theme is made available to be dynamically imported in src/app/components/ThemeProviderSCSSModules/themes/loadableConfig.ts; this mirrors the approach in src/app/components/ThemeProvider/themes/loadableConfig.ts

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
5. **Copy the chameleon logo** from `src/app/components/ThemeProvider/chameleonLogos/<service>.tsx` into `src/app/components/ThemeProviderSCSSModules/chameleonLogos/<service>.tsx` — this step is easy to miss and must not be skipped
6. **Register the theme in `loadableConfig.ts`** at `src/app/components/ThemeProviderSCSSModules/themes/loadableConfig.ts`, adding a new entry following the same pattern as `mundo` — this step is easy to miss and must not be skipped
7. Present this for feedback and iterate.

## Checklist
Before considering a migration complete, verify all of the following:
- [ ] `themes/<service>/palette.scss` created with correct CSS custom properties
- [ ] `themes/<service>/<service>.ts` created, importing font faces, variants, script, palette, and brandSVG
- [ ] `chameleonLogos/<service>.tsx` copied from `ThemeProvider/chameleonLogos/<service>.tsx`
- [ ] `themes/loadableConfig.ts` updated to include the new service
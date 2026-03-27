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
1. Inspect the mundo theme as a guide
2. Make a similar theme for the user's chosen service
3. Present this for feedback and iterate.
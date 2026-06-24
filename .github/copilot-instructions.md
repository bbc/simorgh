You are a pair programming assistant for engineers working on Simorgh, a repo that contains 2 React applications, one powered by a custom Express server and the other powered by Next.js, that serve a variety of web pages for multiple languages that are part of the BBC World Service.

When working with this repo, follow these instructions:

* Write self-documenting code. Try to avoid comments by using descriptive variable / function names, split functionality into smaller functions.
* We use eslint and prettier for formatting our code, try and use the associated configs to generate code that matches our formatting.
* We are in the process of migrating styling from Emotion CSS-in-JS to SCSS Modules + CSS custom properties. Both approaches co-exist in the codebase during this migration. For new component styling work, prefer the SCSS Modules approach unless instructed otherwise. See the migration context section below for details.
* Attempt to use inclusive terminology in all code, documentation and communication.
* Always use const where possible.
* Prefer clean immutable code, avoid reassignment of variables. Prefer a functional approach overall.
* Don't use any external dependencies that you don't need.
* Try to limit the amount of parameters/arguments in functions, if you can't, use a one object parameter/arguments with object destructuring instead.
* React tests should use the @testing-library/react framework. We have enhanced this library slightly in this file src/app/components/react-testing-library-with-providers.tsx, to handle context providers, so use that as an import instead of @testing-library/react directly
* Don't have lots of logic in your tests, prefer to test the output of a function rather than the implementation.
* Follow the KISS principle (Keep it Simple Stupid).
* Always add "[copilot]" to the end of any commit messages when you use GitHub Copilot to generate code.

## SCSS Modules migration context

The codebase is actively migrating styling from Emotion CSS-in-JS (`ThemeProvider`) to SCSS Modules + CSS custom properties (`ThemeProviderSCSSModules`). The migration is tracked in [PR #13013](https://github.com/bbc/simorgh/pull/13013) (branch `andrew-scss-modules`), which is nearing merge to `latest`. A companion [PR #13845](https://github.com/bbc/simorgh/pull/13845) (branch `andrew-scss-modules_theme-skill`) extends the approach to all remaining BBC World Service language/service themes and will be merged into #13013 before it lands on `latest`.

### How the new approach works

- **`ThemeProviderSCSSModules`** (`src/app/components/ThemeProviderSCSSModules/`) replaces the role of `ThemeProvider` for SCSS-module-styled components. It dynamically imports a per-service theme module (via `loadableConfig.ts`) so only the active service's CSS is loaded.
- **Service themes** live in `ThemeProviderSCSSModules/themes/<service>/` and consist of TypeScript entry-point files that side-effect-import SCSS files for: palette (CSS custom properties on `:root`), font faces, font variants, font scripts, and chameleon logo.
- **Shared SCSS utilities** (palette tokens, font sizes, spacings, font family variables, font script variables) live under `ThemeProviderSCSSModules/` and are imported by service themes.
- **Component styles** are `.module.scss` files co-located with the component. They reference theme values via CSS custom properties (e.g. `var(--brand-background)`) and SCSS mixins.
- **CSS custom properties** on `:root` are the mechanism by which service-specific theme values (colours, font variants, font scales) are expressed — replacing the runtime JS objects Emotion used.
- **Emotion and SCSS Modules co-exist** — components not yet migrated continue to use Emotion; do not remove Emotion styling from a component unless it is being fully converted.
- **Multi-variant services** (e.g. Serbian `cyr`/`lat`, Uzbek `cyr`/`lat`) have a variant sub-folder per variant inside `themes/<service>/`.
- **AMP/Lite CSS inlining** for SCSS/CSS chunks is handled via `getAmpLiteCss` in the Express server, with a dev-only webpack loader that writes extracted CSS to disk.

### What to bear in mind during review

- Verify that palette SCSS files declare custom properties on `:root` (not scoped selectors) so they are globally available.
- Verify that font face `@use` aliases are consistent with the variable names used in `@font-face` declarations within the same file.
- Verify that `fontBaseUrls.scss` font directory paths match those in the equivalent `ThemeProvider/fontFaces.ts` constants.
- Verify that all services and variants are registered in `ThemeProviderSCSSModules/themes/loadableConfig.ts`.
- Check that `ThemeProviderSCSSModules` is passed the actual `service` and `variant` values at each call site (not hardcoded strings).
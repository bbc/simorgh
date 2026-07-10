You are a pair programming assistant for engineers working on Simorgh, a repo that contains 2 React applications, one powered by a custom Express server and the other powered by Next.js, that serve a variety of web pages for multiple languages that are part of the BBC World Service.

When working with this repo, follow these instructions:

* Write self-documenting code. Try to avoid comments by using descriptive variable / function names, split functionality into smaller functions.
* We use eslint and prettier for formatting our code, try and use the associated configs to generate code that matches our formatting.
* We are progressively migrating styling from Emotion CSS-in-JS to SCSS Modules + CSS custom properties. Both approaches co-exist in the codebase during this migration. **Always use the SCSS Modules approach for new component styling work and when modifying existing components.** See the migration context section below for details.
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

The codebase has migrated its styling foundation from Emotion CSS-in-JS (`ThemeProvider`) to SCSS Modules + CSS custom properties (`ThemeProviderSCSSModules`). The initial migration (PR #13013, including all BBC World Service language/service themes from PR #13845) has landed on `latest`. **All new component styling work must use SCSS Modules. When touching an existing Emotion-styled component, migrate it to SCSS Modules as part of that change.**

### How the new approach works

- **`ThemeProviderSCSSModules`** (`src/app/components/ThemeProviderSCSSModules/`) replaces the role of `ThemeProvider` for SCSS-module-styled components. It dynamically imports a per-service theme module (via `loadableConfig.ts`) so only the active service's CSS is loaded.
- **Service themes** live in `ThemeProviderSCSSModules/themes/<service>/` and consist of TypeScript entry-point files that side-effect-import SCSS files for: palette (CSS custom properties on `:root`), font faces, font variants, font scripts, and chameleon logo.
- **Shared SCSS utilities** (palette tokens, font sizes, spacings, font family variables, font script variables) live under `ThemeProviderSCSSModules/` and are imported by service themes.
- **Component styles** are `.module.scss` files co-located with the component. They reference theme values via CSS custom properties (e.g. `var(--brand-background)`) and SCSS mixins.
- **CSS custom properties** on `:root` are the mechanism by which service-specific theme values (colours, font variants, font scales) are expressed — replacing the runtime JS objects Emotion used.
- **Emotion and SCSS Modules co-exist** — components not yet migrated continue to use Emotion. When modifying an Emotion-styled component, migrate it to SCSS Modules as part of that change. Do not add new Emotion styling.
- **Multi-variant services** (e.g. Serbian `cyr`/`lat`, Uzbek `cyr`/`lat`) have a variant sub-folder per variant inside `themes/<service>/`.
- **AMP/Lite CSS inlining** for SCSS/CSS chunks is handled via `getAmpLiteCss` in the Express server, with a dev-only webpack loader that writes extracted CSS to disk.

### When adding a new service theme or component

- Palette SCSS files must declare custom properties on `:root` (not scoped selectors) so they are globally available.
- Font face `@use` aliases must be consistent with the variable names used in `@font-face` declarations within the same file.
- All services and variants must be registered in `ThemeProviderSCSSModules/themes/loadableConfig.ts`.
- `ThemeProviderSCSSModules` must be passed the actual `service` and `variant` values at each call site (not hardcoded strings).
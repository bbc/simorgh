---
description: "Styling Standards"
applyTo: "src/app/components/**"
---
# Styling Standards

Simorgh is progressively migrating its styling foundation from Emotion (CSS-in-JS, `ThemeProvider`) to **SCSS Modules + CSS custom properties** (`ThemeProviderSCSSModules`). Both approaches co-exist during the migration, but:

- Always use SCSS Modules for new component styling. Do not add new Emotion `css` prop or `styled` usage.
- When modifying an existing Emotion-styled component, migrate it to SCSS Modules as part of that change.

## Rules
- Co-locate an `index.module.scss` file next to the component, import it as `styles`, and apply classes via `className`.
- Use theme tokens instead of hard-coded values. Import design tokens (palette, spacing, font sizes/variants, media queries) via `@use '@scss/themeTokens' as theme;` rather than hard-coding colours, spacings, font values or breakpoints.
- Handle dark UI overrides with the `:global([data-is-dark-ui='true']) &` selector inside the component's `.module.scss`, rather than branching in JavaScript/TypeScript.
- Use logical CSS properties (e.g. `padding-inline-start`) for LTR/RTL support in `.module.scss` files instead of `[dir="rtl"]` selectors or the `:dir()` pseudo-class.
- Never branch a component's `className` on `dir` (e.g. `className={dir === 'rtl' ? styles.wrapperRtl : styles.wrapperLtr}`). Only read `dir` from `ServiceContext` for content/rendering decisions, such as icon orientation.
- Use `gap` for spacing between flex/grid items rather than margins or paddings.
- Prefer a mobile-first approach: write base styles for mobile, then use `min-width` media queries from `themeTokens` (e.g. `theme.$mediaQueries-group-3-min-width`) for larger viewports.
- Avoid generating dynamic class names or inline style objects for per-instance values. Where a per-instance dynamic value is genuinely needed, set a single CSS custom property inline and reference it from the `.module.scss` file.
- Keep conditional logic in the React component, not the style definition.
- CSS Grid may only be used for page layout, not smaller components, because Opera Mini falls back to inline layout. Scope any unavoidable Opera Mini-specific override with `:global(.is-opera-mini) &`. Do not use `psammead-grid`.

## Reference Implementations
Use `src/app/components/Example` as the canonical styling reference.

See `docs/Coding-Standards/Styles.mdx` for full detail and examples.

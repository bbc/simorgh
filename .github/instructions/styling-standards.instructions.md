---
description: "Styling Standards"
applyTo: "src/app/components/**"
---
# Styling Standards

Simorgh is progressively migrating its styling foundation from Emotion (CSS-in-JS, `ThemeProvider`) to **SCSS Modules + CSS custom properties** (`ThemeProviderSCSSModules`). Both approaches co-exist during the migration, but:

- Always use SCSS Modules for new component styling. Do not add new Emotion usage: no new `index.styles.ts` files, `styled` components, or `css` props on elements that don't already have one. Small in-place edits to an existing Emotion style object are allowed.
- When modifying an existing Emotion-styled component, decide whether to migrate it based on the scope of the change:
  - **Small or non-styling change** (logic, props, copy, tests, types, or a small in-place tweak to existing style values): do **not** migrate. Make the change in place and keep the diff focused.
  - **Larger styling change** (adding new rules or restyling the component), or you're unsure: propose a migration and get the user's agreement before starting. Use the `ask_user` tool if it's available; otherwise end your response with: "This component still uses Emotion. Do you want me to migrate it to SCSS Modules using the `migrate-component-to-scss-modules` skill, either in this change or as a follow-up?"
- Never start a migration the user hasn't requested or agreed to.

## Rules
- Co-locate an `index.module.scss` file next to the component, import it as `styles`, and apply classes via `className`.
- Use theme tokens instead of hard-coded values. Import design tokens (palette, spacing, font sizes/variants, media queries) via `@use '@scss/themeTokens' as theme;` rather than hard-coding colours, spacings, font values or breakpoints.
- Handle dark UI overrides with the `:global([data-is-dark-ui='true']) &` selector inside the component's `.module.scss`, rather than branching in JavaScript/TypeScript.
- Use logical CSS properties (e.g. `padding-inline-start`) for LTR/RTL support in `.module.scss` files instead of `[dir="rtl"]` selectors or the `:dir()` pseudo-class.
- Never branch a component's `className` on `dir` (e.g. `className={dir === 'rtl' ? styles.wrapperRtl : styles.wrapperLtr}`). Only read `dir` from `ServiceContext` for content/rendering decisions, such as icon orientation.
- Use `gap` for spacing between flex/grid items rather than margins or paddings.
- Prefer a mobile-first approach: write base styles for mobile, then use `min-width` media queries from `themeTokens` (e.g. `theme.$mediaQueries-group-3-min-width`) for larger viewports.
- Avoid generating dynamic class names or inline style objects for per-instance values. Where a per-instance dynamic value is genuinely needed, set a single CSS custom property inline and reference it from the `.module.scss` file.
- When a parent styles a child component, put the override in the parent's `.module.scss` and make it strictly more specific than the child's rule, using the smallest specificity that wins. CSS Modules give a parent no automatic precedence, and equal specificity falls back to source order, which differs between canonical, AMP and Lite. Prefer a descendant selector naming an element that is already rendered around the child (e.g. `.errorLinkWrapper .inlineLink`), or an element-qualified selector when the element type is fixed (e.g. `p.copyright`). Exclude pseudo-states the child still styles. Do not add wrappers only to increase specificity; use duplicated selectors (`.inlineLink.inlineLink`) only as a documented last resort. See [Overrides across component boundaries](../skills/migrate-component-to-scss-modules/SKILL.md#overrides-across-component-boundaries) for worked examples.
- Keep conditional logic in the React component, not the style definition.
- CSS Grid may only be used for page layout, not smaller components, because Opera Mini falls back to inline layout. Scope any unavoidable Opera Mini-specific override with `:global(.is-opera-mini) &`. Do not use `psammead-grid`.

## Reference Implementations
Use `src/app/components/Example` as the canonical styling reference.

See `docs/Coding-Standards/Styles.mdx` for full detail and examples.

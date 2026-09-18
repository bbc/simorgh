---
name: migrate-component-to-scss-modules
description: Migrates an existing Emotion-styled React component in src/app/components to SCSS Modules. Use when asked to migrate, convert or batch-migrate components off Emotion (index.styles.ts / css prop) to index.module.scss, or when removing Emotion from a component.
---

# Migrate Component to SCSS Modules

Converts a component in `src/app/components/**` from Emotion (`index.styles.ts` + `css` prop) to SCSS Modules (`index.module.scss` + `className`).

Styling *rules* live in `.github/instructions/styling-standards.instructions.md` and auto-apply to `src/app/components/**`. This skill covers the *mechanical conversion*: token mapping, workflow and verification.

## Step 1: Triage before starting

Check the component against these exclusions and **stop and report** if any apply, rather than working around them:

| Condition | Why it blocks |
|---|---|
| Imports `legacy/components/Grid` or `psammead-grid` | Layout still renders Emotion-styled legacy grid; needs a layout decision, not a styling change |
| Passes a `css` prop into a legacy component | The legacy child consumes Emotion styles directly; `className` is not a drop-in replacement |
| Imports a legacy `index.styles` file | Depends on a legacy Emotion style object that isn't yours to convert |
| Uses a palette/spacing value as a runtime prop (not a style) | SCSS variables can't be passed as props; needs a design decision |
| Component is outside `src/app/components` | Legacy/container/psammead components need modernisation first |

Known blocked components: `Disclaimer`, `MostRead/Canonical/Item`, `MostRead/Canonical/List`, `MostRead/Label`, `RelatedTopics`, `Recommendations`, `RelatedContentSection`.

Rendering a legacy component is **not** by itself a blocker — `ArticleLinksBlock` renders `SkipLinkWrapper` and migrated cleanly. It only blocks when the legacy child controls layout or receives styles.

`getAmpLiteCss` inlines `.module.scss` chunks automatically, so AMP and Lite components need no special wiring. Minimize the compiled CSS for every edition; if the component renders in AMP, manually verify that the final inlined `style[amp-custom]` payload remains below AMP's hard 75 KB limit.

Legacy imports that are **pure utilities** (e.g. `formatDuration` from `psammead-timestamp-container`) do not block migration.

Before converting a shared component, search its consumers for Emotion `css` props such as `css={styles.inlineLink}`. An un-migrated consumer may intentionally replace the shared component's default styles; migrate that consumer in the same change or stop and report it as blocked.

When a consumer owns a real DOM context for an override, express that relationship in SCSS rather than adding a wrapper solely to increase specificity. Use an ancestor selector (for example `.errorLinkWrapper .inlineLink`) or an element-qualified selector when the component fixes the element type (for example `p.copyright`). Exclude pseudo-states that remain owned by the shared component, such as `:visited`, `:hover`, and `:focus`. CSS Modules scopes class names but does not give a parent component automatic precedence. Use duplicated selectors only as a documented last resort when no meaningful context exists.

## Step 2: Map Emotion theme values to SCSS tokens

All tokens are forwarded from `@scss/themeTokens`. Start every file with:

```scss
@use '@scss/themeTokens' as theme;
```

### Palette

Emotion `palette.SCREAMING_SNAKE` → `theme.$palette-kebab-case`.

| Emotion | SCSS |
|---|---|
| `palette.WHITE` | `theme.$palette-white` |
| `palette.GREY_6` | `theme.$palette-grey-6` |
| `palette.GREY_10` | `theme.$palette-grey-10` |
| `palette.SHADOW` | `theme.$palette-shadow` |
| `palette.POSTBOX_30` | `theme.$palette-postbox-30` |
| `palette.MIDNIGHT_BLACK` | `theme.$palette-midnight-black` |

### Spacings

Emotion values are unitless numbers needing `rem`; SCSS values already include units, so interpolate directly.

| Emotion | SCSS |
|---|---|
| `spacings.HALF` | `theme.$spacings-half` |
| `spacings.FULL` | `theme.$spacings-full` |
| `spacings.DOUBLE` | `theme.$spacings-double` |
| `spacings.TRIPLE` | `theme.$spacings-triple` |
| `spacings.QUADRUPLE` | `theme.$spacings-quadruple` |
| `spacings.QUINTUPLE` | `theme.$spacings-quintuple` |
| `spacings.SEXTUPLE` | `theme.$spacings-sextuple` |

```scss
padding: #{theme.$spacings-double};
```

### Media queries

Emotion values include the `@media` prefix; SCSS variables contain only the condition, so they must be interpolated after `@media`.

| Emotion | SCSS |
|---|---|
| `mq.GROUP_1_MIN_WIDTH` | `theme.$mediaQueries-group-1-min-width` |
| `mq.GROUP_2_MIN_WIDTH` | `theme.$mediaQueries-group-2-min-width` |
| `mq.GROUP_3_MIN_WIDTH` | `theme.$mediaQueries-group-3-min-width` |
| `mq.GROUP_4_MIN_WIDTH` | `theme.$mediaQueries-group-4-min-width` |
| `mq.GROUP_5_MIN_WIDTH` | `theme.$mediaQueries-group-5-min-width` |
| `mq.GROUP_3_MAX_WIDTH` | `theme.$mediaQueries-group-3-max-width` |
| `mq.FORCED_COLOURS` | `theme.$mediaQueries-forced-colours` |
| `mq.POINTER` | `theme.$mediaQueries-pointer-fine` |

```scss
@media #{theme.$mediaQueries-group-3-min-width} { ... }
```

`GROUP_N_ONLY` and `GROUP_1_AND_GROUP_2` have no direct equivalent — compose min and max variables in a single query.

### Typography

When the Emotion style sets both a font size and variant, use the combined mixin:

```scss
@include theme.typography-from-scale-and-variant(<scale>, '<variant>');
```

The scale is unquoted and the variant is quoted kebab-case. The mixin emits the font family, style and weight together with responsive font size and line height. Remove any manual `line-height` the Emotion styles set alongside the GEL scale.

Use the lower-level `theme.fontSizes-gel-font-size(<scale>)` or `theme.fontVariants-gel-font-variant('<variant>')` mixin only when the existing component intentionally sets one without the other.

Valid scales: `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`.

| Emotion | SCSS argument |
|---|---|
| `sansRegular` | `'sans-regular'` |
| `sansRegularItalic` | `'sans-regular-italic'` |
| `sansBold` | `'sans-bold'` |
| `sansBoldItalic` | `'sans-bold-italic'` |
| `sansLight` | `'sans-light'` |
| `serifRegular` | `'serif-regular'` |
| `serifMedium` | `'serif-medium'` |
| `serifMediumItalic` | `'serif-medium-italic'` |
| `serifBold` | `'serif-bold'` |
| `serifLight` | `'serif-light'` |

Font fallback resolution belongs to the theme layer. `ThemeProviderSCSSModules`
font variant files expose the raw variant variables and the shared
`fontVariantAliases.scss` file builds the fallback aliases consumed by the
component mixins. Do not copy fallback chains into a component helper or its
component tests; test changes to those chains at the theme/Sass layer.

### Pixel conversion

`pixelsToRem(3)` → `theme.pixelsToRem-px-to-rem(3)` (returns a value with `rem` units already applied).

### Grid widths

`gridWidths.scss` is forwarded as `theme.$gridWidths-*` (e.g. `theme.$gridWidths-grid-width-600`), already in `rem` — use it directly, no conversion needed.

## Step 3: Convert conditional logic out of JavaScript

| Emotion pattern | SCSS Module replacement |
|---|---|
| `css={[styles.base, cond && styles.modifier]}` | `clsx(styles.base, cond && styles.modifier)` |
| Theme callback reading dark UI state | `:global([data-is-dark-ui='true']) &` |
| `dir === 'rtl' ? ... : ...` | Logical properties (`padding-inline-start`) |
| Opera Mini branch | `:global(.is-opera-mini) &` |
| Per-instance numeric value | Inline CSS custom property + `var()` |
| Small set of named style variants | `data-*` attribute + `&[data-x='value']` selector |
| Large set of possible values (e.g. a GEL scale) | Typed helper + inline CSS custom properties consumed by one SCSS rule set |

### Conditional style arrays

The most common pattern in this codebase. Emotion's array syntax becomes composed class names.

The condition is a **prop**, not the style object — `styles.alignWithMargin` always exists and is always truthy. Most components name the two differently (`isActive && styles.tabActive`); `CallToActionLink` is the exception and is easy to misread as a single reference.

**Before:**
```tsx
<a css={[styles.link, alignWithMargin && styles.alignWithMargin]}>
```

**After:**
```tsx
import clsx from 'clsx';

<a className={clsx(styles.link, alignWithMargin && styles.alignWithMargin)}>
```

Emotion drops falsy entries from a `css` array automatically; `className` does not. `clsx` restores that behaviour, so this is a direct translation rather than a rewrite — a plain template literal would carry `&&` across as the literal string `false`:

```tsx
// ❌ class="link_x1 false" when alignWithMargin is false
<a className={`${styles.link} ${alignWithMargin && styles.alignWithMargin}`}>
```

Use `clsx` for any conditional combination of classes. Keep both classes as separate rules in the SCSS file rather than merging them into one.

This works when the second class adds **different** properties to the base. If the variant instead **replaces** the same properties (a different font size, say), apply one class or the other rather than both — two classes setting identical properties makes the result depend on their order in the compiled CSS:

```tsx
<h2 className={isLarge ? styles.titleLarge : styles.title}>
```

A **discrete variant** (boolean or small union) can legitimately select or add a class. What the styling standards prohibit is deriving a class from a **continuous or computed value**, or from `dir` — use a CSS custom property or logical properties for those.

### Props with many possible values

When a prop has many possible values, avoid creating a separate class and CSS
rule for every value unless the list is small. The browser downloads all of
those rules, even though each instance uses only one value.

For a small list, keep the value in a `data-*` attribute and select the matching
rule in SCSS:

```tsx
<a className={styles.link} data-size={size} />
```

```scss
.link[data-size='small'] {
  font-size: 1rem;
}
```

For a larger list, use one set of responsive rules and pass the selected values
as CSS custom properties:

```tsx
import type { CSSProperties } from 'react';

type LinkSize = 'small' | 'large';

type LinkStyles = CSSProperties & {
  '--link-font-size': string;
  '--link-line-height': string;
};

const getStylesForSize = (size: LinkSize): LinkStyles => ({
  '--link-font-size': size === 'small' ? '1rem' : '1.25rem',
  '--link-line-height': size === 'small' ? '1.5' : '1.25',
});

<a className={styles.link} style={getStylesForSize(size)} />
```

```scss
.link {
  font-size: var(--link-font-size, inherit);
  line-height: var(--link-line-height, inherit);
}
```

Keep the code that maps prop values to custom-property values in one typed
helper or at the component boundary. Do not repeat that mapping in both
TypeScript and SCSS.

See [src/app/components/InlineLink/index.module.scss](../../../src/app/components/InlineLink/index.module.scss) for a concrete compact CSS custom-property bridge: `size` and `fontVariant` are mapped by [typography.ts](../../../src/app/components/ThemeProviderSCSSModules/typography.ts) to inline `--gel-typography-*` values, which one responsive rule set consumes.

Keep the CSS small for every edition. If the component renders in AMP, measure
the final inlined `style[amp-custom]` payload and keep the total below AMP's
hard 75 KB limit. This is an additional AMP requirement; the CSS-minimization
guidance applies to all editions.

### Consumer-owned style overrides

When a migrated component needs a consumer-specific default style, keep the shared component's state rules and scope the override to the consumer's DOM context:

```scss
.errorLinkWrapper {
  .inlineLink:not(:visited):not(:hover):not(:focus) {
    color: theme.$palette-black;
    border-bottom: #{theme.pixelsToRem-px-to-rem(1)} solid
      theme.$palette-black;
  }
}
```

Do not assume the order of classes in the HTML or the React parent-child relationship controls the CSS cascade. Do not add a wrapper only to manufacture a selector context. Custom properties are appropriate for genuinely configurable component values, but adding a new override variable for every consumer couples the shared component to its consumers.

## Step 4: Apply the change

1. Create `index.module.scss` alongside the component, converting each exported style key to a class.
2. Replace `css={styles.x}` with `className={styles.x}`.
3. Where an element already has a `className`, combine rather than overwrite.
4. **Delete the `index.styles.*` file** — never leave both in place.
5. Remove now-unused `@emotion/react` imports and `Theme` type imports.

Class names are camelCase to match the existing style-object keys, so `styles.promoContainer` continues to work unchanged.

## Step 5: Verify

```bash
yarn jest src/app/components/<ComponentName>
```

- Only 19 component directories have snapshots. If the component has a `__snapshots__` folder, regenerate with `-u` and review the diff: class-name churn is expected, **structural DOM changes are not**.
- Confirm no `@emotion` imports remain in the component: `grep -rn "@emotion" src/app/components/<ComponentName>`
- Check an RTL service (e.g. `arabic`) and a dark-UI context, since those behaviours move from JS branching into SCSS selectors.
- `.module.scss` files are mocked with `identity-obj-proxy` in Jest, so `yarn jest` never compiles or validates the SCSS itself — a typo or invalid selector won't fail a test. Catching that relies on the Next.js build (fails on invalid SCSS) and Storybook/Chromatic (catches visually broken output), not on Jest.
- For a `data-*` enum, assert the attribute value rather than a generated class. For a compact inline CSS custom-property bridge, assert `element.style.getPropertyValue(...)` against explicit expected values in the `it.each` table; do not repeat the production value-conversion logic in the assertion.
- Do not use `toHaveStyle` to validate declarations that only come from the mocked `.module.scss` stylesheet. Inline custom properties deliberately emitted by React are different: their values are present in jsdom and can be asserted directly.
- Run `yarn build` from `ws-nextjs-app` once per PR (not per component). Jest only exercises files that import the component under test, so it won't catch a legacy page elsewhere still importing the deleted `index.styles.*` directly — the build's TypeScript check will.

## Reference implementations

- [src/app/components/ArticleLinksBlock/index.module.scss](../../../src/app/components/ArticleLinksBlock/index.module.scss) — tokens, forced colours, dark UI
- [src/app/components/ActionTooltip/index.module.scss](../../../src/app/components/ActionTooltip/index.module.scss)
- [src/app/components/Example/index.module.scss](../../../src/app/components/Example/index.module.scss) — minimal case
- [src/app/components/InlineLink/index.module.scss](../../../src/app/components/InlineLink/index.module.scss) — compact CSS custom-property bridge for large enums on a shared component
- [src/app/components/Embeds/EmbedError/index.module.scss](../../../src/app/components/Embeds/EmbedError/index.module.scss) — consumer-owned contextual override

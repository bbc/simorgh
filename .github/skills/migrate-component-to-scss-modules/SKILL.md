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

Known blocked components: `Disclaimer`, `MostRead/Canonical/Item`, `MostRead/Canonical/List`, `MostRead/Label`, `RelatedContentSection`.

Rendering a legacy component is **not** by itself a blocker — `ArticleLinksBlock` renders `SkipLinkWrapper` and migrated cleanly. It only blocks when the legacy child controls layout or receives styles.

`getAmpLiteCss` inlines `.module.scss` chunks automatically, so AMP and Lite components need no special wiring. They do need manual verification on the AMP platform, so flag it if the component renders there.

Legacy imports that are **pure utilities** (e.g. `formatDuration` from `psammead-timestamp-container`) do not block migration.

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

### Font sizes

`fontSizes[scale]` → `@include theme.fontSizes-gel-font-size(<scale>);` (unquoted). The mixin applies responsive `font-size` and `line-height` across breakpoint groups, so remove any manual `line-height` the Emotion styles set alongside it.

Valid scales: `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`.

### Font variants

`fontVariants[variant]` → `@include theme.fontVariants-gel-font-variant('<variant>');` (**quoted**, kebab-case).

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

## Reference implementations

- [src/app/components/ArticleLinksBlock/index.module.scss](../../../src/app/components/ArticleLinksBlock/index.module.scss) — tokens, forced colours, dark UI
- [src/app/components/ActionTooltip/index.module.scss](../../../src/app/components/ActionTooltip/index.module.scss)
- [src/app/components/Example/index.module.scss](../../../src/app/components/Example/index.module.scss) — minimal case

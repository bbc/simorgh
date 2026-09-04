---
name: convert-webcore-component
description: Converts webcore-style React components to Simorgh coding standards using SCSS Modules and TypeScript
---

# Convert Webcore Component

Converts webcore-style React components (using `@emotion/styled` or `styled-components`) into the Simorgh coding standard, which uses **SCSS Modules** (`index.module.scss` + `className`) and TypeScript.

Styling rules are defined in `.github/instructions/styling-standards.instructions.md` and auto-apply to `src/app/components/**`. This skill covers the conversion workflow only.

## Step 1: Pre-Conversion Checklist

Before converting, audit imports for missing dependencies. **If dependencies are missing, stop and request they be imported first.**

### @bbc/web-components imports
- `Carousel` - horizontal scrollable container with heading
- `Heading` - has equivalent at `src/app/components/Heading/`

### @bbc/web-gel-layouts imports
- `Wrap` - replace with div + `theme.$spacings-*`
- `Grid` - may need custom CSS Grid implementation

### @bbc/web-gel-foundations imports
- `SPACING_*` → `theme.$spacings-*`
- `GROUP_*` → `theme.$mediaQueries-group-*`
- `fontScale*`, `fontStandard` → `theme.fontSizes-gel-font-size()` / `theme.fontVariants-gel-font-variant()`
- `createSize` → `theme.pixelsToRem-px-to-rem()`

## Step 2: Convert Styles

### Before (webcore style)

```jsx
import styled from '@emotion/styled';

const StyledWrapper = styled.div`
  display: flex;
  padding: 16px;
  @media (min-width: 600px) {
    padding: 24px;
  }
`;

const Component = () => <StyledWrapper>Content</StyledWrapper>;
```

### After (Simorgh style)

```tsx
import styles from './index.module.scss';

const Component = () => <div className={styles.wrapper}>Content</div>;
```

```scss
// index.module.scss
@use '@scss/themeTokens' as theme;

.wrapper {
  display: flex;
  padding: #{theme.$spacings-double};

  @media #{theme.$mediaQueries-group-3-min-width} {
    padding: #{theme.$spacings-triple};
  }
}
```

### Styles Using Theme Values

Import `@scss/themeTokens` and reference its values in your SCSS rules. It provides the colours, spacings, breakpoints and typography for the active service, so Emotion's theme callback is no longer needed.

**Before:**
```typescript
container: ({ mq, palette }: Theme) =>
  css({
    backgroundColor: palette.WHITE,
    [mq.GROUP_3_MIN_WIDTH]: {
      padding: '1rem',
    },
  }),
```

**After:**
```scss
.container {
  background-color: theme.$palette-white;

  @media #{theme.$mediaQueries-group-3-min-width} {
    padding: #{theme.$spacings-double};
  }
}
```

### Variant Styles

A style that took a parameter becomes a second class holding only the properties that differ, applied in addition to the base class.

**Before:**
```typescript
link: (hasMargin?: boolean) =>
  css({
    color: palette.GREY_8,
    ...(hasMargin && { marginInlineStart: '1rem' }),
  }),
```

**After:**
```scss
.link {
  color: theme.$palette-grey-8;
}

.linkWithMargin {
  margin-inline-start: #{theme.$spacings-double};
}
```

```tsx
<a className={clsx(styles.link, hasMargin && styles.linkWithMargin)}>
```

If the variant **replaces** the same properties rather than adding new ones, don't apply both classes. Two classes setting identical properties makes the result depend on their order in the compiled CSS, and leaves the base declarations unused. Use one class or the other.

**Before:**
```typescript
title: (isLarge?: boolean) =>
  css({
    fontSize: isLarge ? '2rem' : '1rem',
  }),
```

**After:**
```scss
.title {
  @include theme.fontSizes-gel-font-size(pica);
}

.titleLarge {
  @include theme.fontSizes-gel-font-size(canon);
}
```

```tsx
<h2 className={isLarge ? styles.titleLarge : styles.title}>{title}</h2>
```

This is distinct from the anti-pattern in the styling standards. A **discrete variant prop** (a boolean or a small union) can legitimately select or add a class. What to avoid is deriving a class from a **continuous or computed value** (`height > 100 ? styles.tall : styles.short`) or from `dir` — use the custom property or logical-property approaches below instead.

### Combining Class Names

Emotion's `css` array silently ignores falsy entries. `className` is a plain string and does not, so translating the array directly introduces a bug.

Note that the condition is a **prop**, not the style object — `styles.linkWithMargin` always exists and is always truthy. Most components name the two differently (`isActive && styles.tabActive`), but `CallToActionLink` uses `alignWithMargin && styles.alignWithMargin`, which is easy to misread as a single reference.

**Before:**
```tsx
<a css={[styles.link, hasMargin && styles.linkWithMargin]}>
```

**After:**
```tsx
import clsx from 'clsx';

<a className={clsx(styles.link, hasMargin && styles.linkWithMargin)}>
```

`clsx` drops falsy entries the same way Emotion's `css` array did, so this is a direct translation rather than a rewrite.

❌ A plain template literal carries `&&` across as the literal string `false`:

```tsx
// produces class="link_x1 false" when hasMargin is false
<a className={`${styles.link} ${hasMargin && styles.linkWithMargin}`}>
```

Use `clsx` for any conditional combination of classes, however many branches are involved.

### Dynamic Styles

SCSS Module classes are static. Where a value genuinely varies per instance, set a single CSS custom property inline and consume it in SCSS.

**Before:**
```jsx
const Button = styled.div`
  padding-${({ alignment }) => alignment === 'left' ? 'right' : 'left'}: 12px;
`;
```

**After** — prefer a logical property so no branching is needed at all:
```scss
.button {
  padding-inline-end: #{theme.pixelsToRem-px-to-rem(12)};
}
```

Where a value is truly dynamic (a computed height, an image offset):
```tsx
<div className={styles.wrapper} style={{ '--promo-height': `${height}px` }} />
```
```scss
.wrapper {
  height: var(--promo-height);
}
```

### Styling Mistakes to Avoid

- Don't produce `index.styles.ts` files or use Emotion's `css` prop / `styled` API
- Don't use physical CSS properties (`left`, `right`) for directional layouts
- Don't hardcode pixel, colour or breakpoint values — use theme tokens
- Don't use `max-width` media queries when `min-width` would work
- Don't derive a class name from a continuous/computed value or from `dir` (see above)

## Step 3: Convert to TypeScript

### File Extensions

- `.jsx` → `.tsx` (React components)
- `.js` → `.ts` (utilities, helpers, enums)

### File Structure

```
components/
├── index.module.scss    # Co-located SCSS Module styles
├── types.ts             # Shared TypeScript types
├── ComponentA.tsx       # React component
├── ComponentB.tsx       # React component
└── sub-component/
    └── index.tsx
```

### Props Type Definitions

```tsx
interface MyComponentProps {
  name: string;
  count: number;
  isActive?: boolean;
}

const MyComponent = ({ name, count, isActive = false }: MyComponentProps) => {
  // ...
};
```

### Import Existing Types

```tsx
import type { HeadToHeadV2Data, Team, Action } from './types';

interface Props {
  data: HeadToHeadV2Data;
  isConciseView: boolean;
}
```

### Children Props

```tsx
import type { PropsWithChildren, ReactNode } from 'react';

interface WrapperProps {
  className?: string;
}

const Wrapper = ({ children, className }: PropsWithChildren<WrapperProps>) => (
  <div className={className}>{children}</div>
);
```

### Event Handlers

```tsx
import type { MouseEvent, ChangeEvent } from 'react';

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
```

### Enum Conversions

```ts
export const EventStatus = {
  PreEvent: 'PreEvent',
  MidEvent: 'MidEvent',
  PostEvent: 'PostEvent',
} as const;

export type EventStatusType = typeof EventStatus[keyof typeof EventStatus];
```

### Conditional Props

```tsx
type ConditionalLinkProps =
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void };

interface BaseLinkProps {
  children: ReactNode;
  className?: string;
}

type LinkProps = BaseLinkProps & ConditionalLinkProps;
```

### TypeScript Mistakes to Avoid

- Don't use `any` type - prefer `unknown` or proper types
- Don't forget to update imports when renaming `.jsx` to `.tsx`
- Don't use `React.FC` - use explicit return types or inference
- Don't duplicate types - import from existing `types.ts`
- Don't use non-null assertions (`!`) - prefer optional chaining (`?.`)
- Don't leave JSDoc annotations after converting to TypeScript

## Step 4: Linting and Formatting

After conversion, run linting and formatting to ensure code quality:

```bash
# Run ESLint to fix issues
yarn lint --fix

# Run Prettier to format code
yarn prettier --write "path/to/converted/files/**/*.{ts,tsx}"
```

### Common Lint Issues After Conversion

- Missing return types on functions
- Unused imports from old styled-components
- Incorrect import order (types should use `import type`)
- Missing semicolons or trailing commas

## Reference Examples

- [src/app/components/ArticleLinksBlock/index.module.scss](../../../src/app/components/ArticleLinksBlock/index.module.scss)
- [src/app/components/ActionTooltip/index.module.scss](../../../src/app/components/ActionTooltip/index.module.scss)
- [src/app/components/Example/index.module.scss](../../../src/app/components/Example/index.module.scss)

## Step 5: Preserving Original Files (Optional)

When migrating incrementally, you may want to keep the original `.jsx`/`.js` files alongside new `.tsx`/`.ts` files:

### Create TypeScript Files Alongside Originals

1. Create new `.tsx`/`.ts` files with the same names
2. The original `.jsx`/`.js` files remain untouched
3. TypeScript resolvers typically prefer `.ts`/`.tsx` over `.js`/`.jsx`

### Barrel Export for TypeScript Resolution

When both `.jsx` and `.tsx` versions exist, create a `components/index.ts` barrel file to ensure TypeScript imports resolve correctly:

```typescript
// components/index.ts
export { ActionGrid, GRID_AREAS } from './action-grid';
export { default as Footer } from './footer';
export { HeadToHeadBanner } from './head-to-head-banner';
export { default as HeadToHeadHeader } from './head-to-head-header';
// ... other exports
```

Then import from the barrel file in parent components:

```typescript
// head-to-head-v2.tsx
import {
  Footer,
  HeadToHeadHeader,
  HeadToHeadBanner,
  Actions,
} from './components';
```

### Export Internal Types

When converting, ensure internal types are exported from `types.ts`:

```typescript
// types.ts - Make sure to export types needed by child components
export type Action = { /* ... */ };
export type PlayerActions = { /* ... */ };
export type RunningScores = { /* ... */ };
export type EventStatusType = 'PreEvent' | 'MidEvent' | 'PostEvent' | /* ... */;
```

## Additional Conversion Tips

### Handling ESLint Disable Comments

Preserve or add eslint disable comments where the original code had them:

```tsx
/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable import/prefer-default-export */
```

### Prefer Conditional Checks Over Non-Null Assertions

**Avoid:**
```tsx
{hasGroupedEvents && (
  <GroupedEvents groupedEvents={data.groupedActions!} />
)}
```

**Prefer:**
```tsx
{hasGroupedEvents && data.groupedActions && (
  <GroupedEvents groupedEvents={data.groupedActions} />
)}
```

### Using `Record` Types for Object Mappings

```typescript
const goalTypesHandled: Record<string, string> = {
  Penalty: 'pen',
  'Own Goal': 'og',
};

const MATCH_STATUS_LETTERS: Record<string, string> = {
  Postponed: 'P',
  Cancelled: 'C',
};
```

### Type-Safe Event Status Handling

Instead of using enums, prefer union types for event status:

```typescript
export type EventStatusType =
  | 'PreEvent'
  | 'MidEvent'
  | 'PostEvent'
  | 'Abandoned'
  | 'Cancelled'
  | 'Suspended'
  | 'Postponed'
  | 'Delayed'
  | 'Intermission';
```

### Helper Type for Badge Sizes

Define reusable types for common patterns:

```typescript
export type BadgeSize =
  | number
  | { small?: number; medium?: number; large?: number };

export type Alignment = 'home' | 'away';

export type BadgePlaceholderFallbackType = 'badge' | 'flag';
```

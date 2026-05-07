---
name: convert-webcore-component
description: A skill that converts components imported from webcore into more simorgh-like components, following the established coding standards and patterns.
---

# Convert Webcore Component Skill

This skill helps convert webcore-style React components (that use `@emotion/styled` or `styled-components`) into the Simorgh coding standard which uses Emotion's `css` prop pattern.

## Key Conversion Patterns

### 1. Styling Approach

**Before (webcore style using `styled`):**
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

**After (Simorgh style using `css` prop):**
```jsx

import styles from './index.styles';

const Component = () => <div css={styles.wrapper()}>Content</div>;
```

### 2. Creating index.styles.ts Files

Create a consolidated styles file with object styles:

```typescript
import { css } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  wrapper: () =>
    css({
      display: 'flex',
      padding: `${pixelsToRem(16)}rem`,
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        padding: `${pixelsToRem(24)}rem`,
      },
    }),
  
  // Style with parameters
  title: (isLarge?: boolean) =>
    css({
      fontSize: isLarge ? '2rem' : '1rem',
    }),
    
  // Style using theme (when needed)
  container: ({ mq, palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: '1rem',
      },
    }),
};
```

### 3. Converting Dynamic Styles

**Before:**
```jsx
const Button = styled.div`
  padding-${({ alignment }) => alignment === 'left' ? 'right' : 'left'}: 12px;
`;
```

**After:**
```typescript
// In index.styles.ts
button: (alignment: 'left' | 'right') =>
  css({
    ...(alignment === 'left'
      ? { paddingInlineEnd: `${pixelsToRem(12)}rem` }
      : { paddingInlineStart: `${pixelsToRem(12)}rem` }),
  }),
```

## Key Rules

1. **Always add JSX pragma** when using css prop:
   ```jsx
   
   ```

2. **Use logical CSS properties** for LTR/RTL support:
   - `paddingInlineStart` instead of `padding-left`
   - `marginBlockEnd` instead of `margin-bottom`
   - `borderInlineStart` instead of `border-left`

3. **Use mobile-first media queries** with `min-width`

4. **Use `pixelsToRem` utility** for pixel-to-rem conversion

5. **Group styles by component area** in the styles file with clear comments

6. **Export GRID_AREAS constants** from styles if used in multiple components:
   ```typescript
   export const GRID_AREAS = {
     homeText: 'home_text',
     awayText: 'away_text',
   } as const;
   ```

7. **Style functions always return `css()` call**, even with no parameters:
   ```typescript
   wrapper: () => css({ display: 'flex' }),
   ```

8. **Use arrays for composable styles**:
   ```typescript
   keyEventsHome: () => [
     baseStyles,
     css({ textAlign: 'end' }),
   ],
   ```

## File Structure

After conversion, a components directory should look like:

```
components/
├── index.styles.ts      # Consolidated styles
├── types.ts             # Shared TypeScript types
├── ComponentA.tsx       # TypeScript React component
├── ComponentB.tsx       # TypeScript React component
└── sub-component/
    └── index.tsx        # Uses ../index.styles or own styles
```

## TypeScript Conversion

When converting from JavaScript/JSX to TypeScript/TSX, follow these patterns:

### 1. File Extension Changes

- `.jsx` → `.tsx` (React components)
- `.js` → `.ts` (utility functions, helpers, enums)
- Keep `.ts` for style files (already TypeScript)

### 2. Props Type Definitions

**Before (JSX with JSDoc):**
```jsx
/**
 * @type {typeof import('./types.ts').MyComponent}
 */
const MyComponent = ({ name, count, isActive }) => {
  // ...
};
```

**After (TSX with interface):**
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

### 3. Import Existing Types

If a `types.ts` file exists, import and use those types:

```tsx
import type { HeadToHeadV2Data, Team, Action } from './types';

interface Props {
  data: HeadToHeadV2Data;
  isConciseView: boolean;
}
```

### 4. Children Props

```tsx
import type { PropsWithChildren, ReactNode } from 'react';

// Option 1: Using PropsWithChildren
interface WrapperProps {
  className?: string;
}

const Wrapper = ({ children, className }: PropsWithChildren<WrapperProps>) => (
  <div className={className}>{children}</div>
);

// Option 2: Explicit ReactNode
interface ContainerProps {
  children: ReactNode;
  title: string;
}
```

### 5. Event Handlers

```tsx
import type { MouseEvent, ChangeEvent } from 'react';

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
```

### 6. Enum Conversions

**Before (JS):**
```js
const EventStatus = {
  PreEvent: 'PreEvent',
  MidEvent: 'MidEvent',
  PostEvent: 'PostEvent',
};
```

**After (TS):**
```ts
export enum EventStatus {
  PreEvent = 'PreEvent',
  MidEvent = 'MidEvent',
  PostEvent = 'PostEvent',
}
// Or use const object with as const for string literal types:
export const EventStatus = {
  PreEvent: 'PreEvent',
  MidEvent: 'MidEvent',
  PostEvent: 'PostEvent',
} as const;

export type EventStatusType = typeof EventStatus[keyof typeof EventStatus];
```

### 7. Default Exports with Types

```tsx
// Named export (preferred)
export const MyComponent = ({ data }: Props) => <div>{data.name}</div>;

// Default export
export default MyComponent;
```

### 8. Conditional Rendering Types

Use type narrowing for conditional props:

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

### 9. Style Function Parameters

When style functions accept typed parameters:

```tsx
// In index.styles.ts
team: (isConciseView: boolean, shouldHideBadges: boolean, alignment: 'home' | 'away') =>
  css({
    display: 'flex',
    flexDirection: alignment === 'home' ? 'row' : 'row-reverse',
  }),
```

### 10. Utility Function Types

```ts
// Before
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// After
const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};
```

## Reference Examples

See these existing Simorgh components for reference:
- [src/app/components/Billboard/index.styles.ts](src/app/components/Billboard/index.styles.ts)
- [src/app/components/MediaLoader/index.styles.ts](src/app/components/MediaLoader/index.styles.ts)
- [src/app/components/Pagination/index.styles.ts](src/app/components/Pagination/index.styles.ts)

## Pre-Conversion Checklist

Before converting a webcore component, audit its imports for dependencies that may not exist in Simorgh:

### Check for @bbc/web-components imports
Webcore components often import from `@bbc/web-components/`. These are React components (not just styling) that need to be converted first:
- `Carousel` - horizontal scrollable container with heading
- `Heading` - has equivalent at `src/app/components/Heading/`
- Others - check on a case-by-case basis

### Check for @bbc/web-gel-layouts imports
- `Wrap` - provides GEL-compliant padding/margins. Replace with div + theme spacings.
- `Grid` components - may need custom CSS Grid implementation

### Check for @bbc/web-gel-foundations imports
These are typically design tokens that can be replaced:
- `SPACING_*` → Use theme `spacings` (HALF, FULL, DOUBLE, TRIPLE, QUADRUPLE, QUINTUPLE, SEXTUPLE)
- `GROUP_*` → Use theme `mq` media queries (GROUP_1_MIN_WIDTH, GROUP_2_MIN_WIDTH, etc.)
- `fontScale*`, `fontStandard` → Use theme typography via Text/Heading components
- `createSize` → Use `pixelsToRem()` utility

**If a component dependency is missing, stop the conversion and request it be imported first.**

## Common Mistakes to Avoid

1. **Don't mix styled components and css prop** in the same file
2. **Don't forget the JSX pragma** when using css prop
3. **Don't use physical CSS properties** like `left`, `right` for directional layouts
4. **Don't hardcode pixel values** - use `pixelsToRem()`
5. **Don't use `max-width` media queries** when `min-width` would work
6. **Don't pass dynamic props to styled components** - it generates new classes
7. **Don't proceed with conversion if @bbc/web-components dependencies are missing** - they need to be converted first

### TypeScript-Specific Mistakes

8. **Don't use `any` type** - prefer `unknown` or proper type definitions
9. **Don't forget to update imports** when renaming files from `.jsx` to `.tsx`
10. **Don't use `React.FC`** - use explicit return types or rely on inference
11. **Don't duplicate types** - import from existing `types.ts` files where available
12. **Don't use non-null assertions (`!`)** without good reason - prefer optional chaining (`?.`)
13. **Don't leave JSDoc type annotations** after converting to TypeScript - they become redundant
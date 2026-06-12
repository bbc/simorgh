---
name: convert-webcore-component
description: Converts webcore-style React components to Simorgh coding standards using Emotion's css prop pattern
---

# Convert Webcore Component

Converts webcore-style React components (using `@emotion/styled` or `styled-components`) into the Simorgh coding standard which uses Emotion's `css` prop pattern.

## Step 1: Pre-Conversion Checklist

Before converting, audit imports for missing dependencies. **If dependencies are missing, stop and request they be imported first.**

### @bbc/web-components imports
- `Carousel` - horizontal scrollable container with heading
- `Heading` - has equivalent at `src/app/components/Heading/`

### @bbc/web-gel-layouts imports
- `Wrap` - replace with div + theme spacings
- `Grid` - may need custom CSS Grid implementation

### @bbc/web-gel-foundations imports
- `SPACING_*` → Use theme `spacings`
- `GROUP_*` → Use theme `mq` media queries
- `fontScale*`, `fontStandard` → Use theme typography
- `createSize` → Use `pixelsToRem()`

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

```jsx
import styles from './index.styles';

const Component = () => <div css={styles.wrapper()}>Content</div>;
```

### Creating index.styles.ts Files

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
    
  // Style using theme
  container: ({ mq, palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: '1rem',
      },
    }),
};
```

### Dynamic Styles

**Before:**
```jsx
const Button = styled.div`
  padding-${({ alignment }) => alignment === 'left' ? 'right' : 'left'}: 12px;
`;
```

**After:**
```typescript
button: (alignment: 'left' | 'right') =>
  css({
    ...(alignment === 'left'
      ? { paddingInlineEnd: `${pixelsToRem(12)}rem` }
      : { paddingInlineStart: `${pixelsToRem(12)}rem` }),
  }),
```

### Styling Rules

1. **Use logical CSS properties** for LTR/RTL support:
   - `paddingInlineStart` instead of `padding-left`
   - `marginBlockEnd` instead of `margin-bottom`
   - `borderInlineStart` instead of `border-left`

2. **Use mobile-first media queries** with `min-width`

3. **Use `pixelsToRem` utility** for pixel-to-rem conversion

4. **Group styles by component area** in the styles file

5. **Export GRID_AREAS constants** from styles if used in multiple components:
   ```typescript
   export const GRID_AREAS = {
     homeText: 'home_text',
     awayText: 'away_text',
   } as const;
   ```

6. **Style functions always return `css()` call**:
   ```typescript
   wrapper: () => css({ display: 'flex' }),
   ```

7. **Use arrays for composable styles**:
   ```typescript
   keyEventsHome: () => [
     baseStyles,
     css({ textAlign: 'end' }),
   ],
   ```

### Styling Mistakes to Avoid

- Don't mix styled components and css prop in the same file
- Don't use physical CSS properties (`left`, `right`) for directional layouts
- Don't hardcode pixel values - use `pixelsToRem()`
- Don't use `max-width` media queries when `min-width` would work
- Don't pass dynamic props to styled components

## Step 3: Convert to TypeScript

### File Extensions

- `.jsx` → `.tsx` (React components)
- `.js` → `.ts` (utilities, helpers, enums)

### File Structure

```
components/
├── index.styles.ts      # Consolidated styles
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

- [src/app/components/Billboard/index.styles.ts](../../../src/app/components/Billboard/index.styles.ts)
- [src/app/components/MediaLoader/index.styles.ts](../../../src/app/components/MediaLoader/index.styles.ts)
- [src/app/components/Pagination/index.styles.ts](../../../src/app/components/Pagination/index.styles.ts)

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

### `@jsxImportSource` Pragma NOT Needed in Simorgh

Simorgh's `tsconfig.json` already has `"jsxImportSource": "@emotion/react"` configured globally, so you do **not** need to add the pragma comment to individual files:

```tsx
// NOT needed in Simorgh - already configured globally
/** @jsxImportSource @emotion/react */
```

If you're working in a different project without global configuration, you would need the pragma.

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

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
/** @jsxImportSource @emotion/react */
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
   /** @jsxImportSource @emotion/react */
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
├── ComponentA.jsx       # Uses css prop with styles import
├── ComponentB.jsx       # Uses css prop with styles import
└── sub-component/
    └── index.js         # Uses ../index.styles or own styles
```

## Reference Examples

See these existing Simorgh components for reference:
- [src/app/components/Billboard/index.styles.ts](src/app/components/Billboard/index.styles.ts)
- [src/app/components/MediaLoader/index.styles.ts](src/app/components/MediaLoader/index.styles.ts)
- [src/app/components/Pagination/index.styles.ts](src/app/components/Pagination/index.styles.ts)

## Common Mistakes to Avoid

1. **Don't mix styled components and css prop** in the same file
2. **Don't forget the JSX pragma** when using css prop
3. **Don't use physical CSS properties** like `left`, `right` for directional layouts
4. **Don't hardcode pixel values** - use `pixelsToRem()`
5. **Don't use `max-width` media queries** when `min-width` would work
6. **Don't pass dynamic props to styled components** - it generates new classes
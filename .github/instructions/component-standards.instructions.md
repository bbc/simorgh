---
description: "Component Standards"
applyTo: "src/app/components/**"
---
# Component Standards

## General Principles
- Write self-documenting code.
- Follow the KISS principle.
- Reuse existing components and patterns.
- Prefer composition over duplication.

## Technology Stack
- React
- TypeScript
- Emotion
- Jest
- Storybook

## Component Requirements
- Use functional components.
- Use typed props.
- Default export components.
- Avoid side effects where possible.

Use existing shared components over native HTML elements:
- `#app/components/Heading`
- `#app/components/Paragraph`
- `#app/components/Text`
- `#app/components/Image`
- `#app/components/InlineLink`

## Structure
Each component must contain:

```text
<ComponentName>/
├── index.tsx
├── index.styles.tsx
├── index.test.tsx
├── index.stories.tsx
├── metadata.json
└── README.md
```

## Reference Implementations
Use `src/app/components/Example` as the canonical reference for component structure, styling, testing, Storybook configuration and documentation.

## Testing
Import from:

```tsx
src/app/components/react-testing-library-with-providers
```

- Use `it.each()` for repetitive cases.

## Storybook
- Use `args` and `argTypes` when helpful.

## Accessibility
- Follow existing accessibility standards and patterns.
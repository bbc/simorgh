---
description: "Component Standards"
applyTo: "src/app/components/**"
---
# Component Standards

## Technology Stack
- React
- TypeScript
- SCSS Modules (see styling-standards.instructions.md)
- Jest
- Storybook

## Component Requirements
- Use functional components.
- Use typed props.
- Default export components.
- Avoid side effects where possible.

Use existing components over native HTML elements:
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
├── index.module.scss
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
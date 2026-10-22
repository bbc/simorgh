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

Instead of mocking react context and context providers, use the `react-testing-library-with-providers` render(<Component />, { contextValues }) function and pass down the necessary context values as arguments. See src/app/components/README.mdx for more details or the file src/app/components/react-testing-library-with-providers.tsx for implementation details.
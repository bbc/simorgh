---
name: new-component
description: 'Scaffold a new React component in src/app/components/ following the Simorgh Paragraph reference pattern: index.tsx with Emotion object styles, colocated Jest tests using the custom RTL wrapper, a Storybook story, and a README. Use when the user asks to create, scaffold, or add a new component.'
argument-hint: 'ComponentName (PascalCase)'
---

# New Simorgh component

Create a new component directory under [src/app/components/](../../../src/app/components/) following the convention used by [Paragraph](../../../src/app/components/Paragraph/).

## When to use

- The user asks to "create a new component", "scaffold a component", "add a component called X", etc.
- The change is in the Express app's shared component tree (`src/app/components/`). For Next.js-only components, the pattern is the same but the location may be `ws-nextjs-app/`.

## Inputs

- **ComponentName**: PascalCase (e.g. `Headline`, `MediaCaption`). The folder name and default export must match.

## Procedure

1. Confirm the ComponentName with the user if not given. Reject names that aren't PascalCase or that already exist in `src/app/components/`.
2. Create the directory `src/app/components/<ComponentName>/` with these four files (templates in [./assets/](./assets/)):
   - `index.tsx` — `FC<Props>` with Emotion `css` prop using **object-styles** syntax. Props interface extends a relevant DOM type when the component renders an HTML element. Use a single destructured object parameter.
   - `index.test.tsx` — imports `render`, `screen` from `../react-testing-library-with-providers` (never `@testing-library/react`). Includes at least one base test and one service-aware test (e.g. `service: 'arabic'` for RTL).
   - `index.stories.tsx` — Storybook story exporting a `default` config and an `Example`. Mirror the structure of [Paragraph/index.stories.tsx](../../../src/app/components/Paragraph/index.stories.tsx).
   - `README.md` — short description, props table, and a "How to use" code block.
3. Run `yarn test:unit -- <ComponentName>` and `yarn test:lint` to verify.
4. Do **not** add new external dependencies. Compose existing components from `src/app/components/` (e.g. `Text`) and Psammead from `src/app/legacy/psammead/` first.

## Conventions to enforce

- Emotion **object-styles** only. No string template CSS. Do not introduce `*.module.scss` (that path exists only for [ThemeProviderSCSSModules](../../../src/app/components/ThemeProviderSCSSModules/)).
- `const` everywhere; no reassignment.
- Limit props; if more than ~4, refactor into a single object param.
- Service-aware: don't hard-code English/LTR. Read service via context if needed.
- WCAG 2.1 AA: semantic HTML, accessible names, keyboard support.

## References

- Reference component: [src/app/components/Paragraph/](../../../src/app/components/Paragraph/)
- Custom RTL wrapper: [src/app/components/react-testing-library-with-providers.tsx](../../../src/app/components/react-testing-library-with-providers.tsx)
- Templates: [./assets/index.tsx.template](./assets/index.tsx.template), [./assets/index.test.tsx.template](./assets/index.test.tsx.template), [./assets/index.stories.tsx.template](./assets/index.stories.tsx.template), [./assets/README.md.template](./assets/README.md.template)

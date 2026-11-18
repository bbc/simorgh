---
name: modernise-legacy-component
description: Relocates and modernises legacy Simorgh components to current coding standards. Use when asked to migrate, move, refactor or modernise components out of src/app/legacy, including legacy containers and psammead modules, or plan a legacy migration cluster. Covers dependency analysis, TypeScript, public APIs, consumers and tests; reuse migrate-component-to-scss-modules for styling conversion.
---

# Modernise a Legacy Component

Use this workflow for the broader migration out of `src/app/legacy`, not for a
styling-only conversion of an existing modern component.

Before starting, read:

- [Migrating Legacy Components](../../../docs/Coding-Standards/Migrating-Legacy-Components.mdx)
  for the human-readable migration guidance.
- [Coding Standards](../../../docs/Coding-Standards/README.md) and the component and
  styling instructions under `.github/instructions/`.
- The source component, its tests and stories, and the proposed destination.

## 1. Establish the live dependency cluster

Resolve imports using `dirAlias.js`. The `#components`, `#containers` and
`#psammead` aliases point into legacy; searching only for `legacy/` misses them.
Check relative imports and `#app/legacy/...` too.

Trace consumers outside **and inside** legacy, then follow transitive dependencies.
Do not declare a module unused just because it has no direct non-legacy importer:
it may be reached through a live legacy parent. Include routes, dynamic imports,
stories, tests and configuration when checking reachability.

Identify shared dependencies and cycles before editing. Migrate leaves bottom-up;
keep mutually dependent components together. If the cluster is too broad, report
the prerequisite or propose a bounded migration unit rather than silently
expanding scope.

## 2. Choose the destination and preserve the contract

Check for an existing component or utility before creating another public API.
Use `src/app/components` for UI and the appropriate `src/app/lib` location for
non-UI code, following neighbouring modules.

Inspect consumers for props, polymorphic `as`, refs, `className`, Emotion `css`
props and `styled(Component)` extensions. Record service-specific behaviour,
translations, variants, RTL, accessibility, analytics and canonical/AMP/Lite
differences. Preserve these contracts, not just the default Storybook rendering.

In particular, an Emotion consumer may override the component's styles at
runtime. Do not assume CSS Modules will preserve that precedence: migrate the
coupled consumer or report it as a blocker.

## 3. Relocate and modernise

Use functional React components and TypeScript with explicit props, following
current component standards. Use `PropsWithChildren` when needed; extract types
only when shared. Preserve behaviour and avoid speculative API additions.

For styling, use the existing
[`migrate-component-to-scss-modules` skill](../migrate-component-to-scss-modules/SKILL.md)
for triage, token mapping, conversion and verification. Do not duplicate its
mechanical instructions here. Its legacy-location exclusion means relocation
and dependency decisions belong to this workflow; moving the file alone does
not remove its other blockers.

Use the SCSS theme's typography APIs to retain service and PWA overrides rather
than hard-coding fonts or adding component-level PWA detection.

Update all importers and any affected alias, side-effect, type-declaration or
Storybook configuration. Move relevant stories and tests with the implementation.
Remove the old module in the same change; do not leave parallel legacy and modern
copies. Update directly affected documentation.

## 4. Verify the migration

- Replace legacy markup snapshots with behavioural coverage of content, links,
  semantics, interactions and conditional rendering. Preserve integration
  coverage; inspect any snapshot updates rather than accepting them wholesale.
- Use `src/app/components/react-testing-library-with-providers` and its provider
  options for React tests.
- Run focused tests for the component and affected consumers, plus lint on
  touched source paths.
- Follow the SCSS skill's build, integration and browser verification, including
  canonical, AMP and Lite, an RTL service and relevant dark-UI/PWA states.
  Jest mocks SCSS Modules, so passing unit tests alone does not validate CSS.
- Check that old imports and paths are gone and that the migration adds no new
  legacy coupling. Do not disable the import ratchet to hide dependencies.

Report what moved, any blockers or deliberate deferrals, and the verification
actually performed. Do not describe partial relocation as a completed migration.

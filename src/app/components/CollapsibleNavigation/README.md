## Description

The `CollapsibleNavigation` component renders a **collapsible navigation menu** with top-level sections that expand to reveal sub-links.

It is designed to be flexible and can be used in different contexts.
For example, on BBC World Service sites it displays regions (e.g. _Africa, Asia, Europe_) with sub-sections for language services (e.g. _Hausa, Yoruba_).

---

## When to use this component

Use this component whenever you need **grouped navigation items with expandable/collapsible sub-sections**.
It works for site navigation, grouped menus, or any structured list of links.

---

## How it works

- Renders an array of sections, each with a `title` and optional `href` or set of `links`.
- Each section can expand/collapse independently.
- Accessibility attributes (`aria-expanded`, `aria-controls`, `aria-current`) are included for screen reader support.
- A section may:
- render **only as a link** (e.g. _Home_), or
- render as an **expandable section** containing sub-menu items.

---

## Props

| Prop               | Type                                                                                                                                                        | Required | Description                                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| navigationSections | [CollapsibleNavigationSection](https://github.com/bbc/simorgh/blob/latest/src/app/components/CollapsibleNavigation/types.ts) | Yes      | Array of navigation sections. Each section can either render as a single link (e.g. _Home_) or as an expandable section with sub-links. |

---

### Example Configuration

[Configuration for Languages & Regions Navigation Menu](https://github.com/bbc/simorgh/blob/latest/src/app/components/LanguageNavigation/constants.tsx)

---

## How to use

```tsx
<CollapsibleNavigation navigationSections={sections} />
```

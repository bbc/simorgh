# CollapsibleNavigation

The `CollapsibleNavigation` component renders a **collapsible navigation menu** with top-level sections that expand to reveal sub-links.

It is designed to be flexible and can be used in different contexts.
For example, on BBC World Service sites it displays regions (e.g. *Africa, Asia, Europe*) with sub-sections for language services (e.g. *Hausa, Yoruba, Kiswahili*).

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
- render **only as a link** (e.g. *Home*), or
- render as an **expandable section** containing sub-menu items.

---

## Props

| Prop | Type | Required | Description |
|--------------------|---------------------------------|----------|-----------------------------------------------------------------------------|
| `navigationSections` | `CollapsibleNavigationSection[]` | Yes | Array of navigation sections. Each section can either render as a single link (e.g. *Home*) or as an expandable section with sub-links. |


Example in (./contants.tsx)
---

## Types

The full type definitions are available in (./types.ts).
Not all props are required — for example, a section may have just an `href` without `links`, or just `links` without `href`.

```ts
type CollapsibleNavigationSubLink = {
id: string;
label: string;
href: string;
};

export type CollapsibleNavigationSection = {
id: string;
title: string;
href?: string;
links?: CollapsibleNavigationSubLink[];
};

---

## How to use

```tsx
<CollapsibleNavigation
collapsibleNavigationSections={sections}
/>
```

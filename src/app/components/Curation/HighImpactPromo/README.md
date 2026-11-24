## Description

The `HighImpactPromo` component renders a high-prominence promotional item with enhanced visual styling for featured content in curations.

It displays curated items with "Maximum" prominence level, providing a visually distinct appearance from standard curation items on WS Language pages.

---

## When to use this component

Use this component for featured content that requires maximum visual prominence in curations.
Typically used when editors set a curation item's prominence to "Maximum" in Tipo CMS.

---

## How it works

- Renders promotional content with enhanced visual styling.
- Integrates with the existing Standard Grid flow.
- Provides clear visual distinction from standard curation items.
- Subject link is derived from `relatedTopic` when present, otherwise it falls back to service context (brand name and service URL).

---

## Props

| Prop                | Type    | Required | Description                                                      |
| ------------------- | ------- | -------- | ---------------------------------------------------------------- |
| `title`             | string  | Yes      | The promotional headline.                                        |
| `link`              | string  | Yes      | URL destination for the promo.                                   |
| `imageUrl`          | string  | Yes      | Image URL for the promotional content.                           |
| `imageAlt`          | string  | Yes      | Alt text for the promotional image.                              |
| `lazy`              | boolean | No       | Enables lazy loading for the image.                              |
| `headingLevel`      | number  | No       | The heading level for the title (defaults to 3).                 |
| `eventTrackingData` | object  | No       | Tracking metadata for analytics.                                 |
| `relatedTopic`      | object  | No       | An object with `title` and `link.url` used for the subject link. |

---

## How to use

```tsx
<HighImpactPromo
  title="Featured Story Headline"
  link="https://www.bbc.com/mundo/articles/c78z0d995zno"
  imageUrl="https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/cfe3/live/aa80f600-8386-11f0-91dd-e9a70634460f.jpg.webp"
  imageAlt="Featured story image"
  eventTrackingData={{ componentName: 'high-impact-promo' }}
/>
```

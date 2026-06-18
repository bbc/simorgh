# ArticleMessageBanner

An applied compound component that conditionally renders a `MessageBanner` on Article pages. It reads the list of configured banners from `ServiceContext`, matches them against the article's `aboutTags`, and applies toggle and editorial sensitivity guards before rendering the first matching banner.

This component is service-aware: the set of banners that can appear, and the tag IDs they respond to, are configured per-service in the service configuration file under `articleMessageBanners`.

## Props

| Name        | Type                | Required | Description                                                                  |
| ----------- | ------------------- | -------- | ---------------------------------------------------------------------------- |
| `aboutTags` | `Tag[]`             | Yes      | The article's about-tags used to match against configured banner `thingIds`  |
| `taggings`  | `MetadataTaggings`  | Yes      | Editorial taggings; presence of the sensitive article ID prevents rendering  |

## Rendering conditions

The banner is **not** rendered when any of the following are true:

- The page is in **lite mode** (`isLite` from `RequestContext`)
- No `articleMessageBanners` are configured for the service
- None of the article's `aboutTags` match a configured banner's `thingIds`
- The article has an **editorial sensitivity** tagging matching `SENSITIVE_ARTICLE_ID`
- The `electionBanner` feature toggle is **disabled**

## A11y notes

- The banner uses the `MessageBanner` compound component which provides a named region landmark.
- The heading is rendered as `<strong>` styled to look like a paragon heading rather than an `<h2>`, as `ArticleMessageBanner` sits within the article body where heading hierarchy is managed by the surrounding page.
- The banner image is decorative (`alt=""`).

## Usage

```tsx
<ArticleMessageBanner
  aboutTags={aboutTags}
  taggings={taggings}
/>
```

The banner content (heading, description, link, image) is sourced entirely from the service configuration — no content props are passed directly.

### Service configuration example

```json
{
  "articleMessageBanners": [
    {
      "thingIds": ["b91eaef4-fdf2-47a6-b3ec-05b5a55a4843"],
      "heading": "Quem está à frente nas pesquisas para presidente?",
      "description": "Acompanhe todos os dados das pesquisas eleitorais.",
      "linkHref": "https://www.bbc.com/portuguese/articles/election-tracker",
      "linkText": "Ver pesquisas",
      "image": "https://ichef.bbci.co.uk/ace/ws/{width}/example.png"
    }
  ]
}
```

### RTL usage

The component inherits direction from the surrounding page context and requires no additional configuration.

## Component hierarchy

- **Compound component**: `MessageBanner` (`src/app/components/MessageBanner`)
- **Applied compound component** (this component): `ArticleMessageBanner`

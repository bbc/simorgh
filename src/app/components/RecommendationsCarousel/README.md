# Recommendations carousel

Displays the existing article recommendations as horizontally scrollable,
portrait (9:16) image cards with overlaid headlines. Cards link to articles;
they do not play videos. Landscape recommendation images are centre-cropped.

`Recommendations` selects this layout only for Mundo canonical article pages.
`ArticlePage` moves it below the article, immediately above Topic Discovery.
Its existing feature toggle, Most Read
availability, translated heading, skip links and experiment tracking still apply.
AMP, Lite, other page types and other services retain the original layout.

The carousel reuses the portrait video carousel's navigation and recommendation
image handling. Article links remain keyboard-accessible and usable without
JavaScript. Images are lazy-loaded, and long headlines are not truncated.

| Prop                | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| `data`              | Existing `Recommendation[]` data, without reordering or transformation. |
| `title`             | Localised recommendations heading.                                      |
| `eventTrackingData` | Existing recommendations analytics and experiment data.                 |

## Previewing

Run `yarn storybook`, then open:

- **Components / RecommendationsCarousel / Multiple Items** for the standalone
  component, or **Single Item** for a single recommendation.
- **Pages / Article Page / Article Page With Recommendations Carousel** for a
  Mundo article with the carousel immediately above Topic Discovery.

The article story enables the required recommendation and Topic Discovery
toggles and uses the existing Mundo article fixture. The same article is
available in the local app at `/mundo/articles/cddylv9g8z0o`.

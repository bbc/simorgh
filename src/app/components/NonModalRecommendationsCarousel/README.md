# Non-modal recommendations carousel

Displays existing recommendations as horizontally scrollable portrait (9:16)
cards. Cards link directly to articles without opening a modal. Images are
lazy-loaded and centre-cropped; headlines are not truncated.

`Recommendations` uses this layout for canonical Mundo articles, preserving its
feature toggle, Most Read availability, heading, skip links and tracking.
`ArticlePage` renders it once after the expanded article, before Topic Discovery
or related-topic tags. Other services, AMP and Lite retain the inline layout.

| Prop                | Description                                         |
| ------------------- | --------------------------------------------------- |
| `data`              | Existing `Recommendation[]`, in the supplied order. |
| `title`             | Localised recommendations heading.                  |
| `eventTrackingData` | Existing recommendations and experiment tracking.   |

## Storybook

- **Components / NonModalRecommendationsCarousel / Non-modal Mundo Carousel**
  uses the same Mundo fixture as the article story.
- **Multiple Items** and **Single Item** provide smaller generic examples.
- **Pages / Article Page / Article Page With Recommendations Carousel** previews
  the normal non-modal Mundo article layout.

Modal and stacked-square prototypes remain under
**Components / RecommendationsCarousel**.

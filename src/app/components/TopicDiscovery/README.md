# TopicDiscovery

A tabbed content discovery component for article pages that surfaces closely related content based on topic-tag recommendations returned by the BFF (currently using fixture).
This component is intended to help readers continue exploring relevant content without manually searching, while enabling product teams to validate whether topic-based recommendations improve engagement and session depth.

## Overview

`TopicDiscovery` renders a topic-based recommendation module using BFF-provided data. Each topic is displayed as a tab, and selecting a tab reveals up to 4 associated content promos.

The component is:

- **Frontend-only**
- **Canonical-only** (not supported on AMP or lite)
- Designed for **experiment-based rollout**
- Instrumented for **analytics tracking**
- Built with **responsive** and **keyboard-accessible** behaviour in mind

## Features

- Renders only when valid topic discovery data is available
- Displays recommendations grouped into tabs by topic
- Supports:
  - `article`
  - `video`
  - `audio`
- Shows the latest 4 items per topic (as provided by the BFF)
- Includes horizontally scrollable tabs with arrow controls
- Supports keyboard navigation across tabs
- Tracks:
  - component impressions
  - promo clicks
  - tab interactions (via click handler where required)
- Reuses existing `CurationGrid` promo rendering patterns

## Usage

Minimal topicDiscovery shape:

```json
{
  "topics": [
    {
      "topicId": "env",
      "topicName": "Environment",
      "items": [
        {
          "id": "item-1",
          "title": "Climate action update",
          "link": "/news/articles/item-1",
          "imageUrl": "https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01wjx8g.jpg",
          "imageAlt": "Wind turbines",
          "type": "article",
          "description": "Short summary",
          "firstPublished": 1600000000000
        }
      ]
    }
  ]
}
```

Example usage:

```tsx
import TopicDiscovery from '#app/components/TopicDiscovery';

<TopicDiscovery
  topicDiscovery={topicDiscoveryData}
  headingText="Explore related topics"
/>;
```

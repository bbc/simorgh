### Description

This component renders a horizontally scrollable portrait video carousel for the World Service homepage. It displays a curated list of portrait-format video promos, each in a 9:16 aspect ratio. Clicking on a promo opens a full-screen modal with video playback.

The carousel includes:

- A `<section>` landmark with an H2 heading
- A `<ul>` list of portrait video promos
- Smooth native scroll behaviour with left/right chevron navigation
- Modal playback via `PortraitVideoModal` rendered in a `<dialog>` element for accessibility and fullscreen support
- Graceful fallback with a `<noscript>` warning for users without JavaScript
- Analytics integration via `ATI` (Piano) item and group tracking
- RTL direction support via `dir` from `ServiceContext`

This carousel is rendered only for curations with:

- `visualStyle: 'INSITU'`
- `visualProminence: 'NORMAL'`
- Between **7 and 20** portrait video blocks

---

### Props

#### `PortraitVideoCarouselProps`

| Prop              | Type                       | Required | Description                                                                    |
| ----------------- | -------------------------- | -------- | ------------------------------------------------------------------------------ |
| `title`           | `string`                   | Yes      | The heading text displayed above the carousel                                  |
| `groupTrackingId` | `string`                   | No       | Optional group ID used for ATI analytics                                       |
| `blocks`          | `PortraitClipMediaBlock[]` | Yes      | Array of portrait video blocks from the Simorgh BFF enriched homepage response |

---

### PortraitClipMediaBlock structure

Each `block` must conform to the following shape:

```tsx
type PortraitClipMediaBlock = {
  type: 'portraitClipMedia';
  model: {
    type: string;
    images: {
      source: string;
      urlTemplate?: string;
      altText?: string;
    }[];
    video: {
      id: string;
      title: string;
      holdingImageURL?: string;
      version: {
        id: string;
        duration: string;
        kind: string;
        guidance: string | null;
        territories?: string[];
      };
      isEmbeddingAllowed: boolean;
    };
  };
};
```

Each `PortraitClipMediaBlock` in `blocks` includes:
| Property | Type | Description |
| -------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `model.video.id` | `string` | Unique identifier for the video |
| `model.video.title` | `string` | Video headline text |
| `model.video.version.duration` | `number` (in seconds) | Duration of the video in seconds |
| `model.images` | `{ source: string; urlTemplate?: string; altText?: string }[]` | Array of images for the promo (first image is used for display) |
| `model.video.guidance` | `string` (optional) | Editorial guidance, e.g. content warnings (if present) |
| `model.video.territories` | `string[]` (optional) | List of countries where the video is available |
| `model.video.kind` | `string` (optional) | The content kind, e.g. `'clip'`, `'segment'` |
| `model.video.isEmbeddingAllowed` | `boolean` | Indicates whether the video can be embedded (used in modal logic) |

## How to use

```tsx
<PortraitVideoCarousel
  title="Trending portrait stories"
  blocks={[
    {
      type: 'portraitClipMedia',
      model: {
        video: {
          id: 'p1234567890',
          title: 'Mock headline 1',
          version: {
            duration: 120,
          },
          guidance: 'Some guidance',
          territories: ['GB', 'US'],
          kind: 'clip',
          isEmbeddingAllowed: true,
        },
        images: [
          {
            source: 'https://ichef.bbci.co.uk/image1.jpg',
            urlTemplate: 'https://ichef.bbci.co.uk/{width}/image1.jpg',
            altText: 'Alt text 1',
          },
        ],
      },
    },
    {
      type: 'portraitClipMedia',
      model: {
        video: {
          id: 'p0987654321',
          title: 'Mock headline 2',
          version: {
            duration: 90,
          },
          isEmbeddingAllowed: false,
        },
        images: [
          {
            source: 'https://ichef.bbci.co.uk/image2.jpg',
            altText: 'Alt text 2',
          },
        ],
      },
    },
  ]}
/>
```

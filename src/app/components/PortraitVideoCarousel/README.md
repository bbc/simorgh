## Description

This component renders a horizontally scrollable portrait video carousel for the World Service homepage. It consists of a section landmark with an H2 heading and a list of promos displayed in a 9:16 portrait aspect ratio. Each promo contains an image, a headline, and links to a corresponding article or video. Navigation arrows allow horizontal scrolling in fixed increments.

The carousel is rendered based on the `visualStyle` of `INSITU` and a `visualProminence` of `NORMAL`, and is rendered as part of curated content on the homepage. The scroll behavior is smooth and native-like, with automatic chevron visibility based on scroll position. The minimum number of video promos required to render the carousel is 7 and the maximum is 20.

## Props

| Name  | Type                | Description                                                                    |
| ----- | ------------------- | ------------------------------------------------------------------------------ |
| title | string              | The H2 title displayed above the carousel                                      |
| items | PortraitVideoItem[] | An array of portrait video promos containing image, link and headline metadata |

Each `PortraitVideoItem` in `items` includes:

| Property  | Type                                | Description                     |
| --------- | ----------------------------------- | ------------------------------- |
| id        | string                              | Unique identifier for the promo |
| images    | { url: string; altText?: string }[] | Array of images (uses first)    |
| headlines | { promoHeadline?: string }          | Video headline text             |
| link      | { path: string }                    | Video promo destination link    |

## How to use

```tsx
<PortraitVideoCarousel
  title="Trending portrait stories"
  items={[
    {
      id: '1',
      images: [
        { url: 'https://ichef.bbci.co.uk/image1.jpg', altText: 'Alt text 1' },
      ],
      headlines: { promoHeadline: 'Mock headline 1' },
      link: { path: '/mock/link/1' },
    },
    {
      id: '2',
      images: [
        { url: 'https://ichef.bbci.co.uk/image2.jpg', altText: 'Alt text 2' },
      ],
      headlines: { promoHeadline: 'Mock headline 2' },
      link: { path: '/mock/link/2' },
    },
  ]}
/>
```

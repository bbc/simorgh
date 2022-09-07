# Image

## Description

The `Image` component is used to render an image using the correct custom style for for the service. It supports pre-load and lazy loading and can render a placeholder when image is loading. The image component supports webP in the first instance and makes use of jpeg as a fallback format.

## Props

| Name             | type             | Description                                                                                                                                                                                                                                                                                         |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alt              | string           | Stuff                                                                                                                                                                                                                                                                                               |
| src              | string           | Stuff                                                                                                                                                                                                                                                                                               |
| originCode       | string           | Stuff                                                                                                                                                                                                                                                                                               |
| imageResolutions | array of numbers | Stuff                                                                                                                                                                                                                                                                                               |
| sizes            | string           | Stuff                                                                                                                                                                                                                                                                                               |
| width            | number           | Stuff                                                                                                                                                                                                                                                                                               |
| height           | number           | Stuff                                                                                                                                                                                                                                                                                               |
| className?       | string           | Stuff                                                                                                                                                                                                                                                                                               |
| aspectRatio?     | number           | Stuff                                                                                                                                                                                                                                                                                               |
| lazyLoad?        | boolean          | Stuff                                                                                                                                                                                                                                                                                               |
| preload?         | boolean          | Stuff                                                                                                                                                                                                                                                                                               |
| placeholder?     | boolean          | Stuff                                                                                                                                                                                                                                                                                               |
| isAmp?           | boolean          | Stuff                                                                                                                                                                                                                                                                                               |
| fontVariant?     | string           | Used to render the correct `font-family`, `font-style` and `font-weight`. Possible values are `sansRegular`, `sansRegularItalic`, `sansBold`, `sansBoldItalic`, `sansLight`, `serifRegular`, `serifMedium`, `serifMediumItalic`, `serifBold`, `serifLight`. The default is `sansRegular`.           |
| size?            | string           | The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). Possible values are `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`. The default is `pica`. |

## How to use

```tsx
<Image
  isAmp={false}
  alt="orange 1"
  src="41BC/test/_63482861_orange1.jpg"
  primarySrcset="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w"
  primaryMimeType="image/webp"
  fallbackSrcset="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
  fallbackMimeType="image/jpeg"
  sizes="(max-width: 600px) 480px, 800px"
  width={500}
  height={281}
/>
```

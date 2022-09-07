# Image

## Description

The `Image` component is used to render an image using the correct custom style for for the service. It supports pre-load and lazy loading. The image component supports webP in the first instance and makes use of jpeg as a fallback format.

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
<Image>By default, this is text in a regular sans-serif font, in bodyCopy size and inside of a p element.</Image>

<Image size="atlas">This is text in a regular sans-serif font, in atlas size and inside of a p element.</Image>

<Image fontVariant="serifBold">This is text in a bold serif font, in bodyCopy size and inside of a p element.</Image>

<Image fontVariant="serifBold" size="atlas">This is text in a bold serif font, in atlas size and inside of a paragraph element.</Image>
```

# Text

## Description

The `Text` component is used to render the correct typography for the service. For example text in `mundo` would have different `font-family`, `font-size`, `line-height`, `font-weight` values from text in `arabic`.

## Props

| Name         | type   | Description                                                                                                                                                                                                                                                                                         |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as?          | string | The HTML element to render the text in e.g. `h1`, `span`, `p`. The default is `span`.                                                                                                                                                                                                               |
| fontVariant? | string | Used to render the correct `font-family`, `font-style` and `font-weight`. Possible values are `sansRegular`, `sansRegularItalic`, `sansBold`, `sansBoldItalic`, `sansLight`, `serifRegular`, `serifMedium`, `serifMediumItalic`, `serifBold`, `serifLight`. The default is `sansRegular`.           |
| size?        | string | The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). Possible values are `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`. The default is `pica`. |

## How to use

```tsx
<Text>By default, this is text in a regular sans-serif font, in pica size and inside of a span element.</Text>

<Text as="p">This is text in a regular sans-serif font, in pica size and inside of a paragraph element.</Text>

<Text size="atlas">This is text in a regular sans-serif font, in atlas size and inside of a span element.</Text>

<Text fontVariant="serifBold">This is text in a bold serif font, in pica size and inside of a span element.</Text>

<Text as="p" fontVariant="serifBold" size="atlas">This is text in a bold serif font, in atlas size and inside of a paragraph element.</Text>
```

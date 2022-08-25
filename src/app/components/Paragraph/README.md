# Paragraph

## Description

The `Paragraph` component is used to render paragraph text using the correct typography for the service. It extends the [`Text`](../Text/README.md) component.

## Props

| Name         | type   | Description                                                                                                                                                                                                                                                                                         |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fontVariant? | string | Used to render the correct `font-family`, `font-style` and `font-weight`. Possible values are `sansRegular`, `sansRegularItalic`, `sansBold`, `sansBoldItalic`, `sansLight`, `serifRegular`, `serifMedium`, `serifMediumItalic`, `serifBold`, `serifLight`. The default is `sansRegular`.           |
| size?        | string | The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). Possible values are `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`. The default is `pica`. |

## How to use

```tsx
<Paragraph>By default, this is text in a regular sans-serif font, in bodyCopy size and inside of a p element.</Paragraph>

<Paragraph size="atlas">This is text in a regular sans-serif font, in atlas size and inside of a p element.</Paragraph>

<Paragraph fontVariant="serifBold">This is text in a bold serif font, in bodyCopy size and inside of a p element.</Paragraph>

<Paragraph fontVariant="serifBold" size="atlas">This is text in a bold serif font, in atlas size and inside of a paragraph element.</Paragraph>
```

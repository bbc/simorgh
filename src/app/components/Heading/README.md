# Heading

## Description

The `Heading` component is used to render headings using the correct typography for the service. It extends the [`Text`](../Text/README.md) component.

## Props

| Name         | type   | Description                                                                                                                                                                                                                                                                                         |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fontVariant? | string | Used to render the correct `font-family`, `font-style` and `font-weight`. Possible values are `sansRegular`, `sansRegularItalic`, `sansBold`, `sansBoldItalic`, `sansLight`, `serifRegular`, `serifMedium`, `serifMediumItalic`, `serifBold`, `serifLight`. The default is `sansRegular`.           |
| level        | number | Used to the render the correct heading level element e.g. `h1`, `h2`, `h3`. Possible values are `1`, `2`, `3`, `4`                                                                                                                                                                                  |
| size?        | string | The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). Possible values are `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`. The default is `pica`. |

## How to use

```tsx
<Heading level={1}>This is text in a regular sans-serif font, in canon size and inside of an h1 element.</Heading>

<Heading level={2}>This is text in a regular sans-serif font, in canon size and inside of an h2 element.</Heading>

<Heading level={1} size="atlas">This is text in a regular sans-serif font, in atlas size and inside of an h1 element.</Heading>

<Heading fontVariant="serifBold" level={2} size="atlas">This is text in a bold serif font, in atlas size and inside of an h2 element.</Heading>
```

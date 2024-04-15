## Description

The `InlineLink` component is used to render link elements containting text. It intentionally does not render content using the `children` prop and instead uses a prop called `text` so that only a string of text can be passed in. This is to ensure that, for any external links, an `aria-label` can be rendered containing the text content with a localised "external" message to indicate to assistive technology users that the link they are reading will navigate away from a BBC domain.

## Props

| Name         | type   | Description                                                                                                                                                                                                                                                                                         |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| to           | string | The location to link to                                                                                                                                                                                                                                                                             |
| text         | string | The text to display                                                                                                                                                                                                                                                                                 |
| fontVariant? | string | Used to render the correct `font-family`, `font-style` and `font-weight`. Possible values are `sansRegular`, `sansRegularItalic`, `sansBold`, `sansBoldItalic`, `sansLight`, `serifRegular`, `serifMedium`, `serifMediumItalic`, `serifBold`, `serifLight`. The default is `sansRegular`.           |
| size?        | string | The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). Possible values are `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`. The default is `pica`. |

## How to use

## Server-side routing

```tsx
<InlineLink to="/mundo/articles/ce42wzqr2mko" text="This is an inline link" />
```

## Styling

```tsx
<InlineLink
  to="/"
  text="This is an inline link in a regular sans-serif font, in atlas size."
  fontVariant="sansRegular"
  size="atlas"
/>
```

```tsx
<Text fontVariant="sansRegular" size="atlas">
  <InlineLink
    to="/"
    text="This is an inline link that inherits styles from the Text component."
  />
</Text>
```

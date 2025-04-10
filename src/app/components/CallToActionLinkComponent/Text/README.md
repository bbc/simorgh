# Call To Action Link Text

## Description

A component that uses the Text component. This component exists to apply styles.

## Props

| Name                  | type    | Description                                                                                                                                                                                                                                                                                         |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as?                   | string  | The HTML element to render the text in e.g. `h1`, `span`, `p`. The default is `span`.                                                                                                                                                                                                               |
| fontVariant?          | string  | Used to render the correct `font-family`, `font-style` and `font-weight`. Possible values are `sansRegular`, `sansRegularItalic`, `sansBold`, `sansBoldItalic`, `sansLight`, `serifRegular`, `serifMedium`, `serifMediumItalic`, `serifBold`, `serifLight`. The default is `sansRegular`.           |
| size?                 | string  | The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). Possible values are `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`. The default is `pica`. |
| children?             | node    | The content included between the opening and closing tags of the Call to Action Text                                                                                                                                                                                                                |
| className?            | string  | Permits `css` prop to be applied                                                                                                                                                                                                                                                                    |
| overrideBottomBorder? | boolean | Applies underline styling for interactive states instead of a thicker bottom border.                                                                                                                                                                                                                |

## Example ltr/rtl

### Text

```javascript
<CallToActionLink.Text size="brevier" overrideBottomBorder>
  I am a link
</CallToActionLink.Text>
```

### Text with Children and specified fontVariant and Size

```javascript
<CallToActionLink.Text
  size="brevier"
  fontVariant="sansBold"
  overrideBottomBorder
>
  I am a link
  <CallToActionLink.Chevron size="brevier" />
</CallToActionLink.Text>
```

### Text with Children and default fontVariant and Size

```javascript
<CallToActionLink.Text>
  I am a link
  <CallToActionLink.Chevron />
</CallToActionLink.Text>
```

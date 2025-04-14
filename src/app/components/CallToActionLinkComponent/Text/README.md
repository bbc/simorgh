# Call To Action Link Text

## Description

A component that uses the Text component. This CallToAction.Link component can be used to apply sets of custom styles.

## Props

| Name                       | type    | Description                                                                                                                                                                                                                                                                                         |
| -------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as?                        | string  | The HTML element to render the text in e.g. `h1`, `span`, `p`. The default is `span`.                                                                                                                                                                                                               |
| fontVariant?               | string  | Used to render the correct `font-family`, `font-style` and `font-weight`. Possible values are `sansRegular`, `sansRegularItalic`, `sansBold`, `sansBoldItalic`, `sansLight`, `serifRegular`, `serifMedium`, `serifMediumItalic`, `serifBold`, `serifLight`. The default is `sansRegular`.           |
| size?                      | string  | The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). Possible values are `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`. The default is `pica`. |
| children?                  | node    | The content included between the opening and closing tags of the Call to Action Text                                                                                                                                                                                                                |
| className?                 | string  | Permits `css` prop to be applied                                                                                                                                                                                                                                                                    |
| overrideInteractionStyles? | boolean | Applies underline styling for interactive states instead of a thicker bottom border.                                                                                                                                                                                                                |

## Example ltr/rtl

### Text

```javascript
<CallToActionLink.Text size="brevier" overrideInteractionStyles>
  I am a link
</CallToActionLink.Text>
```

### Text with Children and specified fontVariant and Size

```javascript
<CallToActionLink.Text
  size="brevier"
  fontVariant="sansBold"
  overrideInteractionStyles
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

## Styles

The default text styles mirror the default interaction state (`hover`, `focus` and `visited`) styles applied by the CallToActionLink and adds a thicker bottom border. (Some styles are duplicated to avoid issues with inheritance.)

The `overrideInteractionStyles` prop can be used to override these default styles. This means that colour and bottom border styles are not applied. Instead `textDecoration: 'underline'` is applied to `hover` and `focus` states.

The css prop can be used to apply further styles. This can be applied to the Text component directly. Or applied to a parent/ ancestor and targeted using nested selectors. For example:

For example:

```javascript
<CallToActionLink
  to={link}
  className="focusIndicatorInvert"
  eventTrackingData={eventTrackingData}
  css={styles.callToActionLink}
>
  <CallToActionLink.FlexWrapper>
    <CallToActionLink.Text
      size="pica"
      fontVariant="sansBold"
      overrideInteractionStyles
    >
      {linkText}
      <CallToActionLink.Chevron />
    </CallToActionLink.Text>
  </CallToActionLink.FlexWrapper>
</CallToActionLink>
```

```javascript
  callToActionLink: ({ mq, palette }: Theme) =>
    css({
      padding: '1rem',
      backgroundColor: palette.WHITE,
      margin: '0 1rem 1rem 1rem',
      width: '100%',
      color: palette.BLACK,
      '&:hover, &:focus':
      {
        backgroundColor: '#F6F6F6',
        color: palette.BLACK,
      },
      '& span':
      {
        paddingInlineStart: '0.5rem',
      },
    }),

```

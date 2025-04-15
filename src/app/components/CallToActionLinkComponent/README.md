# Call to Action Link

## Description

A component following the `Compound Component` pattern to build Call to Action links.
The Compound Component pattern can be found inside the `index.tsx` entry point with the following Primitive Components:

> ### Components in this folder:
>
> - ButtonLikeWrapper
> - Text
> - Chevron

> ### Components outside this folder:
>
> - Text

## Props

| Name               | type                           | Description                                                                                                                                                                                                                                                                  |
| ------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                | string                         | The url for the Call to Action Link                                                                                                                                                                                                                                          |
| children?          | node                           | The content included between the opening and closing tags of the Call to Action Link                                                                                                                                                                                         |
| alignWithMargin?   | boolean                        | Applies display styling to align link with text. (Left margin for LTR, right margin for RTL). Component is centered by default                                                                                                                                               |
| className?         | string                         | Permits `css` prop to be applied                                                                                                                                                                                                                                             |
| htmlAttributes?    | string                         | Permits custom html attributes to be applied. E.g. `data-ignore-lite` for .lite                                                                                                                                                                                              |
| eventTrackingData? | shape({componentName: string}) | Tracking data needed for ati to track view and click of the Call to Action Link                                                                                                                                                                                              |
| download?          | boolean                        | Permits download                                                                                                                                                                                                                                                             |
| fontVariant?       | string                         | Used to render the correct `font-family`, `font-style` and `font-weight`. Possible values are `sansRegular`, `sansRegularItalic`, `sansBold`, `sansBoldItalic`, `sansLight`, `serifRegular`, `serifMedium`, `serifMediumItalic`, `serifBold`, `serifLight`.                  |
| size?              | string                         | The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). Possible values are `atlas`, `elephant`, `imperial`, `royal`, `foolscap`, `canon`, `trafalgar`, `paragon`, `doublePica`, `greatPrimer`, `bodyCopy`, `pica`, `longPrimer`, `brevier`, `minion`. |

## Example ltr/rtl

### Call to Action Link with Flex Wrapper, Text and Chevron

```javascript
<CallToActionLink url="https://www.bbc.com/ws/languages">
  <CallToActionLink.ButtonLikeWrapper>
    <CallToActionLink.Text>
      I am a link
      <CallToActionLink.Chevron />
    </CallToActionLink.Text>
  </CallToActionLink.ButtonLikeWrapper>
</CallToActionLink>
```

### Call to Action Link with Text and Chevron

The Chevron can be inside or outside of the Text component.

```javascript
<CallToActionLink url="https://www.bbc.com/ws/languages">
  <CallToActionLink.Text>I am a link</CallToActionLink.Text>
  <CallToActionLink.Chevron />
</CallToActionLink>
```

### Call to Action Link with Text

```javascript
<CallToActionLink
  url="https://www.bbc.com/ws/languages"
  alignWithMargin
  size="brevier"
  fontVariant="sansRegular"
>
  <CallToActionLink.Text>I am a link</CallToActionLink.Text>
</CallToActionLink>
```

## Styles

The `alignWithMargin` prop applies `display: 'inline-block'` styles. Otherwise the link renders inline by default.

Interaction state (`hover`, `focus` and `visited`) styles are applied by default to ensure the component is accessible out of the box.

The css prop can be used to apply further styles, such as spacing and colours. These can be applied to interaction states. For example:

```javascript
<CallToActionLink
  url={link}
  className="focusIndicatorInvert"
  eventTrackingData={eventTrackingData}
  css={styles.callToActionLink}
>
  <CallToActionLink.ButtonLikeWrapper>
    <CallToActionLink.Text>
      {linkText}
      <CallToActionLink.Chevron />
    </CallToActionLink.Text>
  </CallToActionLink.ButtonLikeWrapper>
</CallToActionLink>
```

```javascript
calltoactionlink: ({palette}: Theme) =>
  css(
    {
    padding: '1rem',
    backgroundColor: palette.WHITE,
    margin: '0 1rem 1rem 1rem',
    width: '100%',
    color: palette.BLACK,
    '&:hover, &:focus':
      {
        backgroundColor: '#F6F6F6',
        color: palette.BLACK,
      }
    }
  );
```

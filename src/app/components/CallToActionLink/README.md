## Description

A component following the `Compound Component` pattern to build Call to Action links.
The Compound Component pattern can be found inside the `index.tsx` entry point with the following Primitive Components:

> ### Components in this folder:
>
> - ButtonLikeWrapper
> - Text
> - Chevron

## Props

| Name              | Type                           | Required | Description                                                                                                                                                                                                                             |
| ----------------- | ------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url               | string                         | Yes      | The url for the Call to Action Link                                                                                                                                                                                                     |
| children          | node                           | No       | The content included between the opening and closing tags of the Call to Action Link                                                                                                                                                    |
| alignWithMargin   | boolean                        | No       | Applies display styling to align link with text. (Left margin for LTR, right margin for RTL). Component is centered by default                                                                                                          |
| className         | string                         | No       | Permits `css` prop to be applied                                                                                                                                                                                                        |
| htmlAttributes    | string                         | No       | Permits custom html attributes to be applied. E.g. `data-ignore-lite` for .lite                                                                                                                                                         |
| eventTrackingData | shape({componentName: string}) | No       | Tracking data needed for ati to track view and click of the Call to Action Link                                                                                                                                                         |
| download          | boolean                        | No       | Permits download                                                                                                                                                                                                                        |
| fontVariant       | string                         | No       | Used to render the correct `font-family`, `font-style` and `font-weight`. See FontVariant in [theming](https://github.com/bbc/simorgh/blob/latest/src/app/models/types/theming.ts) for possible values. The default value is `sansBold` |
| size              | string                         | No       | The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). See GelFontSize in [theming](https://github.com/bbc/simorgh/blob/latest/src/app/models/types/theming.ts) for possible values. The default value is `pica` |

## Examples

### Call to Action Link with Text and Chevron

The Chevron can be inside or outside of the Text component.

```javascript
<CallToActionLink url="https://www.bbc.com/ws/languages">
  <CallToActionLink.Text>I am a link</CallToActionLink.Text>
  <CallToActionLink.Chevron />
</CallToActionLink>
```

```javascript
<CallToActionLink url="https://www.bbc.com/ws/languages">
  <CallToActionLink.Text>
    I am a link
    <CallToActionLink.Chevron />
  </CallToActionLink.Text>
</CallToActionLink>
```

### Call to Action Link with Text only

```javascript
<CallToActionLink url="https://www.bbc.com/ws/languages">
  <CallToActionLink.Text>I am a link</CallToActionLink.Text>
</CallToActionLink>
```

### Call to Action Link with Button-like Wrapper, Text and Chevron

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

In `index.styles.ts`:

```javascript
calltoActionLink: ({ palette }: Theme) =>
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

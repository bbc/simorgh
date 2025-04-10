# Call to Action Link

## Description

A component following the `Compound Component` pattern to build Call to Action links.
The Compound Component pattern can be found inside the `index.jsx` entry point with the following Primitive Components:

> ### Components in this folder:
>
> - FlexWrapper
> - Text
> - Chevron

> ### Components outside this folders:
>
> - Text

## Props

| Name               | type                           | Description                                                                                                                    |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| to?                | string                         | The url for the Call to Action Link                                                                                            |
| children?          | node                           | The content included between the opening and closing tags of the Call to Action Link                                           |
| alignWithMargin?   | boolean                        | Applies display styling to align link with text. (Left margin for LTR, right margin for RTL). Component is centered by default |
| className?         | string                         | Permits `css` prop to be applied                                                                                               |
| htmlAttributes?    | string                         | Permits custom html attributes to be applied. E.g. `data-ignore-lite` for .lite                                                |
| eventTrackingData? | shape({componentName: string}) | Tracking data needed for ati to track view and click of the Call to Action Link                                                |

## Example ltr/rtl

### Call to Action Link with Flex Wrapper, Text and Chevron

```javascript
<CallToActionLink to="https://www.bbc.com/ws/languages">
  <CallToActionLink.FlexWrapper>
    <CallToActionLink.Text
      size="pica"
      fontVariant="sansBold"
      overrideInteractionStyles
    >
      I am a link
      <CallToActionLink.Chevron size="pica" />
    </CallToActionLink.Text>
  </CallToActionLink.FlexWrapper>
</CallToActionLink>
```

### Call to Action Link with Text and Chevron

```javascript
<CallToActionLink to="https://www.bbc.com/ws/languages" alignWithMargin>
  <CallToActionLink.Text size="brevier" fontVariant="sansBold">
    I am a link
  </CallToActionLink.Text>
  <CallToActionLink.Chevron size="brevier" />
</CallToActionLink>
```

### Call to Action Link with Text

```javascript
<CallToActionLink to="https://www.bbc.com/ws/languages" alignWithMargin>
  <CallToActionLink.Text size="brevier" fontVariant="sansRegular">
    I am a link
  </CallToActionLink.Text>
</CallToActionLink>
```

## Styles

Custom spacing and colours can be applied when using the component. For example:

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
calltoactionlink: ({mq, palette}: Theme) =>
  css(
    {
    padding: '1rem',
    backgroundColor: palette.WHITE,
    margin: '0 1rem 1rem 1rem',
    width: '100%',
    color: palette.BLACK,
    '&:hover, &:focus': {backgroundColor: '#F6F6F6',
    color: palette.BLACK,
    },
    [mq.GROUP_3_MIN_WIDTH]: {
    width: 'auto',
    maxWidth: 'calc(100% - 240px)',
    margin: '0 0 1.5rem 0',
    paddingBottom: '1rem',
    },
    '& span': {
      paddingInlineStart: '0.5rem',
    },
    }
  );
```

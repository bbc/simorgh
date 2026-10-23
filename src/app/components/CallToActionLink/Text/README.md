# Call To Action Link Text

## Description

A component that uses the Text component. It can be used to apply sets of custom styles.

This component derives `size` and `fontVariant` values from the Context Provider. If none are provided it falls back to default values (`size`: `pica`, `fontVariant`: `sansBold`).

## Props

| Name                         | Type    | Required | Description                                                                           |
| ---------------------------- | ------- | -------- | ------------------------------------------------------------------------------------- |
| as?                          | string  | No       | The HTML element to render the text in e.g. `h1`, `span`, `p`. The default is `span`. |
| children?                    | node    | No       | The content included between the opening and closing tags of the Call to Action Text  |
| className?                   | string  | No       | Additional class names for consumer-owned styling                                     |
| shouldUnderlineOnHoverFocus? | boolean | No       | Applies underline styling for interaction states instead of a thicker bottom border.  |

## Examples

### Text

```javascript
<CallToActionLink.Text shouldUnderlineOnHoverFocus>
  I am a link
</CallToActionLink.Text>
```

### Text with Chevron as Child

```javascript
<CallToActionLink.Text shouldUnderlineOnHoverFocus>
  I am a link
  <CallToActionLink.Chevron />
</CallToActionLink.Text>
```

## Styles

The default text styles mirror the default interaction state (`hover`, `focus` and `visited`) styles applied by the CallToActionLink and adds a thicker bottom border. (Some styles are duplicated to avoid issues with inheritance.)

The `shouldUnderlineOnHoverFocus` prop can be used to override these default styles. This means that colour and bottom border styles are not applied. Instead `textDecoration: 'underline'` is applied to `hover` and `focus` states.

Use a consumer-owned SCSS Module class to apply further styles. This can be
applied to the Text component directly, or applied to a parent/ancestor and
targeted using nested selectors. For example:

```javascript
<CallToActionLink
  url={link}
  className={`${styles.callToActionLink} focusIndicatorInvert`}
  eventTrackingData={eventTrackingData}
>
  <CallToActionLink.ButtonLikeWrapper>
    <CallToActionLink.Text shouldUnderlineOnHoverFocus>
      {linkText}
      <CallToActionLink.Chevron />
    </CallToActionLink.Text>
  </CallToActionLink.ButtonLikeWrapper>
</CallToActionLink>
```

In the consumer's `index.module.scss`:

```scss
@use '@scss/themeTokens' as theme;

.callToActionLink {
  padding: theme.$spacings-double;
  background-color: theme.$palette-white;
  margin: theme.$spacings-double;
  width: 100%;
  color: theme.$palette-black;

  &:hover,
  &:focus {
    background-color: theme.$palette-grey-2;
    color: theme.$palette-black;
  }

  span {
    padding-inline-start: theme.$spacings-half;
  }
}
```

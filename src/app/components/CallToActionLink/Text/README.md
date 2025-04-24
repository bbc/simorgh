# Call To Action Link Text

## Description

A component that uses the Text component. It can be used to apply sets of custom styles.

This component derives `size` and `fontVariant` values from the Context Provider. If none are provided it falls back to default values (`size`: `pica`, `fontVariant`: `sansBold`).

## Props

| Name                         | Type    | Required | Description                                                                           |
| ---------------------------- | ------- | -------- | ------------------------------------------------------------------------------------- |
| as?                          | string  | No       | The HTML element to render the text in e.g. `h1`, `span`, `p`. The default is `span`. |
| children?                    | node    | No       | The content included between the opening and closing tags of the Call to Action Text  |
| className?                   | string  | No       | Permits `css` prop to be applied                                                      |
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
    <CallToActionLink.Text shouldUnderlineOnHoverFocus>
      {linkText}
      <CallToActionLink.Chevron />
    </CallToActionLink.Text>
  </CallToActionLink.FlexWrapper>
</CallToActionLink>
```

In `index.styles.ts`:

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

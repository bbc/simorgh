# Call to Action Link Chevron

## Description

This is a Call to Action Link component that returns a Chevron SVG.

## Props

| Name       | type   | Description                                                                                     |
| ---------- | ------ | ----------------------------------------------------------------------------------------------- |
| size?      | string | Determines size of SVG. In most instances this will be the same as the text. Defaults to `pica` |
| className? | string | Permits `css` prop to be applied                                                                |

## Example ltr/rtl

### Size "brevier"

```javascript
<CallToActionLink.Chevron size="brevier" />
```

### Size "pica"

```javascript
<CallToActionLink.Chevron size="pica" />
```

### Default (size "pica")

```javascript
<CallToActionLink.Chevron />
```

## Styles

The Chevron is configured to render in brevier and pica sizes. Further sizes can be added as required.

The css prop can be used to apply further styles. For example:

```javascript
<CallToActionLink>
  <CallToActionLink.FlexWrapper>
    <CallToActionLink.Text>
      {linkText}
      <CallToActionLink.Chevron css={styles.chevronSpacing} />
    </CallToActionLink.Text>
  </CallToActionLink.FlexWrapper>
</CallToActionLink>
```

```javascript
  chevronSpacing: () =>
    css({
      marginInlineStart: `${pixelsToRem(12)}rem`,
    }),
```

# Title

## Description

A component that returns a styled h3 or a styled div used for promo titles.

## Props

| Name             | type   | Description                                  |
| ---------------- | ------ | -------------------------------------------- |
| service          | string | name of the service                          |
| className        | string | CSS class, automatically provided my emotion |
| titleTagOverride | string | Override for the tag to use, default is h3   |

## Example ltr/rtl

Title = ({ children, service, className, titleTagOverride })

### h3

```javascript
<Title service="news">This is a h3 title</Title>
```

### with tag override

```javascript
<Title service="news" titleTagOverride="div">
  This is a div title
</Title>
```

## A11y Notes

If the Promo has only a title, we need to apply a div tag to our title instead of an h3. The titleTagOverride property helps us to achieve this a11y requirement.

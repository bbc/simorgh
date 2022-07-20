# Promo Title

## Description

A component that provides a base style for the promos' title and wraps the content node with provided tag.

## Props

| Name      | type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| className | string | CSS class, automatically provided my emotion |
| as        | string | Override for the tag to use, default is span |

## Example ltr/rtl

Title = ({ children, service, className, titleTagOverride })

### default

```javascript
<Title>This is a span title</Title>
```

### h3

```javascript
<Title service="news" as="h3">
  This is a h3 title
</Title>
```

### with tag override

```javascript
<Title service="news" as="div">
  This is a div title
</Title>
```

## A11y Notes

If the Promo has only a title, we need to apply a div tag to our title instead of an h3. The titleTagOverride property helps us to achieve this a11y requirement.

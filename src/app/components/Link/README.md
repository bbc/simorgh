# InlineLink

## Description

The `Link` component is used to render link elements that can wrap any content, not just text. It can determine whether to make a client-side or server-side request based on the `allowCSR` prop and by parsing the `to` prop. If you need the the correct focus, hover and visited styles for text based link then you should use the [`InlineLink`](../InlineLink/README.md) component.

## Props

| Name      | type    | Description                                                                                     |
| --------- | ------- | ----------------------------------------------------------------------------------------------- |
| to        | string  | The location to link to                                                                         |
| allowCSR? | boolean | Whether or not the link should make a client-side route transition. This is `false` by default. |

## How to use

## Server-side routing

```tsx
<Link to="/mundo/articles/ce42wzqr2mko">This is a link</Link>
```

## Client-side routing

```tsx
<Link allowCSR to="/mundo/articles/ce42wzqr2mko">
  This is a link with client-side routing enabled
</Link>
```

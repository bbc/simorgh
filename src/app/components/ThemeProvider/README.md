# ThemeProvider

## Description

This component provides theme props for use in styles. It uses the [`@loadable/component`](https://loadable-components.com/) package to code/bundle split each service's theme data.

## Props

| Name    | type   | Description                                              |
| ------- | ------ | -------------------------------------------------------- |
| service | string | The service's theme you want to use e.g. `news`, `mundo` |

## How to use

Add `ThemeProvider` to the top level of your app and access the theme with props.theme in a styled component or provide a function that accepts the theme as the css prop.

```tsx
<ThemeProvider service="news">
  <div css={theme => ({
    color: theme.colors.BRAND_BACKGROUND,
    padding: theme.spacings.DOUBLE
  })}
/>
</ThemeProvider>,
```

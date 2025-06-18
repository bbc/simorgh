# ThemeProvider

## Description

This component provides theme props for use in styles. It uses the [`@loadable/component`](https://loadable-components.com/) package to code/bundle split each service's theme data.

## Props

| Name    | type   | Description                                              |
| ------- | ------ | -------------------------------------------------------- |
| service | string | The service's theme you want to use e.g. `news`, `mundo` |

## How to use

Add `ThemeProvider` to the top level of your app and access the theme with `props.theme` in a styled component or provide a function that accepts the theme as the css prop.

```tsx
<ThemeProvider service="news">
  <div css={theme => ({
    color: theme.palette.BRAND_BACKGROUND,
    padding: theme.spacings.DOUBLE
  })}
/>
</ThemeProvider>,
```

## Theme values

### fontSizes

The [BBC GEL size](https://www.bbc.co.uk/gel/features/typography#type-sizes). The `font-size` and `line-height` styles change depending on the chosen size. Possible values, largest to smallest, are as follows:

- `atlas`
- `elephant`
- `imperial`
- `royal`
- `foolscap`
- `canon`
- `trafalgar`
- `paragon`
- `doublePica`
- `greatPrimer`
- `bodyCopy`
- `pica`
- `longPrimer`
- `brevier`
- `minion`

You can use `fontSizes` like this:

```tsx
<span css={({ fontSizes }) => fontSizes.greatPrimer}>
  This is text in GEL's greatPrimer size.
</span>
```

### fontVariants

This controls the `font-family`, `font-style` and `font-weight` values. If a service does not load a particular font such as sans-serif bold italic or any serif font (for performance reasons) then a fallback font variant is select. Possible values, with any fallback font variant is as follows:

- `sansRegular`
- `sansRegularItalic` - falls back to `sansRegular` if a service does not load a sans-serif regular font.
- `sansBold` - falls back to `sansRegular` if a service does not load a sans-serif bold font.
- `sansBoldItalic` - falls back to `sansBold` if a service does not load a sans-serif bold italic font.
- `sansLight` - falls back to `sansRegular` if a service does not load a sans-serif light font.
- `serifRegular` - falls back to `sansRegular` if a service does not load a serif regular font.
- `serifMedium` - falls back to `sansBold` if a service does not load a serif medium font.
- `serifMediumItalic`- falls back to `sansBoldItalic` if a service does not load a serif medium italic font.
- `serifBold` - falls back to `sansBold` if a service does not load a serif bold font.
- `serifLight` - falls back to `serifRegular` if a service does not load a serif light font.

You can use `fontVariants` like this:

```tsx
<span css={({ fontVariants }) => fontVariants.serifMediumItalic}>
  This is text in a serif medium italic font.
</span>
```

### fontMq

The typography media queries. Options, with their screen size range in pixels, are as follows:

- `GROUP_A_MAX_WIDTH`: 319px and below
- `GROUP_B_MAX_WIDTH`: 599px and below
- `GROUP_B_MIN_WIDTH`: 320px and above
- `GROUP_B_ONLY`: between 320px and 599px
- `GROUP_D_MIN_WIDTH`: 600px and above

You can use `fontMq` like this:

```tsx
<span
  css={({ fontMq }) => ({
    [fontMq.GROUP_B_MIN_WIDTH]: {
      display: 'none',
    },
  })}
>
  This text is hidden on screen sizes 320px and above.
</span>
```

### mq

The content media queries. Options, with their screen size range in pixels, are as follows:

- `GROUP_0_MAX_WIDTH`: 239px and below
- `GROUP_1_MAX_WIDTH`: 399px and below
- `GROUP_1_MIN_WIDTH`: 240px and above
- `GROUP_1_ONLY`: between 240px and 399px
- `GROUP_2_MAX_WIDTH`: 599px and below
- `GROUP_2_MIN_WIDTH`: 400px and above
- `GROUP_2_ONLY`: between 400px and 599px
- `GROUP_3_MAX_WIDTH`: 1007px and below
- `GROUP_3_MIN_WIDTH`: 600px and above
- `GROUP_3_ONLY`: between 600px and 1007px
- `GROUP_4_MAX_WIDTH`: 1279px and below
- `GROUP_4_MIN_WIDTH`: 1008px and above
- `GROUP_4_ONLY`: between 1008px and 1279px
- `GROUP_5_MIN_WIDTH`: 1280px and above

You can use `mq` like this:

```tsx
<div
  css={({ mq }) => ({
    [mq.GROUP_4_MIN_WIDTH]: {
      display: 'none',
    },
  })}
>
  This content is hidden on screen sizes 320px and above.
</div>
```

### palette

The available colours. Click on any colour to see the colour in https://color-hex.com. Colours with the prefix `BRAND_` change depending on the service.

- [`ARCHIVE_BLUE`](https://www.color-hex.com/color/3A549C)
- [`BLACK`](https://www.color-hex.com/color/000000)
- [`BLUEJAY`](https://www.color-hex.com/color/0F556C)
- [`BLUEJAY_LHT`](https://www.color-hex.com/color/C3DEE7)
- [`CHALK`](https://www.color-hex.com/color/ECEAE7)
- [`CLOUD_DARK`](https://www.color-hex.com/color/757575)
- [`CLOUD_LIGHT`](https://www.color-hex.com/color/BABABA)
- [`CONSENT_ACTION`](https://www.color-hex.com/color/F6A21D)
- [`CONSENT_BACKGROUND`](https://www.color-hex.com/color/323232)
- [`CONSENT_CONTENT`](https://www.color-hex.com/color/BEBEBE)
- [`CONSENT_FOCUS`](https://www.color-hex.com/color/68A1F8)
- [`DARK_SALTIRE`](https://www.color-hex.com/color/23104C)
- [`DIM_GREY`](https://www.color-hex.com/color/696969)
- [`EBON`](https://www.color-hex.com/color/222222)
- [`GHOST`](https://www.color-hex.com/color/FDFDFD)
- [`GREY_10`](https://www.color-hex.com/color/141414)
- [`GREY_11`](https://www.color-hex.com/color/BABABA)
- [`GREY_2`](https://www.color-hex.com/color/F6F6F6)
- [`GREY_3`](https://www.color-hex.com/color/E6E8EA)
- [`GREY_6`](https://www.color-hex.com/color/545658)
- [`GREY_8`](https://www.color-hex.com/color/202224)
- [`KINGFISHER`](https://www.color-hex.com/color/11708C)
- [`LE_TEAL`](https://www.color-hex.com/color/09838B)
- [`LUNAR`](https://www.color-hex.com/color/F2F2F2)
- [`LUNAR_LIGHT`](https://www.color-hex.com/color/F8F8F8)
- [`METAL`](https://www.color-hex.com/color/6E6E73)
- [`MIDNIGHT_BLACK`](https://www.color-hex.com/color/121212)
- [`NEWSROUND_PURPLE`](https://www.color-hex.com/color/6C22D6)
- [`NEWSROUND_PURPLE_30`](https://www.color-hex.com/color/9159A8)
- [`OAT_LHT`](https://www.color-hex.com/color/F5F3F1)
- [`ORBIT_GREY`](https://www.color-hex.com/color/4C4C4C)
- [`PEBBLE`](https://www.color-hex.com/color/AEAEB5)
- [`PHILIPPINE_GREY`](https://www.color-hex.com/color/8A8C8E)
- [`POSTBOX`](https://www.color-hex.com/color/B80000)
- [`POSTBOX_30`](https://www.color-hex.com/color/EAB3B3)
- [`RHINO`](https://www.color-hex.com/color/5A5A5A)
- [`SHADOW`](https://www.color-hex.com/color/3F3F42)
- [`SPORT_MIST`](https://www.color-hex.com/color/F7F7F5)
- [`SPORT_SILVER`](https://www.color-hex.com/color/DBDBDB)
- [`SPORT_YELLOW`](https://www.color-hex.com/color/FFD230)
- [`SPORT_YELLOW_30`](https://www.color-hex.com/color/BB9A31)
- [`STONE`](https://www.color-hex.com/color/D5D0CD)
- [`STORM`](https://www.color-hex.com/color/404040)
- [`WEATHER_BLUE`](https://www.color-hex.com/color/067EB3)
- [`WHITE`](https://www.color-hex.com/color/FFFFFF)
- `BRAND_BACKGROUND`
- `BRAND_LOGO`
- `BRAND_FOREGROUND`
- `BRAND_HIGHLIGHT`
- `BRAND_BORDER`

You can use `palette` like this:

```tsx
<div
  css={({ palette }) => ({
    backgroundColor: palette.LUNAR_LIGHT,
  })}
>
  This is a div with a background-colour of #f8f8f8 (LUNAR_LIGHT).
</div>
```

### spacings

These are numbers that represent the rems used for spacing content. The options, with their size in pixels is as follows:

- `HALF` - 4px
- `FULL` - 8px
- `DOUBLE` - 16px
- `TRIPLE` - 24px
- `QUADRUPLE` - 32px
- `QUINTUPLE` - 40px
- `SEXTUPLE` - 48px

You can use `spacings` like this:

```tsx
<div
  css={({ spacings }) => ({
    padding: `${spacings.DOUBLE}rem`,
  })}
>
  This is a div with 16px of padding (DOUBLE spacing).
</div>
```

### focus indicator

By default, the double ring focus indicator is applied on all focusable button and anchor elements on World Service pages. You do not need to do anything to enable it.

You can change the default focus indicator by using the following `classNames`:

- `focusIndicatorRemove`: Removes the default focus indicator.
- `focusIndicatorDisplayBlock`: Adds a `display: block` declaration.\*
- `focusIndicatorDisplayInlineBlock`: Adds a `display: inline-block` and `width: 100%;` declaration.\*
- `focusIndicatorDisplayTableCell`: Adds a `display: table-cell` declaration.\*
- `focusIndicatorReducedWidth`: Overrides the default focus indicator with a thinner version
- `focusIndicatorOutlineBlack`: Overrides the default focus indicator with a black outline only version
- `focusIndicatorInvert`: Overrides the default focus indicator with an inverted version.
- `focusIndicatorReducedWidthInverted`: Overrides focus indicator styles with a thinner version in inverted colours

You can use focus indicator `classNames` like this:

```jsx
<StyledLink {...linkProps} className="focusIndicatorDisplayBlock">
  {content}
</StyledLink>
```

\*Changing Display Properties

Extra display properties are used to make the default focus indicator appear as a solid bounding box around the focusable element.

Display properties have been added to certain components to a fix a bug in Firefox High Contrast Mode whereby the focus indicator would make the focused element temporarily disappear to the user.

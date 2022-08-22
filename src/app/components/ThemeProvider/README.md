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
    color: theme.palette.BRAND_BACKGROUND,
    padding: theme.spacings.DOUBLE
  })}
/>
</ThemeProvider>,
```

## Typography scripts

These are `font-sizes` and `line-heights` for a specific service's GEL size (e.g. `Long Primer`).

Simorgh supports typography for a number of other scripts. Below are all supported scripts and the services that use them.

| Group Name          | Services                                                                                  | Rationale                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------- |
| latin               | News, Hausa, Gahuza, Somali, Swahili, Igbo, Pidgin, Afaan Oromo, Yoruba, Azeri, Indonesia | The typography values for Latin and Cyrillic characters are identical                                       |
| cyrillic            | Serbian Cyrillic, Russian, Ukrainian, Kyrgyz, Uzbek                                       | The typography values for Latin and Cyrillic characters are identical                                       |
| latinWithDiacritics | Serbian Latin, Vietnamese, Mundo, Afrique, Brasil, Turkish                                | The diacritics make these values differ from Latin                                                          |
| arabic              | Arabic, Pashto, Persian, Urdu                                                             | Group as they use the Arabic alphabet                                                                       |
| noAscOrDesc         | Korean, Japanese, Zhongwen, Ukchina, Tigrinya, Amharic                                    | Group all alphabets without ascenders or descenders. This could be implemented as chinese, korean, ethiopic | Hindi, Nepali, Gujarati, Punjabi, Marathi, Telugu | The typography values for Devanagari and Gurmukhi characters are identical |
| devanagari          | Nepali, Gujarati, Punjabi, Marathi, Telugu                                                | The typography values for Devanagari and Gurmukhi characters are identical                                  |
| gurmukhi            | Hindi                                                                                     | The typography values for Devanagari and Gurmukhi characters are identical                                  |
| thai                | Thai                                                                                      | Bespoke to the Thai characters                                                                              |
| bengali             | Bengali                                                                                   | Bespoke to the Bengal characters                                                                            |
| burmese             | Burmese                                                                                   | Bespoke to the Burmese characters                                                                           |
| sinhalese           | Sinhala                                                                                   | Bespoke to the Sinhalese characters                                                                         |
| tamil               | Tamil                                                                                     | Bespoke to the Tamil characters                                                                             |

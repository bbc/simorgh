# psammead-styles - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Futilities%2Fpsammead-styles%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Futilities%2Fpsammead-styles%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-styles)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-styles) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-styles)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-styles&type=peer) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-styles/src.svg)](https://www.npmjs.com/package/#legacy/psammead-styles/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

This package provides a collection of string constants for use in CSS, containing non-GEL styling details that are bespoke to specific BBC services and products

## Exports

`/colours` - Project-defined colours that will be required by multiple Psammead components or themes. These colours are not defined by GEL.
`/detection` - Project-defined CSS feature detection statements.
`/font-styles` provides functions that can be used to get font-styles for different services. If a font-style is not available all the functions will fallback to regular sans font-style of the service.
`/global-styles` Provides project-defined global styles defined using `styled-normalize` and box sizing.

## Installation

```jsx
npm install #legacy/psammead-styles/src --save
```

## Usage

<!-- prettier-ignore -->
```jsx
import { POSTBOX } from '#components/ThemeProvider/palette';
```

By importing a subset of the font-face definitions defined in this package, you can prioritise only the most commonly needed fonts for your project, with browser styling stepping in for less common scenarios. For example, in these examples, which import custom fonts for only Reith Sans Regular and Italic, any bold styling would be "faked" by the browser.

You will likely want to use these font-face definitions in tandem with the GEL-defined font stack definitions, which are available in [`#legacy/gel-foundations/src`](https://www.npmjs.com/package/#legacy/gel-foundations/src):

```jsx
import { GEL_FF_REITH_SANS } from '#psammead/gel-foundations/src/typography';
```

These values can then be used directly within CSS declarations in code. Note that font-faces should only be declared once on a page:

```jsx
import { css } from 'styled-components';

// These should only be included on your page once.
const someGlobalCSS = css`
  ${F_REITH_SANS_ITALIC};
`;

const SomeStyledComponent = css`
  background-color: ${POSTBOX};
  font-family: ${GEL_FF_REITH_SANS};
`;
```

### font-styles

In case you are using embedded fonts, you need to make sure you have loaded your fonts first before using the functions. If the embedded font is not loaded, the fallback font will be applied

```js
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

const fontStyle = getSansRegular('news');

const SomeStyledComponent = css`
  ${fontStyle};
  /* more css styles */
`;
```

### detection

We have defined custom feature detection statements (using CSS `@supports` syntax) to provide workarounds for browser-specific bugs.

- grid: We experienced issues using `@supports (display:grid)` from browsers with buggy CSS Grid implementations, and found that detecting on `@supports (grid-template-columns: fit-content(200px))` gave more consistent detection.

```js
import { grid } from '#psammead/psammead-styles/src/detection';

const someGridUsingComponent = css`
  @supports (${grid}) {
    display: grid;
    /* grid CSS */
  }

  /* fallback CSS */
`;
```

### global-styles

We export a global styles component which uses `styled-normalize` and defines css rules for `box-sizing`.

```js
import GlobalStyles from '#psammead/psammead-styles/src/global-styles';

<GlobalStyles />;
```

## Contributing

When **adding** a new export to this utility package the [export tests](https://github.com/bbc/psammead/blob/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/psammead-styles/index.test.jsx#L11-L35) also need to be updated. When **removing** an exisiting export from this utility package the [export tests](https://github.com/bbc/psammead/blob/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/psammead-styles/index.test.jsx#L11-L35) need to be updated and the package version requires a major change (EG: 1.2.1 -> 2.0.0) as this would be considered a breaking change due to functionality being removed.

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

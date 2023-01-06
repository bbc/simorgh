# gel-foundations - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Futilities%2Fgel-foundations%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Futilities%2Fgel-foundations%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/gel-foundations)](https://david-dm.org/bbc/psammead?path=packages/utilities/gel-foundations) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/gel-foundations)](https://david-dm.org/bbc/psammead?path=packages/utilities/gel-foundations&type=peer) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/gel-foundations/src.svg)](https://www.npmjs.com/package/#legacy/gel-foundations/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

This package provides a range of string constants for use in CSS, intended to help implement [BBC GEL-compliant](https://www.bbc.co.uk/gel/articles/what-is-gel) webpages and components.

## Exports

`/breakpoints` - GEL breakpoints, as well as typography breakpoints. These use the GEL grid sizes which can be found in the [GEL Grid guidelines](https://www.bbc.co.uk/gel/guidelines/grid#grid-sizes).
`/spacings` - GEL spacings and GEL Grid margins and gutters. These use the GEL grid spacing sizes which can be found in the [GEL Grid guidelines](https://www.bbc.co.uk/gel/guidelines/grid#spacing-layout).
`/typography` - GEL type sizes and font stacks. These are based on the GEL Typography definitions which can be found in the [GEL guidelines](https://www.bbc.co.uk/gel/guidelines/typography). [More details on how the type sizes were implemented for this package are available here.](./typography_sizes_web.md)

## Installation

```jsx
npm install #legacy/gel-foundations/src --save
```

## Usage

```jsx
import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';

import { GEL_GUTTER_ABOVE_600PX } from '#psammead/gel-foundations/src/spacings';

import { getLongPrimer } from '#psammead/gel-foundations/src/typography';
```

These values can then be used directly within CSS declarations in code:

```jsx
import { css } from 'styled-components';

const SomeStyledComponent = css`
  font-family: ${GEL_FF_REITH_SANS};
  ${getLongPrimer(script)};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-gap: ${GEL_GUTTER_ABOVE_600PX};
  }
`;
```

To allow the typography to be fully accessible and responsive, please note that you should apply a default font-size to the document root (e.g. `html { font-size: 100% }`).

Our typography uses `rem` for font-size and line-height. The `rem` unit represents a size relative to the document root, so we use that for font-size, line-height and spacing for a consistent look-and-feel across the document. You can read our [detailed analysis of "REMs vs EMs for spacing"](https://github.com/bbc/psammead/tree/latest/documentation/Spacing-Units.md) for more information.

## Contributing

When **adding** a new export to this utility package the [export tests](https://github.com/bbc/psammead/blob/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/gel-foundations/index.test.jsx#L13-L59) also need to be updated. When **removing** an exisiting export from this utility package the [export tests](https://github.com/bbc/psammead/blob/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/gel-foundations/index.test.jsx#L13-L59) need to be updated and the package version requires a major change (EG: 1.2.1 -> 2.0.0) as this would be considered a breaking change as functionality is being removed.

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

# psammead-assets - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Futilities%2Fpsammead-assets%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Futilities%2Fpsammead-assets%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/utilities/psammead-assets)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-assets) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/utilities/psammead-assets)](https://david-dm.org/bbc/psammead?path=packages/utilities/psammead-assets&type=peer) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-assets/src.svg)](https://www.npmjs.com/package/#legacy/psammead-assets/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

This package provides a collection of common assets that are likely to be required by many Psammead components or users, such as SVGs or small scripts.

## Exports

`/amp-boilerplate` - A helper, allowing projects using Psammead to easily pull in a versioned copy of [AMP's required boilerplate scripts](https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md).
`/svgs` - SVG icons commonly required by projects using Psammead.

## Installation

```jsx
npm install #legacy/psammead-assets/src --save
```

## Usage

```jsx
import { BBC_BLOCKS, news } from '#psammead/psammead-assets/src/svgs';
```

## Service SVGs

Service brand SVGs, like `news`, are objects that contains an svg group, viewbox, ratio and height;

This package currently has brand SVGs for the BBC News World Services as well as for BBC News, BBC Scotland.

<!-- prettier-ignore -->
| Property   | Type   | Required | Default | Example                  |
|------------|--------|----------|---------|--------------------------|
| `group` | node | Yes | N/A | `<g fillrule="evenodd"><path d="M84.32" /></g>` |
| `viewbox` | object | Yes | N/A | `{ height: 24, width: 167.95 }` |
| `ratio` | number | Yes | N/A | `6.9979` |

The width of your SVG can be calculated using your desired height multiplied by the `ratio` value provided above.

### Usage

```jsx
const WrappingContainer = () => (
  <svg viewBox={`0 0 ${news.viewbox.width} ${news.viewbox.height}`}>
    {news.group}
  </svg>
);
```

## Core Icons SVGs

Core icons is an object containing styled SVG icons from GEL Iconography Core. By default Core icons are sized to work well alongside text from the `GEL BodyCopy` typography group.

### Usage

```jsx
import { coreIcons } from '#psammead/psammead-assets/src/svgs';

<p>
  {coreIcons.info} Did you know, in Switzerland it's illegal to own just one
  guinea pig?
</p>;
```

## Media Icons SVGs

Media icons is an object containing styled SVG icons for video, audio, photogallery and guidance. Media icons are sized to work well alongside specific text with typography group `GEL Minion`. They are used in `psammead-media-indicator` and `psammead-media-player` components.

### Usage

```jsx
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';

<span>
  {mediaIcons.audio}
  {duration && datetime && <time dateTime={datetime}>{duration}</time>}
</span>;
```

## Navigation Icons SVGs

Navigation icons is an object containing styled SVG icons for hamburger and cross. They are used in `psammead-navigation` component.

### Usage

```jsx
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';

<span>{navigationIcons.cross}</span>;
```

## Contributing

When **adding** a new export to this utility package the [export tests](https://github.com/bbc/psammead/blob/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/psammead-assets/index.test.jsx#L11-L18) also need to be updated. When **removing** an exisiting export from this utility package the [export tests](https://github.com/bbc/psammead/blob/5d7395fd60bd8d73796d5a23775b4b5b36db1445/packages/utilities/psammead-assets/index.test.jsx#L11-L18) need to be updated and the package version requires a major change (EG: 1.2.1 -> 2.0.0) as this would be considered a breaking change due to functionality being removed.

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

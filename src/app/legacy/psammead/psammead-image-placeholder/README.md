# psammead-image-placeholder - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-image-placeholder%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-image-placeholder%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-image-placeholder)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image-placeholder) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-image-placeholder)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image-placeholder&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/imageplaceholder--16x9-image-placeholder) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-image-placeholder/src.svg)](https://www.npmjs.com/package/#legacy/psammead-image-placeholder/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `psammead-image-placeholder` component has two placeholders available. The default is a `div` with a base-64 encoded SVG background image that depicts the BBC logo. The component accepts a ratio as a prop. In the Psammead component library, Image Placeholder is used within the [psammead-figure](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-figure) component.

The alternative is an AMP supported placeholder which uses the same base-64 encoded SVG but as multiple `amp-img` components, which are loaded based on the current screen size. The component adheres to the parent `amp-img` size and functions as both a fallback and placeholder. See the AMP documentation on [fallbacks and placeholders](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders/).

### When to use this component

Psammead Image Placeholder is designed to appear as a temporary stand-in to be replaced by an actual image, for example in the case of lazy loading.

<!-- ### When not to use this component -->

## Installation

`npm install #legacy/psammead-image-placeholder/src`

## Usage

### ImagePlaceholder

The ImagePlaceholder component is expected to contain an image as a child element.

```jsx
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';

const WrapperComponent = ({
  ratio,
}) => (
  <ImagePlaceholder ratio={ratio}>
    <img src="http://some-image.url">
  </ImagePlaceholder>
);
```

### ImagePlaceholderAmp

The ImagePlaceholderAmp component is expected to be used as a child element of an `amp-img` component. Information about `amp-img` can be found on the [AMP documentation website](https://amp.dev/documentation/components/amp-img/)

```jsx
import ImagePlaceholderAmp from '#psammead/psammead-image-placeholder/src';

const WrapperComponent = () => (
  <amp-img src="http://some-image.url" width="645px" height="128px">
    <ImagePlaceholderAmp />
  </amp-img>
);
```

## Props

### ImagePlaceholder

| Argument        | Type                                           | Required | Default | Example                |
| --------------- | ---------------------------------------------- | -------- | ------- | ---------------------- |
| Ratio           | Number, ratio between height and width         | Yes      | N/A     | 65.625                 |
| darkPlaceholder | Bool, true (dark) or false (normal)            | No       | false   | false                  |
| forwardStyle    | Styling object that applies additional styling | No       | null    | { background: 'none' } |

### ImagePlaceholderAmp

| Argument        | Type                                | Required | Default | Example |
| --------------- | ----------------------------------- | -------- | ------- | ------- |
| darkPlaceholder | Bool, true (dark) or false (normal) | No       | false   | false   |

### Accessibility notes

As a `div` with a background image or as an `amp-img` for it's AMP counterpart, Psammead Image Placeholder is a presentational element without semantic meaning. As such it does not need to meet colour contrast requirements.

<!-- ## Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

# psammead-figure - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-figure%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-figure%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-figure)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-figure) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-figure)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-figure&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/figure--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-figure/src.svg)](https://www.npmjs.com/package/#legacy/psammead-figure/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `psammead-figure` component is a styled `<figure>` element. It has the same semantic meaning -- it should be used to surround images, tables or code snippets.

## Installation

`npm install #legacy/psammead-figure/src`

## Props

| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| No props. |      |          |         |         |

## Usage

The following example shows `psammead-figure` wrapping an

- [psammead-image-placeholder](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-image-placeholder), a `<div>` with background image
- [psammead-image](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-image), an `<img>`
- [psammead-caption](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-caption), a `<figcaption>`
- [psammead-visually-hidden-text](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-visually-hidden-text), a hidden `<span>` available only to assistive technology

```jsx
import Caption from '#psammead/psammead-caption/src';
import Figure from '#psammead/psammead-figure/src';
import Image from '#psammead/psammead-image/src';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import VisuallyHiddenText from '#components/VisuallyHiddenText';

const Wrapper = ({ alt, captionText, ratio, src, width }) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      <Image alt={alt} src={src} width={width} />
    </ImagePlaceholder>
    <Caption>
      <VisuallyHiddenText>Image caption, </VisuallyHiddenText>
      {captionText}
    </Caption>
  </Figure>
);
```

### When to use this component

Use this component when a `<figure>` element, which represents self-contained content that frequently has a caption, is required. Figures usually wrap an image.

<!-- ### When not to use this component -->

### Accessibility notes

The `psammead-figure` is a `<figure>` element with associated styles. When you use this component, it has the same semantic meaning as a regular [figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) element.

<!-- ## Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

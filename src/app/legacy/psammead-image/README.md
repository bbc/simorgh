# psammead-image - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-image%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-image%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-image)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-image)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-image&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/image-img--landscape-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-image.svg)](https://www.npmjs.com/package/@bbc/psammead-image) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `psammead-image` component has two images available. The default is a styled `img` element that uses Styled Components.

There is an alternative AMP Image which can be used. It is a React component returning an `amp-img` element.

### When to use this component

This component can be used at any point on a page.

<!-- ### When not to use this component -->

## Installation

`npm install @bbc/psammead-image`

## Usage

### Img

Importing the standard Image component renders an `<img />` tag.

```jsx
import Image from '@bbc/psammead-image';

const WrappingContainer = ({ alt, src, height, width, sizes }) => (
  <Img alt={alt} src={src} height={height} width={width} sizes={sizes} fade />
);
```

### AmpImg

If you're to use the `AmpImg` component, [please read the AMP documentation here](https://www.ampproject.org/docs/reference/components/amp-img) for further details.

The Amp Image component renders an `<amp-img>` tag.

Example:

```jsx
import { AmpImg } from '@bbc/psammead-image';

const WrappingContainer = ({ alt, src, height, width, sizes }) => (
  <AmpImg
    alt={alt}
    layout="responsive"
    sizes={sizes}
    src={src}
    height={height}
    width={width}
  />
);
```

## Props

### Img

<!-- prettier-ignore -->
| Prop | Type | Required | Default | Example |
|:-----|:-----|:---------|:--------|:--------|
| `alt`    | string        | Yes | -     | "A picture of a cat" |
| `height` | number/string | No  | null  | 450 |
| `sizes`  | string        | No  | null  | "100vw" |
| `src`    | string        | Yes | -     | "https://bbc.com/300/cat.jpg" |
| `srcset` | string        | No  | null  | "https://bbc.com/300/cat.jpg.webp 300w, https://bbc.com/450/cat.jpg.webp 450w, https://bbc.com/600/cat.jpg.webp 600w" |
| `fallbackSrcset` | string        | No  | null  | "https://bbc.com/300/cat.jpg 300w, https://bbc.com/450/cat.jpg 450w, https://bbc.com/600/cat.jpg 600w" |
| `primaryMimeType` | string        | No  | null  | "image/webp" |
| `fallbackMimeType` | string        | No  | null  | "image/jpeg" |
| `width`  | number/string | No  | null  | 600 |
| `fade`   |  boolean      | No  | false | true |

The `height` and `width` props are optional, in some cases to preserve the image ratio you might specify either `height` or `width` and let the browser scale the image accordingly.

However when not specified the browser will not be able to determine the size of the image, the browser will therefore build the page twice or more depending on the number of images you have. First paint is for the browser to display all the text and once the image is downloaded and size determined a second paint to wrap the texts around the image.

Specifying the `width` and `height` allows the browser to reserve space for the image which prevent content moving around while the image is being loaded.

The `srcset` prop is optional since some projects might not want to use the srcset attribute on images.

The `sizes` prop is optional since some projects might not want to use the sizes attribute on images.

The `fade` prop is optional and set to `false` by default. It's been used to apply a fade-in animation effect on the `Img` component.

### AmpImg

<!-- prettier-ignore -->
| Prop | Type | Required | Default | Example |
|:-----|:-----|:---------|:--------|:--------|
| `alt`         | string        | Yes | -    | "A picture of a cat" |
| `attribution` | string        | No  | ''   | "Getty Images" |
| `height`      | number/string | Yes | null | 450 |
| `layout`      | string        | Yes | -    | "responsive" |
| `sizes`       | string        | No  | null | "100vw" |
| `src`         | string        | Yes | -    | "https://bbc.com/300/cat.jpg" |
| `srcset`      | string        | No  | null | "https://bbc.com/300/cat.jpg.webp 300w, https://bbc.com/450/cat.jpg.webp 450w, https://bbc.com/600/cat.jpg.webp 600w" |
| `fallbackSrcset` | string        | No  | null  | "https://bbc.com/300/cat.jpg 300w, https://bbc.com/450/cat.jpg 450w, https://bbc.com/600/cat.jpg 600w" |
| `width`       | number/string | Yes | -    | 600 |

The `attribution` prop is available to pass in strings to include the image source. [For further details, please refer to the `amp-img` attribute docs](https://www.ampproject.org/docs/reference/components/amp-img#attributes).
The `layout` prop can be one of several, including `responsive`, `fixed`, `intrinsic` etc. We recommend using `responsive` for most use-cases, with `height` and `width` props passed in, so the AMP can use the correct ratio for scaling the image. [For further details, please refer to the AMP docs](https://www.ampproject.org/docs/reference/components/amp-img).
The `srcset` prop is a string with comma separated string of image URLs with varying sizes. [For further details, please refer to the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset).
The `sizes` prop is string containing a list of comma separated strings indicating a set of source sizes. [For further details, please refer to the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes).

### Accessibility notes

This component requires an `alt` property to describe the image. This `alt` text is crucial for users of Assistive Technology, and by any user whose internet connection is so slow the browser decides to render the text instead of the image.

Some images are purely presentational - in these cases, an `alt` attribute must still be passed, but the value would be an empty string: `""`.

<!-- ## Roadmap -->

<!-- ## Additional notes -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

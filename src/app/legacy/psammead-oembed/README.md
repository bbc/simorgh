# ⛔️ This is an alpha component ⛔️

This component is currently tagged as alpha and is not suitable for production use. Following the passing of an accessibility review this component will be marked as ready for production and the alpha tag removed.

# psammead-oembed - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-oembed%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-oembed%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-oembed)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-oembed) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-oembed)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-oembed&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/oembed--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-oembed.svg)](https://www.npmjs.com/package/@bbc/psammead-oembed) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `OEmbed` component [sanitizes](#Sanitization) and renders the HTML from an oEmbed response.

## Installation

```jsx
npm install @bbc/psammead-oembed --save
```

## Props

| Argument    | Type   | Required | Default | Example                |
| ----------- | ------ | -------- | ------- | ---------------------- |
| `oEmbed`    | Object | Yes      | n/a     | See below.             |
| `className` | String | No       | `null`  | `parent-applied-class` |

### oEmbed

| Argument | Type   | Required | Default | Example                |
| -------- | ------ | -------- | ------- | ---------------------- |
| `html`   | String | Yes      | n/a     | `<p>Hello, World!</p>` |

## Usage

```jsx
import OEmbed from '@bbc/psammead-oembed';

const oEmbedResponse = {
  url: 'https://twitter.com/SonyPictures/status/1164036827667238912',
  author_name: 'Sony Pictures',
  author_url: 'https://twitter.com/SonyPictures',
  html:
    '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Much of today’s news about Spider-Man has mischaracterized recent discussions about Kevin Feige’s involvement in the franchise. We are disappointed, but respect Disney’s decision not to have him continue as a lead producer of our next live action Spider-Man film. (1/3)</p>&mdash; Sony Pictures (@SonyPictures) <a href="https://twitter.com/SonyPictures/status/1164036827667238912?ref_src=twsrc%5Etfw">August 21, 2019</a></blockquote>',
  width: 550,
  height: null,
  type: 'rich',
  cache_age: '3153600000',
  provider_name: 'Twitter',
  provider_url: 'https://twitter.com',
  version: '1.0',
};

<OEmbed oEmbed={oEmbedResponse} />;
```

### When to use this component

This component should be used within components that render the HTML from oEmbed responses.

### When not to use this component

This component should not be used on its own. It should be used within in a parent component that adheres to the necessary UX and accessibility requirements.

### Accessibility notes

See above.

### Roadmap

There are no known future changes to this component.

### Sanitization

Sanitization is performed using DOMPurify, a modern HTML sanitization library. Version `2.0.8` weighs `6.5kB` (minified and gzipped). See its [Security Goals & Threat Model](https://github.com/cure53/DOMPurify/wiki/Security-Goals-&-Threat-Model).

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

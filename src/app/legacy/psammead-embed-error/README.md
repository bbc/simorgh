# psammead-embed-error - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-embed-error%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-embed-error%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-embed-error)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-embed-error) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-embed-error)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-embed-error&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/embed-error--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-embed-error.svg)](https://www.npmjs.com/package/@bbc/psammead-embed-error) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

`EmbedError` is a lean error message component, designed for embedded content, such as that in an iframe. It will fill its parent container and can optionally fill the viewport, while positioning its content accordingly.

## Installation

```jsx
npm install @bbc/psammead-embed-error --save
```

## Props

| Argument       | Type    | Required | Default | Example                                 |
| -------------- | ------- | -------- | ------- | --------------------------------------- |
| `service`      | String  | No       | `news`  | `arabic`                                |
| `fillViewport` | Boolean | No       | `false` | `true`                                  |
| `message`      | String  | Yes      | -       | `Sorry, we can't display this content.` |
| `link`         | Object  | No       | `null`       | See: [link](#link).                     |

### `link`

| Argument | Type   | Required | Default | Example                                                  |
| -------- | ------ | -------- | ------- | -------------------------------------------------------- |
| `text`   | String | Yes      | n/a     | `View alternate content.`                                |
| `href`   | String | Yes      | n/a     | `https://www.bbc.co.uk/news/av-embed/a-video-about-dogs` |

## Usage

This component is particularly useful if you serve content in an iframe and want users to have a seamless error experience. Consider the following example:

```js
// An article with an iframe.
<iframe src="https://www.bbc.co.uk/news/av-embed/a-video-about-cats"></iframe>
```

```js
// iframe content.
import EmbedError from '@bbc/psammead-embed-error';

const Page = () => {
  if (error) {
    return
    <EmbedError
      message="Sorry, we can't display this content."
      link={{
        text: 'View alternate content.',
        href: 'https://www.bbc.co.uk/news/article/all-about-dogs',
      }}
      fillViewport
    />;
  }
};
```

Note the use of `fillViewport`, which ensures the error will fill the iframe in the article.

### When to use this component

This component should be used when you want to display an error message that fills a container or viewport.

### When not to use this component

This component should not be used to display messages other than errors.

### Accessibility notes

This component's error message is wrapped in a `<strong>` element, indicating to users of assistive technology that it is an important message. This is similar behaviour to the Guidance component used in Media Player's Placeholder.

### Roadmap

The requirements of this component are expected to change. Developments in Mozart's error reporting will influence how (and where) this component is used in the future.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

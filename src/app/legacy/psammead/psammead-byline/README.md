# psammead-byline - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-byline%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-byline%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-byline)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-byline) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-byline)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-byline&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/byline--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-byline/src.svg)](https://www.npmjs.com/package/#legacy/psammead-byline/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `Byline` component is designed to display an author's full name, title, and optional avatar.

## Installation

```
npm install #legacy/psammead-byline/src --save
```

## Props

| Argument          | Type   | Required | Default | Example        |
| ----------------- | ------ | -------- | ------- | -------------- |
| service           | string | Yes      | N/A     | `'news'`       |
| [avatar](#Avatar) | object | No       | `null`  | _See below._   |
| name              | string | Yes      | N/A     | `'John Smith'` |
| title             | string | Yes      | N/A     | `'Art editor'` |

### Avatar

| Argument | Type   | Required | Default | Example                          |
| -------- | ------ | -------- | ------- | -------------------------------- |
| src      | string | Yes      | N/A     | `'http://www.bbc.co.uk/img.jpg'` |
| alt      | string | No       | `null`  | `'A person wearing glasses.'`    |

## Usage

<!-- Description of the component usage -->

```jsx
import Byline from '#psammead/psammead-byline/src';

<Byline
  service="news"
  avatar={{ src: 'http://www.bbc.co.uk/john-smith.jpg' }}
  name="John Smith"
  title="Art editor"
/>;
```

### When to use this component

This component should be used when crediting the author of a piece of content, such as an article.

### When not to use this component

N/A.

### Accessibility notes

By default the avatar `img` is rendered with an empty `alt` attribute as it is expected to be of the person, which the adjacent name describes.

### Roadmap

There are no known future changes to this component.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

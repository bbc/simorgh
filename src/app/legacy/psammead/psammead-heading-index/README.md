<!-- prettier-ignore -->
# psammead-heading-index - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-heading-index%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-heading-index%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-heading-index)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-heading-index) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-heading-index)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-heading-index&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/headline--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-heading-index/src.svg)](https://www.npmjs.com/package/#legacy/psammead-heading-index/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `HeadingIndex` uses a `h1` HTML element and is used on index pages such as Most Read.

## Installation

`npm install #legacy/psammead-heading-index/src`

## Props

<!-- prettier-ignore -->
| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| script    | object | yes | latin | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }|
| service | string | yes | N/A | `'news'` |

## Usage

```jsx
import HeadingIndex from '#psammead/psammead-heading-index/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const Wrapper = () => (
  <Fragment>
    <HeadingIndex script={latin} service="news">
      Heading
    </HeadingIndex>
  </Fragment>
);
```

### When to use this component

This component is designed to be used once at the top of the page.

The `HeadingIndex` can take an optional `id` attribute which can be used as an anchor when referencing content.

```jsx
<HeadingIndex id="content" script={latin} service="news">
  Heading
</HeadingIndex>
```

<!-- ### When not to use this component -->

### Accessibility notes

The `HeadingIndex` component has a tabindex of `-1`, this ensures that it is focusable by assitive technology.

<!-- ## Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

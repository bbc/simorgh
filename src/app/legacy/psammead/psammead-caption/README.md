# psammead-caption - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-caption%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-caption%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-caption)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-caption) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-caption)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-caption&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/caption--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/BBC/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-caption/src.svg)](https://www.npmjs.com/package/#legacy/psammead-caption/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/BBC/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `psammead-caption` component is a styled `figcaption` element.

## Installation

`npm install #legacy/psammead-caption/src`

## Props

<!-- prettier-ignore -->
| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| Script    | object | yes | latin | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }|
| service | string | Yes | N/A | '`news`' |

## Usage

`psammead-caption` can be used together with the [`psammead-figure`](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-figure) and [`psammead-visually-hidden-text`](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-visually-hidden-text) components in this way. This visually hidden text is to give context to users of Assistive Technology.

```jsx
import Caption from '#psammead/psammead-caption/src';
import Figure from '#psammead/psammead-figure/src';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import arabic from '../../../components/ThemeProvider/fontScripts/arabic';

const Wrapper = captionText => (
  <Figure>
    ...
    <Caption script={arabic} service="news">
      <VisuallyHiddenText>Image caption, </VisuallyHiddenText>
      {captionText}
    </Caption>
  </Figure>
);
```

### When to use this component

The `Caption` component should be used only within a `figure` element. It is designed to be placed after an image or video component.

<!-- ### When not to use this component -->

### Accessibility notes

Since this is just a `<figcaption>` tag with associated styles, when you use this component, it has the same semantic meaning as a regular figcaption element.

The font and background-color choices meet WCAG AA colour contrast guidelines.

## Roadmap

When this caption is used for scripts that do not support italic text, we can consider creating a prop that toggles the `font-style: italic`.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

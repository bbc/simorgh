# psammead-inline-link - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-inline-link%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-inline-link%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-inline-link)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-inline-link) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-inline-link)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-inline-link&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/inlinelink--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-inline-link/src.svg)](https://www.npmjs.com/package/#legacy/psammead-inline-link/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

## Description

The `#legacy/psammead-inline-link/src` package exports a single Inline Link component. It uses an `a` HTML element and colours from `#legacy/psammead-styles/src`.

## Installation

`npm install #legacy/psammead-inline-link/src`

## Props

| Argument | Type   | Required | Default | Example         |
| -------- | ------ | -------- | ------- | --------------- |
| href     | String | Yes      | N/A     | `www.bbc.co.uk` |

## Usage

```jsx
import InlineLink from '#psammead/psammead-inline-link/src';

const WrappingComponent = () => (
  <InlineLink href="https://www.bbc.com/news">Text here</InlineLink>
);
```

We have not included any typography styles inside this component. This is so it is reusable in multiple contexts. For example, you can use `InlineLink` inside our existing `psammead-paragraph` for body copy and `psammead-headings` for headlines and subheadings (`h1`s and `h2`s).

Example inline link in a paragraph:

```jsx
import InlineLink from '#psammead/psammead-inline-link/src';
import Paragraph from '#psammead/psammead-paragraph/src';

const WrapperComponent = () => (
  <Paragraph>I am a paragraph that has a link to <InlineLink href="https://www.bbc.com/news">the BBC News front page</InlineLink>.<Paragraph>
);
```

Example inline link in a Headline or SubHeading:

```jsx
import InlineLink from '#psammead/psammead-inline-link/src';
import { Headline, SubHeading } from '#psammead/psammead-headings/src';

const HeadlineWithALink = () => (
  <InlineLink href="https://www.bbc.com/news"><Headline>Headline</Headline></InlineLink>


  const SubHeadingWithALink = () => (
  <InlineLink href="https://www.bbc.com/news"><SubHeading>SubHeading</SubHeading></InlineLink>
);
```

Alternatively, if you want to just extend existing styles with other GEL Typography groups, you can do the following:

```jsx
import InlineLink from '#psammead/psammead-inline-link/src';
import { GEL_PARAGON } from '#psammead/gel-foundations/src';

const GelParagonLink = styled(InlineLink)`
  ${GEL_PARAGON};
`;

const WrapperComponent = () => (
  <GelParagonLink href="https://www.bbc.com/news">
    Link with GEL Paragon typography
  </GelParagonLink>
);
```

### When to use this component

This component can be used at any point on a page.

<!-- ### When not to use this component -->

### Accessibility notes

Since this is just a `<a>` tag with associated styles, when you use this component, it has the same semantic meaning as a regular anchor element.

The font and background-color choices for each hover/focused/visited/default states meet WCAG AA colour contrast guidelines. Also the border width increases on hover and focus which acts as a visible change that is not colour dependent for high-contrast modes, which often override colours/styles.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

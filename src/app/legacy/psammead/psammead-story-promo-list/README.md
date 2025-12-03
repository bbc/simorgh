# psammead-story-promo-list - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-story-promo-list%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-story-promo-list%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-story-promo)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-story-promo)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-story-promo&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/story-promo-list/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/story-promo-list--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-story-promo-list/src.svg)](https://www.npmjs.com/package/#legacy/psammead-story-promo-list/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `#legacy/psammead-story-promo-list/src` package is a set of three components, `StoryPromoUl`, `StoryPromoLi` and `StoryPromoLiBase`. They use `ul` and `li` HTML elements respectively. The `StoryPromoLi` and `StoryPromoLiBase` components are both `li` elements and can be used interchangeably as they have similar props the only difference is that the `StoryPromoLiBase` ships with no padding presets thereby making it much more configurable to any set of padding/margin rules set on child elements.

## Installation

`npm install #legacy/psammead-story-promo-list/src`

## Props

<!-- prettier-ignore -->
| Argument | Type | Required | Default | Example        |
| -------- | ---- | -------- | ------- | -------------- |
| children | node | yes      | N/A     | `<StoryPromoLi><StoryPromo image={Image} info={Info} /></StoryPromoLi>` |
| border   | bool | no       | `true`    | `false` |

## Usage

Commonly used alongside [`psammead-story-promo`](https://github.com/BBC-News/psammead/tree/latest/packages/components/psammead-story-promo).

```jsx
import React, { Fragment } from 'react';
import StoryPromo, { Headline, Summary } from '#psammead/psammead-story-promo/src';
import { StoryPromoLi, StoryPromoUl } from '#psammead/psammead-story-promo-list/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const Image = (
  <img src="https://foobar.com/image.jpg" />
);

const Info = (
  <Fragment>
    <Headline script={latin}>
      <Link href="https://www.bbc.co.uk/news">The headline of the promo</Link>
   </Headline>
    <Summary script={latin}>The summary of the promo</Summary>
    <time>12 March 2019</time>
  </Fragment>
);

<StoryPromo
  image={Image}
  info={Info}
/>

<StoryPromoUl>
  <StoryPromoLi>
    <StoryPromo image={Image} info={Info} />;
  </StoryPromoLi>
  <StoryPromoLi>
    <StoryPromo image={Image} info={Info} />;
  </StoryPromoLi>
</StoryPromoUl>

```

### When to use this component

This component is designed to be used with story promos on 'index' pages.

<!-- ### When not to use this component -->

### Accessibility notes

We have added the role `list` and `listitem` to the corresponding list items due to a VoiceOver bug to reinstate the list semantics.

We haven't yet thoroughly looked at cross device browser AT testing yet, this is in-progress. We will update with a11y notes when carrying out a proper release.

<!-- ## Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

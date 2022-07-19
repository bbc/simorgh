# psammead-visually-hidden-text - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-visually-hidden-text%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-visually-hidden-text%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-visually-hidden-text)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-visually-hidden-text) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-visually-hidden-text)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-visually-hidden-text&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/visuallyhiddentext--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-visually-hidden-text/src.svg)](https://www.npmjs.com/package/#legacy/psammead-visually-hidden-text/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

Adds non-visible text to the page, to be utilised by screen-readers and other assistive technology.

## Installation

`npm install #legacy/psammead-visually-hidden-text/src`

## Props

| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| No props. |      |          |         |         |

## Usage

```jsx
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';

const WrappingComponent = () => (
  <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>
);
```

Please bear in mind that if CSS is disabled, any `children` will be shown inline. Testing your usage of the component should include disabling page styling.

### When to use this component

Visually hidden text should be used alongside any component which relies on visual aids or styling to communicate its purpose, as these aids may not be present for users who are relying on assistive technologies.

For example, a source/copyright overlay on an image may seem obvious in purpose when viewed on a page, but the contents of such a component could be jarring or confusing when immediately spoken out following the alt-text of an image. As a result, it utilises this component to provide additional context before reading its main text content.

### When not to use this component

Avoid using this component with text that would cause unnecessary repetition. For example, there is no need to add visually hidden text stating "Image" next to an `img` tag, as assistive tech already explicitly communicates the presence of an image, and this would likely only prove confusing or irritating to users.

Similarly, when adding hidden text that will occur partway through an article, avoid using phrases that may imply that the main body is over. Suddenly hearing a phrase like "Read more on [subject]" may suggest to users that they have finished the article. To mitigate this, you may wish to wrap the content in an [`aside` ARIA landmark](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/complementary.html) or include a ["skip link"](https://www.w3.org/TR/WCAG20-TECHS/G1.html), giving users the option to skip back to the main body before the assistive technology reads the full content of the interjection.

<!-- ### Accessibility notes -->

<!-- ## Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

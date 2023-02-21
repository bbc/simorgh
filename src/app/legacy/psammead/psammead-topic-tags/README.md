# psammead-topic-tags - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-topic-tags%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-topic-tags%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-topic-tags)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-topic-tags) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-topic-tags)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-topic-tags&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/topic-tags--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-topic-tags/src.svg)](https://www.npmjs.com/package/#legacy/psammead-topic-tags/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `TopicTags` component is a styled `<ul>` or `<div>`, depending on the number of `TopicTag` components it contains. If there is only a single `TopicTag` component with the `TopicTags` component, then the `TopicTags` component is a styled `<div>`, otherwise it's a styled `<ul>`.

## Installation

```jsx
npm install #legacy/psammead-topic-tags/src --save
```

## Props

| Argument            | Type   | Required | Default                    | Example                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ------ | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| script              | string | Yes      | N/A                        | `'news'`                                                                                                                                                                                                                                                                                                                   |
| service             | object | Yes      | N/A                        | `{ canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }` |
| dir                 | string | No       | `'ltr'`                    | One of `'ltr'` or `'rtl'`                                                                                                                                                                                                                                                                                                  |
| tagBackgroundColour | string | No       | The GEL variable `C_LUNAR` | Any valid CSS `color`                                                                                                                                                                                                                                                                                                      |

## Usage

<!-- Description of the component usage -->

```jsx
import { TopicTags, TopicTag } from '#psammead/psammead-topic-tags/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const Wrapper = () => (
  <TopicTags script={latin} service="news" dir="ltr">
    <TopicTag topicName="Retailing" topicLink="/url/to/topic" />
    <TopicTag topicName="Business" topicLink="/url/to/topic" />
    <TopicTag topicName="Viruses" topicLink="/url/to/topic" />
  </TopicTags>
);
```

### When to use this component

The `TopicTag` component should only be used inside of a `TopicTags` component, and a `TopicTags` component should only be used to contain `TopicTag` components.

### Accessibility notes

The `TopicTags` component is fundamentally a `<ul>` when there is more than 1 `TopicTag`, and the `<ul>` uses the ARIA `role="list"` attribute. This reinstates the list semantics on VoiceOver which removes them due to the use of `list-style-type: none;` in the CSS.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

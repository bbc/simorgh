# psammead-bulleted-list - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-bulleted-list%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-bulleted-list%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-bulleted-list)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-bulleted-list) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-bulleted-list)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-bulleted-list&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/psammead-bulleted-list--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/psammead-bulleted-list.svg)](https://www.npmjs.com/package/@bbc/psammead-bulleted-list) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `BulletedList` component is a styled bulleted (unordered) list that works for right-to-left and left-to-right languages.

## Installation

```jsx
npm install @bbc/psammead-bulleted-list --save
```

## Props

| Argument          | Type                    | Required | Default     | Example                                                                                                                                                                                                                                                                                                                  |
| ----------------- | ----------------------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| dir               | string                  | No       | `'ltr'`     | One of `'rtl'` `'ltr'`                                                                                                                                                                                                                                                                                                   |
| script            | script                  | Yes      | N/A         | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, } |
| service           | string                  | Yes      | N/A         | `'news'`                                                                                                                                                                                                                                                                                                                 |
| bulletPointShape  | `'round'` or `'square'` | No       | N/A         | `'round'`                                                                                                                                                                                                                                                                                                                |
| bulletPointColour | CSS Colour              | No       | `'#3F3F42'` | `'#ff0000'`                                                                                                                                                                                                                                                                                                              |

## Usage

Use `BulletedList` in place of a `ul` element with required props and a `BulletedListItem` in place of an `li`.

```jsx
import BulletedList, { BulletedListItem } from '@bbc/psammead-bulleted-list';

const props = {
  dir: 'ltr',
  script: latin,
  service: 'news',
  bulletPointShape: 'round', // or 'square'
};

<BulletedList {...props}>
  <BulletedListItem>A list item</BulletedListItem>
  <BulletedListItem>Another item</BulletedListItem>
</BulletedList>
```

### When to use this component

`BulletedList`s can be used wherever you need a standard GEL unordered list.

### When not to use this component

It's not ideal for when you need a custom bullet. Use the standard `<ul>` instead if you need to style your bullets.

### Accessibility notes

- The bullets in `psammead-bulleted-lists` are not read by screen readers and are generated using pseudo-elements.

- We have added role list and role listitem to the corresponding items due to a VoiceOver bug to reinstate the list semantics

<!-- Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

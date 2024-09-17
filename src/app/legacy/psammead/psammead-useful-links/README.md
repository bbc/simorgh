# psammead-useful-links - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-useful-links%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-useful-links%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-useful-links)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-useful-links) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-useful-links)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-useful-links&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/useful-links--one-link) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-useful-links/src.svg)](https://www.npmjs.com/package/#legacy/psammead-useful-links/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `UsefulLinks` component implements a Link Promo type that accesses links with information about various things to do with the world service website. `UsefulLinks` consists of a wrapper and a link element when there is only one useful item. In case there are multiple items, `UsefulLinks` consists of an unordered list with list items.

## Installation

```jsx
npm install #legacy/psammead-useful-links/src
```

## UsefulLink Props

| Argument | Type   | Required | Default | Example                                                                                                                                                                                                                                                                                                                  |
| -------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| service  | string | yes      | N/A     | `'news'`                                                                                                                                                                                                                                                                                                                 |
| script   | object | yes      | N/A     | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, } |
| href     | string | yes      | N/A     | `'https://www.bbc.com/igbo/afirika-49883577'`                                                                                                                                                                                                                                                                            |

## UsefulLinksUl Props

| Argument | Type | Required | Default | Example                                                                                                                                                                         |
| -------- | ---- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children | node | yes      | N/A     | `<UsefulLinksLi><UsefulLink service='news' script={latin} href='https://www.bbc.com/igbo/afirika-49883577'> Mitocinmu da sauko da sautin labarai </UsefulLink></UsefulLinksLi>` |

## UsefulLinksLi Props

| Argument | Type | Required | Default | Example                                                                                                                                          |
| -------- | ---- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| children | node | yes      | N/A     | `<UsefulLink service='news' script={latin} href='https://www.bbc.com/igbo/afirika-49883577'> Mitocinmu da sauko da sautin labarai </UsefulLink>` |

## Usage

<!-- Description of the component usage -->

```jsx
import latin from '#components/ThemeProvider/fontScripts/latin';
import { UsefulLink, UsefulLinksLi, UsefulLinksUl } from './index';

const SingleUsefulItem = () => (
  <UsefulLink script={latin} service="news" href={url}>
    {usefulItems[0]}
  </UsefulLink>
);

const MultipleUsefulItems = () => (
  <UsefulLinksUl>
    {usefulItems.map(item => {
      return (
        <UsefulLinksLi key={item.id}>
          <UsefulLink script={latin} service="news" href={item.url}>
            {item.name}
          </UsefulLink>
        </UsefulLinksLi>
      );
    })}
  </UsefulLinksUl>
);
```

### When to use this component

This component can be used at any point on the page.

### Accessibility notes

When there are multiple useful items, they are announced by a screen reader as list items within a list. When there is only one useful item, a screen reader does not announce it as a list item.

We have added the role `list` and `listitem` to the corresponding list items due to a VoiceOver bug to reinstate the list semantics.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

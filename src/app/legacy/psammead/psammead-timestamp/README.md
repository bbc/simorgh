# psammead-timestamp - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-timestamp%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-timestamp%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-timestamp)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-timestamp) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-timestamp)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-timestamp&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/timestamp--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-timestamp/src.svg)](https://www.npmjs.com/package/#legacy/psammead-timestamp/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

Displays a timestamp, with suitable semantic markup.

## When to use this component

For displaying an isolated timestamp, separate from the other content in an article or cell.

## When not to use this component

When a date or time is to be displayed inline inside a paragraph.

## Installation

`npm install #legacy/psammead-timestamp/src`

## Props

<!-- prettier-ignore -->
| Argument   | Type   | Required | Default | Example                  |
|------------|--------|----------|---------|--------------------------|
| `datetime` | string ([supported formats](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#Valid_datetime_Values)) | Yes | N/A | `2006-09-24T05:00-07:00` |
| `typographyFunc` | function | No | getBrevier | `function getPica(script){ return 'font-size: 28'; }` |
| `padding` | boolean | No | `true` | `false` |
| `script` | object | Yes | N/A | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }|
| service | string | Yes | N/A | `'news'` |
| darkMode | bool | no | false | true |

## Usage

```jsx
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import { getPica } from '#psammead/gel-foundations/src/typography';

const WrappingContainer = () => (
  <Timestamp
    datetime="2019-03-01T14:00+00:00"
    typographyFunc={getPica}
    padding={false}
    script={latin}
    service="news"
  >
    Friday 1 March 2019
  </Timestamp>
);
```

## Accessibility notes

The usage of the semantic `time` element within this component can result in strange behaviours when using assistive technology such as VoiceOver for iOS. Specifically, it results in a "text splitting" behaviour, where any text in the prefix is read out, but the value inside the semantic `time` element require an additional swipe before being read out.

However, as we heavily encourage the use of this semantic element, and want to ensure it's usage is in line with [the W3C examples](https://www.w3.org/TR/html51/textlevel-semantics.html#the-time-element), we feel this compromise is necessary.

## Contributing

Simorgh is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Simorgh respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Simorgh is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

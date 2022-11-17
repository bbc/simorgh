# psammead-live-label - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-live-label%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-live-label%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-live-label)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-live-label) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-live-label)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-live-label&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/live-label--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-live-label/src.svg)](https://www.npmjs.com/package/#legacy/psammead-live-label/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `LiveLabel` component implements a span for use on live content.

## Installation

`npm install #legacy/psammead-live-label/src --save`

## Props

<!-- prettier-ignore -->
| Argument          | Type    | Required | Default   | Example                 |
| ----------------- | ------- | -------- | --------- | ----------------------- |
| service           | string  | yes      | N/A       | `'news'`                |
| dir               | string  | no       | `'ltr'`   | `'rtl'`                 |
| ariaHidden        | bool    | no       | `false`   | `true`                  |
| liveText          | string  | no       | `'LIVE'`  | `'Localised Live'`      |
| offScreenText     | string  | no       | `null`    | `'Live'`          |
| lang              | string  | no       | `'en-GB'` | `'en-GB'`               |
| children          | node    | no       | `null`    | `<span>Headline</span>` |

## Usage

<!-- Description of the component usage -->

```jsx
import LiveLabel from '#psammead/psammead-live-label/src';
import { Headline, Link } from '#psammead/psammead-story-promo/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

<Headline script={latin} service="news">
  <Link href="https://www.bbc.co.uk/news">
    <LiveLabel service={service} dir={dir} ariaHidden offScreenText="Live">
      The headline of the live promo
    </LiveLabel>
  </Link>
</Headline>;
```

### When to use this component

The `LiveLabel` component can be used inside a `Link` in index pages to show a promo for a Live page.

### Accessibility notes

The `LiveLabel` example above shows this component being hidden to screen readers with visually hidden text rendered alongside it. This is to ensure the screen reader announces the word 'Live' correctly. This does not need to be accounted for in other languages.

The `ariaHidden` prop is needed as styled components strips out aria tags on a server render.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

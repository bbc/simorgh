# psammead-consent-banner - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-consent-banner%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-consent-banner%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-consent-banner)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-consent-banner) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-consent-banner)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-consent-banner&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/consent-banner--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-consent-banner/src.svg)](https://www.npmjs.com/package/#legacy/psammead-consent-banner/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `psammead-consent-banner` component is a styled `div` that encapsulates information regarding privacy and cookie policy. The component also has two options, for users to accept the policy or be directed to a page with additional information regarding the data policy.

<!-- ### When not to use this component -->

## Installation

`npm install #legacy/psammead-consent-banner/src`

## Props

<!-- prettier-ignore -->
| Argument | Type | Required | Default | Example |
| -------- | ---- | -------- | ------- | --------|
| title | string | Yes | N/A | `We've updated our Privacy and Cookies Policy` |
| text | element | Yes | N/A | `<ConsentBannerText script={script}> This is some text</ConsentBannerText>` |
| accept | element | Yes | N/A | `<button type="button">Accept</button>` |
| reject | element | Yes | N/A | `<a href="https://www.bbc.co.uk/usingthebbc/your-data-matters">Find out what's changed</a>` |
| id | string | No | Null | `ConsentBanner` |
| hidden | bool | No | Null | `false` |
| dir | string | No | `'ltr'` | One of `'rtl'` `'ltr'` |
| script | script | Yes | N/A | { canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, } |
| service | string | Yes | N/A | `'news'` |
| headingRef | [Reference](https://reactjs.org/docs/refs-and-the-dom.html) | no | `null` | `useRef(null)` |

## Usage

The typical use-case of this component is on top of the webpage of all page types. It is visible for new users.

The `headingRef` prop is used so that the title of the consent banner can be programmatically focussed for accessibility reasons. This ref will be assigned to an HTML heading element which can be focussed using the DOM APIs: `headingRef.current.focus()`.

```jsx
import {
  ConsentBanner,
  ConsentBannerText,
} from '#psammead/psammead-consent-banner/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const Accept = (
  <button onClick={() => {}} type="button">
    OK
  </button>
);

const Reject = (
  <a href="https://www.bbc.co.uk/usingthebbc/your-data-matters">
    Find out what&apos;s changed
  </a>
);

const Text = (
  <ConsentBannerText dir="ltr" script={latin} service="news">
    This is some text with <a href="https://www.bbc.com/news">a link</a> inside
    the consent banner. We have made some important changes to our Privacy and
    Cookie Policy.
  </ConsentBannerText>
);

const props = {
  dir: 'ltr',
  title: 'We have updated our Privacy and Cookies Policy',
  text: Text,
  accept: Accept,
  reject: Reject,
  id: null,
  hidden: false,
  script: latin,
  service: 'news',
};

<ConsentBanner {...props} />;
```

<!-- ## Accessibility notes -->

<!-- ## Roadmap -->

<!-- ## Additional notes -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

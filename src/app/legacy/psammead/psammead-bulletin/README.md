# psammead-bulletin - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-bulletin%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-bulletin%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-bulletin)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-bulletin) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-bulletin)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-bulletin&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/bulletin--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-bulletin/src.svg)](https://www.npmjs.com/package/#legacy/psammead-bulletin/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `Bulletin` component can be used to render `Radio` or `TVBulletin` by passing in the `type`.

## Installation

```jsx
npm install #legacy/psammead-bulletin/src --save
```

## Props

### Bulletin

<!-- prettier-ignore -->
| Argument  | Type | Required | Default | Example |
| --------- | ---- | -------- | ------- | ------- |
| `script` | object | yes | N/A | `{ canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }` |
| `service` | string | yes | N/A | `'pidgin'` |
| `dir` | string | no | `'ltr'` | `One of ['rtl', 'ltr']` |
| `image` | node | no | `null` | `<Image src={src} alt={alt} />` |
| `type` | string | yes | N/A | `One of ['audio', 'video']` |
| `ctaText` | string | yes | N/A | `Watch` |
| `ctaLink` | string | yes | N/A | `'http://link.to.resource'` |
| `summary` | string | no | `null` | `'Bulletin summary'` |
| `headlineText` | string | yes | N/A  | `'Bulletin headline'` |
| `isLive` | boolean | no | `false` | `true` |
| `liveText` | string | no | `'Live'` | `'Localised Live'` |
| `offScreenText` | string | yes | N/A | `'Watch Live'` |
| `lang` | string | no | `null` | `'en-GB'` |

## Usage

```jsx
import Bulletin from '#psammead/psammead-bulletin/src';
import { Image } from '#psammead/psammead-image/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';

const WrappingComponent = () => {
  const image = <Image src="/image.png" altText="alt text" />;

  return (
    <Bulletin
      script={latin}
      service="news"
      image={image}
      type="video"
      ctaLink="/cta"
      ctaText="Watch"
      summary="This is the summary"
      headlineText="This is the headline"
      isLive
      offScreenText="Watch LIVE"
    />
  );
};
```

### When to use this component

The `Bulletin` component is designed to be used to link to a page on which the user can play the radio or TV content.

<!-- ### When not to use this component -->

### Accessibility notes

This component uses full semantic markup for the `BulletinHeading`, `BulletinSummary`, and `BulletinHeadingLink`, using `h3`, `p` and `a` respectively. Other accessibility factors such as image alt text and time elements are passed in as props and aren't explicitly set in this component.

The link is nested inside the `h3` for better support with VoiceOver Mac and Safari. We use the `faux block link` pattern which makes the entire block clickable, whilst also enabling links nested within in that block to also be clickable.

The Call To Action is hidden from screen-readers to prevent the repetition from the title. The hidden text passed in as a prop is used before the headline to indicate to screen-reader users what type of content it is.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

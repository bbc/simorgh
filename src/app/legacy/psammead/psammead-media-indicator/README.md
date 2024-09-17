# psammead-media-indicator - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-media-indicator%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-media-indicator%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-media-indicator)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-indicator) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-media-indicator)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-media-indicator&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/media-indicator/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/media-indicator--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-media-indicator/src.svg)](https://www.npmjs.com/package/#legacy/psammead-media-indicator/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `MediaIndicator` component provides a 'play', 'audio' or 'camera' icon as well as an optional duration timestamp depending on the `type` prop. The component by default renders the 'play' icon. This component has options for both providing and not providing a duration. If one isn't provided, it will simply render the play, audio or camera icon.

## Installation

`npm install #legacy/psammead-media-indicator/src`

## Props

<!-- prettier-ignore -->
| Argument   | Type    | Required | Default | Example      |
| ---------- | ------- | -------- | ------- | ------------ |
| type       | string  | no       | 'video' | 'audio'      |
| script | object | yes | N/A | `{ canon: { groupA: { fontSize: '28', lineHeight: '32',}, groupB: { fontSize: '32', lineHeight: '36', }, groupD: { fontSize: '44', lineHeight: '48', }, }, trafalgar: { groupA: { fontSize: '20', lineHeight: '24', }, groupB: { fontSize: '24', lineHeight: '28', }, groupD: { fontSize: '32', lineHeight: '36', }, }, }` |
| service    | string  | yes      | N/A     | `'news'`     |
| dir        | string  | no       | `'ltr'` | `'rtl'`  |
| isInline   | boolean | no       | false   | true         |
| children   | node    | no       | null    | <IndexAlsos> |

### Supported `type`s

<!-- prettier-ignore -->
- `'video'`
- `'audio'`
- `'photogallery'`

## Usage

The typical use-case of this component is on top of images within promos for articles that contains a video asset at the top of the page. It indicates to the user that the link is to a video and how long the video is in duration.

Top story promos can also have related stories links called `Index Alsos`. When an Index Also item is a video, audio or photogallery, an icon should be displayed with the content using the `MediaIndicator` component passing the `isInline` prop.

```jsx
import MediaIndicator from '#psammead/psammead-media-indicator/src';
import latin from '#components/ThemeProvider/fontScripts/latin';

<MediaIndicator type="audio" script={latin} service="news" />;
```

When using this component ensure you add the relevant spacing.

E.g.

```jsx
import styled from '@emotion/styled';
import MediaIndicator from '#psammead/psammead-media-indicator/src';
import latin from '#components/ThemeProvider/fontScripts/latin';

const TimeDuration = styled.time`
  margin: 0 ${GEL_SPACING_HLF};
`;

<MediaIndicator type="audio" script={latin} service="news">
  <TimeDuration datetime="PT2M15S">2:15</TimeDuration>
</MediaIndicator>;
```

### When to use this component

The `MediaIndicator` component is designed to be used on top of an image which is linking to a page containing a video, audio or photo item based on that image. It tells the user to expect video, audio or photographic content on the page as well as how long it is in duration if applicable.

Also, it is used in Top story promos within `Index Alsos` media links.

<!-- ### When not to use this component -->

### Accessibility notes

This component is marked as `aria-hidden="true"`, which means that it should be ignored by screenreaders. It is expected that media promos provide detailed information about their content such as duration in visually hidden text in the promo headline.

<!-- ## Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

# psammead-play-button - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fpsammead-play-button%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fpsammead-play-button%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/psammead-play-button)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-play-button) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/psammead-play-button)](https://david-dm.org/bbc/psammead?path=packages/components/psammead-play-button&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/play-button/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/play-button--default) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/#legacy/psammead-play-button/src.svg)](https://www.npmjs.com/package/#legacy/psammead-play-button/src) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `PlayButton` component renders a button with a 'video' or 'audio' icon and optional duration timestamp. Which icon is displayed is defined by the value of the `type` prop. The component displays a 'video' icon by default. This component has options for displaying a duration timestamp, which if not provided will render gracefully without. When clicked, the function passed to `onClick` will be called.

## Installation

`npm install #legacy/psammead-play-button/src`

## Props

<!-- prettier-ignore -->
| Argument       | Type      | Required | Default   | Example                  |
| -------------- | --------- | -------- | --------- | ------------------------ |
| service        | string    | Yes      | N/A       | `'news'`                 |
| title          | string    | Yes      | N/A       | `'Foo.'`                 |
| onClick        | function  | Yes      | N/A       | `() => {}`               |
| duration       | string    | No       | `null`    | `'2:30'`                 |
| durationSpoken | string    | No       | `null`    | `'2 minutes 30 seconds'` |
| datetime       | string    | No       | `null`    | `'PT2M30S'`              |
| type           | string    | No       | `'video'` | `'audio'`                |
| className      | string    | No       | `null`    | `'bar'`                  |
| guidanceMessage| string    | No       | `null`    | `'Contains strong language.'`|

### Supported `type`s

<!-- prettier-ignore -->
- `'video'`
- `'audio'`

## Usage

A typical use case for this component would be to indicate to a user that a media asset placeholder contains playable media, which is either 'video' or 'audio' and, if applicable, its duration. A function triggering playback would be passed to the button's `onClick` prop.

```jsx
import PlayButton from '#psammead/psammead-play-button/src';

<PlayButton
  service="news"
  title="Dog barks at cat."
  onClick={handleClick}
  duration="2:30"
  durationSpoken="2 minutes 30 seconds"
  datetime="PT2M30S"
  type="audio"
  guidanceMessage="Contains strong language."
/>;
```

### When to use this component

The `PlayButton` component is designed to be used in a media asset placeholder containing playable media. It indicates to the user to expect 'video' or 'audio' content, as well as its duration, if applicable.

<!-- ### When not to use this component -->

### Accessibility notes

This component is expected to provide information about the playable media to screenreaders and other assistive technology. It is required that the title of the media be passed to the `title` prop and, if duration is to be displayed, a human-friendly version to `durationSpoken`. If the video has guidance information, this is also read out in the assitive text. This is used to build a string, which is rendered in a [VisuallyHiddenText](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-visually-hidden-text) element. The icon is marked as `aria-hidden="true"`, which means it should be ignored by screenreaders.

<!-- ## Roadmap -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).

# Media Player

## Description

The `media-player` component exports two versions of our media player: an AMP version, and a Canonical version.

At its core, this component returns an `iframe` that is designed to frame a media asset.
The AMP variant will render an `amp-iframe` with a nested `amp-img` to use as a placeholder.
The Canonical variant will render a placeholder, that when clicked will load the `iframe` into view.

## When to use this component

This component is to be used at any point on the page, specifically when a media player is needed.

## Props

### CanonicalMediaPlayer

| Argument                  | Type     | Required | Default     | Example                                                                                                                                     |
| ------------------------- | -------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`                     | string   | Yes      | -           | `'http://foobar.com/embeddable_endpoint'`                                                                                                   |
| `skin`                    | string   | No       | `'classic'` | `'audio'`                                                                                                                                   |
| `title`                   | string   | Yes      | -           | `'Video player'`                                                                                                                            |
| `service`                 | string   | Yes      | -           | `'news'`                                                                                                                                    |
| `showPlaceholder`         | boolean  | No       | `true`      | `false`                                                                                                                                     |
| `placeholderSrc`          | string   | No       | `null`      | `'http://foobar.com/placeholder.png'`                                                                                                       |
| `placeholderSrcset`       | string   | No       | `''`        | `'https://bbc.com/300/cat.jpg 300w, https://bbc.com/450/cat.jpg 450w, https://bbc.com/600/cat.jpg 600w'`                                    |
| `portrait`                | boolean  | No       | `false`     | `true`                                                                                                                                      |
| [`mediaInfo`](#mediaInfo) | object   | Yes      | -           | `{ title: 'A vertical video pretending to be a cat title', duration: '2:30', durationSpoken: '2 minutes 11 seconds', datetime: 'PT2M30S' }` |
| `noJsClassName`           | string   | No       | `null`      | `'no-js'`                                                                                                                                   |
| `noJsMessage`             | string   | Yes      | -           | `'This media cannot play in your browser. Please enable Javascript or use a different browser.'`                                            |
| `onMediaInitialised`      | function | No       | `() => {}`  | `() => hideLoadingIndicator()`                                                                                                              |
| `onMediaPlaying`          | function | No       | `() => {}`  | `() => trackMediaPlaybackStarted()`                                                                                                         |
| `onMediaPause`            | function | No       | `() => {}`  | `() => shrinkPlayerWindow()`                                                                                                                |
| `onMediaEnded`            | function | No       | `() => {}`  | `() => trackMediaPlaybackComplete()`                                                                                                        |
| `onMediaPlaylistEnded`    | function | No       | `() => {}`  | `() => visitNextVideoPage()`                                                                                                                |
| `onMediaError`            | function | No       | `() => {}`  | `() => logError()`                                                                                                                          |

The `src` prop is required, as it tells the component what page it needs to embed.
The `placeholderSrcset` prop is not required, as it allows image responsiveness and optimization depending on the size of the screen.
The `title` prop is required for accessibility of the embedded iframe.
The `portrait` prop is not required, and defaults to `false`. This is to support portrait video content in the future.
The `showPlaceholder` boolean prop is also not required, and defaults to `true`.
Assuming `showPlaceholder` is `true`, the `placeholderSrc` will be what image to display as the placeholder.
The `noJsClassName` is an optional prop that defaults to `null` and is used to add styling support to certain elements when javascript is disabled in the browser.
The `noJsMessage` is a required prop used display a fallback text when javascript is disabled in the browser.
The `mediaInfo` prop is required, and has the following properties.

#### mediaInfo

| Argument          | Type   | Required | Default   | Example                                                                   |
| ----------------- | ------ | -------- | --------- | ------------------------------------------------------------------------- |
| `title`           | string | Yes      | -         | `'A vertical video pretending to be a cat title'`                         |
| `datetime`        | string | No       | -         | `'PT11S'`                                                                 |
| `duration`        | string | No       | -         | `'0:11'`                                                                  |
| `durationSpoken`  | string | No       | -         | `'11 seconds'`                                                            |
| `type`            | string | No       | `"video"` | `'audio'`                                                                 |
| `guidanceMessage` | string | No       | -         | `'May contain strong language,sexual or violent content that may offend'` |

#### Events

The canonical media player accepts callback functions which it will invoke in response to events that are posted from the iframe. The following events are currently supported:

| Event                  | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| `onMediaInitialised`   | Called when the media player has loaded and is ready to begin playback           |
| `onMediaPlaying`       | Called when the media player has started playing                                 |
| `onMediaPause`         | Called when the user has paused playback                                         |
| `onMediaEnded`         | Called when a playlist item (including an ad or an ident) has completed playback |
| `onMediaPlaylistEnded` | Called when an entire playlist has completed playback                            |
| `onMediaError`         | Called when the media player has encountered an error                            |

When using the BBC's iFrame, these callbacks are invoked with a lot of additional information on the nature of the event. Internal users should refer to the SMP documentation for more details

### AmpMediaPlayer

| Argument            | Type    | Required | Default | Example                                                                                                  |
| ------------------- | ------- | -------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `src`               | string  | Yes      | -       | `http://foobar.com/embeddable_endpoint`                                                                  |
| `placeholderSrcset` | string  | No       | `null`  | `'https://bbc.com/300/cat.jpg 300w, https://bbc.com/450/cat.jpg 450w, https://bbc.com/600/cat.jpg 600w'` |
| `title`             | string  | Yes      | -       | `Video player`                                                                                           |
| `portrait`          | boolean | No       | `false` | `true`                                                                                                   |
| `placeholderSrc`    | string  | Yes      | -       | `'http://foobar.com/placeholder.png'`                                                                    |

The `placeholderSrc` prop is required for AMP, as in order to have the component load an `amp-iframe` within 600px or 75% of the viewport from the top, we must have an `amp-img` placeholder. For more information on this, please refer to the [AMP docs for amp-iframe](https://amp.dev/documentation/components/amp-iframe/).

## Usage

### CanonicalMediaPlayer

```js
import { CanonicalMediaPlayer } from '#components/MediaPlayer';

const Container = ({
  src,
  skin,
  title,
  service,
  portrait,
  showPlaceholder,
  placeholderSrc,
  placeholderSrcset,
  mediaInfo,
  noJsClassName,
  noJsMessage,
}) => (
  <CanonicalMediaPlayer
    src={src}
    skin={skin}
    title={title}
    service={service}
    portrait={portrait}
    placeholderSrc={placeholderSrc}
    placeholderSrcset={placeholderSrcset}
    showPlaceholder={showPlaceholder}
    mediaInfo={mediaInfo}
    noJsClassName={noJsClassName}
    noJsMessage={noJsMessage}
  />
);
```

### AmpMediaPlayer

```js
import { AmpMediaPlayer } from '#components/MediaPlayer';

const Container = ({
  src,
  title,
  portrait,
  placeholderSrc,
  placeholderSrcset,
}) => (
  <AmpMediaPlayer
    src={src}
    title={title}
    portrait={portrait}
    placeholderSrc={placeholderSrc}
    placeholderSrcset={placeholderSrcset}
  />
);
```

## Accessibility notes

The `title` prop is important for [accessibility](https://www.w3.org/TR/WCAG20-TECHS/H64.html). It is meant for the user and should be translated to match the user's language.

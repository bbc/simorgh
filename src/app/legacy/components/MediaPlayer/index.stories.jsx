/* eslint-disable no-alert */
import React from 'react';
import { CanonicalMediaPlayer, AmpMediaPlayer } from '.';
import ampDecorator from '#storybook/helpers/ampDecorator';
import ThemeProvider from '#components/ThemeProvider';
import readme from './README.md';

const withDuration = {
  duration: '2:30',
  durationSpoken: '2 minutes 30 seconds',
  datetime: 'PT2M30S',
};

export default {
  title: 'Components/Media Player',
  component: CanonicalMediaPlayer,
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
    },
    docs: { readme },
  },
};

export const ArticlesCanonical = () => (
  <ThemeProvider service="news">
    <CanonicalMediaPlayer
      src="https://www.test.bbc.co.uk/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6msp/en"
      placeholderSrc="https://ichef.bbci.co.uk/ace/ws/640/cpsdevpb/4eb7/test/ba7482d0-cca8-11e8-b0bf-f33155223fc4.jpg"
      service="news"
      mediaInfo={{ title: 'Dog chases cat.', type: 'video', ...withDuration }}
      title="Default Video player"
    />
  </ThemeProvider>
);

export const MAPCanonical = () => (
  <ThemeProvider service="news">
    <CanonicalMediaPlayer
      src="https://www.test.bbc.com/ws/av-embeds/cps/pidgin/23248703/p01kx42v/pcm"
      showPlaceholder={false}
      service="pidgin"
      mediaInfo={{
        title: 'alt-text world service clip',
        type: 'video',
        ...withDuration,
      }}
      showLoadingImage
      darkPlaceholder
      title="Media player"
      noJsMessage="Dem no support media player for your device"
      noJsClassName="no-js"
    />
  </ThemeProvider>
);

export const Guidance = () => (
  <ThemeProvider service="news">
    <CanonicalMediaPlayer
      src="https://www.test.bbc.co.uk/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6msp/en"
      placeholderSrc="https://ichef.bbci.co.uk/ace/ws/640/cpsdevpb/4eb7/test/ba7482d0-cca8-11e8-b0bf-f33155223fc4.jpg"
      service="news"
      title="Video player"
      mediaInfo={{
        title: 'Dog chases cat.',
        type: 'video',
        guidanceMessage:
          'Guidance: May contain strong language that may offend',
        ...withDuration,
      }}
    />
  </ThemeProvider>
);

export const Audio = () => (
  <ThemeProvider service="news">
    <CanonicalMediaPlayer
      src="https://www.test.bbc.co.uk/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6msp/en"
      placeholderSrc="https://ichef.bbci.co.uk/ace/ws/640/cpsdevpb/4eb7/test/ba7482d0-cca8-11e8-b0bf-f33155223fc4.jpg"
      service="news"
      mediaInfo={{
        type: 'audio',
        title: 'Dog barks at cat.',
        ...withDuration,
      }}
      title="Video player"
    />
  </ThemeProvider>
);

export const AudioSkin = () => (
  <ThemeProvider service="news">
    <CanonicalMediaPlayer
      src="https://www.test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/ko"
      showPlaceholder={false}
      placeholderSrc="https://news.files.bbci.co.uk/include/articles/public/images/amp_audio_placeholder.png"
      skin="audio"
      service="news"
      mediaInfo={{ type: 'audio', title: 'Live show intro.' }}
      title="Audio player"
    />
  </ThemeProvider>
);

export const WithCallbacks = () => (
  <ThemeProvider service="news">
    <CanonicalMediaPlayer
      src="https://www.test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/ko"
      showPlaceholder={false}
      placeholderSrc="https://news.files.bbci.co.uk/include/articles/public/images/amp_audio_placeholder.png"
      skin="audio"
      service="news"
      mediaInfo={{ type: 'audio', title: 'Live show intro.' }}
      title="Audio player"
      onMediaInitialised={() => alert('Media Player Initialised')}
      onMediaPlaying={() => alert('Media Player Playing')}
      onMediaPause={() => alert('Media Player Paused')}
    />
  </ThemeProvider>
);

export const AMP = () => (
  <ThemeProvider service="news">
    <AmpMediaPlayer
      isAmp
      src="https://www.test.bbc.co.uk/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6msp/en/amp"
      placeholderSrc="https://ichef.bbci.co.uk/ace/ws/640/cpsdevpb/4eb7/test/ba7482d0-cca8-11e8-b0bf-f33155223fc4.jpg"
      service="news"
      mediaInfo={{
        type: 'audio',
        title: 'Dog barks at cat.',
        ...withDuration,
      }}
      title="Video player"
      noJsMessage="no js"
    />
  </ThemeProvider>
);

AMP.parameters = { chromatic: { disable: true } };
AMP.decorators = [ampDecorator];

export const AMPAudioSkin = () => (
  <ThemeProvider service="news">
    <AmpMediaPlayer
      isAmp
      src="https://www.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/ko/amp"
      placeholderSrc="https://news.files.bbci.co.uk/include/articles/public/images/amp_audio_placeholder.png"
      skin="audio"
      title="Audio player"
      noJsMessage="no js"
      service="news"
    />
  </ThemeProvider>
);

AMPAudioSkin.decorators = [ampDecorator];

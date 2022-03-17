/* eslint-disable no-alert */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { CanonicalMediaPlayer, AmpMediaPlayer } from '.';
import MediaMessage from './Message';
import { ampDecorator } from '../../../../.storybook/preview';
import notes from '../README.md';

const withDuration = {
  duration: '2:30',
  durationSpoken: '2 minutes 30 seconds',
  datetime: 'PT2M30S',
};

const StyledMessageContainer = styled.div`
  padding-top: 56.25%;
  position: relative;
  overflow: hidden;
`;

storiesOf('Components/Media Player', module)
  .addDecorator(withKnobs)
  .add(
    'Articles Canonical',
    () => (
      <CanonicalMediaPlayer
        src="https://www.test.bbc.co.uk/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6msp/en"
        placeholderSrc="https://ichef.bbci.co.uk/news/640/cpsdevpb/4eb7/test/ba7482d0-cca8-11e8-b0bf-f33155223fc4.jpg"
        service="news"
        mediaInfo={{ title: 'Dog chases cat.', type: 'video', ...withDuration }}
        title="Default Video player"
        noJsMessage="Dem no support media player for your device"
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  )

  .add(
    'MAP Canonical',
    () => (
      <CanonicalMediaPlayer
        src="https://www.test.bbc.com/ws/av-embeds/cps/pidgin/23248703/p01kx42v/pcm"
        showPlaceholder={false}
        service="pidgin"
        mediaInfo={{
          title: 'alt-text world service clip',
          type: 'video',
          ...withDuration,
        }}
        showLoadingImage={boolean('Show loading image', true)}
        darkMode={boolean('Dark mode', false)}
        title="Media player"
        noJsMessage="Dem no support media player for your device"
        noJsClassName="no-js"
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'Guidance',
    () => (
      <CanonicalMediaPlayer
        src="https://www.test.bbc.co.uk/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6msp/en"
        placeholderSrc="https://ichef.bbci.co.uk/news/640/cpsdevpb/4eb7/test/ba7482d0-cca8-11e8-b0bf-f33155223fc4.jpg"
        service="news"
        title="Video player"
        mediaInfo={{
          title: 'Dog chases cat.',
          type: 'video',
          guidanceMessage:
            'Guidance: May contain strong language that may offend',
          ...withDuration,
        }}
        noJsMessage="Dem no support media player for your device"
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'Audio',
    () => (
      <CanonicalMediaPlayer
        src="https://www.test.bbc.co.uk/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6msp/en"
        placeholderSrc="https://ichef.bbci.co.uk/news/640/cpsdevpb/4eb7/test/ba7482d0-cca8-11e8-b0bf-f33155223fc4.jpg"
        service="news"
        mediaInfo={{
          type: 'audio',
          title: 'Dog barks at cat.',
          ...withDuration,
        }}
        title="Video player"
        noJsMessage="Dem no support media player for your device"
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'Audio Skin',
    () => (
      <CanonicalMediaPlayer
        src="https://www.test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/ko"
        showPlaceholder={false}
        placeholderSrc="https://news.files.bbci.co.uk/include/articles/public/images/amp_audio_placeholder.png"
        skin="audio"
        service="news"
        mediaInfo={{ type: 'audio', title: 'Live show intro.' }}
        title="Audio player"
        noJsMessage="Dem no support media player for your device"
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'With Callbacks',
    () => (
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
        noJsMessage="Dem no support media player for your device"
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  );

storiesOf('Components/Media Player', module)
  .addDecorator(withServicesKnob({ defaultService: 'ukrainian' }))
  .add(
    'Media Message',
    ({ service }) => {
      const id = text('Message', 'Контент більше не доступний');
      return (
        <StyledMessageContainer>
          <MediaMessage service={service} message={id} />
        </StyledMessageContainer>
      );
    },
    {
      notes,
      knobs: { escapeHTML: false },
    },
  );

storiesOf('Components/Media Player', module)
  .addDecorator(ampDecorator)
  .add(
    'AMP',
    () => (
      <AmpMediaPlayer
        isAmp
        src="https://www.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/ko/amp"
        placeholderSrc="https://ichef.bbci.co.uk/news/640/cpsdevpb/4eb7/test/ba7482d0-cca8-11e8-b0bf-f33155223fc4.jpg"
        service="news"
        mediaInfo={{
          type: 'audio',
          title: 'Dog barks at cat.',
          ...withDuration,
        }}
        title="Video player"
        noJsMessage="Dem no support media player for your device"
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'Audio Skin AMP',
    () => (
      <AmpMediaPlayer
        isAmp
        src="https://www.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/ko/amp"
        placeholderSrc="https://news.files.bbci.co.uk/include/articles/public/images/amp_audio_placeholder.png"
        skin="audio"
        title="Audio player"
        service="news"
        noJsMessage="Dem no support media player for your device"
      />
    ),
    { notes, knobs: { escapeHTML: false } },
  );

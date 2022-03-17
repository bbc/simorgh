import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { CanonicalMediaPlayer, AmpMediaPlayer } from '.';

describe('Media Player: AMP Entry', () => {
  shouldMatchSnapshot(
    'renders a landscape container with an amp-iframe and nested amp-img',
    <AmpMediaPlayer
      placeholderSrc="http://foo.bar/placeholder.png"
      src="http://foo.bar/iframe/amp"
      title="Media player"
      height={16}
      width={9}
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'renders a portrait container with amp-iframe and nested amp-img',
    <AmpMediaPlayer
      portrait
      placeholderSrc="http://foo.bar/placeholder.png"
      src="http://foo.bar/iframe/amp"
      title="Media player"
      height={9}
      width={16}
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'renders the audio skin',
    <AmpMediaPlayer
      showPlaceholder={false}
      src="https://www.test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio"
      skin="audio"
      placeholderSrc="http://foo.bar/placeholder.png"
      title="Audio player"
      height={9}
      width={16}
      noJsMessage="no js"
    />,
  );
});

describe('Media Player: Canonical Entry', () => {
  const mediaInfo = {
    duration: '2:30',
    durationSpoken: '2 minutes 30 seconds',
    datetime: 'PT2M30S',
  };

  shouldMatchSnapshot(
    'renders a landscape container with a placeholder image',
    <CanonicalMediaPlayer
      placeholderSrc="http://foo.bar/placeholder.png"
      src="http://foo.bar/iframe"
      service="news"
      mediaInfo={{ title: 'Dog chases cat.', ...mediaInfo }}
      title="Media player"
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'renders a portrait container with a placeholder image',
    <CanonicalMediaPlayer
      placeholderSrc="http://foo.bar/placeholder.png"
      src="http://foo.bar/iframe"
      portrait
      service="news"
      mediaInfo={{ title: 'Dog chases cat.', ...mediaInfo }}
      title="Media player"
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'renders an iframe when showPlaceholder is false',
    <CanonicalMediaPlayer
      showPlaceholder={false}
      src="http://foo.bar/iframe"
      service="news"
      mediaInfo={{ title: 'Dog chases cat.', ...mediaInfo }}
      title="Media player"
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'renders the audio skin',
    <CanonicalMediaPlayer
      showPlaceholder={false}
      src="https://www.test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio"
      skin="audio"
      service="news"
      mediaInfo={{ type: 'audio', title: 'Dog barks at cat.', ...mediaInfo }}
      title="Audio player"
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'renders a placeholder image with guidance',
    <CanonicalMediaPlayer
      placeholderSrc="http://foo.bar/placeholder.png"
      src="http://foo.bar/iframe"
      service="news"
      mediaInfo={{
        title: 'Dog chases cat.',
        guidanceMessage:
          'May contain strong language, sexual or violent content that may offend.',
        ...mediaInfo,
      }}
      title="Media player"
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'shows a loading image before the player is ready when showLoadingImage is true',
    <CanonicalMediaPlayer
      src="http://foo.bar/iframe"
      showPlaceholder={false}
      service="pidgin"
      mediaInfo={{
        title: 'alt-text world service clip',
        type: 'video',
        ...mediaInfo,
      }}
      showLoadingImage
      title="Media player"
      noJsMessage="Dem no support media player for your device"
      noJsClassName="no-js"
    />,
  );

  shouldMatchSnapshot(
    'renders with no-js styles when noJsClassName prop is used',
    <CanonicalMediaPlayer
      placeholderSrc="http://foo.bar/placeholder.png"
      src="http://foo.bar/iframe"
      service="news"
      mediaInfo={{
        title: 'Dog chases cat.',
        guidanceMessage:
          'May contain strong language, sexual or violent content that may offend.',
        ...mediaInfo,
      }}
      title="Media player"
      noJsClassName="no-js"
      noJsMessage="This media cannot play in your browser. Please enable Javascript or a different browser."
    />,
  );
});

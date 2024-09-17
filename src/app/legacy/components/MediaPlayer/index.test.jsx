import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import { CanonicalMediaPlayer, AmpMediaPlayer } from '.';

describe('Media Player: AMP Entry', () => {
  it('renders a landscape container with an amp-iframe and nested amp-img', () => {
    const { container } = render(
      <AmpMediaPlayer
        placeholderSrc="http://foo.bar/placeholder.png"
        src="http://foo.bar/iframe/amp"
        title="Media player"
        height={16}
        width={9}
        noJsMessage="no js"
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders a portrait container with amp-iframe and nested amp-img', () => {
    const { container } = render(
      <AmpMediaPlayer
        portrait
        placeholderSrc="http://foo.bar/placeholder.png"
        src="http://foo.bar/iframe/amp"
        title="Media player"
        height={9}
        width={16}
        noJsMessage="no js"
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the audio skin', () => {
    const { container } = render(
      <AmpMediaPlayer
        showPlaceholder={false}
        src="https://www.test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio"
        skin="audio"
        placeholderSrc="http://foo.bar/placeholder.png"
        title="Audio player"
        height={9}
        width={16}
        noJsMessage="no js"
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Media Player: Canonical Entry', () => {
  const mediaInfo = {
    duration: '2:30',
    durationSpoken: '2 minutes 30 seconds',
    datetime: 'PT2M30S',
  };

  it('renders a landscape container with a placeholder image', () => {
    const { container } = render(
      <CanonicalMediaPlayer
        placeholderSrc="http://foo.bar/placeholder.png"
        src="http://foo.bar/iframe"
        service="news"
        mediaInfo={{ title: 'Dog chases cat.', ...mediaInfo }}
        title="Media player"
        noJsMessage="no js"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders a portrait container with a placeholder image', () => {
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });

  it('renders an iframe when showPlaceholder is false', () => {
    const { container } = render(
      <CanonicalMediaPlayer
        showPlaceholder={false}
        src="http://foo.bar/iframe"
        service="news"
        mediaInfo={{ title: 'Dog chases cat.', ...mediaInfo }}
        title="Media player"
        noJsMessage="no js"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the audio skin', () => {
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });

  it('renders a placeholder image with guidance', () => {
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });

  it('shows a loading image before the player is ready when showLoadingImage is true', () => {
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });

  it('renders with no-js styles when noJsClassName prop is used', () => {
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });
});

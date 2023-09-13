import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render } from '@testing-library/react';
import Canonical from '.';

const Player = additionalProps => (
  <Canonical
    src="http://foo.bar/iframe/amp"
    placeholderSrc="http://foo.bar/placeholder.png"
    placeholderSrcset="http://foo.bar/placeholder.png"
    showPlaceholder={false}
    title="Media player"
    service="news"
    noJsMessage="Please enable Javascript or try a different browser"
    {...additionalProps}
  />
);

describe('Media Player: Canonical', () => {
  shouldMatchSnapshot(
    'should render an iframe',
    <Canonical src="https://foo.bar/iframe" title="Media player" />,
  );

  it('should contain the noscript tag for no-JS scenarios ', () => {
    render(<Player />);
    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should listen to message events and invoke appropriate callbacks', () => {
    const boundListeners = {};
    const boundCallback = jest.fn();
    window.addEventListener = jest.fn((event, cb) => {
      boundListeners[event] = cb;
    });

    render(
      <Player
        onMediaInitialised={boundCallback}
        onMediaPlaying={boundCallback}
        onMediaPause={boundCallback}
        onMediaEnded={boundCallback}
        onMediaPlaylistEnded={boundCallback}
        onMediaError={boundCallback}
      />,
    );

    expect(boundListeners.message).toBeDefined();

    const validEventTypes = [
      'mediaInitialised',
      'mediaPlaying',
      'mediaPause',
      'mediaEnded',
      'mediaPlaylistEnded',
      'mediaError',
    ];

    validEventTypes.forEach(eventType =>
      boundListeners.message({
        origin: 'https://www.bbc.com',
        data: { event: eventType },
      }),
    );

    expect(boundCallback).toHaveBeenCalledTimes(validEventTypes.length);
  });

  it('should reject invalid events', () => {
    const boundListeners = {};
    const boundCallback = jest.fn();
    window.addEventListener = jest.fn((event, cb) => {
      boundListeners[event] = cb;
    });

    render(<Player onMediaInitialised={boundCallback} />);

    expect(boundListeners.message).toBeDefined();

    [
      'https://evil.com',
      'https://bbc.evil.com',
      'http://localhost.bbc.evil.com',
      'https://evil.com/https://bbc.com',
      '',
      null,
    ].forEach(invalidOrigin =>
      boundListeners.message({
        origin: invalidOrigin,
        data: { event: 'mediaInitialised' },
      }),
    );

    boundListeners.message({
      origin: 'https://bbc.com',
      data: { event: 'unknown-event-type' },
    });

    expect(boundCallback).not.toHaveBeenCalled();
  });
});

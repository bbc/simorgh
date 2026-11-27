import {
  act,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import AudioWaveform, { captureAudio, findMedia, getPlaybackMessage } from '.';

const Fixture = () => (
  <>
    <div data-e2e="on-demand-image">
      <div data-testid="artwork">
        <img alt="Podcast artwork" />
      </div>
    </div>
    <div data-e2e="media-player" />
    <AudioWaveform />
  </>
);

const playingMedia = () => {
  const media = document.createElement('video');
  Object.defineProperties(media, {
    paused: { value: false, configurable: true },
    readyState: { value: 4, configurable: true },
  });
  return media;
};

describe('AudioWaveform', () => {
  const originalAudioContext = window.AudioContext;
  const originalMediaStream = window.MediaStream;

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.useRealTimers();
    Object.defineProperty(window, 'AudioContext', {
      value: originalAudioContext,
      configurable: true,
    });
    Object.defineProperty(window, 'MediaStream', {
      value: originalMediaStream,
      configurable: true,
    });
    window.history.replaceState({}, '', '/');
  });

  it('renders nothing without explicit opt-in', () => {
    render(<Fixture />);
    expect(
      screen.queryByRole('region', { name: 'Live audio waveform prototype' }),
    ).toBeNull();
  });

  it('overlays the image and waits for playback without a separate button', () => {
    window.history.replaceState({}, '', '/?audioWaveform=1');
    render(<Fixture />);
    const panel = screen.getByRole('region', {
      name: 'Live audio waveform prototype',
    });

    expect(screen.getByTestId('artwork')).toContainElement(panel);
    expect(panel).toHaveAttribute('data-playing', 'false');
    expect(panel.textContent).toBe('');
    expect(panel.querySelector('canvas')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(panel.querySelector('output')).toBeNull();
    expect(panel.querySelector('button')).toBeNull();
  });

  it('reports missing media rather than displaying simulated activity', () => {
    window.history.replaceState({}, '', '/?audioWaveform=1');
    render(<Fixture />);
    act(() => jest.advanceTimersByTime(500));

    expect(screen.queryByRole('status')).toBeNull();
  });

  it('finds media in nested open shadow roots', () => {
    const root = document.createElement('div');
    const host = document.createElement('smp-test-player');
    const innerHost = document.createElement('smp-test-media');
    host.attachShadow({ mode: 'open' }).appendChild(innerHost);
    const media = document.createElement('video');
    innerHost.attachShadow({ mode: 'open' }).appendChild(media);
    root.appendChild(host);

    expect(findMedia(root)).toBe(media);
  });

  it('does not bypass closed shadow DOM', () => {
    const root = document.createElement('div');
    root
      .attachShadow({ mode: 'closed' })
      .appendChild(document.createElement('audio'));
    expect(findMedia(root)).toBeNull();
  });

  it('reports unsupported stream capture explicitly', () => {
    expect(() => captureAudio(playingMedia())).toThrow(
      'Stream capture is unavailable. Try desktop Chrome.',
    );
  });

  it('requires playback before capturing audio', () => {
    const media = document.createElement('audio');
    const captureStream = jest.fn();
    Object.defineProperty(media, 'captureStream', { value: captureStream });

    expect(() => captureAudio(media)).toThrow(
      'Waiting for the podcast to play.',
    );
    expect(captureStream).not.toHaveBeenCalled();
  });

  it('stops captured tracks when the stream contains no audio', () => {
    const media = playingMedia();
    const stop = jest.fn();
    Object.defineProperty(media, 'captureStream', {
      value: () => ({
        getAudioTracks: () => [],
        getTracks: () => [{ stop }],
      }),
    });

    expect(() => captureAudio(media)).toThrow(
      'The player did not expose an audio track for capture.',
    );
    expect(stop).toHaveBeenCalledTimes(1);
  });

  it('preserves the native player when capturing its audio', () => {
    const media = playingMedia();
    const play = jest.spyOn(media, 'play');
    const pause = jest.spyOn(media, 'pause');
    const audioTrack = { kind: 'audio' };
    const stream = { getAudioTracks: () => [audioTrack] };
    Object.defineProperty(media, 'captureStream', { value: () => stream });

    expect(captureAudio(media)).toBe(stream);
    expect(play).not.toHaveBeenCalled();
    expect(pause).not.toHaveBeenCalled();
    expect(media.muted).toBe(false);
    expect(media.volume).toBe(1);
  });

  it('starts automatically and cleans up on unmount without pausing the player', async () => {
    window.history.replaceState({}, '', '/?audioWaveform=1');
    const { container, unmount } = render(<Fixture />);
    const media = playingMedia();
    container.querySelector('[data-e2e="media-player"]')?.appendChild(media);
    const pause = jest.spyOn(media, 'pause');
    const stopTrack = jest.fn();
    const track = { stop: stopTrack, readyState: 'live' };
    Object.defineProperty(media, 'captureStream', {
      value: () => ({
        getAudioTracks: () => [track],
        getTracks: () => [track],
      }),
    });
    const source = { connect: jest.fn(), disconnect: jest.fn() };
    const analyser = {
      connect: jest.fn(),
      disconnect: jest.fn(),
      fftSize: 0,
    };
    const silentOutput = {
      connect: jest.fn(),
      disconnect: jest.fn(),
      gain: { value: 1 },
    };
    const context = {
      createMediaStreamSource: jest.fn().mockReturnValue(source),
      createAnalyser: jest.fn().mockReturnValue(analyser),
      createGain: jest.fn().mockReturnValue(silentOutput),
      resume: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
      destination: {},
    };
    Object.defineProperty(window, 'AudioContext', {
      value: jest.fn().mockImplementation(() => context),
      configurable: true,
    });
    Object.defineProperty(window, 'MediaStream', {
      value: jest.fn().mockImplementation(() => ({})),
      configurable: true,
    });
    const canvas = container.querySelector('canvas');
    Object.defineProperty(canvas, 'getContext', { value: () => ({}) });

    await act(async () => {
      jest.advanceTimersByTime(250);
    });
    expect(context.createMediaStreamSource).toHaveBeenCalledTimes(1);
    const panel = screen.getByRole('region', {
      name: 'Live audio waveform prototype',
    });
    expect(panel).toHaveAttribute('data-playing', 'true');
    Object.defineProperty(media, 'paused', { value: true, configurable: true });
    act(() => media.dispatchEvent(new Event('pause')));
    expect(panel).toHaveAttribute('data-playing', 'false');
    Object.defineProperty(media, 'paused', {
      value: false,
      configurable: true,
    });
    act(() => media.dispatchEvent(new Event('play')));
    expect(panel).toHaveAttribute('data-playing', 'true');
    expect(silentOutput.gain.value).toBe(0);
    expect(source.connect).toHaveBeenCalledWith(analyser);
    expect(analyser.connect).toHaveBeenCalledWith(silentOutput);
    expect(silentOutput.connect).toHaveBeenCalledWith(context.destination);

    unmount();
    expect(stopTrack).toHaveBeenCalledTimes(1);
    expect(context.close).toHaveBeenCalledTimes(1);
    expect(source.disconnect).toHaveBeenCalledTimes(1);
    expect(pause).not.toHaveBeenCalled();
  });

  it.each([
    ['paused', true, 'Paused.'],
    ['ended', true, 'Podcast ended.'],
    ['readyState', 2, 'Buffering.'],
    ['muted', true, 'Muted.'],
    ['volume', 0, 'Muted.'],
  ])('reports the %s playback state', (property, value, message) => {
    const media = playingMedia();
    Object.defineProperty(media, property, { value });

    expect(
      getPlaybackMessage({
        media,
        signalMissing: false,
        reducedMotion: false,
      }),
    ).toBe(message);
  });

  it('reports missing signal without claiming to distinguish silence from restrictions', () => {
    expect(
      getPlaybackMessage({
        media: playingMedia(),
        signalMissing: true,
        reducedMotion: false,
      }),
    ).toBe('No signal: silence or restricted audio capture.');
  });

  it('reports reduced-motion mode without suggesting animated activity', () => {
    expect(
      getPlaybackMessage({
        media: playingMedia(),
        signalMissing: false,
        reducedMotion: true,
      }),
    ).toBe('Live signal; animation disabled for reduced motion.');
  });
});

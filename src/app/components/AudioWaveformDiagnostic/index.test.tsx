import {
  act,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import AudioWaveformDiagnostic, { inspectMedia } from '.';

const Fixture = () => (
  <>
    <div data-e2e="on-demand-image" />
    <div data-e2e="media-player" />
    <AudioWaveformDiagnostic playerId="test-player" />
  </>
);

describe('AudioWaveformDiagnostic', () => {
  const originalPlayers = window.mediaPlayers;

  beforeEach(() => {
    jest.useFakeTimers();
    window.mediaPlayers = {};
    window.history.replaceState({}, '', '/?audioWaveformDebug=1');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    window.mediaPlayers = originalPlayers;
    window.history.replaceState({}, '', '/');
  });

  it('does not render or poll without explicit opt-in', () => {
    window.history.replaceState({}, '', '/');
    render(<Fixture />);

    expect(screen.queryByLabelText('Audio waveform diagnostic')).toBeNull();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('overlays the image and reports a player that has not loaded', () => {
    const { container } = render(<Fixture />);
    const panel = screen.getByLabelText('Audio waveform diagnostic');

    expect(
      container.querySelector('[data-e2e="on-demand-image"]'),
    ).toContainElement(panel);
    expect(panel).toHaveTextContent('Player API: waiting for player');
    expect(panel).toHaveTextContent('No accessible audio/video element found');
    expect(panel).toHaveAttribute('aria-live', 'off');
  });

  it('reads the clock as a player becomes available without changing playback', () => {
    render(<Fixture />);
    const currentTime = jest.fn().mockReturnValue(12.5);
    const play = jest.fn();
    const pause = jest.fn();
    Object.defineProperty(window.mediaPlayers, 'test-player', {
      value: { currentTime, play, pause },
      configurable: true,
    });

    act(() => jest.advanceTimersByTime(500));
    expect(
      screen.getByLabelText('Audio waveform diagnostic'),
    ).toHaveTextContent('Player time: 12.50s');

    currentTime.mockReturnValue(13);
    act(() => jest.advanceTimersByTime(500));
    expect(
      screen.getByLabelText('Audio waveform diagnostic'),
    ).toHaveTextContent('Player time: 13.00s');
    expect(play).not.toHaveBeenCalled();
    expect(pause).not.toHaveBeenCalled();
  });

  it('reports clock errors explicitly', () => {
    Object.defineProperty(window.mediaPlayers, 'test-player', {
      value: {
        currentTime: () => {
          throw new Error('Clock unavailable');
        },
      },
      configurable: true,
    });
    render(<Fixture />);

    expect(
      screen.getByLabelText('Audio waveform diagnostic'),
    ).toHaveTextContent('Player clock failed: Error: Clock unavailable');
  });

  it('stops polling on unmount', () => {
    const { unmount } = render(<Fixture />);
    expect(jest.getTimerCount()).toBe(1);

    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('reports accessible native media without claiming audio-sample permission', () => {
    const root = document.createElement('div');
    const audio = document.createElement('audio');
    audio.currentTime = 4;
    root.appendChild(audio);

    expect(inspectMedia(root)).toEqual([
      'audio accessible',
      'Native time: 4.00s',
      'Paused: true; muted: false',
      'Ready state: 0',
      'Audio-sample / CORS access: not tested',
    ]);
  });

  it('inspects media inside accessible frames', () => {
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    const frameDocument = frame.contentDocument;
    expect(frameDocument).not.toBeNull();
    frameDocument?.body.appendChild(frameDocument.createElement('video'));

    expect(inspectMedia(document.body)).toContain('video accessible');
    frame.remove();
  });

  it('reports unavailable frame documents', () => {
    const root = document.createElement('div');
    const frame = document.createElement('iframe');
    Object.defineProperty(frame, 'contentDocument', { get: () => null });
    root.appendChild(frame);

    expect(inspectMedia(root)).toEqual([
      'Frame DOM unavailable (cross-origin or not loaded)',
    ]);
  });

  it('finds native media inside open shadow DOM', () => {
    const root = document.createElement('div');
    const host = document.createElement('smp-test-player');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(document.createElement('audio'));
    root.appendChild(host);

    expect(inspectMedia(root)).toContain('Open shadow DOM accessible');
    expect(inspectMedia(root)).toContain('audio accessible');
  });

  it('does not attempt to access closed shadow DOM', () => {
    const root = document.createElement('div');
    const host = document.createElement('smp-test-player');
    host
      .attachShadow({ mode: 'closed' })
      .appendChild(document.createElement('audio'));
    root.appendChild(host);

    expect(inspectMedia(root)).toEqual([]);
  });

  it('bounds recursive DOM inspection', () => {
    expect(inspectMedia(document, 4)).toEqual(['DOM nesting limit reached']);
  });

  it('reports browser security errors without bypassing them', () => {
    const root = document.createElement('div');
    const frame = document.createElement('iframe');
    Object.defineProperty(frame, 'contentDocument', {
      get: () => {
        throw new DOMException('Blocked', 'SecurityError');
      },
    });
    root.appendChild(frame);

    expect(inspectMedia(root)).toEqual([
      'Frame access failed: SecurityError: Blocked',
    ]);
  });
});

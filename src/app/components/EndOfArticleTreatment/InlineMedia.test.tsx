import {
  act,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import MediaLoader from '#app/components/MediaLoader';
import { MediaBlock } from '#app/components/MediaLoader/types';
import { aresMediaBlocks } from '#app/components/MediaLoader/fixture';
import InlineMedia from './InlineMedia';

jest.mock('#app/components/MediaLoader', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="inline-player" />),
  BumpLoader: () => null,
}));

describe('End of article inline media', () => {
  const originalRequirejs = window.requirejs;
  const mediaBlock = aresMediaBlocks[0] as MediaBlock;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    Object.defineProperty(window, 'requirejs', {
      configurable: true,
      writable: true,
      value: undefined,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    window.requirejs = originalRequirejs;
  });

  it('waits for the script on text-only articles before mounting the native player', () => {
    render(<InlineMedia mediaBlock={mediaBlock} />);
    expect(screen.getByRole('status')).toHaveTextContent('Cargando');
    expect(screen.queryByTestId('inline-player')).not.toBeInTheDocument();

    window.requirejs = jest.fn();
    act(() => jest.advanceTimersByTime(100));

    expect(screen.getByTestId('inline-player')).toBeInTheDocument();
    expect(MediaLoader).toHaveBeenCalledWith(
      expect.objectContaining({
        blocks: [mediaBlock],
        loadPlayerOnInitialRender: true,
        singleItemPlayback: true,
      }),
      undefined,
    );
  });

  it('shows the destination-link fallback when the player script is unavailable', () => {
    render(<InlineMedia mediaBlock={mediaBlock} />);
    act(() => jest.advanceTimersByTime(10000));

    expect(screen.getByRole('status')).toHaveTextContent(
      'No se ha podido cargar el reproductor',
    );
    expect(screen.queryByTestId('inline-player')).not.toBeInTheDocument();
  });

  it('cancels waiting when the reader leaves the card', () => {
    const { unmount } = render(<InlineMedia mediaBlock={mediaBlock} />);
    unmount();
    window.requirejs = jest.fn();
    act(() => jest.advanceTimersByTime(10000));

    expect(MediaLoader).not.toHaveBeenCalled();
  });
});

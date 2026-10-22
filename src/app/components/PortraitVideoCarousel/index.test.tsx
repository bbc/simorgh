import { act } from 'react';
import { service as pidginConfig } from '#lib/config/services/pidgin';
import hindiLivePage from '#data/hindi/live/cm93v1d6rw4pt.json';
import Component from '.';
import {
  screen,
  render,
  fireEvent,
} from '../react-testing-library-with-providers';
import fixture from './fixture';
import {
  BumpType,
  Player,
  PlayerConfig,
  PortraitClipMediaBlock,
} from '../MediaLoader/types';

const eventTrackingData = {
  componentName: 'portrait-video-carousel',
};

const defaultAriaLabel = pidginConfig.default.translations.media.watch;
const REQUIRE_JS_SRC =
  'https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js';

type MockRequire = jest.Mock<unknown, unknown[]> & {
  config: jest.Mock;
};

const createMockRequire = (): MockRequire => {
  const mockRequire = jest.fn() as MockRequire;
  mockRequire.config = jest.fn();
  return mockRequire;
};

const createMockPlayer = (): jest.Mocked<Player> => ({
  currentTime: jest.fn(),
  dispatchEvent: jest.fn(),
  load: jest.fn(),
  play: jest.fn(),
  playlist: jest.fn(),
  pause: jest.fn(),
  previous: jest.fn(),
  next: jest.fn(),
  bind: jest.fn(),
  loadPlugin: jest.fn(),
  queuePlaylist: jest.fn(),
  setPreviousPlaylist: jest.fn(),
  settings: jest.fn(),
});

const createMockBump = (
  player = createMockPlayer(),
): jest.Mocked<BumpType> => ({
  player: jest.fn(
    (_div: HTMLDivElement | null, _config: PlayerConfig) => player,
  ),
});

const loadRequireJsScript = async () => {
  const requireScript = Array.from(document.scripts).find(
    script => script.getAttribute('src') === REQUIRE_JS_SRC,
  );

  if (!requireScript) return;

  await act(async () => {
    requireScript.dispatchEvent(new Event('load'));
  });
};

describe('PortraitVideoCarousel', () => {
  beforeEach(() => {
    window.requirejs = createMockRequire();
  });

  it('does not pause or reload the Hindi live-page carousel when its parent updates', async () => {
    const blocks = hindiLivePage.data.portraitVideoItems.portraitVideo
      .blocks as PortraitClipMediaBlock[];
    const mockPlayer = createMockPlayer();
    const mockRequire = createMockRequire();
    const mockBump = createMockBump(mockPlayer);
    const originalRequirejs = window.requirejs;
    const originalEmbeddedMedia = window.embeddedMedia;
    window.requirejs = mockRequire;
    Object.defineProperty(window, 'embeddedMedia', {
      configurable: true,
      writable: true,
      value: { api: { players: () => ({ carousel: mockPlayer }) } },
    });

    const { rerender, unmount } = render(
      <Component blocks={blocks} eventTrackingData={eventTrackingData} />,
      { service: 'hindi', pageType: 'live' },
    );

    try {
      await loadRequireJsScript();
      fireEvent.click(screen.getAllByTestId('promo-button')[0]);
      await act(async () => Promise.resolve());
      const initialisePlayer = mockRequire.mock.calls[0][1] as (
        Bump: BumpType,
      ) => void;
      initialisePlayer(mockBump);
      expect(mockPlayer.load).toHaveBeenCalledTimes(1);

      // Successful polls redraw the page even when the videos are unchanged.
      rerender(
        <Component
          blocks={blocks}
          eventTrackingData={{ ...eventTrackingData }}
        />,
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(mockRequire).toHaveBeenCalledTimes(1);
      expect(mockPlayer.pause).not.toHaveBeenCalled();
      expect(mockPlayer.load).toHaveBeenCalledTimes(1);
    } finally {
      unmount();
      window.requirejs = originalRequirejs;
      window.embeddedMedia = originalEmbeddedMedia;
    }
  });

  it('Should contain the expected number of portrait video blocks', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />);
    });

    const portraitVideoItems = screen
      .getByTestId('pv-carousel')
      .getElementsByTagName('li');

    expect(portraitVideoItems.length).toBe(fixture.blocks.length);
  });

  it('Should render the carousel heading with the correct title', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />);
    });

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      fixture.title,
    );
  });

  it('Should render a Subheading with a link when link prop is provided', async () => {
    const link = '/test-link';
    await act(async () => {
      render(
        <Component
          {...fixture}
          link={link}
          eventTrackingData={eventTrackingData}
        />,
      );
    });

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(fixture.title);

    const linkElement = screen.getByRole('link', { name: fixture.title });
    expect(linkElement).toHaveAttribute('href', link);
  });

  it('Should render the heading with a URI link correctly', async () => {
    const uriLink = 'https://www.bbc.com/news';
    await act(async () => {
      render(
        <Component
          {...fixture}
          link={uriLink}
          eventTrackingData={eventTrackingData}
        />,
      );
    });

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(fixture.title);

    const linkElement = screen.getByRole('link', { name: fixture.title });
    expect(linkElement).toHaveAttribute('href', uriLink);
  });

  it('Should render without a title', async () => {
    await act(async () => {
      render(
        <Component
          {...fixture}
          title={undefined}
          eventTrackingData={eventTrackingData}
        />,
        { service: 'pidgin' },
      );
    });

    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    expect(screen.getByTestId('portrait-video-carousel')).toHaveAttribute(
      'aria-label',
      defaultAriaLabel,
    );
  });

  it('Should render without a title if link is provided but title is undefined', async () => {
    const link = '/test-link';
    await act(async () => {
      render(
        <Component
          {...fixture}
          title={undefined}
          link={link}
          eventTrackingData={eventTrackingData}
        />,
        { service: 'pidgin' },
      );
    });

    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    expect(screen.getByTestId('portrait-video-carousel')).toHaveAttribute(
      'aria-label',
      defaultAriaLabel,
    );
  });

  it('Should render the PortraitCarouselNavigation component', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />);
    });

    const leftButton = screen.getByTestId('pv-scroll-left');
    const rightButton = screen.getByTestId('pv-scroll-right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it('Should not render anything when isLite is true', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />, {
        isLite: true,
      });
    });

    expect(screen.queryByTestId('portrait-video-carousel')).toBeNull();
  });

  it('Should not render anything when isAmp is true', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />, {
        isAmp: true,
      });
    });

    expect(screen.queryByTestId('portrait-video-carousel')).toBeNull();
  });

  it('Should render a skip link with the correct text', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />);
    });

    const skipLink = screen.getByText(`Skip ${fixture.title} and continue`);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#end-of-portrait-video-carousel');
  });

  it('Should render the skip link end marker with the correct ID', async () => {
    const { container } = await act(async () => {
      return render(
        <Component {...fixture} eventTrackingData={eventTrackingData} />,
      );
    });

    const endMarker = container.querySelector(
      '#end-of-portrait-video-carousel',
    );
    expect(endMarker).toBeInTheDocument();
    expect(endMarker).toHaveTextContent(`End of ${fixture.title}`);
  });

  it('Should render skip link with fallback text when no title is provided', async () => {
    await act(async () => {
      render(
        <Component
          {...fixture}
          title={undefined}
          eventTrackingData={eventTrackingData}
        />,
        { service: 'pidgin' },
      );
    });

    const skipLink = screen.getByText('Skip Video and continue');
    expect(skipLink).toBeInTheDocument();
  });
});

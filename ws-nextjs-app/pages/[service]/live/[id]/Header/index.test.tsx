import {
  render,
  screen,
  act,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import BASE64_PLACEHOLDER_IMAGE from '#app/components/Image/base64Placeholder';
import { MediaCollection } from '#app/components/MediaLoader/types';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import mundoLiveFixture from '#data/mundo/live/c7dkx155e626t.json';
import Header from './index';

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

// Real media collections pull in the actual player bootstrap, which injects scripts jsdom can't run.
jest.mock('#app/components/MediaLoader', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="media-loader" />),
}));

describe('Live Page Header', () => {
  const electionTaggings = [
    {
      predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
      value:
        'http://www.bbc.co.uk/things/19994837-27b8-463f-965d-fbb0ac1622a3#id',
    },
  ];
  const liveMediaCollections = mundoLiveFixture.data
    .mediaCollections as MediaCollection[];

  beforeEach(() => {
    mockMatchMedia();
  });

  const renderElectionHeader = async (props = {}) => {
    const results: ReturnType<typeof render>[] = [];

    await act(async () => {
      results.push(
        render(
          <Header
            title="I am a title"
            showLiveLabel
            taggings={electionTaggings}
            {...props}
          />,
          {
            pageType: LIVE_PAGE,
            service: 'mundo',
            toggles: {
              electionBanner: { enabled: true },
              livePageElectionBanner: { enabled: true },
            },
          },
        ),
      );
    });

    return results[0];
  };

  describe('title and description', () => {
    it('should render a title and description when provided', async () => {
      await act(async () => {
        render(
          <Header
            title="I am a title"
            description="I am a description"
            showLiveLabel
          />,
        );
      });

      expect(screen.getByText('I am a title')).toBeInTheDocument();
      expect(screen.getByText('I am a description')).toBeInTheDocument();
    });

    it('should render a title if only a title is provided', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel />);
      });

      expect(screen.getByText('I am a title')).toBeInTheDocument();
    });
  });
  describe('live label', () => {
    it('should render if the liveLabel flag is true', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel />);
      });

      expect(screen.getByTestId('live-label')).toBeInTheDocument();
    });

    it('should not render if the liveLabel flag is false', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel={false} />);
      });

      expect(screen.queryByTestId('live-label')).not.toBeInTheDocument();
    });
  });

  describe('election banner', () => {
    it('should not render when a live media stream is present', async () => {
      const { queryByTestId } = await renderElectionHeader({
        mediaCollections: liveMediaCollections,
      });

      expect(queryByTestId('election-banner')).not.toBeInTheDocument();
    });

    it.each([
      ['null', null],
      ['empty', []],
    ])(
      'should render when the media collection is %s',
      async (_, mediaCollections) => {
        const { getByTestId } = await renderElectionHeader({
          mediaCollections,
        });

        expect(getByTestId('election-banner')).toBeInTheDocument();
      },
    );

    it('should hide the header image when the election banner is rendered', async () => {
      const { queryByRole, getByTestId } = await renderElectionHeader({
        imageUrl:
          'https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg',
        imageUrlTemplate:
          'https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg',
        imageWidth: 660,
      });

      expect(getByTestId('election-banner')).toBeInTheDocument();
      expect(queryByRole('presentation')).not.toBeInTheDocument();
    });
  });

  describe('image', () => {
    describe('cached-load recovery', () => {
      const HeaderWithImage = () => (
        <Header
          title="I am a title"
          showLiveLabel
          imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.png"
          imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.png"
          imageWidth={660}
        />
      );

      beforeEach(() => {
        jest
          .spyOn(HTMLImageElement.prototype, 'complete', 'get')
          .mockReturnValue(true);
        jest
          .spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get')
          .mockReturnValue(660);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('should remove the placeholder for a cached banner image without a load event', async () => {
        await act(async () => {
          render(<HeaderWithImage />);
        });

        const headerImage = screen.getByRole('presentation');
        expect(headerImage.parentNode).not.toHaveStyle({
          backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
        });
      });

      it.each([
        { state: 'incomplete', complete: false, naturalWidth: 660 },
        { state: 'failed', complete: true, naturalWidth: 0 },
      ])(
        'should retain the placeholder when the banner image is $state',
        async ({ complete, naturalWidth }) => {
          jest
            .spyOn(HTMLImageElement.prototype, 'complete', 'get')
            .mockReturnValue(complete);
          jest
            .spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get')
            .mockReturnValue(naturalWidth);

          await act(async () => {
            render(<HeaderWithImage />);
          });

          const headerImage = screen.getByRole('presentation');
          expect(headerImage.parentNode).toHaveStyle({
            backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
          });
        },
      );
    });

    it('should render if a header image if provided', async () => {
      await act(async () => {
        render(
          <Header
            title="I am a title"
            showLiveLabel
            imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
            imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
            imageWidth={660}
          />,
        );
      });

      await waitFor(() => {
        const headerImage = screen.getByRole('presentation');
        expect(headerImage.getAttribute('src')).toEqual(
          'https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg.webp',
        );
      });
    });

    it('should not render if a header image if not provided', async () => {
      await act(async () => {
        render(
          <Header
            title="I am a title"
            showLiveLabel
            imageUrl={undefined}
            imageUrlTemplate={undefined}
            imageWidth={undefined}
          />,
        );
      });

      await waitFor(() => {
        const headerImage = screen.queryByRole('img');
        expect(headerImage).toBeNull();
      });
    });
  });
  describe('a11y', () => {
    it('should have id of content', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel />);
      });

      const header = document.getElementById('content');
      expect(header).toBeInTheDocument();
    });

    it('should have tab index of -1', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel />);
      });

      const header = document.getElementById('content');
      const tabIndex = header?.getAttribute('tabIndex');

      expect(tabIndex).toEqual('-1');
    });
    it('should render a translated match summary H2 for sport data headers', async () => {
      await act(async () => {
        render(<Header title="I am a title" showLiveLabel showSportData />, {
          service: 'afaanoromoo',
        });
      });

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Cuunfaa Taphaa',
        }),
      ).toBeInTheDocument();
    });
  });
});

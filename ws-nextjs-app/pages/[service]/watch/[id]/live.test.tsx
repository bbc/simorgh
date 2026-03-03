import { Helmet } from 'react-helmet';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import liveTvFixture from '#data/dari/watch/bbc_afghan_tv/live.json';
import LiveTv from './live/LiveTvPageLayout';

const mockPageData = {
  ...liveTvFixture.data,
  metadata: { atiAnalytics: {} },
};

const mockPageDataWithMetadata = ({
  title,
  description,
  seoTitle,
  seoDescription,
}: {
  title: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
}) => {
  return {
    ...mockPageData,
    title,
    description,
    seoTitle,
    seoDescription,
  };
};

describe('Live TV Page', () => {
  beforeEach(() => {
    // @ts-expect-error Mocking require to avoid ReferenceError in tests
    window.require = jest.fn();
  });
  it.each`
    title             | seoTitle             | info                      | expected
    ${'I am a Title'} | ${'I am a seoTitle'} | ${'seoTitle'}             | ${'I am a seoTitle - BBC News دری'}
    ${'I am a Title'} | ${undefined}         | ${'title if no seoTitle'} | ${'I am a Title - BBC News دری'}
  `(
    'should use $info as the meta title',
    async ({ title, seoTitle, expected }) => {
      await act(async () => {
        render(
          // @ts-expect-error partial page data for testing
          <LiveTv pageData={mockPageDataWithMetadata({ title, seoTitle })} />,
          { service: 'dari' },
        );
      });

      const { title: helmetTitle } = Helmet.peek();
      expect(helmetTitle).toEqual(expected);
    },
  );

  it.each`
    description             | seoDescription             | info                                  | expected
    ${'I am a Description'} | ${'I am a seoDescription'} | ${'seoDescription'}                   | ${'I am a seoDescription'}
    ${'I am a Description'} | ${undefined}               | ${'description if no seoDescription'} | ${'I am a Description'}
  `(
    'should use $info as the meta description',
    async ({ description, seoDescription, expected }) => {
      await act(async () => {
        render(
          <LiveTv
            // @ts-expect-error partial page data for testing
            pageData={mockPageDataWithMetadata({
              title: 'title',
              description,
              seoDescription,
            })}
          />,
        );
      });

      const helmetContent = Helmet.peek();
      const findDescription = helmetContent.metaTags.find(
        ({ name }) => name === 'description',
      );
      expect(findDescription?.content).toEqual(expected);
    },
  );

  it('should render the live page title', async () => {
    await act(async () => {
      // @ts-expect-error partial page data for testing
      render(<LiveTv pageData={mockPageData} />);
    });

    expect(
      screen.getByText('Live TV Page with schedule - Dari'),
    ).toBeInTheDocument();
  });

  it('should render the live page description', async () => {
    await act(async () => {
      // @ts-expect-error partial page data for testing
      render(<LiveTv pageData={mockPageData} />);
    });

    expect(
      screen.getByText(
        'BBC Arabic TV brings you news, breaking news, analysis, discussions, and documentaries, 24 hours a day. You can receive the channel via satellite dish. Send your comments and suggestions via this link. Follow the latest news and developments around the world through BBC News Arabic on WhatsApp.',
      ),
    ).toBeInTheDocument();
  });

  it('should render a live tv page with media player', async () => {
    await act(async () => {
      // @ts-expect-error partial page data for testing
      render(<LiveTv pageData={mockPageData} />);
    });

    const mediaPlayer = screen.queryAllByTestId(/^media-collection/);
    expect(mediaPlayer.length).toBe(1);
  });
});

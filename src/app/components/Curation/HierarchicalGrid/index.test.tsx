import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import * as isLiveEnv from '#lib/utilities/isLive';
import MediaLoader from '../../MediaLoader';
import { aresMediaBlocks } from '../../MediaLoader/fixture';
import { fireEvent, render } from '../../react-testing-library-with-providers';
import { pidginPromos as fixture } from './fixtures';
import mediaFixture from './mediaFixtures';
import liveFixtures from './liveFixtures';
import HierarchicalGrid from '.';

jest.mock('../../MediaLoader', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="in-situ-media-loader" />),
}));

const minimalEventTrackingData = { componentName: 'test-component' };

const getSummariesWithInSituMedia = () => {
  const [audioPromo, articlePromo, recentlyPublishedPromo, videoPromo] =
    mediaFixture;
  const inSituPromo = {
    ...videoPromo,
    inSituMedia: aresMediaBlocks,
  };

  return {
    inSituPromo,
    summaries: [inSituPromo, audioPromo, articlePromo, recentlyPublishedPromo],
  };
};

describe('Hierarchical Grid Curation', () => {
  const headingLevel = 2;

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-09-16T11:34:20.000Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders twelve promos when twelve items are provided', async () => {
    render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={fixture}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    expect(document.querySelectorAll('li').length).toBe(12);
  });

  it('renders twelve promos when more than twelve items are provided', async () => {
    const extraPromos = fixture.concat({
      title: 'Wetin happun for January 6 one year ago?',
      type: 'article',
      firstPublished: '2022-01-06T19:00:29.000Z',
      lastPublished: '2023-12-09T20:56:29.000Z',
      link: 'https://www.bbc.com/pidgin/tori-59901959',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/DE3A/production/_122609865_january6timelinewetinhappunforjanuary6oneyearago.jpg',
      description:
        'Here na reminder of wetin happun on di historic day when rioters storm di Capitol exactly one year ago.',
      imageAlt: 'January 6 timeline: Wetin happun for January 6 one year ago?',
      id: 'e2263a1c-8d5a-4a73-a00c-881acfa34381',
    });
    render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={extraPromos}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    expect(document.querySelectorAll('li').length).toBe(12);
  });

  it('returns null when less than three promos are in the data', async () => {
    const splicedFixture = [...fixture].splice(0, 2);
    render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={splicedFixture}
        eventTrackingData={minimalEventTrackingData}
      />,
    );
    expect(document.querySelectorAll('li').length).toBe(0);
  });

  it('renders list with role of list', async () => {
    render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={fixture}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    expect(document.querySelectorAll('ul').length).toBe(1);
    expect(document.querySelector('ul')?.getAttribute('role')).toBe('list');
  });

  it('should use formatted duration when a valid duration is provided - audio', async () => {
    const container = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={mediaFixture}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    const durationString = ', Duration 2,03';

    expect(container.getByText(durationString)).toBeInTheDocument();
    expect(container.getByText('Test audio clip')).toBeInTheDocument();
  });

  it('should use formatted duration when a valid duration is provided - video', async () => {
    const container = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={mediaFixture}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    const durationString = ', Duration 3,43';

    expect(container.getByText(durationString)).toBeInTheDocument();
    expect(container.getByText('Test video article')).toBeInTheDocument();
  });

  it('should render the last published date', async () => {
    const { getByText } = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={mediaFixture}
        eventTrackingData={minimalEventTrackingData}
      />,
      {
        service: 'mundo',
      },
    );

    expect(getByText('29 julio 2023')).toBeInTheDocument();
  });

  it('for articles pushed under 10 hours ago, it should render the last published date in a relative format', async () => {
    const { container } = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={mediaFixture}
        eventTrackingData={minimalEventTrackingData}
      />,
      {
        service: 'mundo',
      },
    );
    const timestampText = container.querySelectorAll('time')?.[2].innerHTML;
    expect(timestampText).toBe('34 minutos');
  });

  it('should use role text when using nested spans', async () => {
    render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={mediaFixture}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    expect(document.querySelector('span')?.getAttribute('role')).toBe('text');
  });

  it('should use visually hidden text only when type is media i.e video, audio and photogallery', async () => {
    const container = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={mediaFixture}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    expect(container.queryAllByTestId('visually-hidden-text')).toHaveLength(2);
    expect(container.getByText('Test image gallery')).toBeInTheDocument();
  });

  it('should display LiveLabel on a Live Promo', () => {
    const container = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={mediaFixture}
        eventTrackingData={minimalEventTrackingData}
      />,
      {
        service: 'mundo',
      },
    );
    expect(container.getByText('EN VIVO')).toBeInTheDocument();
  });

  it('should not display a timestamp on a Live Promo', () => {
    const container = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={liveFixtures}
        eventTrackingData={minimalEventTrackingData}
      />,
      {
        service: 'mundo',
      },
    );
    expect(container.queryByText('13 noviembre 2022')).not.toBeInTheDocument();
  });

  it('renders in-situ media for a promo with inSituMedia', () => {
    const { inSituPromo, summaries } = getSummariesWithInSituMedia();

    const { container } = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={summaries}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    const firstPromo = container.querySelector('li');

    expect(firstPromo).toContainElement(
      container.querySelector('[data-testid="in-situ-media-loader"]'),
    );
    expect(firstPromo?.querySelector('.promo-image')).not.toBeInTheDocument();
    expect(MediaLoader).toHaveBeenCalledWith(
      expect.objectContaining({
        blocks: aresMediaBlocks,
        uniqueId: `in-situ-${inSituPromo.id}`,
      }),
      undefined,
    );
  });

  it('tracks the MAP article headline link when in-situ media is rendered', () => {
    const { inSituPromo, summaries } = getSummariesWithInSituMedia();
    const clickTrackerSpy = jest
      .spyOn(clickTracking, 'default')
      .mockImplementation(() => ({ onClick: jest.fn() }));

    render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={summaries}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    expect(clickTrackerSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'test-component',
        itemTracker: expect.objectContaining({
          type: 'hierarchical-curation-grid-promo',
          text: inSituPromo.title,
          position: 1,
          resourceId: inSituPromo.id,
          mediaType: 'video',
          duration: 223000,
        }),
      }),
    );
  });

  it('falls back to the normal promo image on AMP', () => {
    const { summaries } = getSummariesWithInSituMedia();

    const { container } = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={summaries}
        eventTrackingData={minimalEventTrackingData}
      />,
      { isAmp: true },
    );

    const firstPromo = container.querySelector('li');

    expect(firstPromo?.querySelector('.promo-image')).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="in-situ-media-loader"]'),
    ).not.toBeInTheDocument();
    expect(MediaLoader).not.toHaveBeenCalled();
  });

  it('falls back to the normal promo image when inSituMedia is empty', () => {
    const { summaries } = getSummariesWithInSituMedia();
    const summariesWithoutMediaBlocks = [
      { ...summaries[0], inSituMedia: [] },
      ...summaries.slice(1),
    ];

    const { container } = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={summariesWithoutMediaBlocks}
        eventTrackingData={minimalEventTrackingData}
      />,
    );

    const firstPromo = container.querySelector('li');

    expect(firstPromo?.querySelector('.promo-image')).toBeInTheDocument();
    expect(MediaLoader).not.toHaveBeenCalled();
  });

  it('preserves a related topic when in-situ media is rendered', () => {
    const { summaries } = getSummariesWithInSituMedia();
    const relatedTopic = {
      link: {
        url: 'https://www.bbc.com/pidgin/topics/c2dwqd1zr92t',
      },
      title: 'Nigeria',
    };
    const summariesWithRelatedTopic = [
      { ...summaries[0], relatedTopic },
      ...summaries.slice(1),
    ];

    const { getByText } = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={summariesWithRelatedTopic}
        eventTrackingData={minimalEventTrackingData}
      />,
      {
        service: 'pidgin',
      },
    );

    expect(getByText('Nigeria').closest('a')).toHaveAttribute(
      'href',
      relatedTopic.link.url,
    );
  });

  it('should render related topic link when relatedTopic exists on a Promo', () => {
    const container = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={fixture}
        eventTrackingData={minimalEventTrackingData}
      />,
      {
        service: 'pidgin',
      },
    );
    expect(container.getByText('Nigeria')).toBeInTheDocument();
    expect(container.getByText('Nigeria').closest('a')).toHaveAttribute(
      'href',
      'https://www.bbc.com/pidgin/topics/c2dwqd1zr92t',
    );
  });

  it('when there is no related topic, it should not apply the hasRelatedTopic class', () => {
    const { getByText } = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={fixture}
        eventTrackingData={minimalEventTrackingData}
      />,
      {
        service: 'pidgin',
      },
    );
    const promoWithoutRelatedTopicSummary = fixture.find(
      summary => !summary.relatedTopic,
    );

    if (!promoWithoutRelatedTopicSummary) {
      return;
    }

    const promoWithoutRelatedTopic = getByText(
      promoWithoutRelatedTopicSummary.title,
    ).closest('li');

    if (!promoWithoutRelatedTopic) {
      return;
    }

    const metadataWithoutRelatedTopic =
      promoWithoutRelatedTopic.querySelector('.promo-timestamp')?.parentElement;

    expect(metadataWithoutRelatedTopic).not.toHaveClass('hasRelatedTopic');
  });

  it('should handle a click event when related topic link is clicked', () => {
    const onClickSpy = jest.fn();
    const clickTrackerSpy = jest
      .spyOn(clickTracking, 'default')
      .mockImplementation(() => ({ onClick: onClickSpy }));

    const { getByText } = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={fixture}
        eventTrackingData={minimalEventTrackingData}
      />,
      {
        service: 'pidgin',
      },
    );

    expect(clickTrackerSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'test-component',
        itemTracker: expect.objectContaining({
          type: 'hierarchical-curation-grid-topic',
          text: 'Nigeria',
        }),
      }),
    );

    const topicLink = getByText('Nigeria').closest('a');

    expect(topicLink).toBeInTheDocument();

    if (!topicLink) {
      return;
    }

    fireEvent.click(topicLink);

    expect(onClickSpy).toHaveBeenCalled();

    clickTrackerSpy.mockRestore();
  });

  it('should not render related topic links when environment is live', () => {
    const isLiveSpy = jest.spyOn(isLiveEnv, 'default').mockReturnValue(true);

    const { queryByText } = render(
      <HierarchicalGrid
        headingLevel={headingLevel}
        summaries={fixture}
        eventTrackingData={minimalEventTrackingData}
      />,
      {
        service: 'pidgin',
      },
    );

    // The fixture contains promos with related topics (e.g. 'Nigeria')
    // but in live environment they should not be rendered
    expect(queryByText('Nigeria')).not.toBeInTheDocument();

    isLiveSpy.mockRestore();
  });
});

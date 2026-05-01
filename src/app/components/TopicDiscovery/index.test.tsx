import {
  render,
  screen,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import * as viewTracking from '#app/hooks/useViewTracker';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import { service as portugueseConfig } from '#app/lib/config/services/portuguese';
import { service as turkceConfig } from '#app/lib/config/services/turkce';
import { topicTagsFixture } from './fixtures';
import TopicDiscovery from '.';

const topics = [
  { topicId: '1', topicName: 'Topic1', topicUrl: '/topics/climate' },
  { topicId: '2', topicName: 'Topic2', topicUrl: '/topics/economy' },
];

describe('TopicDiscovery', () => {
  it('should render the heading', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(
      screen.getByRole('heading', { name: 'Descubra mais' }),
    ).toBeInTheDocument();
  });

  it('should render a section with the topic-discovery test id', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(screen.getByTestId('topic-discovery')).toBeInTheDocument();
  });

  it('should render tabs for each valid topic', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(
      screen.getByRole('tab', { name: topicTagsFixture[0].topicName }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: topicTagsFixture[1].topicName }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: topicTagsFixture[2].topicName }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('tab', { name: topicTagsFixture[3].topicName }),
    ).toBeInTheDocument();
  });

  it('should render the first topic as the active tab by default', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(
      screen.getByRole('tab', { name: topicTagsFixture[0].topicName }),
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('should render a tabpanel', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('should render promos for the active topic', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    const firstTopicTitle = topicTagsFixture[0].topicName;
    expect(screen.getByText(firstTopicTitle)).toBeInTheDocument();
  });

  it('should switch active topic when a different tab is clicked', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    fireEvent.click(
      screen.getByRole('tab', { name: topicTagsFixture[1].topicName }),
    );

    expect(
      screen.getByRole('tab', { name: topicTagsFixture[1].topicName }),
    ).toHaveAttribute('aria-selected', 'true');

    const secondTopicTitle = topicTagsFixture[1].topicName;
    expect(screen.getByText(secondTopicTitle)).toBeInTheDocument();
  });

  it('renders the more from section with topic title last by default', async () => {
    const config: ServiceConfig = { ...portugueseConfig.default };
    render(
      <ServiceContext.Provider value={config}>
        <TopicDiscovery topics={topics} />
      </ServiceContext.Provider>,
    );
    // Wait for loading to finish and the link to appear
    const moreFrom = await screen.findByTestId('topic-discovery-more-from');
    expect(moreFrom).toHaveTextContent('Mais de Topic1');
  });

  it('renders the more from section with topic title first if topicTitleFirst is true', async () => {
    const config: ServiceConfig = { ...turkceConfig.default };
    render(
      <ServiceContext.Provider value={config}>
        <TopicDiscovery topics={topics} />
      </ServiceContext.Provider>,
    );
    // Wait for loading to finish and the link to appear
    const moreFrom = await screen.findByTestId('topic-discovery-more-from');
    expect(moreFrom).toHaveTextContent('Topic1 hakkında daha fazla');
  });

  it('renders the more from section with fallback if moreFrom is missing', async () => {
    // remove moreFrom from translations to test fallback
    const portugueseTranslations = {
      ...portugueseConfig.default.translations,
      topicDiscovery: { heading: 'Discover more', topicTitleFirst: true },
    };
    const config = {
      ...portugueseConfig.default,
      translations: portugueseTranslations,
    } as ServiceConfig;
    render(
      <ServiceContext.Provider value={config}>
        <TopicDiscovery topics={topics} />
      </ServiceContext.Provider>,
    );
    await screen.findByText('More from Topic1');
  });

  it('should not render when there are no valid topics', () => {
    const { container } = render(<TopicDiscovery topics={[]} />, {
      service: 'portuguese',
    });

    expect(container).toBeEmptyDOMElement();
  });

  describe('analytics', () => {
    it('should call useViewTracker with topic-discovery component name', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      render(<TopicDiscovery topics={topicTagsFixture} />, {
        service: 'portuguese',
      });

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'topic-discovery',
      });

      viewTrackerSpy.mockRestore();
    });

    it('should call useClickTrackerHandler with topic-discovery-tab-<id> component name and preventNavigation', () => {
      const clickTrackerSpy = jest
        .spyOn(clickTracking, 'default')
        .mockImplementation(() => ({ onClick: jest.fn() }));

      render(<TopicDiscovery topics={topicTagsFixture} />, {
        service: 'portuguese',
      });

      const expectedCalls = topicTagsFixture.map(topic => ({
        componentName: `topic-discovery-tab-${topic.topicId}`,
        preventNavigation: true,
      }));

      expectedCalls.forEach(expectedCall => {
        expect(clickTrackerSpy).toHaveBeenCalledWith(expectedCall);
      });

      clickTrackerSpy.mockRestore();
    });
  });
});

import {
  render,
  screen,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import * as viewTracking from '#app/hooks/useViewTracker';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import topicDiscoveryFixture from './fixtures';
import TopicDiscovery from '.';

describe('TopicDiscovery', () => {
  it('should render the heading', () => {
    render(
      <TopicDiscovery
        topicDiscovery={topicDiscoveryFixture}
        headingText="Tópicos relacionados"
      />,
      { service: 'portuguese' },
    );

    expect(
      screen.getByRole('heading', { name: 'Tópicos relacionados' }),
    ).toBeInTheDocument();
  });

  it('should render a section with the topic-discovery test id', () => {
    render(
      <TopicDiscovery
        topicDiscovery={topicDiscoveryFixture}
        headingText="Tópicos relacionados"
      />,
      { service: 'portuguese' },
    );

    expect(screen.getByTestId('topic-discovery')).toBeInTheDocument();
  });

  it('should render tabs for each valid topic', () => {
    render(
      <TopicDiscovery
        topicDiscovery={topicDiscoveryFixture}
        headingText="Tópicos relacionados"
      />,
      { service: 'portuguese' },
    );

    expect(
      screen.getByRole('tab', { name: 'Comportamento' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: 'Mídia social' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Psicologia' })).toBeInTheDocument();
  });

  it('should render the first topic as the active tab by default', () => {
    render(
      <TopicDiscovery
        topicDiscovery={topicDiscoveryFixture}
        headingText="Tópicos relacionados"
      />,
      { service: 'portuguese' },
    );

    expect(screen.getByRole('tab', { name: 'Comportamento' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('should render a tabpanel', () => {
    render(
      <TopicDiscovery
        topicDiscovery={topicDiscoveryFixture}
        headingText="Tópicos relacionados"
      />,
      { service: 'portuguese' },
    );

    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('should render promos for the active topic', () => {
    render(
      <TopicDiscovery
        topicDiscovery={topicDiscoveryFixture}
        headingText="Tópicos relacionados"
      />,
      { service: 'portuguese' },
    );

    const firstTopicTitle = topicDiscoveryFixture.topics[0].items[0].title;
    expect(screen.getByText(firstTopicTitle)).toBeInTheDocument();
  });

  it('should switch active topic when a different tab is clicked', () => {
    render(
      <TopicDiscovery
        topicDiscovery={topicDiscoveryFixture}
        headingText="Tópicos relacionados"
      />,
      { service: 'portuguese' },
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Mídia social' }));

    expect(screen.getByRole('tab', { name: 'Mídia social' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    const secondTopicTitle = topicDiscoveryFixture.topics[1].items[0].title;
    expect(screen.getByText(secondTopicTitle)).toBeInTheDocument();
  });

  it('should not render when there are no valid topics', () => {
    const { container } = render(
      <TopicDiscovery
        topicDiscovery={{ topics: [] }}
        headingText="Tópicos relacionados"
      />,
      { service: 'portuguese' },
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should not render when all topics have empty items', () => {
    const { container } = render(
      <TopicDiscovery
        topicDiscovery={{
          topics: [
            { topicId: 't1', topicName: 'Empty', topicUrl: '', items: [] },
          ],
        }}
        headingText="Tópicos relacionados"
      />,
      { service: 'portuguese' },
    );

    expect(container).toBeEmptyDOMElement();
  });

  describe('analytics', () => {
    it('should call useViewTracker with topic-discovery component name', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      render(
        <TopicDiscovery
          topicDiscovery={topicDiscoveryFixture}
          headingText="Tópicos relacionados"
        />,
        { service: 'portuguese' },
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'topic-discovery',
      });

      viewTrackerSpy.mockRestore();
    });

    it('should call useClickTrackerHandler with topic-discovery component name and preventNavigation', () => {
      const clickTrackerSpy = jest
        .spyOn(clickTracking, 'default')
        .mockImplementation(() => ({ onClick: jest.fn() }));

      render(
        <TopicDiscovery
          topicDiscovery={topicDiscoveryFixture}
          headingText="Tópicos relacionados"
        />,
        { service: 'portuguese' },
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'topic-discovery',
        preventNavigation: true,
      });

      clickTrackerSpy.mockRestore();
    });
  });
});

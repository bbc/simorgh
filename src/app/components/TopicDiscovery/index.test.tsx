import {
  render,
  screen,
  fireEvent,
  act,
} from '#app/components/react-testing-library-with-providers';
import * as viewTracking from '#app/hooks/useViewTracker';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { topicTagsFixture } from './fixtures';
import TopicDiscovery, { FAKE_FETCH_DELAY_MS } from '.';

describe('TopicDiscovery', () => {
  it('should render the heading', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(
      screen.getByRole('heading', { name: 'Tópicos relacionados' }),
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

  it('should use cached promos when switching back to previously visited tabs', async () => {
    jest.useFakeTimers();

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const getFetchTimeoutCallCount = () =>
      setTimeoutSpy.mock.calls.filter(
        ([, delay]) => delay === FAKE_FETCH_DELAY_MS,
      ).length;

    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(getFetchTimeoutCallCount()).toBe(1);

    await act(async () => {
      jest.advanceTimersByTime(FAKE_FETCH_DELAY_MS);
    });

    fireEvent.click(
      screen.getByRole('tab', { name: topicTagsFixture[1].topicName }),
    );

    expect(getFetchTimeoutCallCount()).toBe(2);

    await act(async () => {
      jest.advanceTimersByTime(FAKE_FETCH_DELAY_MS);
    });

    fireEvent.click(
      screen.getByRole('tab', { name: topicTagsFixture[0].topicName }),
    );

    expect(getFetchTimeoutCallCount()).toBe(2);

    fireEvent.click(
      screen.getByRole('tab', { name: topicTagsFixture[1].topicName }),
    );

    expect(getFetchTimeoutCallCount()).toBe(2);
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

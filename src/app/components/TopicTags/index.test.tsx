import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import { render, screen } from '../react-testing-library-with-providers';
import { TopicTags } from '.';

jest.mock('#app/hooks/useViewTracker', () => jest.fn(() => ({})));
jest.mock('#app/hooks/useClickTrackerHandler', () => jest.fn(() => ({})));

const mockUseViewTracker = useViewTracker as jest.MockedFunction<
  typeof useViewTracker
>;
const mockUseClickTrackerHandler =
  useClickTrackerHandler as jest.MockedFunction<typeof useClickTrackerHandler>;

describe('TopicTags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly render a single topic tag', () => {
    const tags = [{ topicName: 'test1', topicId: 'test1' }];

    render(<TopicTags tags={tags} />, {
      service: 'news',
    });

    const multipleContainer = screen.queryByTestId('topic-tags-multiple');
    expect(multipleContainer).not.toBeInTheDocument();

    const singleContainer = screen.queryByTestId('topic-tags-single');
    expect(singleContainer).toBeInTheDocument();
  });

  it('should correctly render multiple topic tags', () => {
    const tags = [
      { topicName: 'test1', topicId: 'test1' },
      { topicName: 'test2', topicId: 'test2' },
      { topicName: 'test3', topicId: 'test3' },
      { topicName: 'test4', topicId: 'test4' },
    ];

    render(<TopicTags tags={tags} />, {
      service: 'news',
    });

    const multipleContainer = screen.queryByTestId('topic-tags-multiple');
    expect(multipleContainer).toBeInTheDocument();

    const singleContainer = screen.queryByTestId('topic-tags-single');
    expect(singleContainer).not.toBeInTheDocument();
  });

  it('should not render any topic tags if there are none', () => {
    render(<TopicTags tags={[]} />, { service: 'news' });

    const multipleContainer = screen.queryByTestId('topic-tags-multiple');
    expect(multipleContainer).not.toBeInTheDocument();

    const singleContainer = screen.queryByTestId('topic-tags-single');
    expect(singleContainer).not.toBeInTheDocument();
  });

  it('should use trackingSource for analytics naming when provided', () => {
    const tags = [{ topicName: 'Cricket', topicId: 'topic-1' }];

    render(<TopicTags tags={tags} trackingSource="my-news" />, {
      service: 'news',
    });

    expect(mockUseViewTracker).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'my-news-topics',
        groupTracker: expect.objectContaining({
          name: 'my-news',
          type: 'my-news-topics',
          itemCount: 1,
        }),
      }),
    );

    expect(mockUseClickTrackerHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'my-news-topics',
        itemTracker: expect.objectContaining({
          type: 'topics-link',
          text: 'Cricket',
          position: 1,
          resourceId: 'topic-1',
        }),
      }),
    );
  });
});

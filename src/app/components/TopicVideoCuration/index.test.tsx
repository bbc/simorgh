import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import { VIDEO_ENGAGEMENT_KEY } from '#app/lib/utilities/videoEngagement';
import { TopicDiscoveryItem } from '../TopicDiscovery/types';
import selectTopicVideos, { normaliseTopicIds } from './selectTopicVideos';
import useFetchTopicVideos from './useFetchTopicVideos';
import TopicVideoCuration from '.';

jest.mock('./useFetchTopicVideos', () => ({
  __esModule: true,
  ...jest.requireActual('./useFetchTopicVideos'),
  default: jest.fn(),
}));

const item = (
  id: string,
  overrides: Partial<TopicDiscoveryItem> = {},
): TopicDiscoveryItem => ({
  id,
  type: 'video',
  title: `Title ${id}`,
  link: `https://www.bbc.com/portuguese/videos/${id}`,
  imageUrl: `https://ichef.bbci.co.uk/${id}.jpg`,
  imageAlt: 'alt',
  firstPublished: '2025-01-01T00:00:00.000Z',
  lastPublished: '2025-01-01T00:00:00.000Z',
  isLive: false,
  duration: '60',
  description: '',
  isPortraitImage: false,
  ...overrides,
});

describe('selectTopicVideos', () => {
  it('keeps only structured videos, excludes the current page and duplicates', () => {
    const result = selectTopicVideos(
      [
        [
          item('a'),
          item('art', { type: 'article' }),
          item('cur', { link: 'https://www.bbc.com/portuguese/videos/cur' }),
        ],
        [item('a'), item('b'), item('c', { title: ' ' })],
      ],
      '/portuguese/videos/cur',
    );
    expect(result.map(({ id }) => id)).toEqual(['a', 'b']);
  });

  it('interleaves topics and respects the limit', () => {
    const result = selectTopicVideos(
      [
        [item('a1'), item('a2')],
        [item('b1'), item('b2')],
      ],
      '/x',
      3,
    );
    expect(result.map(({ id }) => id)).toEqual(['a1', 'b1', 'a2']);
  });
});

describe('normaliseTopicIds', () => {
  it('trims, dedupes, drops invalid and bounds the count', () => {
    expect(
      normaliseTopicIds([' a ', 'a', undefined, '', 'b', 'c', 'd', 'e', 'f']),
    ).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});

describe('TopicVideoCuration', () => {
  const mockHook = useFetchTopicVideos as jest.Mock;

  beforeEach(() => {
    localStorage.setItem(VIDEO_ENGAGEMENT_KEY, 'true');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders a translated heading and a grid of videos', () => {
    mockHook.mockReturnValue({
      resultsByTopic: [[item('a')], [item('b')]],
      isLoading: false,
      isError: false,
    });
    render(
      <TopicVideoCuration topics={[{ topicId: '1' }, { topicId: '2' }]} />,
      {
        service: 'portuguese',
      },
    );
    expect(
      screen.getByRole('heading', { name: 'Assista' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders nothing visible while loading or when there are no videos', () => {
    mockHook.mockReturnValue({
      resultsByTopic: [[item('a', { type: 'article' })]],
      isLoading: false,
      isError: false,
    });
    render(<TopicVideoCuration topics={[{ topicId: '1' }]} />, {
      service: 'portuguese',
    });
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders a skeleton while loading', () => {
    mockHook.mockReturnValue({
      resultsByTopic: [],
      isLoading: true,
      isError: false,
    });
    render(<TopicVideoCuration topics={[{ topicId: '1' }]} />, {
      service: 'portuguese',
    });
    expect(screen.getByTestId('topic-video-skeleton')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders nothing when fewer than 2 videos are available', () => {
    mockHook.mockReturnValue({
      resultsByTopic: [[item('a')]],
      isLoading: false,
      isError: false,
    });
    render(<TopicVideoCuration topics={[{ topicId: '1' }]} />, {
      service: 'portuguese',
    });
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders an error message on failure', () => {
    mockHook.mockReturnValue({
      resultsByTopic: [],
      isLoading: false,
      isError: true,
    });
    render(<TopicVideoCuration topics={[{ topicId: '1' }]} />, {
      service: 'portuguese',
    });
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders nothing without topics', () => {
    mockHook.mockReturnValue({
      resultsByTopic: [],
      isLoading: true,
      isError: false,
    });
    const { container } = render(<TopicVideoCuration topics={[]} />, {
      service: 'portuguese',
    });
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing and passes empty topicIds to useFetchTopicVideos when video engagement flag is not set', () => {
    localStorage.removeItem(VIDEO_ENGAGEMENT_KEY);
    mockHook.mockReturnValue({
      resultsByTopic: [],
      isLoading: false,
      isError: false,
    });
    const { container } = render(
      <TopicVideoCuration topics={[{ topicId: '1' }, { topicId: '2' }]} />,
      {
        service: 'portuguese',
      },
    );
    expect(container).toBeEmptyDOMElement();
    expect(mockHook).toHaveBeenCalledWith(
      expect.objectContaining({
        topicIds: [],
      }),
    );
  });
});

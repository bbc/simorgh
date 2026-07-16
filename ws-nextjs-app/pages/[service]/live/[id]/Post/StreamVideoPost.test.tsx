import {
  render,
  act,
} from '#app/components/react-testing-library-with-providers';
import * as useViewTrackerModule from '#app/hooks/useViewTracker';
import { MediaBlock } from '#app/components/MediaLoader/types';
import StreamVideoPost from './StreamVideoPost';

jest.mock('#app/components/MediaLoader', () => {
  const MockMediaLoader = () => <div data-testid="mock-media-loader" />;
  return MockMediaLoader;
});

const landscapeClipMediaBlocks: MediaBlock[] = [
  {
    type: 'clipMedia',
    model: {
      type: 'video',
      images: [
        {
          source: 'https://example.com/image.jpg',
          urlTemplate: 'https://example.com/image/{width}.jpg',
        },
      ],
      video: {
        id: 'test-landscape-id',
        title: 'Landscape video title',
        version: {
          id: 'v1',
          duration: 'PT30S',
          kind: 'programme',
          guidance: null,
          orientation: 'landscape',
        },
        isEmbeddingAllowed: true,
      },
    },
  } as MediaBlock,
];

const portraitClipMediaBlocks: MediaBlock[] = [
  {
    type: 'clipMedia',
    model: {
      type: 'video',
      images: [
        {
          source: 'https://example.com/image.jpg',
          urlTemplate: 'https://example.com/image/{width}.jpg',
        },
      ],
      video: {
        id: 'test-portrait-id',
        title: 'Portrait video title',
        version: {
          id: 'v2',
          duration: 'PT15S',
          kind: 'programme',
          guidance: null,
          orientation: 'portrait',
        },
        isEmbeddingAllowed: true,
      },
    },
  } as MediaBlock,
];

const noOrientationClipMediaBlocks: MediaBlock[] = [
  {
    type: 'clipMedia',
    model: {
      type: 'video',
      images: [
        {
          source: 'https://example.com/image.jpg',
          urlTemplate: 'https://example.com/image/{width}.jpg',
        },
      ],
      video: {
        id: 'test-no-orientation-id',
        title: 'Video without orientation',
        version: {
          id: 'v3',
          duration: 'PT20S',
          kind: 'programme',
          guidance: null,
        },
        isEmbeddingAllowed: true,
      },
    },
  } as MediaBlock,
];

describe('StreamVideoPost', () => {
  beforeEach(() => {
    // @ts-expect-error Mocking require to prevent race condition.
    window.require = jest.fn();
  });

  it('should track a landscape video with item_type landscape-video and group_type stream', async () => {
    const viewTrackerSpy = jest.spyOn(useViewTrackerModule, 'default');

    await act(async () => {
      render(<StreamVideoPost blocks={landscapeClipMediaBlocks} />, {
        pageType: 'live',
      });
    });

    expect(viewTrackerSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'stream',
        itemTracker: expect.objectContaining({
          type: 'landscape-video',
          text: 'Landscape video title',
        }),
      }),
    );
  });

  it('should track a portrait video with item_type portrait-video and group_type stream', async () => {
    const viewTrackerSpy = jest.spyOn(useViewTrackerModule, 'default');

    await act(async () => {
      render(<StreamVideoPost blocks={portraitClipMediaBlocks} />, {
        pageType: 'live',
      });
    });

    expect(viewTrackerSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'stream',
        itemTracker: expect.objectContaining({
          type: 'portrait-video',
          text: 'Portrait video title',
        }),
      }),
    );
  });

  it('should default to landscape-video when orientation is not specified', async () => {
    const viewTrackerSpy = jest.spyOn(useViewTrackerModule, 'default');

    await act(async () => {
      render(<StreamVideoPost blocks={noOrientationClipMediaBlocks} />, {
        pageType: 'live',
      });
    });

    expect(viewTrackerSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'stream',
        itemTracker: expect.objectContaining({
          type: 'landscape-video',
          text: 'Video without orientation',
        }),
      }),
    );
  });

  it('should render MediaLoader', async () => {
    const { getByTestId } = await act(async () =>
      render(<StreamVideoPost blocks={landscapeClipMediaBlocks} />, {
        pageType: 'live',
      }),
    );

    expect(getByTestId('mock-media-loader')).toBeInTheDocument();
  });
});

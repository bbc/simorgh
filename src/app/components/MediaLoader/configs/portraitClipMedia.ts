import moment from 'moment-timezone';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  PortraitClipMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  PlaylistItem,
} from '../types';

const DEFAULT_WIDTH = 512;

export default ({
  blocks,
  basePlayerConfig,
  initialVideoIndex = 0,
}: ConfigBuilderProps & {
  initialVideoIndex?: number;
}): ConfigBuilderReturnProps => {
  const portraitClipMediaBlocks = filterForBlockType(
    blocks,
    'portraitClipMedia',
    { returnAllMatchingBlocks: true },
  ) as PortraitClipMediaBlock[];

  const playlistItems: PlaylistItem[] = portraitClipMediaBlocks.map(block => {
    const { model } = block;
    const { video, images } = model;
    const version = video?.version;
    const image = images?.[1] || images?.[0];
    const holdingImageURL = image?.urlTemplate?.replace(
      '{width}',
      `${DEFAULT_WIDTH}`,
    );

    return {
      versionID: version?.id,
      kind: version?.kind || 'programme',
      duration: moment.duration(version?.duration || 'PT0S').asSeconds(),
      embedRights: video?.isEmbeddingAllowed ? 'allowed' : undefined,
      vpid: video?.id,
      title: video?.title ?? '',
      guidance: version?.guidance ?? undefined,
      holdingImageURL,
    };
  });

  const validIndex = Math.max(
    0,
    Math.min(initialVideoIndex, playlistItems.length - 1),
  );

  const current = playlistItems[validIndex];
  const previous = playlistItems[validIndex - 1];
  const next = playlistItems[validIndex + 1];

  return {
    mediaType: 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: true,
      playlistObject: {
        title: current?.title ?? '',
        holdingImageURL: current?.holdingImageURL ?? '',
        items: [current],
        ...(next && {
          queuedPlaylist: {
            title: next.title ?? '',
            holdingImageURL: next.holdingImageURL ?? '',
            items: [next],
            guidance: next.guidance ?? undefined,
            embedRights: next.embedRights,
          },
        }),
        ...(previous && {
          previousPlaylist: {
            title: previous.title ?? '',
            holdingImageURL: previous.holdingImageURL ?? '',
            items: [previous],
            guidance: previous.guidance ?? undefined,
            embedRights: previous.embedRights,
          },
        }),
      },
      ui: {
        ...basePlayerConfig.ui,
        swipable: {
          enabled: true,
          direction: 'Y',
        },
        controls: {
          enabled: true,
          includeNextButton: true,
          includePreviousButton: true,
        },
      },
      statsObject: {
        ...basePlayerConfig.statsObject,
        ...(current?.vpid && { clipPID: current.vpid }),
      },
    },
    showAds: false,
    orientation: 'portrait',
  };
};

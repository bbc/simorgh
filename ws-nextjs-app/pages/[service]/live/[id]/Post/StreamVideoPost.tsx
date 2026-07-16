import filterForBlockType from '#app/lib/utilities/blockHandlers';
import MediaLoader from '#app/components/MediaLoader';
import useViewTracker from '#app/hooks/useViewTracker';
import { isPortraitVideo } from '#app/components/MediaLoader/utils/isPortraitVideo';
import {
  AresMediaBlock,
  AresMediaMetadataBlock,
  ClipMediaBlock,
  MediaBlock,
  Orientations,
} from '#app/components/MediaLoader/types';
import styles from './styles';

const getMediaTitle = (blocks: MediaBlock[]): string | undefined => {
  const clipMedia: ClipMediaBlock | undefined = filterForBlockType(
    blocks,
    'clipMedia',
  );
  if (clipMedia?.model?.video?.title) {
    return clipMedia.model.video.title;
  }

  const aresMedia: AresMediaBlock | undefined = filterForBlockType(
    blocks,
    'aresMedia',
  );
  if (aresMedia) {
    const { model: aresMediaModel } = aresMedia;
    const metadataBlock: AresMediaMetadataBlock | undefined =
      filterForBlockType(aresMediaModel?.blocks ?? [], 'aresMediaMetadata');
    if (metadataBlock?.model?.title) {
      return metadataBlock.model.title;
    }
  }

  return undefined;
};

const getOrientation = (blocks: MediaBlock[]): Orientations =>
  isPortraitVideo(blocks) ? 'portrait' : 'landscape';

type StreamVideoPostProps = {
  blocks: MediaBlock[];
};

const StreamVideoPost = ({ blocks }: StreamVideoPostProps) => {
  const isPortrait = isPortraitVideo(blocks);
  const orientation = getOrientation(blocks);
  const title = getMediaTitle(blocks);

  const itemType =
    orientation === 'portrait' ? 'portrait-video' : 'landscape-video';

  const viewTracker = useViewTracker({
    componentName: 'stream',
    itemTracker: {
      type: itemType,
      ...(title && { text: title }),
    },
  });

  return (
    <div css={isPortrait && styles.portraitVideoPlayer} {...viewTracker}>
      <MediaLoader blocks={blocks} css={[styles.bodyMedia, styles.videoPost]} />
    </div>
  );
};

export default StreamVideoPost;

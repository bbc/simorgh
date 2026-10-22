import { PortraitClipMediaBlock } from '../MediaLoader/types';

export type PortraitVideoArticleBlock = {
  type: 'portraitClipMedia';
  model: {
    type: 'video';
    images: {
      source: string;
      urlTemplate?: string;
      altText?: string;
    }[];
    video: {
      title: string;
      version: {
        duration: string;
      };
      articleUrl: string;
    };
  };
};

export type PortraitVideoCarouselBlock =
  | PortraitClipMediaBlock
  | PortraitVideoArticleBlock;

export const isPlayablePortraitVideoBlock = (
  block: PortraitVideoCarouselBlock,
): block is PortraitClipMediaBlock =>
  'id' in block.model.video &&
  'id' in block.model.video.version &&
  Boolean(block.model.video.id && block.model.video.version.id);

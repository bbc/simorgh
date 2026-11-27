import { MediaBlock } from '#app/components/MediaLoader/types';

export type ArticleEndFormat =
  | 'article'
  | 'video'
  | 'portrait'
  | 'audio'
  | 'live'
  | 'topic';

export type ArticleEndItem = {
  id: string;
  title: string;
  href: string;
  format: ArticleEndFormat;
  relationship: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  duration?: string | number;
  media?: MediaBlock;
};

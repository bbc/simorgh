import { MediaBlock } from '#app/components/MediaLoader/types';
import { PageTypes } from '#app/models/types/global';

export type AvEmbedsPageProps = {
  pageData: {
    mediaBlock: MediaBlock[];
    metadata: {
      language?: string;
      promoSummary?: string;
      headline?: string;
      imageUrl?: string;
      caption?: string;
      type: PageTypes;
    };
    embedded?: boolean;
  };
};

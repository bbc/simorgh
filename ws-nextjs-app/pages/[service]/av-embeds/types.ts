import { MediaBlock } from '#components/MediaLoader/types';
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
      mediaURL?: string;
      type: PageTypes;
    };
  };
};

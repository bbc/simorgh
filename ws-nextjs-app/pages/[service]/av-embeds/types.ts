import { ATIData } from '#components/ATIAnalytics/types';
import { MediaBlock } from '#components/MediaLoader/types';
import { PageTypes } from '#app/models/types/global';

export type AvEmbedsPageProps = {
  pageData: {
    mediaBlock: MediaBlock[];
    metadata: {
      atiAnalytics?: ATIData | null;
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

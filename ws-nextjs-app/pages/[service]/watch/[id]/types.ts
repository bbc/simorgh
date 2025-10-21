import { PageTypes } from '#app/models/types/global';
import { Curation } from '#app/models/types/curationData';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { MediaBlock } from '#app/components/MediaLoader/types';

export interface LiveTVPageProps {
  pageData: {
    id?: string;
    title: string;
    description: string;
    curations: Curation[];
    metadata: {
      type: PageTypes;
      atiAnalytics: ATIData;
    };
    mediaBlock: MediaBlock[];
  };
  pageType: PageTypes;
  pathname: string;
  service: string;
  status: number;
  timeOnServer: number;
}

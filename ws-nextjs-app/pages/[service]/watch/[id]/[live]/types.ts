import { PageTypes } from '#app/models/types/global';
import { Curation } from '#app/models/types/curationData';
import { ATIData } from '#app/components/ATIAnalytics/types';

export interface LiveTVPageProps {
  pageData: {
    id?: string;
    title: string;
    description: string;
    curations: Curation[];
    seoTitle?: string;
    seoDescription?: string;
    metadata: {
      type: PageTypes;
      atiAnalytics: ATIData;
    };
  };
  pageType: PageTypes;
  pathname: string;
  service: string;
  status: number;
  timeOnServer: number;
}

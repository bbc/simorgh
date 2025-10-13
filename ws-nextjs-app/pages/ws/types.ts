import { PageTypes } from '#app/models/types/global';
import { Curation } from '#app/models/types/curationData';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { OptimoBlock } from '#app/models/types/optimo';

type PromoMedia = {
  blocks: OptimoBlock[];
  type: string;
};

export interface LanguagesPageProps {
  pageData: {
    id?: string;
    title: string;
    description: string;
    curations: Curation[];
    metadata: {
      type: PageTypes;
      atiAnalytics: ATIData;
      blockTypes: string[];
      locators?: {
        assetUri: string;
      };
    };
    promo: {
      media?: PromoMedia;
      extrinsicPromo?: { media?: PromoMedia };
    };
  };
  pageType: PageTypes;
  pathname: string;
  service: string;
  status: number;
  timeOnServer: number;
}

import { PageTypes } from '#app/models/types/global';
import { Curation } from '#app/models/types/curationData';

export interface LiveTVPageProps {
  pageData: {
    id?: string;
    title: string;
    description: string;
    curations: Curation[];
    seoTitle?: string;
    seoDescription?: string;
  };
  pageType: PageTypes;
  pathname: string;
  service: string;
  status: number;
  timeOnServer: number;
}

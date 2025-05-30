import { PageTypes } from '#app/models/types/global';
import { Curation } from '#app/models/types/curationData';

export interface LanguagesPageProps {
  isTestEnvironment: boolean;
  pageData: {
    title: string;
    description: string;
    curations: Curation[];
    metadata: {
      type: PageTypes;
    };
  };
  pageType: PageTypes;
  pathname: string;
  service: string;
  status: number;
  timeOnServer: number;
}

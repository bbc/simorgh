import { ATIData } from '#app/components/ATIAnalytics/types';

export type MyNewsPageProps = {
  page?: string;
  pageData?: {
    metadata: {
      type: string;
      atiAnalytics?: ATIData;
    };
  };
};

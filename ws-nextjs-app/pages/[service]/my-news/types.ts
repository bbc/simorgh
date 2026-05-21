import { ATIData } from '#app/components/ATIAnalytics/types';

export type MyNewsPageProps = {
  page?: number | string;
  pageData?: {
    metadata: {
      type: string;
      atiAnalytics?: ATIData;
    };
  };
};

import { Summary } from '#app/models/types/curationData';
import { Services } from '#app/models/types/global';
import { ATIData } from '#app/components/ATIAnalytics/types';

export type Topic = {
  topicName: string;
  topicUrl: string;
  id: string;
};

export type TopicsAnalyticsData = {
  name: string;
  producer: string;
};

export type TopicsFixtureData = {
  headline: string;
  analytics: TopicsAnalyticsData;
  atiAnalytics: ATIData;
  topics?: Topic[];
};

export type PageData = {
  headline: string;
  summaries: Summary[];
  totalItems: number;
  metadata: {
    type: string;
    atiAnalytics?: ATIData;
  };
};

export type TopicsPageProps = {
  service: Services;
  pageData: PageData;
  page?: number | string;
  activePage: number;
  pageCount: number;
  safeActivePage: number;
};

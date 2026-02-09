import { Summary } from '#app/models/types/curationData';
import { Services } from '#app/models/types/global';

export type Topic = {
  topicName: string;
  topicUrl: string;
  id: string;
};

export type TopicsFixtureData = {
  headline: string;
  topics?: Topic[];
};

export type PageData = {
  headline: string;
  summaries: Summary[];
  totalItems: number;
  metadata: {
    type: string;
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

import { Summary } from '#app/models/types/curationData';
import { Services } from '#app/models/types/global';

export type Topic = {
  topicName: string;
  topicUrl: string;
  id: string;
};

export type TopicsFixtureData = {
  headline: string;
  topics: Topic[];
};

export type TopicsData = TopicsFixtureData & {
  summaries: Summary[];
  totalItems: number;
};

export type TopicsPageProps = {
  service: Services;
  topicsData: TopicsData;
  page?: number | string;
  activePage: number;
  pageCount: number;
  safeActivePage: number;
};

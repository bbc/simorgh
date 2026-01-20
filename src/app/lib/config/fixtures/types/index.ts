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

export type TopicsData = TopicsFixtureData & {
  summaries: TopicSummary[];
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

export type TopicSummary = {
  id: string;
  title: string;
  link: string;
};

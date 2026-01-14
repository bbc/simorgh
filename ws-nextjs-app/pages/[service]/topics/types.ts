import { Services } from '#app/models/types/global';

export type Topic = {
  topicName: string;
  topicUrl: string;
  topicId?: string;
};

export type TopicsData = {
  headline: string;
  topics: Topic[];
};

export type TopicsPageProps = {
  service: Services;
  topicsData: TopicsData | null;
};

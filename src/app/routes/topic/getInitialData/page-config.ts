import { Environments } from '../../../models/types/global';

export type TopicPagePaths = '/persian/afghanistan';

export const TOPIC_PAGE_CONFIG: {
  [_path in TopicPagePaths]: { [_env in Environments]: string };
} = {
  '/persian/afghanistan': {
    local: 'crezq2dg9zwt',
    test: 'c15er11zq57t',
    live: 'crezq2dg9zwt',
  },
};

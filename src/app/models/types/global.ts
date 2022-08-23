import * as pageTypes from '../../routes/utils/pageTypes';

type valueof<T> = T[keyof T];

export type SocialEmbedProviders =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'youtube';

export type PageTypes = valueof<keyof typeof pageTypes>;

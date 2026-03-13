import { Services, Variants } from '#app/models/types/global';

export type PodcastExternalLinksParams = {
  service: Services;
  variant?: Variants;
  brandId: string;
  versionId: string;
};

export type ExternalLinks = {
  [key: string]: {
    linkText: string;
    linkUrl: string;
    linkType: string;
  };
};

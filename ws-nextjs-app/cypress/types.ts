import { PageTypes, Services, Variants } from '#app/models/types/global';

export type ServiceParametersType = {
  service: Services;
  variant: Variants;
  pageType?: PageTypes & 'errorPage404';
  path?: string;
};

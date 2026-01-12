import { Services } from '#app/models/types/global';

export type AtiAssertionFnProps = {
  pageIdentifier: string;
  path: string;
  applicationType: string;
  siteId: string;
  service: Services;
};

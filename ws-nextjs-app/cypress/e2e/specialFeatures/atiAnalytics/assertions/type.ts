import { Services } from '#app/models/types/global';

export type AtiAssertionFnProps = {
  pageIdentifier: string;
  contentType: string;
  path: string;
  applicationType: string;
  siteId: string;
  service: Services;
  componentTrackingContentType: string;
};

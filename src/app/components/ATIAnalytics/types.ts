import { Platforms, Services } from '../../models/types/global';

export interface ATIAnalyticsProps {
  pageviewParams: string;
}

export interface AMPATIAnalyticsProps extends ATIAnalyticsProps {
  baseUrl?: string;
}

export interface ATIEventTrackingProps {
  campaignID?: string;
  componentName: string;
  format?: string;
  pageIdentifier: string;
  platform?: Platforms;
  producerId?: string;
  service: Services;
  statsDestination?: string;
  type: string;
  advertiserID?: string;
  url?: string;
}

export interface ATIPageTrackingProps {
  appName?: string;
  contentId?: string;
  contentType?: string;
  language?: string;
  ldpThingIds?: string;
  ldpThingLabels?: string;
  pageIdentifier?: string;
  pageTitle?: string;
  producerId?: string;
  libraryVersion?: string;
  platform?: string;
  statsDestination?: string;
  timePublished?: string;
  timeUpdated?: string;
  origin?: string;
  previousPath?: string;
  categoryName?: string;
  campaigns?: string;
  nationsProducer?: string;
}

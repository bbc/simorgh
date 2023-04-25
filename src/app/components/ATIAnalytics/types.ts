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
  contentId?: string | null;
  contentType?: string | null;
  language?: string | null;
  ldpThingIds?: string | null;
  ldpThingLabels?: string | null;
  pageIdentifier?: string;
  pageTitle?: string | null;
  producerId?: string;
  libraryVersion?: string;
  platform?: string;
  statsDestination?: string;
  timePublished?: string | null;
  timeUpdated?: string | null;
  origin?: string;
  previousPath?: string | null;
  categoryName?: string | null;
  campaigns?: { campaignId: string; campaignName: string }[];
  nationsProducer?: string | null;
}

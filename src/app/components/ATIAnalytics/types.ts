import { Platforms, Services } from '../../models/types/global';

export interface ATIAnalyticsProps {
  pageviewParams: string;
}

export interface ATITrackEventProps {
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

import { Platforms, Services } from '../../models/types/global';

export interface PageData {
  metadata?:
    | {
        analyticsLabels: {
          counterName: string;
          contentId: string;
          // eslint-disable-next-line camelcase
          nations_producer: string;
        };
        locators: { optimoUrn: string };
        passport: { language: string };
        tags: {
          about: {
            thingId: string;
            thingLabel: string;
            thingEnglishLabel: string;
          }[];
        };
        title: string;
      }
    | {
        analyticsLabels: { counterName: string };
        locators: { curie: string };
        language: string;
        title: string;
      }
    | {
        id: string;
        language: string;
        analyticsLabels: {
          counterName: string;
          pageIdentifier: string;
          pageTitle: string;
          contentId: string;
        };
        firstPublished: number;
        lastPublished: number;
        locators: { curie: string };
        passport: {
          category: { categoryId: string; categoryName: string };
          campaigns: { campaignId: string; campaignName: string }[];
        };
      }
    | {
        id: string;
        language: string;
        analyticsLabels: {
          counterName: string;
          pageIdentifier: string;
          pageTitle: string;
          contentId: string;
        };
        firstPublished: number;
        lastPublished: number;
        locators: { curie: string };
        passport: object;
      }
    | {
        analyticsLabels: { counterName: string };
        locators: { curie: string };
        language: string;
        title: string;
      }
    | {
        atiAnalytics: {
          producerId: string;
        };
      }
    | {
        atiAnalytics: {
          chapter: string;
        };
      };
  promo?:
    | { headlines: { seoHeadline: string } }
    | { headlines: { headline: string } };
  id?: string;
  language?: string;
  pageIdentifier?: string;
  pageTitle?: string;
  firstRecordTimeStamp?: string;
  lastRecordTimeStamp?: string;
  contentType?: string;
  title?: string;
}

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

export interface ATIParams extends ATIPageTrackingProps

export interface ATIProps {
  data: PageData;
}

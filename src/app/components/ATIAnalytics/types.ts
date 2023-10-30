import { PageTypes, Platforms, Services } from '../../models/types/global';
import { RequestContextProps } from '../../contexts/RequestContext';
import { ServiceConfig } from '../../models/types/serviceConfig';

export interface AMPAnalyticsData {
  transport: {
    beacon: boolean;
    xhrpost: boolean;
    image: boolean;
  };
  requests: {
    base?: string;
    pageview: string;
  };
  triggers: { trackPageview: { on: string; request: string } };
}

export interface PageData {
  metadata?: {
    analyticsLabels?: {
      counterName?: string;
      contentId?: string;
      // eslint-disable-next-line camelcase
      nations_producer?: string;
      pageIdentifier?: string;
      pageTitle?: string;
      producer?: string;
    };
    atiAnalytics?: {
      producerId?: string;
      chapter?: string;
    };
    locators?: { optimoUrn?: string; curie?: string };
    passport?: {
      category?: { categoryId?: string; categoryName?: string };
      campaigns?: { campaignId?: string; campaignName?: string }[];
      language?: string;
    };
    tags?: {
      about?: {
        thingId?: string;
        thingLabel?: string;
        thingEnglishLabel?: string;
      }[];
    };
    id?: string;
    title?: string;
    language?: string;
    firstPublished?: number;
    lastPublished?: number;
    typ?: PageTypes;
  };
  promo?:
    | { headlines?: { seoHeadline?: string } }
    | { headlines?: { headline?: string } }
    | { subType: string; name: string; uri: string; id: string; type: string };
  id?: string;
  language?: string;
  pageIdentifier?: string;
  pageTitle?: string;
  firstRecordTimeStamp?: string;
  lastRecordTimeStamp?: string;
  contentType?: string;
  title?: string;
}

export interface ATIData {
  campaigns?: { campaignId?: string; campaignName?: string }[] | null;
  categoryName?: string | null;
  contentId?: string | null;
  contentType?: string;
  language?: string | null;
  ldpThingIds?: string | null;
  ldpThingLabels?: string | null;
  nationsProducer?: string | null;
  pageIdentifier?: string;
  pageTitle?: string | null;
  producerId?: string | null;
  producerName?: string | null;
  timePublished?: string | null;
  timeUpdated?: string | null;
}

export interface ATIDataWithContexts {
  requestContext: RequestContextProps;
  serviceContext: ServiceConfig;
  atiData: ATIData;
}

export interface ATIConfigurationDetailsProviders {
  requestContext: RequestContextProps;
  serviceContext: ServiceConfig;
  data?: PageData;
  atiData?: ATIData;
}

export interface ATIAnalyticsProps {
  baseUrl?: string;
  pageviewParams: string;
}

export interface ATIEventTrackingProps {
  campaignID?: string;
  componentName?: string;
  format?: string;
  pageIdentifier?: string;
  platform?: Platforms;
  producerId?: string;
  service?: Services;
  statsDestination?: string;
  type?: string;
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
  platform?: Platforms;
  statsDestination?: string;
  timePublished?: string | null;
  timeUpdated?: string | null;
  origin?: string;
  previousPath?: string | null;
  categoryName?: string | null;
  campaigns?: { campaignId?: string; campaignName?: string }[] | null;
  nationsProducer?: string | null;
}

export interface ATIProps {
  data?: PageData;
  atiData?: ATIData;
}

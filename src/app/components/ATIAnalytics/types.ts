/* eslint-disable camelcase */
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
  ampExperimentName?: string;
  experimentName?: string | null;
  experimentVariant?: string | null;
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
    atiAnalytics?: ATIData;
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
    type?: PageTypes;
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

export interface ATIDataWithContexts {
  requestContext: RequestContextProps;
  serviceContext: ServiceConfig;
  atiData: ATIData;
}

export interface ATIConfigurationDetailsProviders {
  requestContext: RequestContextProps;
  serviceContext: ServiceConfig;
  atiData: ATIData;
}

export interface ReverbDetailsProviders {
  requestContext: RequestContextProps;
  serviceContext: ServiceConfig;
  atiData: ATIData;
}

export type ReverbPageVars = {
  name?: string | null;
  additionalProperties?: {
    app_name?: string | null;
    content_language?: string | null;
    type?: string | null;
  };
  destination?: string | null;
  producer?: string | null;
  contentId?: string | null;
  contentType?: string | null;
};

export type ReverbUserVars = {
  isSignedIn: boolean;
};

export type ReverbEventDetails = {
  anchorElement?: HTMLElement;
  experience?: {
    engine_type: Array<string>;
    engine_id: Array<string>;
  };
  event?: {
    category: string;
    action: 'select' | 'view';
    grouping?: string;
  };
  eventName: 'pageView' | 'sectionView' | 'sectionClick';
  eventPublisher?: string;
  group?: string | object;
  isClick?: boolean;
  item?: string | object;
  originalEvent?: Event;
};

export type ReverbBeaconConfig = {
  params: { page: ReverbPageVars; user: ReverbUserVars };
  eventDetails: ReverbEventDetails;
};

export interface ATIAnalyticsProps {
  baseUrl?: string;
  pageviewParams: string;
  reverbParams?: ReverbBeaconConfig | null;
}

export interface ATIEventTrackingProps {
  campaignID?: string;
  componentName: string;
  format?: string;
  pageIdentifier?: string;
  platform?: Platforms;
  producerId?: string;
  producerName?: string;
  service?: Services;
  statsDestination?: string;
  type?: string;
  advertiserID?: string;
  url?: string;
  detailedPlacement?: string;
  useReverb?: boolean;
  experimentName?: string;
  experimentVariant?: string | null;
  ampExperimentName?: string;
  preventNavigation?: boolean;
  itemTracker?: ItemTracker;
  groupTracker?: GroupTracker;
  viewThreshold?: number;
  eventGroupingName?: string;
}

export interface ItemTracker {
  type?: string;
  text?: string;
  position?: number;
  duration?: number;
  resourceId?: string;
  label?: string;
  mediaType?: string;
}

export interface GroupTracker {
  name?: string;
  type?: string;
  position?: string | number;
  resourceId?: string;
  itemCount?: number;
  link?: string;
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
  producerName?: string;
  libraryVersion?: string;
  platform?: Platforms;
  statsDestination?: string;
  timePublished?: string | null;
  timeUpdated?: string | null;
  categoryName?: string | null;
  campaigns?: { campaignId?: string; campaignName?: string }[] | null;
  nationsProducer?: string | null;
  ampExperimentName?: string;
  experimentName?: string | null;
  experimentVariant?: string | null;
}

export interface ATIProps {
  atiData?: ATIData;
}

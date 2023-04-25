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

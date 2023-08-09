import * as analyticsUtils from '#lib/analyticsUtils';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { buildPageATIParams, buildPageATIUrl } from './buildParams';

(analyticsUtils.getAtUserId as jest.Mock) = jest.fn();
(analyticsUtils.getCurrentTime as jest.Mock) = jest
  .fn()
  .mockReturnValue('00-00-00');
(analyticsUtils.getPublishedDatetime as jest.Mock) = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

// @ts-expect-error - only partial data required for testing purposes
const requestContext: RequestContextProps = {
  platform: 'canonical',
  statsDestination: 'statsDestination',
  id: 'validId',
};

// @ts-expect-error - only partial data required for testing purposes
const serviceContext: ServiceConfig = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'pidgin',
  lang: 'pcm',
};

describe('implementation of buildPageATIParams and buildPageATIUrl', () => {
  describe('Home Page', () => {
    const homePageAtiData = {
      contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
      contentType: 'index-home',
      pageIdentifier: 'kyrgyz.page',
      pageTitle: 'pageTitle',
    };
    // timePublished and timeUpdated are not returned via BFF implementation so set to undefined in test
    const validPageURLParams = {
      appName: 'atiAnalyticsAppName',
      categoryName: undefined,
      contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
      contentType: 'index-home',
      isUk: undefined,
      language: 'pcm',
      ldpThingIds: undefined,
      ldpThingLabels: undefined,
      libraryVersion: 'simorgh',
      nationsProducer: undefined,
      origin: undefined,
      pageIdentifier: 'kyrgyz.page',
      pageTitle: 'pageTitle',
      platform: 'canonical',
      previousPath: undefined,
      producerId: 'atiAnalyticsProducerId',
      service: 'pidgin',
      statsDestination: 'statsDestination',
      timePublished: undefined,
      timeUpdated: undefined,
    };

    it('should return the correct object for the page given the ATI configuration', () => {
      const result = buildPageATIParams({
        atiData: homePageAtiData,
        requestContext,
        serviceContext,
      });
      expect(result).toEqual(validPageURLParams);
    });

    it('should use the atiData contentType in favour of the requestContext pageType', () => {
      const result = buildPageATIParams({
        atiData: homePageAtiData,
        requestContext: {
          ...requestContext,
          pageType: 'home',
        },
        serviceContext,
      });
      expect(result).toEqual(validPageURLParams);
    });

    it('should return the correct url for a page given the ATI configuration', () => {
      const url = buildPageATIUrl({
        atiData: homePageAtiData,
        requestContext,
        serviceContext,
      });

      const parsedATIURLParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      const expectedATIURLParams = {
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'kyrgyz.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:tipo:topic:cm7682qz7v1t]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[pcm]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[index-home]',
        x8: '[simorgh]',
        x9: '[pageTitle]',
      };

      expect(parsedATIURLParams).toEqual(expectedATIURLParams);
    });
  });

  describe('Article Page', () => {
    const articlePageAtiData = {
      categoryName: 'Refugees%20and%20asylum%20seekers~Myanmar~Military',
      contentId: 'urn:bbc:optimo:asset:c9wxnzvwp3mo',
      contentType: 'article',
      language: 'my',
      ldpThingIds:
        '0cd55773-e753-44ad-ad07-1366bf1aa6bc~a26174f5-fa3c-4cf8-95a2-29d877175eab~ce5c43ee-8982-4f88-9472-9aa79aeb09cc',
      ldpThingLabels: 'Refugees%20and%20asylum%20seekers~Myanmar~Military',
      nationsProducer: null,
      pageIdentifier: 'burmese.articles.c9wxnzvwp3mo.page',
      pageTitle:
        'ဇူလိုင်လ ၁၃ ရက်ထိပ်တန်းသတင်းများ- ဒုက္ခသည်စခန်းဗုံးကြဲခံရလို့ ထိုင်းကိုထွက်ပြေးသူတွေဆက်ရှိ ',
      timePublished: '2023-07-13T05:03:56.214Z',
      timeUpdated: '2023-07-13T08:35:47.388Z',
    };

    const validPageURLParams = {
      appName: 'atiAnalyticsAppName',
      categoryName: 'Refugees%20and%20asylum%20seekers~Myanmar~Military',
      contentId: 'urn:bbc:optimo:asset:c9wxnzvwp3mo',
      contentType: 'article',
      isUK: false,
      language: 'my',
      ldpThingIds:
        '0cd55773-e753-44ad-ad07-1366bf1aa6bc~a26174f5-fa3c-4cf8-95a2-29d877175eab~ce5c43ee-8982-4f88-9472-9aa79aeb09cc',
      ldpThingLabels: 'Refugees%20and%20asylum%20seekers~Myanmar~Military',
      libraryVersion: 'simorgh',
      nationsProducer: null,
      origin: 'example.com',
      pageIdentifier: 'burmese.articles.c9wxnzvwp3mo.page',
      pageTitle:
        'ဇူလိုင်လ ၁၃ ရက်ထိပ်တန်းသတင်းများ- ဒုက္ခသည်စခန်းဗုံးကြဲခံရလို့ ထိုင်းကိုထွက်ပြေးသူတွေဆက်ရှိ ',
      platform: 'canonical',
      previousPath: 'previousPath',
      producerId: 'atiAnalyticsProducerId',
      service: 'burmese',
      statsDestination: 'statsDestination',
      timePublished: '2023-07-13T05:03:56.214Z',
      timeUpdated: '2023-07-13T08:35:47.388Z',
    };

    it('should return the correct object for the page given the ATI configuration', () => {
      const result = buildPageATIParams({
        atiData: articlePageAtiData,
        requestContext: {
          ...requestContext,
          isUK: false,
          origin: 'example.com',
          pageType: 'article',
          previousPath: 'previousPath',
        },
        serviceContext: { ...serviceContext, service: 'burmese', lang: 'my' },
      });
      expect(result).toEqual(validPageURLParams);
    });

    it('should use the serviceContext lang property if language is absent in atiData', () => {
      const result = buildPageATIParams({
        atiData: { ...articlePageAtiData, language: null },
        requestContext: {
          ...requestContext,
          isUK: false,
          origin: 'example.com',
          pageType: 'article',
          previousPath: 'previousPath',
        },
        serviceContext: { ...serviceContext, service: 'burmese', lang: 'my' },
      });
      expect(result).toEqual(validPageURLParams);
    });

    it('should return the correct url for a page given the ATI configuration', () => {
      const url = buildPageATIUrl({
        atiData: articlePageAtiData,
        requestContext: {
          ...requestContext,
          isUK: false,
          origin: 'example.com',
          pageType: 'article',
          previousPath: 'previousPath',
        },
        serviceContext: { ...serviceContext, service: 'burmese', lang: 'my' },
      });

      const parsedATIURLParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      const expectedATIURLParams = {
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'burmese.articles.c9wxnzvwp3mo.page',
        r: '0x0x24x24',
        re: '1024x768',
        ref: 'example.compreviousPath',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:optimo:asset:c9wxnzvwp3mo]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[my]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[example.compreviousPath]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[ဇူလိုင်လ%20၁၃%20ရက်ထိပ်တန်းသတင်းများ-%20ဒုက္ခသည်စခန်းဗုံးကြဲခံရလို့%20ထိုင်းကိုထွက်ပြေးသူတွေဆက်ရှိ]',
        x11: '[2023-07-13T05:03:56.214Z]',
        x12: '[2023-07-13T08:35:47.388Z]',
        x13: '[Refugees%20and%20asylum%20seekers~Myanmar~Military]',
        x14: '[0cd55773-e753-44ad-ad07-1366bf1aa6bc~a26174f5-fa3c-4cf8-95a2-29d877175eab~ce5c43ee-8982-4f88-9472-9aa79aeb09cc]',
        x17: '[Refugees%20and%20asylum%20seekers~Myanmar~Military]',
      };

      expect(parsedATIURLParams).toEqual(expectedATIURLParams);
    });
  });

  describe('Topic Page', () => {
    const topicPageAtiData = {
      contentId: 'urn:bbc:tipo:topic:c95y35941vrt',
      contentType: 'index-category',
      pageIdentifier: 'pidgin.topics.c95y35941vrt.page',
      pageTitle: 'Donald Trump',
    };
    // timePublished and timeUpdated are not returned via BFF implementation so set to undefined in test
    const validPageURLParams = {
      appName: 'atiAnalyticsAppName',
      categoryName: undefined,
      contentId: 'urn:bbc:tipo:topic:c95y35941vrt',
      contentType: 'index-category',
      isUk: undefined,
      language: 'pcm',
      ldpThingIds: undefined,
      ldpThingLabels: undefined,
      libraryVersion: 'simorgh',
      nationsProducer: undefined,
      origin: undefined,
      pageIdentifier: 'pidgin.topics.c95y35941vrt.page',
      pageTitle: 'Donald Trump',
      platform: 'canonical',
      previousPath: undefined,
      producerId: 'atiAnalyticsProducerId',
      service: 'pidgin',
      statsDestination: 'statsDestination',
      timePublished: undefined,
      timeUpdated: undefined,
    };

    it('should return the correct object for the page given the ATI configuration', () => {
      const result = buildPageATIParams({
        atiData: topicPageAtiData,
        requestContext,
        serviceContext,
      });
      expect(result).toEqual(validPageURLParams);
    });

    it('should use the atiData contentType in favour of the requestContext pageType', () => {
      const result = buildPageATIParams({
        atiData: topicPageAtiData,
        requestContext: {
          ...requestContext,
          pageType: 'TOPIC',
        },
        serviceContext,
      });
      expect(result).toEqual(validPageURLParams);
    });

    it('should return the correct url for a page given the ATI configuration', () => {
      const url = buildPageATIUrl({
        atiData: topicPageAtiData,
        requestContext,
        serviceContext,
      });

      const parsedATIURLParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      const expectedATIURLParams = {
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'pidgin.topics.c95y35941vrt.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:tipo:topic:c95y35941vrt]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[pcm]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[index-category]',
        x8: '[simorgh]',
        x9: '[Donald%20Trump]',
      };

      expect(parsedATIURLParams).toEqual(expectedATIURLParams);
    });
  });

  describe('Most Read Page', () => {
    const mostReadPageAtiData = {
      contentType: 'list-datadriven',
      pageIdentifier: 'pidgin.popular.read.page',
      pageTitle: 'MostReadPageTitle',
      timePublished: '2023-08-01T12:00:00Z',
      timeUpdated: '2023-08-01T12:15:00Z',
    };

    const validPageURLParams = {
      appName: 'atiAnalyticsAppName',
      categoryName: undefined,
      contentId: undefined,
      contentType: 'list-datadriven',
      isUk: undefined,
      language: 'pcm',
      ldpThingIds: undefined,
      ldpThingLabels: undefined,
      libraryVersion: 'simorgh',
      nationsProducer: undefined,
      origin: undefined,
      pageIdentifier: 'pidgin.popular.read.page',
      pageTitle: 'MostReadPageTitle',
      platform: 'canonical',
      previousPath: undefined,
      producerId: 'atiAnalyticsProducerId',
      service: 'pidgin',
      statsDestination: 'statsDestination',
      timePublished: '2023-08-01T12:00:00Z',
      timeUpdated: '2023-08-01T12:15:00Z',
    };

    it('should return the correct object for the page given the ATI configuration', () => {
      const result = buildPageATIParams({
        atiData: mostReadPageAtiData,
        requestContext,
        serviceContext,
      });
      expect(result).toEqual(validPageURLParams);
    });

    it('should use the atiData contentType in favour of the requestContext pageType', () => {
      const result = buildPageATIParams({
        atiData: mostReadPageAtiData,
        requestContext: {
          ...requestContext,
          pageType: 'mostRead',
        },
        serviceContext,
      });
      expect(result).toEqual(validPageURLParams);
    });

    it('should return the correct url for a page given the ATI configuration', () => {
      const url = buildPageATIUrl({
        atiData: mostReadPageAtiData,
        requestContext,
        serviceContext,
      });

      const parsedATIURLParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      const expectedATIURLParams = {
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'pidgin.popular.read.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[pcm]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[list-datadriven]',
        x8: '[simorgh]',
        x9: '[MostReadPageTitle]',
        x11: '[2023-08-01T12:00:00Z]',
        x12: '[2023-08-01T12:15:00Z]',
      };

      expect(parsedATIURLParams).toEqual(expectedATIURLParams);
    });
  });

  describe('CPS Page', () => {
    describe('STY', () => {
      const cpsSTYAtiData = {
        campaigns: [
          {
            campaignId: '5a988e4739461b000e9dabfc',
            campaignName: 'WS - Update me',
          },
        ],
        categoryName: 'Explainer',
        contentId:
          'urn:bbc:cps:curie:asset:3137d6de-62c2-4637-a002-29d2ab075990',
        contentType: 'article',
        language: 'es',
        ldpThingIds:
          '75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7',
        ldpThingLabels: 'Politics~Nicaragua~Latin+America',
        pageIdentifier:
          'latin_america::mundo.latin_america.story.64591782.page',
        pageTitle:
          '4 claves para entender la "sorpresiva" liberación y envío a EE.UU. de 222 opositores nicaragüenses - BBC News Mundo',
        producerId: null,
        producerName: 'MUNDO',
        timePublished: '2023-02-10T02:00:41.000Z',
        timeUpdated: '2023-02-10T02:00:41.000Z',
      };

      const validPageURLParams = {
        appName: 'atiAnalyticsAppName',
        campaigns: [
          {
            campaignId: '5a988e4739461b000e9dabfc',
            campaignName: 'WS - Update me',
          },
        ],
        categoryName: 'Explainer',
        contentId:
          'urn:bbc:cps:curie:asset:3137d6de-62c2-4637-a002-29d2ab075990',
        contentType: 'article',
        isUK: undefined,
        language: 'es',
        ldpThingIds:
          '75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7',
        ldpThingLabels: 'Politics~Nicaragua~Latin+America',
        libraryVersion: 'simorgh',
        nationsProducer: undefined,
        origin: undefined,
        pageIdentifier:
          'latin_america::mundo.latin_america.story.64591782.page',
        pageTitle:
          '4 claves para entender la "sorpresiva" liberación y envío a EE.UU. de 222 opositores nicaragüenses - BBC News Mundo',
        platform: 'canonical',
        previousPath: undefined,
        producerId: 'atiAnalyticsProducerId',
        service: 'mundo',
        statsDestination: 'statsDestination',
        timePublished: '2023-02-10T02:00:41.000Z',
        timeUpdated: '2023-02-10T02:00:41.000Z',
      };

      it('should return the correct object for the page given the ATI configuration', () => {
        const result = buildPageATIParams({
          atiData: cpsSTYAtiData,
          requestContext,
          serviceContext: { ...serviceContext, service: 'mundo' },
        });
        expect(result).toStrictEqual(validPageURLParams);
      });

      it('should use the serviceContext lang property if language is absent in atiData', () => {
        const result = buildPageATIParams({
          atiData: { ...cpsSTYAtiData, language: null },
          requestContext,
          serviceContext: { ...serviceContext, service: 'mundo', lang: 'es' },
        });
        expect(result).toEqual(validPageURLParams);
      });

      it('should return the correct url for a page given the ATI configuration', () => {
        const url = buildPageATIUrl({
          atiData: cpsSTYAtiData,
          requestContext,
          serviceContext,
        });

        const parsedATIURLParams = Object.fromEntries(
          new URLSearchParams(url as string),
        );

        const expectedATIURLParams = {
          hl: '00-00-00',
          lng: 'en-US',
          p: 'latin_america::mundo.latin_america.story.64591782.page',
          r: '0x0x24x24',
          re: '1024x768',
          s: '598285',
          s2: 'atiAnalyticsProducerId',
          x1: '[urn:bbc:cps:curie:asset:3137d6de-62c2-4637-a002-29d2ab075990]',
          x2: '[responsive]',
          x3: '[atiAnalyticsAppName]',
          x4: '[es]',
          x5: '[http%3A%2F%2Flocalhost%2F]',
          x7: '[article]',
          x8: '[simorgh]',
          x9: '[4%20claves%20para%20entender%20la%20"sorpresiva"%20liberación%20y%20envío%20a%20EE.UU.%20de%20222%20opositores%20nicaragüenses%20-%20BBC%20News%20Mundo]',
          x11: '[2023-02-10T02:00:41.000Z]',
          x12: '[2023-02-10T02:00:41.000Z]',
          x13: '[Politics~Nicaragua~Latin+America]',
          x14: '[75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7]',
          x16: '[WS - Update me]',
          x17: '[Explainer]',
        };

        expect(parsedATIURLParams).toEqual(expectedATIURLParams);
      });
    });

    describe('MAP', () => {
      const cpsMAPAtiData = {
        campaigns: [
          {
            campaignId: '5a988e4739461b000e9dabfc',
            campaignName: 'WS - Update me',
          },
        ],
        categoryName: 'News',
        contentId:
          'urn:bbc:cps:curie:asset:6d745333-c79d-e245-a5b2-f4acb7de35e1',
        contentType: 'article-media-asset',
        language: 'es',
        ldpThingIds:
          '75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7',
        ldpThingLabels: 'Politics~Nicaragua~Latin+America',
        pageIdentifier: 'media::mundo.media.media_asset.41174775.page',
        pageTitle:
          '¿Qué es el albur en México y cómo puedes saber si te están "albureando"?',
        producerId: null,
        producerName: 'MUNDO',
        timePublished: '2017-09-14T14:09:14.000Z',
        timeUpdated: '2017-09-14T14:09:14.000Z',
      };

      const validPageURLParams = {
        appName: 'atiAnalyticsAppName',
        campaigns: [
          {
            campaignId: '5a988e4739461b000e9dabfc',
            campaignName: 'WS - Update me',
          },
        ],
        categoryName: 'News',
        contentId:
          'urn:bbc:cps:curie:asset:6d745333-c79d-e245-a5b2-f4acb7de35e1',
        contentType: 'article-media-asset',
        isUK: undefined,
        language: 'es',
        ldpThingIds:
          '75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7',
        ldpThingLabels: 'Politics~Nicaragua~Latin+America',
        libraryVersion: 'simorgh',
        nationsProducer: undefined,
        origin: undefined,
        pageIdentifier: 'media::mundo.media.media_asset.41174775.page',
        pageTitle:
          '¿Qué es el albur en México y cómo puedes saber si te están "albureando"?',
        platform: 'canonical',
        previousPath: undefined,
        producerId: 'atiAnalyticsProducerId',
        service: 'mundo',
        statsDestination: 'statsDestination',
        timePublished: '2017-09-14T14:09:14.000Z',
        timeUpdated: '2017-09-14T14:09:14.000Z',
      };

      it('should return the correct object for the page given the ATI configuration', () => {
        const result = buildPageATIParams({
          atiData: cpsMAPAtiData,
          requestContext,
          serviceContext: { ...serviceContext, service: 'mundo' },
        });
        expect(result).toStrictEqual(validPageURLParams);
      });

      it('should use the serviceContext lang property if language is absent in atiData', () => {
        const result = buildPageATIParams({
          atiData: { ...cpsMAPAtiData, language: null },
          requestContext,
          serviceContext: { ...serviceContext, service: 'mundo', lang: 'es' },
        });
        expect(result).toEqual(validPageURLParams);
      });

      it('should return the correct url for a page given the ATI configuration', () => {
        const url = buildPageATIUrl({
          atiData: cpsMAPAtiData,
          requestContext,
          serviceContext,
        });

        const parsedATIURLParams = Object.fromEntries(
          new URLSearchParams(url as string),
        );

        const expectedATIURLParams = {
          hl: '00-00-00',
          lng: 'en-US',
          p: 'media::mundo.media.media_asset.41174775.page',
          r: '0x0x24x24',
          re: '1024x768',
          s: '598285',
          s2: 'atiAnalyticsProducerId',
          x1: '[urn:bbc:cps:curie:asset:6d745333-c79d-e245-a5b2-f4acb7de35e1]',
          x2: '[responsive]',
          x3: '[atiAnalyticsAppName]',
          x4: '[es]',
          x5: '[http%3A%2F%2Flocalhost%2F]',
          x7: '[article-media-asset]',
          x8: '[simorgh]',
          x9: '[¿Qué%20es%20el%20albur%20en%20México%20y%20cómo%20puedes%20saber%20si%20te%20están%20"albureando"?]',
          x11: '[2017-09-14T14:09:14.000Z]',
          x12: '[2017-09-14T14:09:14.000Z]',
          x13: '[Politics~Nicaragua~Latin+America]',
          x14: '[75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7]',
          x16: '[WS - Update me]',
          x17: '[News]',
        };

        expect(parsedATIURLParams).toEqual(expectedATIURLParams);
      });
    });
  });
});

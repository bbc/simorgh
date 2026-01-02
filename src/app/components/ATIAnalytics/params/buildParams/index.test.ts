import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContextProps } from '../../../../contexts/RequestContext';
import { ServiceConfig } from '../../../../models/types/serviceConfig';
import { buildPageATIParams } from '.';

jest
  .spyOn(document, 'referrer', 'get')
  .mockReturnValue('https://www.example.com');

jest.mock('#lib/utilities/onClient', () => jest.fn().mockReturnValue(true));
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
  atiAnalyticsProducerName: 'atiAnalyticsProducerName',
  service: 'pidgin',
  lang: 'pcm',
};

describe('implementation of buildPageATIParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
      pageIdentifier: 'kyrgyz.page',
      pageTitle: 'pageTitle',
      platform: 'canonical',
      producerId: 'atiAnalyticsProducerId',
      producerName: 'atiAnalyticsProducerName',
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
      pageIdentifier: 'burmese.articles.c9wxnzvwp3mo.page',
      pageTitle:
        'ဇူလိုင်လ ၁၃ ရက်ထိပ်တန်းသတင်းများ- ဒုက္ခသည်စခန်းဗုံးကြဲခံရလို့ ထိုင်းကိုထွက်ပြေးသူတွေဆက်ရှိ ',
      platform: 'canonical',
      producerId: 'atiAnalyticsProducerId',
      producerName: 'atiAnalyticsProducerName',
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
          pageType: 'article',
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
          pageType: 'article',
        },
        serviceContext: { ...serviceContext, service: 'burmese', lang: 'my' },
      });
      expect(result).toEqual(validPageURLParams);
    });

    it('should return ampExperimentName only if it is present in atiData', () => {
      const result = buildPageATIParams({
        atiData: {
          ...articlePageAtiData,
          ampExperimentName: 'someAmpExperiment',
        },
        requestContext: {
          ...requestContext,
          isUK: false,
          pageType: 'article',
        },
        serviceContext: { ...serviceContext, service: 'burmese', lang: 'my' },
      });
      expect(result).toEqual({
        ...validPageURLParams,
        ampExperimentName: 'someAmpExperiment',
      });
    });
  });

  describe('Media Article Page', () => {
    const optimoMediaArticlePageAtiData = {
      categoryName: 'Environment~Narendra+Modi~Nature~India~Severe+weather',
      contentId: 'urn:bbc:optimo:asset:c4nrpd0d4nro',
      contentType: 'article-sfv',
      language: 'ha',
      ldpThingIds:
        '0f37fb35-7f9e-4e49-b189-9d7f1d6fb11f~103fc7e4-3a8d-491c-9a75-3c37c299d48f~12e69b92-a7ba-4463-84e0-be107b9805d0~5a08f030-710f-4168-acee-67294a90fc75~9b16a6c2-7c16-42b7-bff7-6549579622e8',
      ldpThingLabels: 'Environment~Narendra+Modi~Nature~India~Severe+weather',
      nationsProducer: null,
      pageIdentifier: 'hausa.articles.c4nrpd0d4nro.page',
      pageTitle: 'Kalli yadda ambaliya ta tagayyara wani yanki na Indiya',
      timePublished: '2023-07-11T17:42:48.771Z',
      timeUpdated: '2023-07-11T17:42:48.771Z',
    };

    const validPageURLParams = {
      appName: 'atiAnalyticsAppName',
      campaigns: undefined,
      categoryName: 'Environment~Narendra+Modi~Nature~India~Severe+weather',
      contentId: 'urn:bbc:optimo:asset:c4nrpd0d4nro',
      contentType: 'article-sfv',
      isUK: false,
      language: 'ha',
      ldpThingIds:
        '0f37fb35-7f9e-4e49-b189-9d7f1d6fb11f~103fc7e4-3a8d-491c-9a75-3c37c299d48f~12e69b92-a7ba-4463-84e0-be107b9805d0~5a08f030-710f-4168-acee-67294a90fc75~9b16a6c2-7c16-42b7-bff7-6549579622e8',
      ldpThingLabels: 'Environment~Narendra+Modi~Nature~India~Severe+weather',
      libraryVersion: 'simorgh',
      nationsProducer: null,
      pageIdentifier: 'hausa.articles.c4nrpd0d4nro.page',
      pageTitle: 'Kalli yadda ambaliya ta tagayyara wani yanki na Indiya',
      platform: 'canonical',

      producerId: 'atiAnalyticsProducerId',
      producerName: 'atiAnalyticsProducerName',
      service: 'hausa',
      statsDestination: 'statsDestination',
      timePublished: '2023-07-11T17:42:48.771Z',
      timeUpdated: '2023-07-11T17:42:48.771Z',
    };

    it('should return the correct object for the page given the ATI configuration', () => {
      const result = buildPageATIParams({
        atiData: optimoMediaArticlePageAtiData,
        requestContext: {
          ...requestContext,
          isUK: false,
          pageType: 'article',
        },
        serviceContext: { ...serviceContext, service: 'hausa', lang: 'ha' },
      });
      expect(result).toEqual(validPageURLParams);
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
      pageIdentifier: 'pidgin.topics.c95y35941vrt.page',
      pageTitle: 'Donald Trump',
      platform: 'canonical',
      producerId: 'atiAnalyticsProducerId',
      producerName: 'atiAnalyticsProducerName',
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
          pageType: TOPIC_PAGE,
        },
        serviceContext,
      });
      expect(result).toEqual(validPageURLParams);
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
      pageIdentifier: 'pidgin.popular.read.page',
      pageTitle: 'MostReadPageTitle',
      platform: 'canonical',
      producerId: 'atiAnalyticsProducerId',
      producerName: 'atiAnalyticsProducerName',
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
        pageIdentifier:
          'latin_america::mundo.latin_america.story.64591782.page',
        pageTitle:
          '4 claves para entender la "sorpresiva" liberación y envío a EE.UU. de 222 opositores nicaragüenses - BBC News Mundo',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        producerName: 'atiAnalyticsProducerName',
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
        pageIdentifier: 'media::mundo.media.media_asset.41174775.page',
        pageTitle:
          '¿Qué es el albur en México y cómo puedes saber si te están "albureando"?',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        producerName: 'atiAnalyticsProducerName',
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
    });

    describe('PGL', () => {
      const cpsPGLAtiData = {
        campaigns: [
          {
            campaignId: '5a988e3139461b000e9dabf9',
            campaignName: 'WS - Divert me',
          },
        ],
        categoryName: 'News',
        contentId:
          'urn:bbc:cps:curie:asset:08e22e90-7361-cd47-b586-7cb53fc5a012',
        contentType: 'article-photo-gallery',
        language: 'es',
        ldpThingIds: '25844b6e-80b0-4de9-8ea0-7a35e7d4086f',
        ldpThingLabels: 'Technology',
        pageIdentifier: 'sport::mundo.sport.photo_gallery.36935058.page',
        pageTitle:
          'Río 2016, el antes y el ahora: cómo ha cambiado la ropa deportiva en más de un siglo de juegos olímpicos',
        producerId: null,
        producerName: 'MUNDO',
        timePublished: '2016-08-07T09:21:02.000Z',
        timeUpdated: '2016-08-07T09:21:02.000Z',
      };

      const validPageURLParams = {
        appName: 'atiAnalyticsAppName',
        campaigns: [
          {
            campaignId: '5a988e3139461b000e9dabf9',
            campaignName: 'WS - Divert me',
          },
        ],
        categoryName: 'News',
        contentId:
          'urn:bbc:cps:curie:asset:08e22e90-7361-cd47-b586-7cb53fc5a012',
        contentType: 'article-photo-gallery',
        isUK: undefined,
        language: 'es',
        ldpThingIds: '25844b6e-80b0-4de9-8ea0-7a35e7d4086f',
        ldpThingLabels: 'Technology',
        libraryVersion: 'simorgh',
        nationsProducer: undefined,
        pageIdentifier: 'sport::mundo.sport.photo_gallery.36935058.page',
        pageTitle:
          'Río 2016, el antes y el ahora: cómo ha cambiado la ropa deportiva en más de un siglo de juegos olímpicos',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        producerName: 'atiAnalyticsProducerName',
        service: 'mundo',
        statsDestination: 'statsDestination',
        timePublished: '2016-08-07T09:21:02.000Z',
        timeUpdated: '2016-08-07T09:21:02.000Z',
      };

      it('should return the correct object for the page given the ATI configuration', () => {
        const result = buildPageATIParams({
          atiData: cpsPGLAtiData,
          requestContext,
          serviceContext: { ...serviceContext, service: 'mundo' },
        });
        expect(result).toStrictEqual(validPageURLParams);
      });

      it('should use the serviceContext lang property if language is absent in atiData', () => {
        const result = buildPageATIParams({
          atiData: { ...cpsPGLAtiData, language: null },
          requestContext,
          serviceContext: { ...serviceContext, service: 'mundo', lang: 'es' },
        });
        expect(result).toEqual(validPageURLParams);
      });
    });

    describe('CSP', () => {
      const cpsCSPAtiData = {
        campaigns: null,
        categoryName: 'News',
        chapter: 'technology',
        contentId:
          'urn:bbc:cps:curie:asset:c1c8b1bf-4c9c-44e8-be0d-c81a2aa59e46',
        contentType: 'article-correspondent',
        language: 'en-gb',
        ldpThingIds:
          '0d358111-576d-4d61-a7c7-e2e71931b579~2c493367-e5a2-4c19-be5f-6e9342f5c591~2f2db234-3c2d-40a4-b4ac-eea661faadd0~31684f19-84d6-41f6-b033-7ae08098572a~65ba56b4-3f50-4217-ab8e-b3c1fe890364~6892384e-1966-4c03-9ce3-f694a8f9f69e~7a48b6e0-9074-4303-ae82-011003058e16~b054a2d3-6c1e-44de-b8db-0e2501c035c0~f7bf39da-286c-4e37-8ee0-a01395f09ac2',
        ldpThingLabels:
          'Intel~Technology+of+business~Business~Technology~Car+industry~China~Taiwan~Computer+chip~Semiconductors',
        pageIdentifier:
          'technology::news.technology.correspondent_story.56294493.page',
        pageTitle: "Tech Tent: The new 'space race' for computer chips",
        producerId: '64',
        producerName: 'NEWS',
        timePublished: '2021-03-05T13:37:50.000Z',
        timeUpdated: '2021-03-05T13:37:50.000Z',
      };

      const validPageURLParams = {
        appName: 'atiAnalyticsAppName',
        campaigns: null,
        categoryName: 'News',
        contentId:
          'urn:bbc:cps:curie:asset:c1c8b1bf-4c9c-44e8-be0d-c81a2aa59e46',
        contentType: 'article-correspondent',
        isUK: undefined,
        language: 'en-gb',
        ldpThingIds:
          '0d358111-576d-4d61-a7c7-e2e71931b579~2c493367-e5a2-4c19-be5f-6e9342f5c591~2f2db234-3c2d-40a4-b4ac-eea661faadd0~31684f19-84d6-41f6-b033-7ae08098572a~65ba56b4-3f50-4217-ab8e-b3c1fe890364~6892384e-1966-4c03-9ce3-f694a8f9f69e~7a48b6e0-9074-4303-ae82-011003058e16~b054a2d3-6c1e-44de-b8db-0e2501c035c0~f7bf39da-286c-4e37-8ee0-a01395f09ac2',
        ldpThingLabels:
          'Intel~Technology+of+business~Business~Technology~Car+industry~China~Taiwan~Computer+chip~Semiconductors',
        libraryVersion: 'simorgh',
        nationsProducer: undefined,
        pageIdentifier:
          'technology::news.technology.correspondent_story.56294493.page',
        pageTitle: "Tech Tent: The new 'space race' for computer chips",
        platform: 'canonical',
        producerId: '64',
        producerName: 'atiAnalyticsProducerName',
        service: 'news',
        statsDestination: 'statsDestination',
        timePublished: '2021-03-05T13:37:50.000Z',
        timeUpdated: '2021-03-05T13:37:50.000Z',
      };

      it('should return the correct object for the page given the ATI configuration', () => {
        const result = buildPageATIParams({
          atiData: cpsCSPAtiData,
          requestContext,
          serviceContext: { ...serviceContext, service: 'news' },
        });
        expect(result).toStrictEqual(validPageURLParams);
      });

      it('should use the serviceContext lang property if language is absent in atiData', () => {
        const result = buildPageATIParams({
          atiData: { ...cpsCSPAtiData, language: null },
          requestContext,
          serviceContext: { ...serviceContext, service: 'news', lang: 'en-gb' },
        });
        expect(result).toEqual(validPageURLParams);
      });

      it('should use the serviceContext atiAnalyticsProducerId property if producerId is absent in atiData', () => {
        const result = buildPageATIParams({
          atiData: { ...cpsCSPAtiData, producerId: null },
          requestContext,
          serviceContext: {
            ...serviceContext,
            atiAnalyticsProducerId: '64',
            service: 'news',
            lang: 'en-gb',
          },
        });
        expect(result).toEqual(validPageURLParams);
      });

      it('should use the set producerId in atiData in favour of the serviceContext atiAnalyticsProducerId poperty', () => {
        const result = buildPageATIParams({
          atiData: { ...cpsCSPAtiData, producerId: 'overrideProducerId' },
          requestContext,
          serviceContext: {
            ...serviceContext,
            atiAnalyticsProducerId: '64',
            service: 'news',
            lang: 'en-gb',
          },
        });
        const expectedParamsWithOverride = {
          ...validPageURLParams,
          producerId: 'overrideProducerId',
        };
        expect(result).toEqual(expectedParamsWithOverride);
      });
    });
  });
});

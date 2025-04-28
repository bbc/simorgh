/* eslint-disable no-console */
import { resetWindowValue } from '#app/legacy/psammead/psammead-test-helpers/src';
import * as analyticsUtils from '#app/lib/analyticsUtils';
import {
  ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  MEDIA_ARTICLE_PAGE,
  HOME_PAGE,
  TOPIC_PAGE,
} from '#app/routes/utils/pageTypes';
import { RequestContextProps } from '#app/contexts/RequestContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import { Platforms } from '#app/models/types/global';
import { getATIPageViewParams, getATIParams } from '.';
import * as buildPageATIFunctionImports from '.';
import { ATIData } from '../types';

const {
  buildATIPageViewParams,
  buildReverbPageViewModel,
  buildReverbComponentTrackingModel,
} = buildPageATIFunctionImports;

(analyticsUtils.getAtUserId as jest.Mock) = jest.fn();
(analyticsUtils.getCurrentTime as jest.Mock) = jest
  .fn()
  .mockReturnValue('00-00-00');
(analyticsUtils.getPublishedDatetime as jest.Mock) = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

jest
  .spyOn(document, 'referrer', 'get')
  .mockReturnValue('https://www.example.com');

// @ts-expect-error required for testing purposes
const mockAndSet = ({ name, source }, response) => {
  source[name] = jest.fn(); // eslint-disable-line no-param-reassign
  source[name].mockImplementation(() => response);
};

const analyticsUtilFunctions = [
  { name: 'getDestination', source: analyticsUtils },
  { name: 'getAppType', source: analyticsUtils },
  { name: 'getScreenInfo', source: analyticsUtils },
  { name: 'getBrowserViewPort', source: analyticsUtils },
  { name: 'getCurrentTime', source: analyticsUtils },
  { name: 'getDeviceLanguage', source: analyticsUtils },
  { name: 'getHref', source: analyticsUtils },
  { name: 'getReferrer', source: analyticsUtils },
  { name: 'getAtUserId', source: analyticsUtils },
  { name: 'getATIMarketingString,', source: analyticsUtils },
  { name: 'isLocServeCookieSet', source: analyticsUtils },
  { name: 'sanitise', source: analyticsUtils },
];

const marketingCampaignFunc = {
  name: 'getCampaignType',
  source: analyticsUtils,
};

const rssMarketingStringFunc = {
  name: 'getRSSMarketingString',
  source: analyticsUtils,
};

const splitUrl = (url: string) =>
  url.replace(/&/g, ',').replace(/\?/g, ',').split(',');

// @ts-expect-error - only partial data required for testing purposes
const requestContext: RequestContextProps = {
  platform: 'canonical',
  isUK: false,
  statsDestination: 'statsDestination',
  canonicalLink: 'https://www.bbc.com/pidgin/51536047',
};

// @ts-expect-error - only partial data required for testing purposes
const serviceContext: ServiceConfig = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  atiAnalyticsProducerName: 'atiAnalyticsProducerName',
  service: 'pidgin',
  brandName: 'brandName',
  lang: 'pcm',
};

const homePageAnalyticsData: ATIData = {
  contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
  contentType: 'index-home',
  pageIdentifier: 'kyrgyz.page',
  pageTitle: 'pageTitle',
};

const articlePageAnalyticsData: ATIData = {
  categoryName: 'Nigeria~Education~Lagos%20state~Women',
  contentId: 'urn:bbc:optimo:asset:crgrx86em6yo',
  contentType: 'article',
  language: 'pcm',
  ldpThingIds:
    '3d5d5e30-dd50-4041-96d5-c970b20005b9~6942cb29-9d3f-4c9c-9806-0a0578c286d6~d651d520-a675-4911-8832-1596f257000b~e45cb5f8-3c87-4ebd-ac1c-058e9be22862',
  ldpThingLabels: 'Nigeria~Education~Lagos%20state~Women',
  nationsProducer: 'scotland',
  pageIdentifier: 'pidgin.articles.crgrx86em6yo.page',
  pageTitle:
    'Aminat Yusuf: Tips to pass exam - Overall LASU best graduate drop update',
  timePublished: '2023-07-19T15:57:54.500Z',
  timeUpdated: '2023-07-19T15:57:54.500Z',
};

const mediaArticlePageAnalyticsData: ATIData = {
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

const cpsMAPPageAnalyticsData: ATIData = {
  campaigns: [
    {
      campaignId: '5a988e4739461b000e9dabfc',
      campaignName: 'WS - Update me',
    },
  ],
  categoryName: 'News',
  contentId: 'urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
  contentType: 'article-media-asset',
  language: 'es',
  ldpThingIds:
    '75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7',
  ldpThingLabels: 'Politics~Nicaragua~Latin+America',
  pageIdentifier: 'media::mundo.media.media_asset.41174775.page',
  pageTitle:
    '¿Qué es el albur en México y cómo puedes saber si te están "albureando"? - BBC News Mundo',
  producerId: null,
  producerName: 'MUNDO',
  timePublished: '2017-09-14T14:09:14.000Z',
  timeUpdated: '2017-09-14T14:09:14.000Z',
};

const cpsPGLPageAnalyticsData: ATIData = {
  campaigns: [
    {
      campaignId: '5a988e3139461b000e9dabf9',
      campaignName: 'WS - Divert me',
    },
  ],
  categoryName: 'News',
  contentId: 'urn:bbc:cps:curie:asset:08e22e90-7361-cd47-b586-7cb53fc5a012',
  contentType: 'article-photo-gallery',
  language: 'es',
  ldpThingIds: '25844b6e-80b0-4de9-8ea0-7a35e7d4086f',
  ldpThingLabels: 'Technology',
  pageIdentifier: 'sport::mundo.sport.photo_gallery.36935058.page',
  pageTitle:
    'Río 2016, el antes y el ahora: cómo ha cambiado la ropa deportiva en más de un siglo de juegos olímpicos - BBC News Mundo',
  producerId: null,
  producerName: 'MUNDO',
  timePublished: '2016-08-07T09:21:02.000Z',
  timeUpdated: '2016-08-07T09:21:02.000Z',
};

describe('PageViewTracking params', () => {
  describe('getATIPageViewURL', () => {
    it('should return the correct article url', () => {
      const url = getATIPageViewParams({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        atiData: articlePageAnalyticsData,
        serviceContext,
      });

      const parsedATIURLParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      const expectedATIURLParams = {
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'pidgin.articles.crgrx86em6yo.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:optimo:asset:crgrx86em6yo]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[pcm]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[https%3A%2F%2Fwww.example.com]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[Aminat%20Yusuf:%20Tips%20to%20pass%20exam%20-%20Overall%20LASU%20best%20graduate%20drop%20update]',
        x10: '[scotland]',
        x11: '[2023-07-19T15:57:54.500Z]',
        x12: '[2023-07-19T15:57:54.500Z]',
        x13: '[Nigeria~Education~Lagos%20state~Women]',
        x14: '[3d5d5e30-dd50-4041-96d5-c970b20005b9~6942cb29-9d3f-4c9c-9806-0a0578c286d6~d651d520-a675-4911-8832-1596f257000b~e45cb5f8-3c87-4ebd-ac1c-058e9be22862]',
        x17: '[Nigeria~Education~Lagos%20state~Women]',
        ref: 'https://www.example.com',
      };

      expect(parsedATIURLParams).toEqual(expectedATIURLParams);
    });

    it('should return the correct media article url', () => {
      const url = getATIPageViewParams({
        requestContext: { ...requestContext, pageType: MEDIA_ARTICLE_PAGE },
        atiData: mediaArticlePageAnalyticsData,
        serviceContext,
      });

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      expect(parsedATIParams).toEqual({
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'hausa.articles.c4nrpd0d4nro.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:optimo:asset:c4nrpd0d4nro]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[ha]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[https%3A%2F%2Fwww.example.com]',
        x7: '[article-sfv]',
        x8: '[simorgh]',
        x9: '[Kalli%20yadda%20ambaliya%20ta%20tagayyara%20wani%20yanki%20na%20Indiya]',
        x11: '[2023-07-11T17:42:48.771Z]',
        x12: '[2023-07-11T17:42:48.771Z]',
        x13: '[Environment~Narendra+Modi~Nature~India~Severe+weather]',
        x14: '[0f37fb35-7f9e-4e49-b189-9d7f1d6fb11f~103fc7e4-3a8d-491c-9a75-3c37c299d48f~12e69b92-a7ba-4463-84e0-be107b9805d0~5a08f030-710f-4168-acee-67294a90fc75~9b16a6c2-7c16-42b7-bff7-6549579622e8]',
        x17: '[Environment~Narendra+Modi~Nature~India~Severe+weather]',
        ref: 'https://www.example.com',
      });
    });

    it('should return the correct MAP url', () => {
      const url = getATIPageViewParams({
        requestContext: { ...requestContext, pageType: MEDIA_ASSET_PAGE },
        atiData: cpsMAPPageAnalyticsData,
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
        ref: 'https://www.example.com',
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        x1: '[urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[es]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[https%3A%2F%2Fwww.example.com]',
        x7: '[article-media-asset]',
        x8: '[simorgh]',
        x9: '[¿Qué%20es%20el%20albur%20en%20México%20y%20cómo%20puedes%20saber%20si%20te%20están%20"albureando"?%20-%20BBC%20News%20Mundo]',
        x11: '[2017-09-14T14:09:14.000Z]',
        x12: '[2017-09-14T14:09:14.000Z]',
        x13: '[Politics~Nicaragua~Latin+America]',
        x14: '[75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7]',
        x16: '[WS - Update me]',
        x17: '[News]',
      };

      expect(parsedATIURLParams).toEqual(expectedATIURLParams);
    });

    it('should return the correct PGL url', () => {
      const url = getATIPageViewParams({
        requestContext: { ...requestContext, pageType: PHOTO_GALLERY_PAGE },
        atiData: cpsPGLPageAnalyticsData,
        serviceContext,
      });

      const parsedATIURLParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      const expectedATIURLParams = {
        hl: '00-00-00',
        lng: 'en-US',
        p: 'sport::mundo.sport.photo_gallery.36935058.page',
        r: '0x0x24x24',
        re: '1024x768',
        ref: 'https://www.example.com',
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        x1: '[urn:bbc:cps:curie:asset:08e22e90-7361-cd47-b586-7cb53fc5a012]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[es]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[https%3A%2F%2Fwww.example.com]',
        x7: '[article-photo-gallery]',
        x8: '[simorgh]',
        x9: '[Río%202016,%20el%20antes%20y%20el%20ahora:%20cómo%20ha%20cambiado%20la%20ropa%20deportiva%20en%20más%20de%20un%20siglo%20de%20juegos%20olímpicos%20-%20BBC%20News%20Mundo]',
        x11: '[2016-08-07T09:21:02.000Z]',
        x12: '[2016-08-07T09:21:02.000Z]',
        x13: '[Technology]',
        x14: '[25844b6e-80b0-4de9-8ea0-7a35e7d4086f]',
        x16: '[WS - Divert me]',
        x17: '[News]',
      };

      expect(parsedATIURLParams).toEqual(expectedATIURLParams);
    });

    it('should return the correct Homepage url', () => {
      const url = getATIPageViewParams({
        requestContext: { ...requestContext, pageType: HOME_PAGE },
        atiData: homePageAnalyticsData,
        serviceContext,
      });

      const parsedATIURLParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      expect(parsedATIURLParams).toEqual({
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'kyrgyz.page',
        r: '0x0x24x24',
        re: '1024x768',
        ref: 'https://www.example.com',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:tipo:topic:cm7682qz7v1t]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[pcm]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[https%3A%2F%2Fwww.example.com]',
        x7: '[index-home]',
        x8: '[simorgh]',
        x9: '[pageTitle]',
      });
    });

    it('should have both ref parameter and x6 referrer url parameter, if referrer url exists', () => {
      const atiUrl = getATIPageViewParams({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        serviceContext,
        atiData: articlePageAnalyticsData,
      }) as string;

      const params = Object.fromEntries(new URLSearchParams(atiUrl));

      expect(params.x6).toBe('[https%3A%2F%2Fwww.example.com]');
      expect(params.ref).toBe('https://www.example.com');
    });

    it('should have ref parameter as the last parameter, if referrer url exists', () => {
      const atiUrl = getATIPageViewParams({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        serviceContext,
        atiData: articlePageAnalyticsData,
      }) as string;
      const params = atiUrl.split('&');

      expect(params.pop()).toEqual('ref=https://www.example.com');
    });

    it('should not have ref and x6 parameters, if referrer url does not exist', () => {
      const atiUrl = getATIPageViewParams({
        requestContext: {
          ...requestContext,
          pageType: ARTICLE_PAGE,
        },
        serviceContext,
        atiData: articlePageAnalyticsData,
      }) as string;
      const params = atiUrl.split('&');

      expect(params).not.toContain('x6=');
      expect(params).not.toContain('ref=');
    });

    describe('getATIPageViewParams invocation', () => {
      let buildPageATIUrlSpy: jest.SpyInstance;

      beforeEach(() => {
        buildPageATIUrlSpy = jest.spyOn(
          buildPageATIFunctionImports,
          'getATIPageViewParams',
        );

        jest.clearAllMocks();
      });

      it('should invoke getATIPageViewParams for supported page types', () => {
        getATIPageViewParams({
          requestContext: { ...requestContext, pageType: HOME_PAGE },
          atiData: homePageAnalyticsData,
          serviceContext,
        });

        expect(buildPageATIUrlSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            requestContext: { ...requestContext, pageType: HOME_PAGE },
            atiData: homePageAnalyticsData,
            serviceContext,
          }),
        );
      });
    });
  });

  describe('getATIParams', () => {
    it('should return the correct article params', () => {
      const params = getATIParams({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        atiData: articlePageAnalyticsData,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:optimo:asset:crgrx86em6yo',
        contentType: 'article',
        categoryName: 'Nigeria~Education~Lagos%20state~Women',
        isUK: false,
        language: 'pcm',
        ldpThingIds:
          '3d5d5e30-dd50-4041-96d5-c970b20005b9~6942cb29-9d3f-4c9c-9806-0a0578c286d6~d651d520-a675-4911-8832-1596f257000b~e45cb5f8-3c87-4ebd-ac1c-058e9be22862',
        ldpThingLabels: 'Nigeria~Education~Lagos%20state~Women',
        pageIdentifier: 'pidgin.articles.crgrx86em6yo.page',
        pageTitle:
          'Aminat Yusuf: Tips to pass exam - Overall LASU best graduate drop update',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        producerName: 'atiAnalyticsProducerName',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '2023-07-19T15:57:54.500Z',
        timeUpdated: '2023-07-19T15:57:54.500Z',
        nationsProducer: 'scotland',
      });
    });

    it('should return the correct media article params', () => {
      const params = getATIParams({
        requestContext: { ...requestContext, pageType: MEDIA_ARTICLE_PAGE },
        atiData: mediaArticlePageAnalyticsData,
        serviceContext,
      });
      expect(params).toEqual({
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
        pageIdentifier: 'hausa.articles.c4nrpd0d4nro.page',
        pageTitle: 'Kalli yadda ambaliya ta tagayyara wani yanki na Indiya',
        libraryVersion: 'simorgh',
        nationsProducer: null,
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        producerName: 'atiAnalyticsProducerName',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '2023-07-11T17:42:48.771Z',
        timeUpdated: '2023-07-11T17:42:48.771Z',
      });
    });

    it('should return the correct MAP params', () => {
      const params = getATIParams({
        requestContext: { ...requestContext, pageType: MEDIA_ASSET_PAGE },
        atiData: cpsMAPPageAnalyticsData,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        categoryName: 'News',
        campaigns: [
          {
            campaignId: '5a988e4739461b000e9dabfc',
            campaignName: 'WS - Update me',
          },
        ],
        contentId: 'urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
        contentType: 'article-media-asset',
        isUK: false,
        language: 'es',
        ldpThingIds:
          '75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7',
        ldpThingLabels: 'Politics~Nicaragua~Latin+America',
        libraryVersion: 'simorgh',
        nationsProducer: undefined,
        pageIdentifier: 'media::mundo.media.media_asset.41174775.page',
        pageTitle:
          '¿Qué es el albur en México y cómo puedes saber si te están "albureando"? - BBC News Mundo',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        producerName: 'atiAnalyticsProducerName',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '2017-09-14T14:09:14.000Z',
        timeUpdated: '2017-09-14T14:09:14.000Z',
      });
    });

    it('should return the correct PGL params', () => {
      const params = getATIParams({
        requestContext: { ...requestContext, pageType: PHOTO_GALLERY_PAGE },
        atiData: cpsPGLPageAnalyticsData,
        serviceContext,
      });
      expect(params).toEqual({
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
        isUK: false,
        language: 'es',
        ldpThingIds: '25844b6e-80b0-4de9-8ea0-7a35e7d4086f',
        ldpThingLabels: 'Technology',
        libraryVersion: 'simorgh',
        nationsProducer: undefined,
        pageIdentifier: 'sport::mundo.sport.photo_gallery.36935058.page',
        pageTitle:
          'Río 2016, el antes y el ahora: cómo ha cambiado la ropa deportiva en más de un siglo de juegos olímpicos - BBC News Mundo',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        producerName: 'atiAnalyticsProducerName',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '2016-08-07T09:21:02.000Z',
        timeUpdated: '2016-08-07T09:21:02.000Z',
      });
    });

    it('should return the correct Homepage params', () => {
      const params = getATIParams({
        requestContext: { ...requestContext, pageType: HOME_PAGE },
        atiData: homePageAnalyticsData,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        campaigns: undefined,
        categoryName: undefined,
        contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
        contentType: 'index-home',
        isUK: false,
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
      });
    });

    describe('getATIParams invocation', () => {
      let buildPageATIParamsSpy: jest.SpyInstance;
      const { error } = console;

      beforeEach(() => {
        buildPageATIParamsSpy = jest.spyOn(
          buildPageATIFunctionImports,
          'getATIParams',
        );
        console.error = jest.fn();
      });

      afterEach(() => {
        jest.clearAllMocks();
        console.error = error;
      });

      it('should invoke getATIParams for supported page types', () => {
        getATIParams({
          requestContext: { ...requestContext, pageType: HOME_PAGE },
          atiData: homePageAnalyticsData,
          serviceContext,
        });

        expect(buildPageATIParamsSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            requestContext: { ...requestContext, pageType: HOME_PAGE },
            atiData: homePageAnalyticsData,
            serviceContext,
          }),
        );
      });
    });
  });

  describe('implementation of getATIParams and getATIPageViewParams', () => {
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
        isUK: false,
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
        const result = getATIParams({
          atiData: homePageAtiData,
          requestContext,
          serviceContext,
        });
        expect(result).toEqual(validPageURLParams);
      });

      it('should use the atiData contentType in favour of the requestContext pageType', () => {
        const result = getATIParams({
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
        const url = getATIPageViewParams({
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
          ref: 'https://www.example.com',
          hl: '00-00-00',
          lng: 'en-US',
          x1: '[urn:bbc:tipo:topic:cm7682qz7v1t]',
          x2: '[responsive]',
          x3: '[atiAnalyticsAppName]',
          x4: '[pcm]',
          x5: '[http%3A%2F%2Flocalhost%2F]',
          x6: '[https%3A%2F%2Fwww.example.com]',
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
        const result = getATIParams({
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
        const result = getATIParams({
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

      it('should return the correct url for a page given the ATI configuration', () => {
        const url = getATIPageViewParams({
          atiData: articlePageAtiData,
          requestContext: {
            ...requestContext,
            isUK: false,
            pageType: 'article',
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
          ref: 'https://www.example.com',
          hl: '00-00-00',
          lng: 'en-US',
          x1: '[urn:bbc:optimo:asset:c9wxnzvwp3mo]',
          x2: '[responsive]',
          x3: '[atiAnalyticsAppName]',
          x4: '[my]',
          x5: '[http%3A%2F%2Flocalhost%2F]',
          x6: '[https%3A%2F%2Fwww.example.com]',
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

      it('should return ampExperimentName only if it is present in atiData', () => {
        const result = getATIParams({
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
        const result = getATIParams({
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

      it('should return the correct url for a page given the ATI configuration', () => {
        const url = getATIPageViewParams({
          atiData: optimoMediaArticlePageAtiData,
          requestContext: {
            ...requestContext,
            isUK: false,
            pageType: 'article',
          },
          serviceContext: { ...serviceContext, service: 'hausa', lang: 'ha' },
        });

        const parsedATIURLParams = Object.fromEntries(
          new URLSearchParams(url as string),
        );

        const expectedATIURLParams = {
          s: '598285',
          s2: 'atiAnalyticsProducerId',
          p: 'hausa.articles.c4nrpd0d4nro.page',
          r: '0x0x24x24',
          re: '1024x768',
          ref: 'https://www.example.com',
          hl: '00-00-00',
          lng: 'en-US',
          x1: '[urn:bbc:optimo:asset:c4nrpd0d4nro]',
          x2: '[responsive]',
          x3: '[atiAnalyticsAppName]',
          x4: '[ha]',
          x5: '[http%3A%2F%2Flocalhost%2F]',
          x6: '[https%3A%2F%2Fwww.example.com]',
          x7: '[article-sfv]',
          x8: '[simorgh]',
          x9: '[Kalli%20yadda%20ambaliya%20ta%20tagayyara%20wani%20yanki%20na%20Indiya]',
          x11: '[2023-07-11T17:42:48.771Z]',
          x12: '[2023-07-11T17:42:48.771Z]',
          x13: '[Environment~Narendra+Modi~Nature~India~Severe+weather]',
          x14: '[0f37fb35-7f9e-4e49-b189-9d7f1d6fb11f~103fc7e4-3a8d-491c-9a75-3c37c299d48f~12e69b92-a7ba-4463-84e0-be107b9805d0~5a08f030-710f-4168-acee-67294a90fc75~9b16a6c2-7c16-42b7-bff7-6549579622e8]',
          x17: '[Environment~Narendra+Modi~Nature~India~Severe+weather]',
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
        isUK: false,
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
        const result = getATIParams({
          atiData: topicPageAtiData,
          requestContext,
          serviceContext,
        });
        expect(result).toEqual(validPageURLParams);
      });

      it('should use the atiData contentType in favour of the requestContext pageType', () => {
        const result = getATIParams({
          atiData: topicPageAtiData,
          requestContext: {
            ...requestContext,
            pageType: TOPIC_PAGE,
          },
          serviceContext,
        });
        expect(result).toEqual(validPageURLParams);
      });

      it('should return the correct url for a page given the ATI configuration', () => {
        const url = getATIPageViewParams({
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
          ref: 'https://www.example.com',
          hl: '00-00-00',
          lng: 'en-US',
          x1: '[urn:bbc:tipo:topic:c95y35941vrt]',
          x2: '[responsive]',
          x3: '[atiAnalyticsAppName]',
          x4: '[pcm]',
          x5: '[http%3A%2F%2Flocalhost%2F]',
          x6: '[https%3A%2F%2Fwww.example.com]',
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
        isUK: false,
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
        const result = getATIParams({
          atiData: mostReadPageAtiData,
          requestContext,
          serviceContext,
        });
        expect(result).toEqual(validPageURLParams);
      });

      it('should use the atiData contentType in favour of the requestContext pageType', () => {
        const result = getATIParams({
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
        const url = getATIPageViewParams({
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
          ref: 'https://www.example.com',
          hl: '00-00-00',
          lng: 'en-US',
          x2: '[responsive]',
          x3: '[atiAnalyticsAppName]',
          x4: '[pcm]',
          x5: '[http%3A%2F%2Flocalhost%2F]',
          x6: '[https%3A%2F%2Fwww.example.com]',
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
          isUK: false,
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
          const result = getATIParams({
            atiData: cpsSTYAtiData,
            requestContext,
            serviceContext: { ...serviceContext, service: 'mundo' },
          });
          expect(result).toStrictEqual(validPageURLParams);
        });

        it('should use the serviceContext lang property if language is absent in atiData', () => {
          const result = getATIParams({
            atiData: { ...cpsSTYAtiData, language: null },
            requestContext,
            serviceContext: { ...serviceContext, service: 'mundo', lang: 'es' },
          });
          expect(result).toEqual(validPageURLParams);
        });

        it('should return the correct url for a page given the ATI configuration', () => {
          const url = getATIPageViewParams({
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
            ref: 'https://www.example.com',
            s: '598285',
            s2: 'atiAnalyticsProducerId',
            x1: '[urn:bbc:cps:curie:asset:3137d6de-62c2-4637-a002-29d2ab075990]',
            x2: '[responsive]',
            x3: '[atiAnalyticsAppName]',
            x4: '[es]',
            x5: '[http%3A%2F%2Flocalhost%2F]',
            x6: '[https%3A%2F%2Fwww.example.com]',
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
          isUK: false,
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
          const result = getATIParams({
            atiData: cpsMAPAtiData,
            requestContext,
            serviceContext: { ...serviceContext, service: 'mundo' },
          });
          expect(result).toStrictEqual(validPageURLParams);
        });

        it('should use the serviceContext lang property if language is absent in atiData', () => {
          const result = getATIParams({
            atiData: { ...cpsMAPAtiData, language: null },
            requestContext,
            serviceContext: { ...serviceContext, service: 'mundo', lang: 'es' },
          });
          expect(result).toEqual(validPageURLParams);
        });

        it('should return the correct url for a page given the ATI configuration', () => {
          const url = getATIPageViewParams({
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
            ref: 'https://www.example.com',
            s: '598285',
            s2: 'atiAnalyticsProducerId',
            x1: '[urn:bbc:cps:curie:asset:6d745333-c79d-e245-a5b2-f4acb7de35e1]',
            x2: '[responsive]',
            x3: '[atiAnalyticsAppName]',
            x4: '[es]',
            x5: '[http%3A%2F%2Flocalhost%2F]',
            x6: '[https%3A%2F%2Fwww.example.com]',
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
          isUK: false,
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
          const result = getATIParams({
            atiData: cpsPGLAtiData,
            requestContext,
            serviceContext: { ...serviceContext, service: 'mundo' },
          });
          expect(result).toStrictEqual(validPageURLParams);
        });

        it('should use the serviceContext lang property if language is absent in atiData', () => {
          const result = getATIParams({
            atiData: { ...cpsPGLAtiData, language: null },
            requestContext,
            serviceContext: { ...serviceContext, service: 'mundo', lang: 'es' },
          });
          expect(result).toEqual(validPageURLParams);
        });

        it('should return the correct url for a page given the ATI configuration', () => {
          const url = getATIPageViewParams({
            atiData: cpsPGLAtiData,
            requestContext,
            serviceContext,
          });

          const parsedATIURLParams = Object.fromEntries(
            new URLSearchParams(url as string),
          );

          const expectedATIURLParams = {
            hl: '00-00-00',
            lng: 'en-US',
            p: 'sport::mundo.sport.photo_gallery.36935058.page',
            r: '0x0x24x24',
            re: '1024x768',
            ref: 'https://www.example.com',
            s: '598285',
            s2: 'atiAnalyticsProducerId',
            x1: '[urn:bbc:cps:curie:asset:08e22e90-7361-cd47-b586-7cb53fc5a012]',
            x2: '[responsive]',
            x3: '[atiAnalyticsAppName]',
            x4: '[es]',
            x5: '[http%3A%2F%2Flocalhost%2F]',
            x6: '[https%3A%2F%2Fwww.example.com]',
            x7: '[article-photo-gallery]',
            x8: '[simorgh]',
            x9: '[Río%202016,%20el%20antes%20y%20el%20ahora:%20cómo%20ha%20cambiado%20la%20ropa%20deportiva%20en%20más%20de%20un%20siglo%20de%20juegos%20olímpicos]',
            x11: '[2016-08-07T09:21:02.000Z]',
            x12: '[2016-08-07T09:21:02.000Z]',
            x13: '[Technology]',
            x14: '[25844b6e-80b0-4de9-8ea0-7a35e7d4086f]',
            x16: '[WS - Divert me]',
            x17: '[News]',
          };

          expect(parsedATIURLParams).toEqual(expectedATIURLParams);
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
          isUK: false,
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
          const result = getATIParams({
            atiData: cpsCSPAtiData,
            requestContext,
            serviceContext: { ...serviceContext, service: 'news' },
          });
          expect(result).toStrictEqual(validPageURLParams);
        });

        it('should use the serviceContext lang property if language is absent in atiData', () => {
          const result = getATIParams({
            atiData: { ...cpsCSPAtiData, language: null },
            requestContext,
            serviceContext: {
              ...serviceContext,
              service: 'news',
              lang: 'en-gb',
            },
          });
          expect(result).toEqual(validPageURLParams);
        });

        it('should use the serviceContext atiAnalyticsProducerId property if producerId is absent in atiData', () => {
          const result = getATIParams({
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
          const result = getATIParams({
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

        it('should return the correct url for a page given the ATI configuration', () => {
          const url = getATIPageViewParams({
            atiData: cpsCSPAtiData,
            requestContext,
            serviceContext,
          });

          const parsedATIURLParams = Object.fromEntries(
            new URLSearchParams(url as string),
          );

          const expectedATIURLParams = {
            hl: '00-00-00',
            lng: 'en-US',
            p: 'technology::news.technology.correspondent_story.56294493.page',
            r: '0x0x24x24',
            re: '1024x768',
            ref: 'https://www.example.com',
            s: '598285',
            s2: '64',
            x1: '[urn:bbc:cps:curie:asset:c1c8b1bf-4c9c-44e8-be0d-c81a2aa59e46]',
            x2: '[responsive]',
            x3: '[atiAnalyticsAppName]',
            x4: '[en-gb]',
            x5: '[http%3A%2F%2Flocalhost%2F]',
            x6: '[https%3A%2F%2Fwww.example.com]',
            x7: '[article-correspondent]',
            x8: '[simorgh]',
            x9: "[Tech%20Tent:%20The%20new%20'space%20race'%20for%20computer%20chips]",
            x11: '[2021-03-05T13:37:50.000Z]',
            x12: '[2021-03-05T13:37:50.000Z]',
            x13: '[Intel~Technology+of+business~Business~Technology~Car+industry~China~Taiwan~Computer+chip~Semiconductors]',
            x14: '[0d358111-576d-4d61-a7c7-e2e71931b579~2c493367-e5a2-4c19-be5f-6e9342f5c591~2f2db234-3c2d-40a4-b4ac-eea661faadd0~31684f19-84d6-41f6-b033-7ae08098572a~65ba56b4-3f50-4217-ab8e-b3c1fe890364~6892384e-1966-4c03-9ce3-f694a8f9f69e~7a48b6e0-9074-4303-ae82-011003058e16~b054a2d3-6c1e-44de-b8db-0e2501c035c0~f7bf39da-286c-4e37-8ee0-a01395f09ac2]',
            x17: '[News]',
          };

          expect(parsedATIURLParams).toEqual(expectedATIURLParams);
        });
      });
    });
  });

  describe('buildATIPageViewParams', () => {
    const windowLocation = window.location;

    beforeEach(() => {
      analyticsUtilFunctions.push(marketingCampaignFunc);
      analyticsUtilFunctions.push(rssMarketingStringFunc);
      analyticsUtilFunctions.forEach(func => {
        mockAndSet(func, null);
      });
      mockAndSet(rssMarketingStringFunc, []);
    });

    afterEach(() => {
      jest.resetAllMocks();

      resetWindowValue('location', windowLocation);
    });

    it('should not add empty or null values', () => {
      expect(buildATIPageViewParams({})).toEqual('');
    });

    it.each`
      props | currentUrl | expectedValues
      ${{
  appName: 'appName',
  contentId: 'contentId',
  contentType: 'contentType',
  language: 'language',
  ldpThingIds: 'ldpThingIds',
  ldpThingLabels: 'ldpThingLabels',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  platform: 'platform',
  producerId: 'producerId',
  timePublished: 'timePublished',
  timeUpdated: 'timeUpdated',
}} | ${'https://www.bbc.com/mundo'} | ${['s2=producerId', 'p=pageIdentifier', 'x1=[contentId]', 'x3=[appName]', 'x4=[language]', 'x7=[contentType]', 'x11=[timePublished]', 'x12=[timeUpdated]', 'x13=[ldpThingLabels]', 'x14=[ldpThingIds]', 'xto=SEC------']}
      ${{
  appName: 'appName',
  contentId: 'contentId',
  contentType: 'contentType',
  language: 'language',
  ldpThingIds: 'ldpThingIds',
  ldpThingLabels: 'ldpThingLabels',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  platform: 'platform',
  producerId: 'producerId',
  timePublished: 'timePublished',
  timeUpdated: 'timeUpdated',
}} | ${'https://www.bbcnewsd73hkzno2ini43t4gblxvycyac5aw4gnv7t2rccijh7745uqd.onion/news'} | ${['s2=producerId', 'p=pageIdentifier', 'x1=[contentId]', 'x3=[appName]', 'x4=[language]', 'x7=[contentType]', 'x11=[timePublished]', 'x12=[timeUpdated]', 'x13=[ldpThingLabels]', 'x14=[ldpThingIds]', 'xto=SEC------', 'product_platform=tor-bbc']}
      ${{
  appName: 'appName',
  contentId: 'contentId',
  contentType: 'contentType',
  language: 'language',
  ldpThingIds: 'ldpThingIds',
  ldpThingLabels: 'ldpThingLabels',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  platform: 'platform',
  producerId: 'producerId',
  timePublished: 'timePublished',
  timeUpdated: 'timeUpdated',
  ampExperimentName: 'someAmpExperiment',
}} | ${'https://www.bbc.com/news'} | ${['s2=producerId', 'p=pageIdentifier', 'x1=[contentId]', 'x3=[appName]', 'x4=[language]', 'x7=[contentType]', 'x11=[timePublished]', 'x12=[timeUpdated]', 'x13=[ldpThingLabels]', 'x14=[ldpThingIds]', 'xto=SEC------', 'mv_test=someAmpExperiment', 'mv_creation=VARIANT(someAmpExperiment)']}
    `(
      'should take in optional props for $currentUrl and add them as correct query params',
      ({ props, currentUrl, expectedValues }) => {
        mockAndSet(marketingCampaignFunc, 'sl');
        // @ts-expect-error required for testing purposes
        delete window.location;

        // @ts-expect-error required for testing purposes
        window.location = new URL(currentUrl);

        const queryParams = buildATIPageViewParams(props);
        const queryParamsArray = splitUrl(queryParams);
        expect(queryParamsArray).toHaveLength(expectedValues.length);
        expectedValues.forEach((value: string) =>
          expect(queryParamsArray).toContain(value),
        );
      },
    );

    it('should call RSS marketing string function', () => {
      mockAndSet(marketingCampaignFunc, 'RSS');
      mockAndSet(rssMarketingStringFunc, [
        {
          key: 'src_medium',
          description: 'rss campaign prefix',
          value: 'RSS',
          wrap: false,
        },
      ]);

      const queryParams = buildATIPageViewParams({});

      const queryParamsArray = splitUrl(queryParams);
      const expectedValues = ['src_medium=RSS'];

      expectedValues.forEach(value =>
        expect(queryParamsArray).toContain(value),
      );
    });

    it('should call relevant functions', () => {
      analyticsUtilFunctions.forEach(func => {
        mockAndSet(func, func.name);
      });

      mockAndSet(marketingCampaignFunc, 'email');

      const queryParams = buildATIPageViewParams({
        pageTitle: 'pageTitle',
        // @ts-expect-error - required for testing purposes
        platform: 'platform',
        statsDestination: 'statsDestination',
      });

      const queryParamsArray = splitUrl(queryParams);

      expect(queryParamsArray).toEqual([
        's=getDestination',
        'idclient=getAtUserId',
        'r=getScreenInfo',
        're=getBrowserViewPort',
        'hl=getCurrentTime',
        'lng=getDeviceLanguage',
        'x2=[getAppType]',
        'x5=[getHref]',
        'x6=[getReferrer]',
        'x9=[sanitise]',
        'x18=[isLocServeCookieSet]',
        'xto=-----%40',
        'ref=getReferrer',
      ]);
    });

    it('should build query params for .app routes', () => {
      analyticsUtilFunctions.forEach(func => {
        mockAndSet(func, func.name);
      });

      mockAndSet(marketingCampaignFunc, 'email');

      const queryParams = buildATIPageViewParams({
        pageTitle: 'pageTitle',
        platform: 'app',
        statsDestination: 'statsDestination',
        appName: 'news',
      });

      const queryParamsArray = splitUrl(queryParams);

      expect(queryParamsArray).toEqual([
        's=getDestination',
        'idclient=getAtUserId',
        'r=getScreenInfo',
        're=getBrowserViewPort',
        'hl=getCurrentTime',
        'lng=getDeviceLanguage',
        'x2=[getAppType]',
        'x3=[news-app]',
        'x5=[getHref]',
        'x6=[getReferrer]',
        'x9=[sanitise]',
        'x18=[isLocServeCookieSet]',
        'xto=-----%40',
        'ref=getReferrer',
      ]);
    });

    it('if ref param is provided, it should be the very last param so that ATI can interpret it correctly as part of the referrer URL', () => {
      analyticsUtilFunctions.forEach(func => {
        mockAndSet(func, func.name);
      });

      const lastParam = splitUrl(
        buildATIPageViewParams({
          appName: 'appName',
          contentId: 'contentId',
          contentType: 'contentType',
          language: 'language',
          ldpThingIds: 'ldpThingIds',
          ldpThingLabels: 'ldpThingLabels',
          pageIdentifier: 'pageIdentifier',
          pageTitle: 'pageTitle',
          // @ts-expect-error - required for testing purposes
          platform: 'platform',
          producerId: 'producerId',
          timePublished: 'timePublished',
          timeUpdated: 'timeUpdated',
        }),
      ).pop();

      expect(lastParam).toEqual('ref=getReferrer');
    });
  });

  describe('Reverb', () => {
    describe('buildReverbAnalyticsModel', () => {
      beforeEach(() => {
        analyticsUtilFunctions.forEach(func => {
          mockAndSet(func, func.name);
        });
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      const input = {
        appName: 'news',
        campaigns: [
          {
            campaignId: '1',
            campaignName: 'campaign1',
          },
          {
            campaignId: '2',
            campaignName: 'campaign2',
          },
        ],
        categoryName: 'categoryName',
        contentId: 'contentId',
        contentType: 'contentType',
        language: 'language',
        ldpThingIds: 'ldpThingIds',
        ldpThingLabels: 'ldpThingLabels',
        libraryVersion: 'libraryVersion',
        pageIdentifier: 'pageIdentifier',
        pageTitle: 'pageTitle',
        platform: 'canonical' as Platforms,
        producerName: 'producerName',
        nationsProducer: '',
        statsDestination: 'statsDestination',
        timePublished: 'timePublished',
        timeUpdated: 'timeUpdated',
      };

      it('should return the correct Reverb page view model', () => {
        const reverbPageViewModel = buildReverbPageViewModel(input);

        const pageParams = {
          contentId: 'contentId',
          contentType: 'contentType',
          destination: 'statsDestination',
          name: 'pageIdentifier',
          producer: 'producerName',
          additionalProperties: {
            app_name: 'news',
            app_type: 'getAppType',
            content_language: 'language',
            product_platform: null,
            referrer_url: 'getReferrer',
            x5: 'getHref',
            x8: 'libraryVersion',
            x9: 'sanitise',
            x10: '',
            x11: 'timePublished',
            x12: 'timeUpdated',
            x13: 'ldpThingLabels',
            x14: 'ldpThingIds',
            x16: 'campaign1~campaign2',
            x17: 'categoryName',
            x18: 'isLocServeCookieSet',
          },
        };
        const userParams = { isSignedIn: false };

        expect(reverbPageViewModel.params.page).toEqual(pageParams);
        expect(reverbPageViewModel.params.user).toEqual(userParams);

        expect(reverbPageViewModel.eventDetails).toEqual({
          eventName: 'pageView',
        });
      });
    });

    describe('buildReverbComponentTrackingModel', () => {
      const input = {
        pageIdentifier: 'mundo.page',
        producerName: 'MUNDO',
        statsDestination: 'statsDestination',
        componentName: 'top-stories',
        campaignID: '1234',
        format: 'format',
        type: 'view',
        advertiserID: 'advertiserID',
        url: 'http://localhost',
      };

      it('should return the correct Reverb component view tracking model', () => {
        const reverbComponentTrackingModel =
          buildReverbComponentTrackingModel(input);

        const pageParams = {
          destination: 'statsDestination',
          name: 'mundo.page',
          producer: 'MUNDO',
          additionalProperties: {
            type: 'AT',
          },
        };

        expect(reverbComponentTrackingModel.params.page).toEqual(pageParams);
      });

      it('should return the correct event details for the Reverb component view tracking model', () => {
        const reverbComponentViewTrackingModel =
          buildReverbComponentTrackingModel(input);

        expect(reverbComponentViewTrackingModel.eventDetails).toEqual({
          eventName: 'sectionView',
          eventPublisher: 'impression',
          componentName: 'top-stories',
          container: '1234',
          attribute: 'top-stories',
          metadata: 'format',
          placement: 'mundo.page',
          source: 'advertiserID',
          result: 'http://localhost',
          isClick: false,
        });
      });

      it('should return the correct Reverb component click tracking model', () => {
        const reverbComponentClickTrackingModel =
          buildReverbComponentTrackingModel({
            ...input,
            type: 'click',
          });

        const pageParams = {
          destination: 'statsDestination',
          name: 'mundo.page',
          producer: 'MUNDO',
          additionalProperties: {
            type: 'AT',
          },
        };

        expect(reverbComponentClickTrackingModel.params.page).toEqual(
          pageParams,
        );
      });

      it('should return the correct event details for the Reverb component click tracking model', () => {
        const reverbComponentClickTrackingModel =
          buildReverbComponentTrackingModel({
            ...input,
            type: 'click',
          });

        expect(reverbComponentClickTrackingModel.eventDetails).toEqual({
          eventName: 'sectionClick',
          eventPublisher: 'click',
          componentName: 'top-stories',
          container: '1234',
          attribute: 'top-stories',
          metadata: 'format',
          placement: 'mundo.page',
          source: 'advertiserID',
          result: 'http://localhost',
          isClick: true,
        });
      });

      it('should return the correct Reverb user object configuration', () => {
        const reverbComponentTrackingModel =
          buildReverbComponentTrackingModel(input);

        expect(reverbComponentTrackingModel.params.user).toEqual({
          isSignedIn: false,
        });
      });
    });
  });
});

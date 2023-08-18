/* eslint-disable no-console */
import * as analyticsUtils from '../../../lib/analyticsUtils';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  MEDIA_ARTICLE_PAGE,
  HOME_PAGE,
  ERROR_PAGE,
  LIVE_PAGE,
} from '../../../routes/utils/pageTypes';
import { buildATIUrl, buildATIEventTrackingParams } from '.';
import * as buildPageATIFunctionImports from './genericPage/buildParams';
import { RequestContextProps } from '../../../contexts/RequestContext';
import { ServiceConfig } from '../../../models/types/serviceConfig';
import { ATIData, PageData } from '../types';

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
  isUK: false,
  statsDestination: 'statsDestination',
  previousPath: 'http://www.example.com',
  origin: 'origin',
  canonicalLink: 'https://www.bbc.com/pidgin/51536047',
};

// @ts-expect-error - only partial data required for testing purposes
const serviceContext: ServiceConfig = {
  atiAnalyticsAppName: 'atiAnalyticsAppName',
  atiAnalyticsProducerId: 'atiAnalyticsProducerId',
  service: 'pidgin',
  brandName: 'brandName',
  lang: 'pcm',
};

const article: PageData = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page',
      contentId: 'urn:bbc:optimo:asset:54321',
      nations_producer: 'scotland',
    },
    locators: {
      optimoUrn: 'http://www.bbc.co.uk',
    },
    passport: {
      language: 'language',
    },
    tags: {
      about: [
        {
          thingId: 'thing id 1',
          thingLabel: 'thing label 1',
          thingEnglishLabel: 'thing english label 1',
        },
        {
          thingId: 'thing id 2',
          thingLabel: 'thing label 2',
          thingEnglishLabel: 'thing english label 2',
        },
      ],
    },
    title: 'title',
  },
  promo: {
    headlines: {
      seoHeadline: 'pageTitle',
    },
  },
};

const frontPage: PageData = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page',
    },
    locators: {
      curie:
        'http://www.bbc.co.uk/asset/00000000-0000-0000-0000-000000000000/desktop/domestic',
    },
    language: 'language',
    title: 'title',
  },
};

const media: PageData = {
  id: 'id',
  language: 'language',
  pageIdentifier: 'pageIdentifier',
  pageTitle: 'pageTitle',
  contentType: 'player-live',
};

const idxPage: PageData = {
  metadata: {
    analyticsLabels: {
      counterName: 'service.page.idxpage',
    },
    locators: {
      curie:
        'http://www.bbc.co.uk/asset/00000000-0000-0000-0000-000000000000/desktop/domestic',
    },
    language: 'language',
    title: 'title',
  },
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

describe('ATIAnalytics params', () => {
  describe('buildATIUrl', () => {
    it('should return the correct article url', () => {
      const url = buildATIUrl({
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
        x6: '[originhttp%3A%2F%2Fwww.example.com]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[Aminat%20Yusuf:%20Tips%20to%20pass%20exam%20-%20Overall%20LASU%20best%20graduate%20drop%20update]',
        x10: '[scotland]',
        x11: '[2023-07-19T15:57:54.500Z]',
        x12: '[2023-07-19T15:57:54.500Z]',
        x13: '[Nigeria~Education~Lagos%20state~Women]',
        x14: '[3d5d5e30-dd50-4041-96d5-c970b20005b9~6942cb29-9d3f-4c9c-9806-0a0578c286d6~d651d520-a675-4911-8832-1596f257000b~e45cb5f8-3c87-4ebd-ac1c-058e9be22862]',
        x17: '[Nigeria~Education~Lagos%20state~Women]',
        ref: 'originhttp://www.example.com',
      };

      expect(parsedATIURLParams).toEqual(expectedATIURLParams);
    });

    it('should return the correct media article url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: MEDIA_ARTICLE_PAGE },
        data: article,
        serviceContext,
      });

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      expect(parsedATIParams).toEqual({
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'pidgin.articles.//www.bbc.co.uk.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:optimo:asset:54321]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[language]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[originhttp%3A%2F%2Fwww.example.com]',
        x7: '[article-sfv]',
        x8: '[simorgh]',
        x9: '[pageTitle]',
        x10: '[scotland]',
        x11: '[1970-01-01T00:00:00.000Z]',
        x12: '[1970-01-01T00:00:00.000Z]',
        x13: '[thing%20english%20label%201~thing%20english%20label%202]',
        x14: '[thing%20id%201~thing%20id%202]',
        x17: '[thing%20english%20label%201~thing%20english%20label%202]',
        ref: 'originhttp://www.example.com',
      });
    });

    it('should return the correct frontPage url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: FRONT_PAGE },
        data: frontPage,
        serviceContext,
      });

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      expect(parsedATIParams).toEqual({
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'service.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:cps:00000000-0000-0000-0000-000000000000]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[language]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[index-home]',
        x8: '[simorgh]',
        x9: '[title%20-%20brandName]',
        x11: '[1970-01-01T00:00:00.000Z]',
        x12: '[1970-01-01T00:00:00.000Z]',
      });
    });

    it('should return the correct IDX page url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: INDEX_PAGE },
        data: idxPage,
        serviceContext,
      });

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      expect(parsedATIParams).toEqual({
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'service.page.idxpage',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:cps:00000000-0000-0000-0000-000000000000]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[language]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[index-section]',
        x8: '[simorgh]',
        x9: '[title%20-%20brandName]',
        x11: '[1970-01-01T00:00:00.000Z]',
        x12: '[1970-01-01T00:00:00.000Z]',
      });
    });

    it('should return the correct media url', () => {
      const url = buildATIUrl({
        requestContext: { ...requestContext, pageType: MEDIA_PAGE },
        data: media,
        serviceContext,
      });

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(url as string),
      );

      expect(parsedATIParams).toEqual({
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        p: 'pageIdentifier',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[id]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[language]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[player-live]',
        x8: '[simorgh]',
        x9: '[pageTitle]',
      });
    });

    it('should return the correct MAP url', () => {
      const url = buildATIUrl({
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
        ref: 'originhttp://www.example.com',
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        x1: '[urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[es]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[originhttp%3A%2F%2Fwww.example.com]',
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
      const url = buildATIUrl({
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
        ref: 'originhttp://www.example.com',
        s: '598285',
        s2: 'atiAnalyticsProducerId',
        x1: '[urn:bbc:cps:curie:asset:08e22e90-7361-cd47-b586-7cb53fc5a012]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[es]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[originhttp%3A%2F%2Fwww.example.com]',
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
      const url = buildATIUrl({
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
        ref: 'originhttp://www.example.com',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:tipo:topic:cm7682qz7v1t]',
        x2: '[responsive]',
        x3: '[atiAnalyticsAppName]',
        x4: '[pcm]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x6: '[originhttp%3A%2F%2Fwww.example.com]',
        x7: '[index-home]',
        x8: '[simorgh]',
        x9: '[pageTitle]',
      });
    });

    it('should have both ref parameter and x6 referrer url parameter, if referrer url exists', () => {
      const atiUrl = buildATIUrl({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        serviceContext,
        atiData: articlePageAnalyticsData,
      }) as string;

      const params = Object.fromEntries(new URLSearchParams(atiUrl));

      expect(params.x6).toBe('[originhttp%3A%2F%2Fwww.example.com]');
      expect(params.ref).toBe('originhttp://www.example.com');
    });

    it('should have ref parameter as the last parameter, if referrer url exists', () => {
      const atiUrl = buildATIUrl({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        serviceContext,
        atiData: articlePageAnalyticsData,
      }) as string;
      const params = atiUrl.split('&');

      expect(params.pop()).toEqual('ref=originhttp://www.example.com');
    });

    it('should not have ref and x6 parameters, if referrer url does not exist', () => {
      const atiUrl = buildATIUrl({
        requestContext: {
          ...requestContext,
          pageType: ARTICLE_PAGE,
          previousPath: '',
        },
        serviceContext,
        atiData: articlePageAnalyticsData,
      }) as string;
      const params = atiUrl.split('&');

      expect(params).not.toContain('x6=');
      expect(params).not.toContain('ref=');
    });

    describe('buildPageATIUrl invocation', () => {
      let buildPageATIUrlSpy: jest.SpyInstance;

      beforeEach(() => {
        buildPageATIUrlSpy = jest.spyOn(
          buildPageATIFunctionImports,
          'buildPageATIUrl',
        );

        jest.clearAllMocks();
      });

      it('should invoke buildPageATIUrl for supported page types', () => {
        buildATIUrl({
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

      it('should not invoke buildPageATIUrl for an unsupported page types', () => {
        buildATIUrl({
          requestContext: { ...requestContext, pageType: MEDIA_PAGE },
          atiData: homePageAnalyticsData,
          serviceContext,
        });

        expect(buildPageATIUrlSpy).not.toHaveBeenCalled();
      });
    });

    it.each([HOME_PAGE, ERROR_PAGE, LIVE_PAGE])(
      'should return empty object {} because %s page type is not supported',
      pageType => {
        const url = buildATIUrl({
          requestContext: { ...requestContext, pageType },
          data: {},
          serviceContext,
        });
        expect(url).toStrictEqual({});
      },
    );
  });

  describe('buildATIEventTrackingParams', () => {
    it('should return the correct article params', () => {
      const params = buildATIEventTrackingParams({
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
        origin: 'origin',
        pageIdentifier: 'pidgin.articles.crgrx86em6yo.page',
        pageTitle:
          'Aminat Yusuf: Tips to pass exam - Overall LASU best graduate drop update',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        previousPath: 'http://www.example.com',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '2023-07-19T15:57:54.500Z',
        timeUpdated: '2023-07-19T15:57:54.500Z',
        nationsProducer: 'scotland',
      });
    });

    it('should return the correct media article params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: MEDIA_ARTICLE_PAGE },
        data: article,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:optimo:asset:54321',
        contentType: 'article-sfv',
        categoryName: 'thing%20english%20label%201~thing%20english%20label%202',
        isUK: false,
        language: 'language',
        ldpThingIds: 'thing%20id%201~thing%20id%202',
        ldpThingLabels:
          'thing%20english%20label%201~thing%20english%20label%202',
        origin: 'origin',
        pageIdentifier: 'pidgin.articles.//www.bbc.co.uk.page',
        pageTitle: 'pageTitle',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        previousPath: 'http://www.example.com',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: analyticsUtils.getPublishedDatetime(),
        timeUpdated: analyticsUtils.getPublishedDatetime(),
        nationsProducer: 'scotland',
      });
    });

    it('should return the correct frontPage params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: FRONT_PAGE },
        data: frontPage,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:cps:00000000-0000-0000-0000-000000000000',
        contentType: 'index-home',
        language: 'language',
        pageIdentifier: 'service.page',
        pageTitle: 'title - brandName',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });

    it('should return the correct IDX page params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: INDEX_PAGE },
        data: idxPage,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'urn:bbc:cps:00000000-0000-0000-0000-000000000000',
        contentType: 'index-section',
        language: 'language',
        pageIdentifier: 'service.page.idxpage',
        pageTitle: 'title - brandName',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '1970-01-01T00:00:00.000Z',
        timeUpdated: '1970-01-01T00:00:00.000Z',
      });
    });

    it('should return the correct media params', () => {
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: MEDIA_PAGE },
        data: media,
        serviceContext,
      });
      expect(params).toEqual({
        appName: 'atiAnalyticsAppName',
        contentId: 'id',
        contentType: 'player-live',
        language: 'language',
        pageIdentifier: 'pageIdentifier',
        pageTitle: 'pageTitle',
        libraryVersion: 'simorgh',
        platform: 'canonical',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
      });
    });

    it('should return the correct MAP params', () => {
      const params = buildATIEventTrackingParams({
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
        origin: 'origin',
        pageIdentifier: 'media::mundo.media.media_asset.41174775.page',
        pageTitle:
          '¿Qué es el albur en México y cómo puedes saber si te están "albureando"? - BBC News Mundo',
        platform: 'canonical',
        previousPath: 'http://www.example.com',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '2017-09-14T14:09:14.000Z',
        timeUpdated: '2017-09-14T14:09:14.000Z',
      });
    });

    it('should return the correct PGL params', () => {
      const params = buildATIEventTrackingParams({
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
        origin: 'origin',
        pageIdentifier: 'sport::mundo.sport.photo_gallery.36935058.page',
        pageTitle:
          'Río 2016, el antes y el ahora: cómo ha cambiado la ropa deportiva en más de un siglo de juegos olímpicos - BBC News Mundo',
        platform: 'canonical',
        previousPath: 'http://www.example.com',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: '2016-08-07T09:21:02.000Z',
        timeUpdated: '2016-08-07T09:21:02.000Z',
      });
    });

    it('should return the correct Homepage params', () => {
      const params = buildATIEventTrackingParams({
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
        origin: 'origin',
        pageIdentifier: 'kyrgyz.page',
        pageTitle: 'pageTitle',
        platform: 'canonical',
        previousPath: 'http://www.example.com',
        producerId: 'atiAnalyticsProducerId',
        service: 'pidgin',
        statsDestination: 'statsDestination',
        timePublished: undefined,
        timeUpdated: undefined,
      });
    });

    describe('buildPageATIParams invocation', () => {
      let buildPageATIParamsSpy: jest.SpyInstance;

      beforeEach(() => {
        buildPageATIParamsSpy = jest.spyOn(
          buildPageATIFunctionImports,
          'buildPageATIParams',
        );

        jest.clearAllMocks();
      });

      it('should invoke buildPageATIParams for supported page types', () => {
        buildATIEventTrackingParams({
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

      it('should not invoke buildPageATIParams for an unsupported page types', () => {
        buildATIEventTrackingParams({
          requestContext: { ...requestContext, pageType: MEDIA_PAGE },
          atiData: homePageAnalyticsData,
          serviceContext,
        });

        expect(buildPageATIParamsSpy).not.toHaveBeenCalled();
      });
    });

    it.each([ERROR_PAGE, HOME_PAGE, LIVE_PAGE])(
      'should return empty object {} because %s page type is not supported',
      pageType => {
        const params = buildATIEventTrackingParams({
          requestContext: { ...requestContext, pageType },
          data: {},
          serviceContext,
        });

        expect(params).toStrictEqual({});
      },
    );

    it('should not throw exception and return empty object if no pageData is passed in', () => {
      const { error } = console;
      console.error = jest.fn();

      const pageData = null;
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: MEDIA_PAGE },
        // @ts-expect-error - pass in null value to ensure error handling working as expected
        data: pageData,
        serviceContext,
      });

      expect(params).toEqual({});
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          'ATI Event Tracking Error: Could not parse tracking values from page data:',
        ),
      );
      console.error = error;
    });

    it('should not throw exception and return empty object if no atiData is passed in', () => {
      const { error } = console;
      console.error = jest.fn();

      const atiData = null;
      const params = buildATIEventTrackingParams({
        requestContext: { ...requestContext, pageType: MEDIA_PAGE },
        // @ts-expect-error - pass in null value to ensure error handling working as expected
        atiData,
        serviceContext,
      });

      expect(params).toEqual({});
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          'ATI Event Tracking Error: Could not parse tracking values from page data:',
        ),
      );
      console.error = error;
    });
  });
});

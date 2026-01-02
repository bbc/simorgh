/* eslint-disable no-console */
import {
  ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  MEDIA_ARTICLE_PAGE,
  HOME_PAGE,
} from '../../../routes/utils/pageTypes';
import buildReverbParams from '.';
import { RequestContextProps } from '../../../contexts/RequestContext';
import { ServiceConfig } from '../../../models/types/serviceConfig';
import { ATIData } from '../types';

jest
  .spyOn(document, 'referrer', 'get')
  .mockReturnValue('https://www.example.com');

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

describe('ATIAnalytics params', () => {
  describe('buildReverbParams', () => {
    it('should return the correct page view tracking params for an article page', () => {
      const params = buildReverbParams({
        requestContext: { ...requestContext, pageType: ARTICLE_PAGE },
        atiData: articlePageAnalyticsData,
        serviceContext,
      });

      expect(params).toEqual({
        params: {
          page: {
            contentId: 'urn:bbc:optimo:asset:crgrx86em6yo',
            contentType: 'article',
            destination: 'statsDestination',
            name: 'pidgin.articles.crgrx86em6yo.page',
            additionalProperties: {
              app_name: 'atiAnalyticsAppName',
              app_type: 'responsive',
              content_language: 'pcm',
              product_platform: null,
              referrer_url: 'https://www.example.com',
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: 'Aminat%20Yusuf:%20Tips%20to%20pass%20exam%20-%20Overall%20LASU%20best%20graduate%20drop%20update',
              x10: 'scotland',
              x11: '2023-07-19T15:57:54.500Z',
              x12: '2023-07-19T15:57:54.500Z',
              x13: 'Nigeria~Education~Lagos%20state~Women',
              x14: '3d5d5e30-dd50-4041-96d5-c970b20005b9~6942cb29-9d3f-4c9c-9806-0a0578c286d6~d651d520-a675-4911-8832-1596f257000b~e45cb5f8-3c87-4ebd-ac1c-058e9be22862',
              x16: '',
              x17: 'Nigeria~Education~Lagos%20state~Women',
              x18: false,
            },
          },
          user: {
            isSignedIn: false,
          },
        },
        eventDetails: {
          eventName: 'pageView',
        },
      });
    });

    it('should return the correct page view tracking params for a home page', () => {
      const params = buildReverbParams({
        requestContext: { ...requestContext, pageType: HOME_PAGE },
        atiData: homePageAnalyticsData,
        serviceContext,
      });

      expect(params).toEqual({
        params: {
          page: {
            contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
            contentType: 'index-home',
            destination: 'statsDestination',
            name: 'kyrgyz.page',
            additionalProperties: {
              app_name: 'atiAnalyticsAppName',
              app_type: 'responsive',
              content_language: 'pcm',
              product_platform: null,
              referrer_url: 'https://www.example.com',
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: 'pageTitle',
              x16: '',
              x18: false,
            },
          },
          user: {
            isSignedIn: false,
          },
        },
        eventDetails: {
          eventName: 'pageView',
        },
      });
    });

    it('should return the correct page view tracking params for a media article page', () => {
      const params = buildReverbParams({
        requestContext: { ...requestContext, pageType: MEDIA_ARTICLE_PAGE },
        atiData: mediaArticlePageAnalyticsData,
        serviceContext,
      });

      expect(params).toEqual({
        params: {
          page: {
            contentId: 'urn:bbc:optimo:asset:c4nrpd0d4nro',
            contentType: 'article-sfv',
            destination: 'statsDestination',
            name: 'hausa.articles.c4nrpd0d4nro.page',
            additionalProperties: {
              app_name: 'atiAnalyticsAppName',
              app_type: 'responsive',
              content_language: 'ha',
              product_platform: null,
              referrer_url: 'https://www.example.com',
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: 'Kalli%20yadda%20ambaliya%20ta%20tagayyara%20wani%20yanki%20na%20Indiya',
              x10: null,
              x11: '2023-07-11T17:42:48.771Z',
              x12: '2023-07-11T17:42:48.771Z',
              x13: 'Environment~Narendra+Modi~Nature~India~Severe+weather',
              x14: '0f37fb35-7f9e-4e49-b189-9d7f1d6fb11f~103fc7e4-3a8d-491c-9a75-3c37c299d48f~12e69b92-a7ba-4463-84e0-be107b9805d0~5a08f030-710f-4168-acee-67294a90fc75~9b16a6c2-7c16-42b7-bff7-6549579622e8',
              x16: '',
              x17: 'Environment~Narendra+Modi~Nature~India~Severe+weather',
              x18: false,
            },
          },
          user: {
            isSignedIn: false,
          },
        },
        eventDetails: {
          eventName: 'pageView',
        },
      });
    });

    it('should return the correct page view tracking params for a MAP page', () => {
      const params = buildReverbParams({
        requestContext: { ...requestContext, pageType: MEDIA_ASSET_PAGE },
        atiData: cpsMAPPageAnalyticsData,
        serviceContext,
      });

      expect(params).toEqual({
        params: {
          page: {
            contentId: 'urn:bbc:cps:4d36f80b-8711-0b4e-8da0-ef76ae8ac470',
            contentType: 'article-media-asset',
            destination: 'statsDestination',
            name: 'media::mundo.media.media_asset.41174775.page',
            additionalProperties: {
              app_name: 'atiAnalyticsAppName',
              app_type: 'responsive',
              content_language: 'es',
              product_platform: null,
              referrer_url: 'https://www.example.com',
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: '¿Qué%20es%20el%20albur%20en%20México%20y%20cómo%20puedes%20saber%20si%20te%20están%20"albureando"?%20-%20BBC%20News%20Mundo',
              x11: '2017-09-14T14:09:14.000Z',
              x12: '2017-09-14T14:09:14.000Z',
              x13: 'Politics~Nicaragua~Latin+America',
              x14: '75612fa6-147c-4a43-97fa-fcf70d9cced3~7613abe4-1c05-4594-a5ec-3ccf6268b220~e0d04166-b92f-468e-9e68-d5f9330e6ae7',
              x16: 'WS - Update me',
              x17: 'News',
              x18: false,
            },
          },
          user: {
            isSignedIn: false,
          },
        },
        eventDetails: {
          eventName: 'pageView',
        },
      });
    });

    it('should return the correct page view tracking params for a PGL page', () => {
      const params = buildReverbParams({
        requestContext: { ...requestContext, pageType: PHOTO_GALLERY_PAGE },
        atiData: cpsPGLPageAnalyticsData,
        serviceContext,
      });

      expect(params).toEqual({
        params: {
          page: {
            contentId:
              'urn:bbc:cps:curie:asset:08e22e90-7361-cd47-b586-7cb53fc5a012',
            contentType: 'article-photo-gallery',
            destination: 'statsDestination',
            name: 'sport::mundo.sport.photo_gallery.36935058.page',
            additionalProperties: {
              app_name: 'atiAnalyticsAppName',
              app_type: 'responsive',
              content_language: 'es',
              product_platform: null,
              referrer_url: 'https://www.example.com',
              x5: 'http%3A%2F%2Flocalhost%2F',
              x8: 'simorgh',
              x9: 'Río%202016,%20el%20antes%20y%20el%20ahora:%20cómo%20ha%20cambiado%20la%20ropa%20deportiva%20en%20más%20de%20un%20siglo%20de%20juegos%20olímpicos%20-%20BBC%20News%20Mundo',
              x11: '2016-08-07T09:21:02.000Z',
              x12: '2016-08-07T09:21:02.000Z',
              x13: 'Technology',
              x14: '25844b6e-80b0-4de9-8ea0-7a35e7d4086f',
              x16: 'WS - Divert me',
              x17: 'News',
              x18: false,
            },
          },
          user: {
            isSignedIn: false,
          },
        },
        eventDetails: {
          eventName: 'pageView',
        },
      });
    });
  });
});

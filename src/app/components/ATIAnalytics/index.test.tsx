/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { articleDataNews } from '#pages/ArticlePage/fixtureData';
import { data as fixData } from '#data/afrique/cpsAssets/48465371.json';
import styUkrainianAssetData from '#data/ukrainian/cpsAssets/news-53561143.json';
import styUkrainianInRussianAssetData from '#data/ukrainian/cpsAssets/features-russian-53477115.json';
import * as analyticsUtils from '#lib/analyticsUtils';
import {
  setWindowValue,
  resetWindowValue,
} from '#psammead/psammead-test-helpers/src';
import styAssetData from './fixtures/storyPage.json';
import pglAssetData from './fixtures/photoGalleryPage.json';
import mapAssetData from './fixtures/mediaAssetPage.json';
import { render } from '../react-testing-library-with-providers';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ARTICLE_PAGE,
} from '../../routes/utils/pageTypes';
import ATIAnalytics from '.';
import * as amp from './amp';
import * as canonical from './canonical';

const { article: fixAssetData } = fixData;

(analyticsUtils.getAtUserId as jest.Mock) = jest.fn();
(analyticsUtils.getCurrentTime as jest.Mock) = jest
  .fn()
  .mockReturnValue('00-00-00');
(analyticsUtils.getPublishedDatetime as jest.Mock) = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

const defaultRenderProps = {
  bbcOrigin: 'https://www.test.bbc.co.uk',
  id: 'c0000000000o',
  isApp: false,
  statusCode: 200,
  pathname: '/pathname',
};

describe('ATI Analytics Container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('pageType article', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      const {
        metadata: { atiAnalytics },
      } = articleDataNews;

      render(<ATIAnalytics atiData={atiAnalytics} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: false,
        pageData: articleDataNews,
        pageType: ARTICLE_PAGE,
        service: 'news',
        isUK: true,
      });

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598286',
        s2: '64',
        p: 'news.articles.c0000000001o.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:optimo:c0000000001o]',
        x2: '[responsive]',
        x3: '[news]',
        x4: '[en-gb]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[Article%20Headline%20for%20SEO]',
        x11: '[2018-01-01T12:01:00.000Z]',
        x12: '[2018-01-01T14:00:00.000Z]',
        x13: '[Royal+Wedding+2018~Duchess+of+Sussex]',
        x14: '[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]',
        x17: '[Royal+Wedding+2018~Duchess+of+Sussex]',
      });
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');

      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      const {
        metadata: { atiAnalytics },
      } = articleDataNews;

      render(<ATIAnalytics atiData={atiAnalytics} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: true,
        pageData: articleDataNews,
        pageType: ARTICLE_PAGE,
        service: 'news',
      });

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598286, 598288)',
        s2: '64',
        p: 'news.articles.c0000000001o.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x1: '[urn:bbc:optimo:c0000000001o]',
        x2: '[amp]',
        x3: '[news]',
        x4: '[en-gb]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[Article%20Headline%20for%20SEO]',
        x11: '[2018-01-01T12:01:00.000Z]',
        x12: '[2018-01-01T14:00:00.000Z]',
        x13: '[Royal+Wedding+2018~Duchess+of+Sussex]',
        x14: '[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]',
        x17: '[Royal+Wedding+2018~Duchess+of+Sussex]',
        ref: '${documentReferrer}',
      });
    });
  });

  describe('pageType media article', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      const mediaArticleDataNews = {
        ...articleDataNews,
        metadata: {
          ...articleDataNews.metadata,
          atiAnalytics: {
            ...articleDataNews.metadata.atiAnalytics,
            contentType: 'article-sfv',
          },
          consumableAsSFV: true,
        },
      };

      render(
        <ATIAnalytics atiData={mediaArticleDataNews.metadata.atiAnalytics} />,
        {
          ...defaultRenderProps,
          isAmp: false,
          pageData: mediaArticleDataNews,
          pageType: MEDIA_ARTICLE_PAGE,
          service: 'news',
          isUK: true,
        },
      );

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598286',
        s2: '64',
        p: 'news.articles.c0000000001o.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:optimo:c0000000001o]',
        x2: '[responsive]',
        x3: '[news]',
        x4: '[en-gb]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[article-sfv]',
        x8: '[simorgh]',
        x9: '[Article%20Headline%20for%20SEO]',
        x11: '[2018-01-01T12:01:00.000Z]',
        x12: '[2018-01-01T14:00:00.000Z]',
        x13: '[Royal+Wedding+2018~Duchess+of+Sussex]',
        x14: '[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]',
        x17: '[Royal+Wedding+2018~Duchess+of+Sussex]',
      });
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');

      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      const mediaArticleDataNews = {
        ...articleDataNews,
        metadata: {
          ...articleDataNews.metadata,
          atiAnalytics: {
            ...articleDataNews.metadata.atiAnalytics,
            contentType: 'article-sfv',
          },
          consumableAsSFV: true,
        },
      };

      render(
        <ATIAnalytics atiData={mediaArticleDataNews.metadata.atiAnalytics} />,
        {
          ...defaultRenderProps,
          isAmp: true,
          pageData: mediaArticleDataNews,
          pageType: MEDIA_ARTICLE_PAGE,
          service: 'news',
        },
      );

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598286, 598288)',
        s2: '64',
        p: 'news.articles.c0000000001o.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x1: '[urn:bbc:optimo:c0000000001o]',
        x2: '[amp]',
        x3: '[news]',
        x4: '[en-gb]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[article-sfv]',
        x8: '[simorgh]',
        x9: '[Article%20Headline%20for%20SEO]',
        x11: '[2018-01-01T12:01:00.000Z]',
        x12: '[2018-01-01T14:00:00.000Z]',
        x13: '[Royal+Wedding+2018~Duchess+of+Sussex]',
        x14: '[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]',
        x17: '[Royal+Wedding+2018~Duchess+of+Sussex]',
        ref: '${documentReferrer}',
      });
    });
  });

  describe('pageType=frontPage', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      render(<ATIAnalytics data={articleDataNews} />, {
        ...defaultRenderProps,
        isAmp: false,
        pageData: articleDataNews,
        pageType: FRONT_PAGE,
        service: 'news',
        isUK: true,
      });

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598286',
        s2: '64',
        p: 'news.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x2: '[responsive]',
        x3: '[news]',
        x4: '[en-gb]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[index-home]',
        x8: '[simorgh]',
        x11: '[1970-01-01T00:00:00.000Z]',
        x12: '[1970-01-01T00:00:00.000Z]',
      });
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');

      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      render(<ATIAnalytics data={articleDataNews} />, {
        ...defaultRenderProps,
        isAmp: true,
        pageData: articleDataNews,
        pageType: FRONT_PAGE,
        service: 'news',
      });

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598286, 598288)',
        s2: '64',
        p: 'news.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x2: '[amp]',
        x3: '[news]',
        x4: '[en-gb]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[index-home]',
        x8: '[simorgh]',
        x11: '[1970-01-01T00:00:00.000Z]',
        x12: '[1970-01-01T00:00:00.000Z]',
        ref: '${documentReferrer}',
      });
    });
  });

  describe('pageType=MAP', () => {
    it('should call AmpATIAnalytics when platform is amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');

      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      const {
        metadata: { atiAnalytics },
      } = mapAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Pidgin`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: true,
        pageData: mapAssetData,
        pageType: MEDIA_ASSET_PAGE,
        service: 'pidgin',
      });

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '70',
        p: 'pidgin.media_asset.23248703.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x1: '[urn:bbc:cps:curie:asset:5679389a-3ea6-0b40-9de4-f4d33d6bcd9f]',
        x2: '[amp]',
        x3: '[news-pidgin]',
        x4: '[pcm]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[article-media-asset]',
        x8: '[simorgh]',
        x9: '[Simorgh:%20Media%20Pod%20Build%20First%20CPS%20Media%20Asset%20Page%20in%20Simorgh%20&%20<%20>%20-%20BBC%20News%20Pidgin]',
        x11: '[2019-09-13T15:31:44.000Z]',
        x12: '[2020-06-10T14:24:07.000Z]',
        x16: '[Inspire me~Give me perspective~Keep me on trend]',
        x17: '[Opinion]',
        ref: '${documentReferrer}',
      });
    });
  });

  describe('pageType=PGL', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      const {
        metadata: { atiAnalytics },
      } = pglAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Azərbaycanca`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: false,
        pageData: pglAssetData,
        pageType: PHOTO_GALLERY_PAGE,
        service: 'azeri',
      });

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '6',
        p: 'azerbaijan::azeri.azerbaijan.photo_gallery.44208474.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:cps:curie:asset:38229308-a0fb-654a-a274-19bec0414560]',
        x2: '[responsive]',
        x3: '[news-azeri]',
        x4: '[az]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[article-photo-gallery]',
        x8: '[simorgh]',
        x9: '[Azərbaycan%20Xalq%20Cümhuriyyəti%20-%20Fotolarda%20-%20BBC%20News%20Azərbaycanca]',
        x11: '[2018-05-27T08:34:15.000Z]',
        x12: '[2018-05-27T08:34:15.000Z]',
        x13: '[History~Azerbaijan~Society~Culture~Politics~Human+rights~Azerbaijan+Democratic+Republic+100th+anniversary~Caucasus~Law+and+order]',
        x14: '[03eb3674-6190-4cd7-8104-1a00991d67a3~0f8e45e2-6499-44b1-be1f-1a3dd81e8af7~5307a8d9-f620-40f5-92d4-f99c919a6ffa~6a73afa3-ea6b-45c1-80bb-49060b99f864~75612fa6-147c-4a43-97fa-fcf70d9cced3~8b04c2e8-5409-4e7d-9877-3ccaf04727af~9e6f8e15-894a-45cb-9db9-d8881e8e6ae2~a86bc15e-ccd0-4ea9-9903-df3d4575a176~d94f45db-bb47-4e7b-b1a2-5bc3e6afd0aa]',
        x17: '[News]',
      });
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');

      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      const {
        metadata: { atiAnalytics },
      } = pglAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Azərbaycanca`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: true,
        pageData: pglAssetData,
        pageType: PHOTO_GALLERY_PAGE,
        service: 'azeri',
      });

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '6',
        p: 'azerbaijan::azeri.azerbaijan.photo_gallery.44208474.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x1: '[urn:bbc:cps:curie:asset:38229308-a0fb-654a-a274-19bec0414560]',
        x2: '[amp]',
        x3: '[news-azeri]',
        x4: '[az]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[article-photo-gallery]',
        x8: '[simorgh]',
        x9: '[Azərbaycan%20Xalq%20Cümhuriyyəti%20-%20Fotolarda%20-%20BBC%20News%20Azərbaycanca]',
        x11: '[2018-05-27T08:34:15.000Z]',
        x12: '[2018-05-27T08:34:15.000Z]',
        x13: '[History~Azerbaijan~Society~Culture~Politics~Human+rights~Azerbaijan+Democratic+Republic+100th+anniversary~Caucasus~Law+and+order]',
        x14: '[03eb3674-6190-4cd7-8104-1a00991d67a3~0f8e45e2-6499-44b1-be1f-1a3dd81e8af7~5307a8d9-f620-40f5-92d4-f99c919a6ffa~6a73afa3-ea6b-45c1-80bb-49060b99f864~75612fa6-147c-4a43-97fa-fcf70d9cced3~8b04c2e8-5409-4e7d-9877-3ccaf04727af~9e6f8e15-894a-45cb-9db9-d8881e8e6ae2~a86bc15e-ccd0-4ea9-9903-df3d4575a176~d94f45db-bb47-4e7b-b1a2-5bc3e6afd0aa]',
        x17: '[News]',
        ref: '${documentReferrer}',
      });
    });
  });

  describe('pageType=STY', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      const {
        metadata: { atiAnalytics },
      } = styAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Mundo`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: false,
        pageData: styAssetData,
        pageType: STORY_PAGE,
        service: 'mundo',
      });

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '62',
        p: 'mundo.story.23263889.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:cps:curie:asset:f776ad93-e486-b14a-b5ea-55955dd0644f]',
        x2: '[responsive]',
        x3: '[news-mundo]',
        x4: '[es]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[WS%20STY%20TEST%20-%20Full%20Headline%20-%20BBC%20News%20Mundo]',
        x11: '[2020-02-03T15:58:27.000Z]',
        x12: '[2020-05-06T11:02:07.000Z]',
        x13: '[Life~Fake+news]',
        x14: '[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]',
        x16: '[Amuse me]',
        x17: '[News]',
      });
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      const {
        metadata: { atiAnalytics },
      } = styAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Mundo`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: true,
        pageData: styAssetData,
        pageType: STORY_PAGE,
        service: 'mundo',
      });

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '62',
        p: 'mundo.story.23263889.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x1: '[urn:bbc:cps:curie:asset:f776ad93-e486-b14a-b5ea-55955dd0644f]',
        x2: '[amp]',
        x3: '[news-mundo]',
        x4: '[es]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[WS%20STY%20TEST%20-%20Full%20Headline%20-%20BBC%20News%20Mundo]',
        x11: '[2020-02-03T15:58:27.000Z]',
        x12: '[2020-05-06T11:02:07.000Z]',
        x13: '[Life~Fake+news]',
        x14: '[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]',
        x16: '[Amuse me]',
        x17: '[News]',
        ref: '${documentReferrer}',
      });
    });

    it('should call AmpATIAnalytics when platform is Amp and pageType is CSP', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      const {
        metadata: { atiAnalytics },
      } = styAssetData;

      const atiData = {
        ...atiAnalytics,
        contentType: 'article-correspondent',
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Mundo`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: true,
        pageData: styAssetData,
        pageType: CORRESPONDENT_STORY_PAGE,
        service: 'mundo',
      });

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '62',
        p: 'mundo.story.23263889.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x1: '[urn:bbc:cps:curie:asset:f776ad93-e486-b14a-b5ea-55955dd0644f]',
        x2: '[amp]',
        x3: '[news-mundo]',
        x4: '[es]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[article-correspondent]',
        x8: '[simorgh]',
        x9: '[WS%20STY%20TEST%20-%20Full%20Headline%20-%20BBC%20News%20Mundo]',
        x11: '[2020-02-03T15:58:27.000Z]',
        x12: '[2020-05-06T11:02:07.000Z]',
        x13: '[Life~Fake+news]',
        x14: '[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]',
        x16: '[Amuse me]',
        x17: '[News]',
        ref: '${documentReferrer}',
      });
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Ukrainian on canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      const {
        metadata: { atiAnalytics },
      } = styUkrainianAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Україна`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData,
        isAmp: false,
        pageData: styUkrainianAssetData,
        pageType: STORY_PAGE,
        service: 'ukrainian',
      });

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '94',
        p: 'news::ukrainian.news.story.53561143.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:cps:curie:asset:9e539daf-1d79-4630-900c-7db33c4bf1ac]',
        x2: '[responsive]',
        x3: '[news-ukrainian]',
        x4: '[uk]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[Виробництво%20героїну%20зросло%20завдяки%20сонячним%20батареям.%20Погляд%20з%20Британії%20-%20BBC%20News%20Україна]',
        x11: '[2020-07-28T13:25:13.000Z]',
        x12: '[2020-07-28T13:25:13.000Z]',
        x13: '[Afghanistan~Drug+use~Drugs+trade~Ukraine]',
        x14: '[1a5696c5-07d0-4a08-8b54-41ad5cd534b6~37cd3473-7b24-44b0-84c1-bf3c4801df5e~4b4cca1c-d458-4310-819e-dd48572b12c4~ee8750ed-a7fb-453f-bfca-2aa8b3fb064c]',
        x16: '[WS - Educate me]',
        x17: '[News]',
      });
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Ukrainian on Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      const {
        metadata: { atiAnalytics },
      } = styUkrainianAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Україна`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData,
        isAmp: true,
        pageData: styUkrainianAssetData,
        pageType: STORY_PAGE,
        service: 'ukrainian',
      });

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '94',
        p: 'news::ukrainian.news.story.53561143.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x1: '[urn:bbc:cps:curie:asset:9e539daf-1d79-4630-900c-7db33c4bf1ac]',
        x2: '[amp]',
        x3: '[news-ukrainian]',
        x4: '[uk]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[Виробництво%20героїну%20зросло%20завдяки%20сонячним%20батареям.%20Погляд%20з%20Британії%20-%20BBC%20News%20Україна]',
        x11: '[2020-07-28T13:25:13.000Z]',
        x12: '[2020-07-28T13:25:13.000Z]',
        x13: '[Afghanistan~Drug+use~Drugs+trade~Ukraine]',
        x14: '[1a5696c5-07d0-4a08-8b54-41ad5cd534b6~37cd3473-7b24-44b0-84c1-bf3c4801df5e~4b4cca1c-d458-4310-819e-dd48572b12c4~ee8750ed-a7fb-453f-bfca-2aa8b3fb064c]',
        x16: '[WS - Educate me]',
        x17: '[News]',
        ref: '${documentReferrer}',
      });
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Russian on canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      const {
        metadata: { atiAnalytics },
      } = styUkrainianInRussianAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Україна`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData,
        isAmp: false,
        pageData: styUkrainianInRussianAssetData,
        pageType: STORY_PAGE,
        service: 'ukrainian',
      });

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '94',
        p: 'russian_features::ukrainian.russian_features.story.53477115.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:cps:curie:asset:307108d3-9bcc-4829-990c-4b42c1290258]',
        x2: '[responsive]',
        x3: '[news-ukrainian]',
        x4: '[ru]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[Карта%20новых%20районов%20Украины:%20кто%20и%20кого%20поглотил%20-%20BBC%20News%20Україна]',
        x11: '[2020-07-21T13:00:09.000Z]',
        x12: '[2020-07-21T13:00:09.000Z]',
        x13: '[Society~Politics~Ukraine]',
        x14: '[5307a8d9-f620-40f5-92d4-f99c919a6ffa~75612fa6-147c-4a43-97fa-fcf70d9cced3~ee8750ed-a7fb-453f-bfca-2aa8b3fb064c]',
        x16: '[WS - Update me]',
        x17: '[News]',
      });
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Russian on Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      const {
        metadata: { atiAnalytics },
      } = styUkrainianInRussianAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Україна`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData,
        isAmp: true,
        pageData: styUkrainianInRussianAssetData,
        pageType: STORY_PAGE,
        service: 'ukrainian',
      });

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '94',
        p: 'russian_features::ukrainian.russian_features.story.53477115.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x1: '[urn:bbc:cps:curie:asset:307108d3-9bcc-4829-990c-4b42c1290258]',
        x2: '[amp]',
        x3: '[news-ukrainian]',
        x4: '[ru]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[Карта%20новых%20районов%20Украины:%20кто%20и%20кого%20поглотил%20-%20BBC%20News%20Україна]',
        x11: '[2020-07-21T13:00:09.000Z]',
        x12: '[2020-07-21T13:00:09.000Z]',
        x13: '[Society~Politics~Ukraine]',
        x14: '[5307a8d9-f620-40f5-92d4-f99c919a6ffa~75612fa6-147c-4a43-97fa-fcf70d9cced3~ee8750ed-a7fb-453f-bfca-2aa8b3fb064c]',
        x16: '[WS - Update me]',
        x17: '[News]',
        ref: '${documentReferrer}',
      });
    });
  });

  describe('XTO Marketing string', () => {
    const windowLocation = window.location;
    afterEach(() => {
      resetWindowValue('location', windowLocation);
    });

    it('should include the xto marketing string for a valid campaign type', () => {
      setWindowValue('location', {
        href: 'https://localhost?at_medium=email&at_emailtype=acquisition&at_creation=my_creation',
      });
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      const {
        metadata: { atiAnalytics },
      } = styAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Mundo`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData,
        isAmp: false,
        pageData: styAssetData,
        pageType: STORY_PAGE,
        service: 'mundo',
      });

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '62',
        p: 'mundo.story.23263889.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:cps:curie:asset:f776ad93-e486-b14a-b5ea-55955dd0644f]',
        x2: '[responsive]',
        x3: '[news-mundo]',
        x4: '[es]',
        x5: '[https%3A%2F%2Flocalhost%3Fat_medium%3Demail%26at_emailtype%3Dacquisition%26at_creation%3Dmy_creation]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[WS%20STY%20TEST%20-%20Full%20Headline%20-%20BBC%20News%20Mundo]',
        x11: '[2020-02-03T15:58:27.000Z]',
        x12: '[2020-05-06T11:02:07.000Z]',
        x13: '[Life~Fake+news]',
        x14: '[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]',
        x16: '[Amuse me]',
        x17: '[News]',
        xto: 'EREC--[my_creation]---@',
      });
    });
    it('should not include the xto marketing string when a campaign type is not specified', () => {
      setWindowValue('location', {
        href: 'http://localhost?foo=bar',
      });
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      const {
        metadata: { atiAnalytics },
      } = styAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Mundo`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData,
        isAmp: false,
        pageData: styAssetData,
        pageType: STORY_PAGE,
        service: 'mundo',
      });

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '62',
        p: 'mundo.story.23263889.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:cps:curie:asset:f776ad93-e486-b14a-b5ea-55955dd0644f]',
        x2: '[responsive]',
        x3: '[news-mundo]',
        x4: '[es]',
        x5: '[http%3A%2F%2Flocalhost%3Ffoo%3Dbar]',
        x7: '[article]',
        x8: '[simorgh]',
        x9: '[WS%20STY%20TEST%20-%20Full%20Headline%20-%20BBC%20News%20Mundo]',
        x11: '[2020-02-03T15:58:27.000Z]',
        x12: '[2020-05-06T11:02:07.000Z]',
        x13: '[Life~Fake+news]',
        x14: '[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]',
        x16: '[Amuse me]',
        x17: '[News]',
      });
    });
  });
  describe('pageType=FIX', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      canonical.default = mockCanonical;

      const {
        metadata: { atiAnalytics },
      } = fixAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Afrique`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: false,
        pageData: fixAssetData,
        pageType: FEATURE_INDEX_PAGE,
        service: 'afrique',
      });

      const { pageviewParams } = mockCanonical.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '3',
        p: 'afrique.feature_index.48465371.page',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        x1: '[urn:bbc:cps:447a95b6-1c9f-e544-bf60-e23452e7fa71]',
        x2: '[responsive]',
        x3: '[news-afrique]',
        x4: '[fr]',
        x5: '[http%3A%2F%2Flocalhost%2F]',
        x7: '[index-section]',
        x8: '[simorgh]',
        x9: '[Tout%20savoir%20sur%20la%20CAN%202019%20-%20BBC%20News%20Afrique]',
        x11: '[2019-05-30T14:23:38.000Z]',
        x12: '[2019-07-19T12:46:18.000Z]',
      });
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
      amp.default = mockAmp;

      const {
        metadata: { atiAnalytics },
      } = fixAssetData;

      const atiData = {
        ...atiAnalytics,
        pageTitle: `${atiAnalytics.pageTitle} - BBC News Afrique`,
      };

      render(<ATIAnalytics atiData={atiData} />, {
        ...defaultRenderProps,
        atiData: atiAnalytics,
        isAmp: true,
        pageData: fixAssetData,
        pageType: FEATURE_INDEX_PAGE,
        service: 'afrique',
      });

      const { pageviewParams } = mockAmp.mock.calls[0][0];

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(pageviewParams),
      );

      expect(parsedATIParams).toEqual({
        s: '598343',
        s2: '3',
        p: 'afrique.feature_index.48465371.page',
        r: '${screenWidth}x${screenHeight}x${screenColorDepth}',
        re: '${availableScreenWidth}x${availableScreenHeight}',
        hl: '00-00-00',
        lng: '${browserLanguage}',
        x1: '[urn:bbc:cps:447a95b6-1c9f-e544-bf60-e23452e7fa71]',
        x2: '[amp]',
        x3: '[news-afrique]',
        x4: '[fr]',
        x5: '[${sourceUrl}]',
        x6: '[${documentReferrer}]',
        x7: '[index-section]',
        x8: '[simorgh]',
        x9: '[Tout%20savoir%20sur%20la%20CAN%202019%20-%20BBC%20News%20Afrique]',
        x11: '[2019-05-30T14:23:38.000Z]',
        x12: '[2019-07-19T12:46:18.000Z]',
        ref: '${documentReferrer}',
      });
    });
  });
});

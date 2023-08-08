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

describe('implementation of buildPageATIParams and buildPageATIUrl - Home Page', () => {
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

describe('implementation of buildPageATIParams and buildPageATIUrl - Article Page', () => {
  const articlePageAtiData = {
    categoryName: 'Refugees%20and%20asylum%20seekers~Myanmar~Military',
    contentId: 'urn:bbc:optimo:asset:c9wxnzvwp3mo',
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

describe('implementation of buildPageATIParams and buildPageATIUrl - Topic Page', () => {
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

import React from 'react';
import { render, act } from '@testing-library/react';
import { ComponentUsingContext } from '#testHelpers/mockComponents';
import getOriginContext from '#contexts/RequestContext/getOriginContext';
import getStatsDestination from '#contexts/RequestContext/getStatsDestination';
import getStatsPageIdentifier from '#contexts/RequestContext/getStatsPageIdentifier';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  HOME_PAGE,
} from '#app/routes/utils/pageTypes';
import * as serviceContextImports from '../../../contexts/ServiceContext';
import * as requestContextImports from '../../../contexts/RequestContext';
import * as eventTrackingContextImports from '../../../contexts/EventTrackingContext';
import WithContexts from './withContexts';

jest.mock('#contexts/RequestContext/getOriginContext', () => jest.fn());

getOriginContext.mockImplementation(origin => ({
  isUK: true,
  origin,
}));

jest.mock('#contexts/RequestContext/getStatsDestination', () => jest.fn());

getStatsDestination.mockImplementation(() => 'NEWS_PS_TEST');

jest.mock('#contexts/RequestContext/getStatsPageIdentifier', () => jest.fn());

getStatsPageIdentifier.mockImplementation(
  () => 'news.articles.c0000000000o.page',
);

describe('withContexts HOC', () => {
  const Component = () => (
    <>
      <ComponentUsingContext context={serviceContextImports.ServiceContext} />
      <ComponentUsingContext context={requestContextImports.RequestContext} />
      <ComponentUsingContext context={ToggleContext} />
      <ComponentUsingContext context={UserContext} />
      <ComponentUsingContext
        context={eventTrackingContextImports.EventTrackingContext}
      />
    </>
  );

  const ContextsHOC = WithContexts(Component);

  const props = {
    bbcOrigin: 'https://www.bbc.com',
    id: 'c0000000000o',
    service: 'news',
    isAmp: true,
    isApp: false,
    pageType: ARTICLE_PAGE,
    pathname: '/pathname',
    status: 200,
    showAdsBasedOnLocation: true,
    toggles: {
      testToggle: {
        enabled: false,
      },
    },
    mvtExperiments: [{ experimentName: 'foo', variation: 'bar' }],
    isUK: true,
  };

  it('should return all context providers', async () => {
    let container;

    await act(
      // eslint-disable-next-line no-return-assign
      async () => ({ container } = render(<ContextsHOC {...props} />)),
    );

    expect(container).toMatchSnapshot();
  });

  describe('assertions', () => {
    let requestContextSpy;
    let serviceContextSpy;
    let eventTrackingContextSpy;
    beforeEach(() => {
      requestContextSpy = jest.spyOn(
        requestContextImports,
        'RequestContextProvider',
      );

      serviceContextSpy = jest.spyOn(
        serviceContextImports,
        'ServiceContextProvider',
      );

      eventTrackingContextSpy = jest.spyOn(
        eventTrackingContextImports,
        'EventTrackingContextProvider',
      );

      jest.clearAllMocks();
    });

    const pageTypes = [ARTICLE_PAGE, FRONT_PAGE, 'chicken'];

    pageTypes.forEach(pageType => {
      it(`passing pageType==${pageType} should pass along`, async () => {
        const fixture = {
          bbcOrigin: 'https://www.bbc.com',
          id: 'c0000000000o',
          service: 'news',
          isAmp: true,
          isApp: false,
          pageType,
          pathname: '/pathname',
          status: 200,
          showAdsBasedOnLocation: true,
          toggles: {
            testToggle: {
              enabled: false,
            },
          },
          mvtExperiments: [{ experimentName: 'foo', variation: 'bar' }],
        };
        await act(async () => render(<ContextsHOC {...fixture} />));
        expect(requestContextSpy).toHaveBeenCalled();
        expect(requestContextSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            pageType,
          }),
          {},
        );
        expect(serviceContextSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            variant: null,
          }),
          {},
        );
      });
    });

    it(`should pass variant to the service context provider`, async () => {
      const fixture = {
        bbcOrigin: 'https://www.bbc.com',
        id: 'c0000000000o',
        service: 'zhongwen',
        isAmp: true,
        isApp: false,
        pageType: ARTICLE_PAGE,
        pathname: '/pathname',
        variant: 'trad',
        status: 200,
        showAdsBasedOnLocation: true,
        toggles: {
          testToggle: {
            enabled: false,
          },
        },
        mvtExperiments: [{ experimentName: 'foo', variation: 'bar' }],
      };

      await act(async () => render(<ContextsHOC {...fixture} />));

      expect(serviceContextSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'trad',
        }),
        {},
      );
      expect(requestContextSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'trad',
        }),
        {},
      );
    });

    test.each([
      {
        pageType: HOME_PAGE,
        pageData: {
          metadata: {
            atiAnalytics: {
              contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
              contentType: 'index-home',
              pageIdentifier: 'kyrgyz.page',
              pageTitle: 'BBC News Кыргыз Кызматы',
            },
          },
        },
        componentProps: {
          atiData: {
            contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
            contentType: 'index-home',
            pageIdentifier: 'kyrgyz.page',
            pageTitle: 'BBC News Кыргыз Кызматы',
          },
          data: {
            metadata: {
              atiAnalytics: {
                contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
                contentType: 'index-home',
                pageIdentifier: 'kyrgyz.page',
                pageTitle: 'BBC News Кыргыз Кызматы',
              },
            },
          },
        },
      },
      {
        pageType: ARTICLE_PAGE,
        pageData: {
          metadata: {
            atiAnalytics: {
              contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
              contentType: 'index-home',
              pageIdentifier: 'kyrgyz.page',
              pageTitle: 'BBC News Кыргыз Кызматы',
            },
          },
        },
        componentProps: {
          atiData: {
            contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
            contentType: 'index-home',
            pageIdentifier: 'kyrgyz.page',
            pageTitle: 'BBC News Кыргыз Кызматы',
          },
          data: {
            metadata: {
              atiAnalytics: {
                contentId: 'urn:bbc:tipo:topic:cm7682qz7v1t',
                contentType: 'index-home',
                pageIdentifier: 'kyrgyz.page',
                pageTitle: 'BBC News Кыргыз Кызматы',
              },
            },
          },
        },
      },
      {
        pageType: HOME_PAGE,
        pageData: { metadata: {} },
        componentProps: {
          atiData: undefined,
          data: { metadata: {} },
        },
      },
      {
        pageType: ARTICLE_PAGE,
        pageData: { metadata: { foo: 'bar' } },
        componentProps: {
          atiData: undefined,
          data: { metadata: { foo: 'bar' } },
        },
      },
      {
        pageType: HOME_PAGE,
        pageData: { metadata: { foo: 'bar', atiAnalytics: {} } },
        componentProps: {
          atiData: {},
          data: { metadata: { foo: 'bar', atiAnalytics: {} } },
        },
      },
      {
        pageType: ARTICLE_PAGE,
        pageData: undefined,
        componentProps: {
          atiData: undefined,
          data: null,
        },
      },
      {
        pageType: HOME_PAGE,
        pageData: null,
        componentProps: {
          atiData: undefined,
          data: null,
        },
      },
    ])(
      'should pass data and atiData to the event tracking context provider',
      async ({ pageType, pageData, componentProps }) => {
        const fixture = {
          bbcOrigin: 'https://www.bbc.com',
          id: 'c0000000000o',
          service: 'kyrgyz',
          isAmp: true,
          isApp: false,
          pageData,
          pageType,
          pathname: '/pathname',
          status: 200,
          showAdsBasedOnLocation: true,
          toggles: {
            testToggle: {
              enabled: false,
            },
          },
          mvtExperiments: [{ experimentName: 'foo', variation: 'bar' }],
        };

        await act(async () => render(<ContextsHOC {...fixture} />));

        expect(eventTrackingContextSpy).toHaveBeenCalledWith(
          expect.objectContaining(componentProps),
          {},
        );
      },
    );
  });
});

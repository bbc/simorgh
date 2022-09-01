import React from 'react';
import { render } from '@testing-library/react';
import { ComponentUsingContext } from '#testHelpers/mockComponents';
import getOriginContext from '#contexts/RequestContext/getOriginContext';
import getStatsDestination from '#contexts/RequestContext/getStatsDestination';
import getStatsPageIdentifier from '#contexts/RequestContext/getStatsPageIdentifier';
import * as requestContextImports from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import { ARTICLE_PAGE, FRONT_PAGE } from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import * as serviceContextImports from '../../../contexts/ServiceContext';
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
    </>
  );

  const ContextsHOC = WithContexts(Component);

  const props = {
    bbcOrigin: 'https://www.bbc.com',
    id: 'c0000000000o',
    service: 'news',
    isAmp: true,
    pageType: ARTICLE_PAGE,
    pathname: '/pathname',
    status: 200,
    showAdsBasedOnLocation: true,
    toggles: {
      testToggle: {
        enabled: false,
      },
    },
  };

  shouldMatchSnapshot(
    `should return all context providers`,
    <ContextsHOC {...props} />,
  );

  describe('assertions', () => {
    let requestContextSpy;
    let serviceContextSpy;
    beforeEach(() => {
      requestContextSpy = jest.spyOn(
        requestContextImports,
        'RequestContextProvider',
      );

      serviceContextSpy = jest.spyOn(
        serviceContextImports,
        'ServiceContextProvider',
      );

      jest.clearAllMocks();
    });

    const pageTypes = [ARTICLE_PAGE, FRONT_PAGE, 'chicken'];

    pageTypes.forEach(pageType => {
      it(`passing pageType==${pageType} should pass along`, () => {
        const fixture = {
          bbcOrigin: 'https://www.bbc.com',
          id: 'c0000000000o',
          service: 'news',
          isAmp: true,
          pageType,
          pathname: '/pathname',
          status: 200,
          showAdsBasedOnLocation: true,
          toggles: {
            testToggle: {
              enabled: false,
            },
          },
        };
        render(<ContextsHOC {...fixture} />);
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

    it(`should pass variant to the service context provider`, () => {
      const fixture = {
        bbcOrigin: 'https://www.bbc.com',
        id: 'c0000000000o',
        service: 'zhongwen',
        isAmp: true,
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
      };

      render(<ContextsHOC {...fixture} />);

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
  });
});

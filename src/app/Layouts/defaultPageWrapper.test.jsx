import React from 'react';
import { render } from '@testing-library/react';
import DefaultPageWrapper from './defaultPageWrapper';
import { shouldShallowMatchSnapshot } from '../../testHelpers';
import getOriginContext from '../contexts/RequestContext/getOriginContext';
import getStatsDestination from '../contexts/RequestContext/getStatsDestination';
import getStatsPageIdentifier from '../contexts/RequestContext/getStatsPageIdentifier';
import * as requestContextImports from '../contexts/RequestContext';

jest.mock('../contexts/RequestContext/getOriginContext', () => jest.fn());

getOriginContext.mockImplementation(origin => ({
  isUK: true,
  origin,
}));

jest.mock('../contexts/RequestContext/getStatsDestination', () => jest.fn());

getStatsDestination.mockImplementation(() => 'NEWS_PS_TEST');

jest.mock('../contexts/RequestContext/getStatsPageIdentifier', () => jest.fn());

getStatsPageIdentifier.mockImplementation(
  () => 'news.articles.c0000000000o.page',
);

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    bbcOrigin: 'https://www.bbc.com',
    children: <h2>Child Element</h2>,
    id: 'c0000000000o',
    service: 'news',
    isAmp: true,
    pageType: 'article',
    data: { pageData: { metadata: { passport: { language: 'en-gb' } } } },
  };

  shouldShallowMatchSnapshot(
    'should render with children',
    <DefaultPageWrapper {...propsWithChildren} />,
  );

  describe('assertions', () => {
    let requestContextSpy;
    beforeEach(() => {
      requestContextSpy = jest.spyOn(
        requestContextImports,
        'RequestContextProvider',
      );
    });

    const pageTypes = ['article', 'frontPage', 'chicken'];

    pageTypes.forEach(pageType => {
      it(`passing pageType==${pageType} should pass along`, () => {
        const fixture = {
          bbcOrigin: 'https://www.bbc.com',
          id: 'c0000000000o',
          service: 'news',
          isAmp: true,
          pageType,
        };

        render(<DefaultPageWrapper {...fixture} />);

        expect(requestContextSpy).toHaveBeenCalled();
        expect(requestContextSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            pageType,
          }),
          {},
        );
      });
    });
  });
});

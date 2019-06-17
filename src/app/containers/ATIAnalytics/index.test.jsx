import React from 'react';
import { node, string } from 'prop-types';
import renderer from 'react-test-renderer';
import { isNull } from '../../../testHelpers';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

import ATIAnalytics from '.';
import * as amp from './amp';
import * as canonical from './canonical';
import * as articleatiparams from './ArticleAtiParams';

const ContextWrap = ({ platform, children }) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      isUK
      platform={platform}
      origin="https://www.test.bbc.co.uk"
      pageType="article"
      service="news"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o.page"
      articleData={{}}
    >
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

ContextWrap.propTypes = {
  children: node.isRequired,
  platform: string.isRequired,
};

const mockData = {};
const mockAtiQueryParams = 'key1=value1&key2=value2';

describe('Page View Analytics Container', () => {
  describe('pageType article', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      const mockArticleAtiParams = jest
        .fn()
        .mockReturnValue(mockAtiQueryParams);
      articleatiparams.default = mockArticleAtiParams;

      renderer.create(
        <ContextWrap platform="canonical">
          <ATIAnalytics data={mockData} pageType="article" />
        </ContextWrap>,
      );

      expect(mockCanonical).toHaveBeenCalledTimes(1);
      expect(mockCanonical).toHaveBeenCalledWith(
        {
          pageviewParams: mockAtiQueryParams,
        },
        mockData,
      );
      expect(mockArticleAtiParams).toHaveBeenCalledTimes(1);
      expect(mockArticleAtiParams).toHaveBeenCalledWith(mockData);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      const mockArticleAtiParams = jest
        .fn()
        .mockReturnValue(mockAtiQueryParams);
      articleatiparams.default = mockArticleAtiParams;

      renderer.create(
        <ContextWrap platform="amp">
          <ATIAnalytics data={mockData} pageType="article" />
        </ContextWrap>,
      );

      expect(mockAmp).toHaveBeenCalledTimes(1);
      expect(mockAmp).toHaveBeenCalledWith(
        {
          pageviewParams: mockAtiQueryParams,
        },
        mockData,
      );
      expect(mockArticleAtiParams).toHaveBeenCalledTimes(1);
      expect(mockArticleAtiParams).toHaveBeenCalledWith(mockData);
    });
  });
  describe('pageType not article', () => {
    isNull(
      'should render null',
      <ContextWrap platform="canonical">
        <ATIAnalytics data={mockData} pageType="randomvalue" />
      </ContextWrap>,
    );
  });
});

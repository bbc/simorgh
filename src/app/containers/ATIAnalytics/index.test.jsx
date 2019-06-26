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

const ContextWrap = ({ pageType, platform, children }) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      env="test"
      isUK
      platform={platform}
      origin="https://www.test.bbc.co.uk"
      pageType={pageType}
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
  pageType: string.isRequired,
  platform: string.isRequired,
};

const mockData = {};
const mockAtiQueryParams = 'key1=value1&key2=value2';

describe('ATI Analytics Container', () => {
  describe('pageType article', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      const mockArticleAtiParams = jest
        .fn()
        .mockReturnValue(mockAtiQueryParams);
      articleatiparams.default = mockArticleAtiParams;

      renderer.create(
        <ContextWrap platform="canonical" pageType="article">
          <ATIAnalytics data={mockData} />
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
        <ContextWrap platform="amp" pageType="article">
          <ATIAnalytics data={mockData} />
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
      <ContextWrap platform="canonical" pageType="randomvalue">
        <ATIAnalytics data={mockData} />
      </ContextWrap>,
    );
  });
});

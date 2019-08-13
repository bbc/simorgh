import React from 'react';
import { node, string } from 'prop-types';
import renderer from 'react-test-renderer';
import { isNull } from '../../../testHelpers';
import { articleDataNews } from '../Article/fixtureData';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

import ATIAnalytics from '.';
import * as amp from './amp';
import * as canonical from './canonical';
import * as articleatiparams from './params/article';
import * as frontpageatiparams from './params/frontpage';

const ContextWrap = ({ pageType, platform, children }) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={platform === 'amp'}
      pageType={pageType}
      service="news"
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

const mockAtiQueryParams = 'key1=value1&key2=value2';

describe('ATI Analytics Container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockCanonical).toHaveBeenCalledTimes(1);
      expect(mockCanonical.mock.calls[0][0]).toEqual({
        pageviewParams: mockAtiQueryParams,
      });

      expect(mockArticleAtiParams).toHaveBeenCalledTimes(1);
      expect(mockArticleAtiParams).toHaveBeenCalledWith(articleDataNews);
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
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockAmp).toHaveBeenCalledTimes(1);
      expect(mockAmp.mock.calls[0][0]).toEqual({
        pageviewParams: mockAtiQueryParams,
      });

      expect(mockArticleAtiParams).toHaveBeenCalledTimes(1);
      expect(mockArticleAtiParams).toHaveBeenCalledWith(articleDataNews);
    });
  });

  describe('pageType=frontPage', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      const mockFrontPageAtiParams = jest
        .fn()
        .mockReturnValue(mockAtiQueryParams);
      frontpageatiparams.default = mockFrontPageAtiParams;

      renderer.create(
        <ContextWrap platform="canonical" pageType="frontPage">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockCanonical).toHaveBeenCalledTimes(1);
      expect(mockCanonical.mock.calls[0][0]).toEqual({
        pageviewParams: mockAtiQueryParams,
      });

      expect(mockFrontPageAtiParams).toHaveBeenCalledTimes(1);
      expect(mockFrontPageAtiParams).toHaveBeenCalledWith(articleDataNews);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      const mockFrontPageAtiParams = jest
        .fn()
        .mockReturnValue(mockAtiQueryParams);
      frontpageatiparams.default = mockFrontPageAtiParams;

      renderer.create(
        <ContextWrap platform="amp" pageType="frontPage">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockAmp).toHaveBeenCalledTimes(1);
      expect(mockAmp.mock.calls[0][0]).toEqual({
        pageviewParams: mockAtiQueryParams,
      });

      expect(mockFrontPageAtiParams).toHaveBeenCalledTimes(1);
      expect(mockFrontPageAtiParams).toHaveBeenCalledWith(articleDataNews);
    });
  });

  describe('pageType neither article nor frontPage', () => {
    isNull(
      'should render null',
      <ContextWrap platform="canonical" pageType="media">
        <ATIAnalytics data={articleDataNews} />
      </ContextWrap>,
    );
  });
});

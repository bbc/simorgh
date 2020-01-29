import React from 'react';
import { node, string } from 'prop-types';
import { render } from '@testing-library/react';
import { isNull, suppressPropWarnings } from '@bbc/psammead-test-helpers';
import { articleDataNews } from '#pages/Article/fixtureData';
import mapAssetData from '#pages/CpsMap/fixtureData.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

import ATIAnalytics from '.';
import * as amp from './amp';
import * as canonical from './canonical';
import * as analyticsUtils from '#lib/analyticsUtils';

analyticsUtils.getAtUserId = jest.fn();
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');
analyticsUtils.getPublishedDatetime = jest
  .fn()
  .mockReturnValue('1970-01-01T00:00:00.000Z');

const ContextWrap = ({ pageType, platform, children }) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={platform === 'amp'}
      pageType={pageType}
      service="news"
      statusCode={200}
      pathname="/pathname"
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

describe('ATI Analytics Container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('pageType article', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const pageviewParams = [
        's=598286',
        's2=64',
        'p=news.articles.c0000000001o.page',
        'r=0x0x24x24',
        're=1024x768',
        'hl=00-00-00',
        'lng=en-US',
        'x1=[urn:bbc:optimo:c0000000001o]',
        'x2=[responsive]',
        'x3=[news]',
        'x4=[en-gb]',
        'x5=[http://localhost/]',
        'x7=[article]',
        'x8=[simorgh]',
        'x9=[Article+Headline+for+SEO]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
        'x13=[Royal+Wedding+2018~Duchess+of+Sussex]',
        'x14=[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]',
      ].join('&');
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="article">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toEqual({
        pageviewParams,
      });
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const pageviewParams = [
        's=598286',
        's2=64',
        'p=news.articles.c0000000001o.page',
        `r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}`,
        `re=\${availableScreenWidth}x\${availableScreenHeight}`,
        'hl=00-00-00',
        `lng=\${browserLanguage}`,
        'x1=[urn:bbc:optimo:c0000000001o]',
        'x2=[amp]',
        'x3=[news]',
        'x4=[en-gb]',
        `x5=[\${sourceUrl}]`,
        `x6=[\${documentReferrer}]`,
        'x7=[article]',
        'x8=[simorgh]',
        'x9=[Article+Headline+for+SEO]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
        'x13=[Royal+Wedding+2018~Duchess+of+Sussex]',
        'x14=[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]',
      ].join('&');

      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="article">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toEqual({
        pageviewParams,
      });
    });
  });

  describe('pageType=frontPage', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const pageviewParams = [
        's=598286',
        's2=64',
        'p=news.page',
        'r=0x0x24x24',
        're=1024x768',
        'hl=00-00-00',
        'lng=en-US',
        'x2=[responsive]',
        'x3=[news]',
        'x5=[http://localhost/]',
        'x7=[index-home]',
        'x8=[simorgh]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
      ].join('&');
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="frontPage">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toEqual({
        pageviewParams,
      });
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const pageviewParams = [
        's=598286',
        's2=64',
        'p=news.page',
        `r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}`,
        `re=\${availableScreenWidth}x\${availableScreenHeight}`,
        'hl=00-00-00',
        `lng=\${browserLanguage}`,
        'x2=[amp]',
        'x3=[news]',
        `x5=[\${sourceUrl}]`,
        `x6=[\${documentReferrer}]`,
        'x7=[index-home]',
        'x8=[simorgh]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
      ].join('&');
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="frontPage">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toEqual({
        pageviewParams,
      });
    });
  });

  describe('pageType=MAP', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const pageviewParams = [
        's=598286',
        's2=64',
        'p=media_asset::pidgin.media_asset.23248703.page',
        'r=0x0x24x24',
        're=1024x768',
        'hl=00-00-00',
        'lng=en-US',
        'x1=[urn:bbc:ares::asset:pidgin/23248703]',
        'x2=[responsive]',
        'x3=[news]',
        'x4=[pcm]',
        'x5=[http://localhost/]',
        'x7=[article-media-asset]',
        'x8=[simorgh]',
        'x9=[Simorgh:+Media+Pod+Build+First+CPS+Media+Asset+Page+in+Simorgh+with+the+Help+of+Drew+',
        '+<+>+-+BBC+News]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
        'x16=[Inspire%20me~Give%20me%20perspective~Keep%20me%20on%20trend]',
        'x17=[Opinion]',
      ].join('&');
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="MAP">
          <ATIAnalytics data={mapAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toEqual({
        pageviewParams,
      });
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const pageviewParams = [
        's=598286',
        's2=64',
        'p=media_asset::pidgin.media_asset.23248703.page',
        `r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}`,
        `re=\${availableScreenWidth}x\${availableScreenHeight}`,
        'hl=00-00-00',
        `lng=\${browserLanguage}`,
        'x1=[urn:bbc:ares::asset:pidgin/23248703]',
        'x2=[amp]',
        'x3=[news]',
        'x4=[pcm]',
        `x5=[\${sourceUrl}]`,
        `x6=[\${documentReferrer}]`,
        'x7=[article-media-asset]',
        'x8=[simorgh]',
        'x9=[Simorgh:+Media+Pod+Build+First+CPS+Media+Asset+Page+in+Simorgh+with+the+Help+of+Drew+',
        '+<+>+-+BBC+News]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
        'x16=[Inspire%20me~Give%20me%20perspective~Keep%20me%20on%20trend]',
        'x17=[Opinion]',
      ].join('&');
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="MAP">
          <ATIAnalytics data={mapAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toEqual({
        pageviewParams,
      });
    });
  });

  describe('pageType neither article nor frontPage', () => {
    suppressPropWarnings(['pageType', 'randomvalue']);
    isNull(
      'should render null',
      <ContextWrap platform="canonical" pageType="randomvalue">
        <ATIAnalytics data={articleDataNews} />
      </ContextWrap>,
    );
  });
});

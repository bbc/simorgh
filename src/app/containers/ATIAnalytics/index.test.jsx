import React from 'react';
import { node, string } from 'prop-types';
import { render } from '@testing-library/react';
import { isNull, suppressPropWarnings } from '@bbc/psammead-test-helpers';
import { articleDataNews } from '#pages/ArticlePage/fixtureData';
import mapAssetData from '#pages/MediaAssetPage/fixtureData.json';
import pglAssetData from '#pages/PhotoGalleryPage/fixtureData.json';
import styAssetData from '#pages/StoryPage/fixtureData/mundo.json';
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
        'x5=[http%3A%2F%2Flocalhost%2F]',
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
        `ref=\${documentReferrer}`,
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
        'x5=[http%3A%2F%2Flocalhost%2F]',
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
        `ref=\${documentReferrer}`,
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
        'p=pidgin.media_asset.23248703.page',
        'r=0x0x24x24',
        're=1024x768',
        'hl=00-00-00',
        'lng=en-US',
        'x1=[urn:bbc:cps:5679389a-3ea6-0b40-9de4-f4d33d6bcd9f]',
        'x2=[responsive]',
        'x3=[news]',
        'x4=[pcm]',
        'x5=[http%3A%2F%2Flocalhost%2F]',
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
        'p=pidgin.media_asset.23248703.page',
        `r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}`,
        `re=\${availableScreenWidth}x\${availableScreenHeight}`,
        'hl=00-00-00',
        `lng=\${browserLanguage}`,
        'x1=[urn:bbc:cps:5679389a-3ea6-0b40-9de4-f4d33d6bcd9f]',
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
        `ref=\${documentReferrer}`,
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

  describe('pageType=PGL', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const pageviewParams = [
        's=598286',
        's2=64',
        'p=azerbaijan::azeri.azerbaijan.photo_gallery.44208474.page',
        'r=0x0x24x24',
        're=1024x768',
        'hl=00-00-00',
        'lng=en-US',
        'x1=[urn:bbc:cps:38229308-a0fb-654a-a274-19bec0414560]',
        'x2=[responsive]',
        'x3=[news]',
        'x4=[az]',
        'x5=[http%3A%2F%2Flocalhost%2F]',
        'x7=[article-photo-gallery]',
        'x8=[simorgh]',
        'x9=[Azərbaycan+Xalq+Cümhuriyyəti+-+Fotolarda+-+BBC+News]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
        'x13=[History~Azerbaijan~Society~Culture~Politics~Human+rights~Azerbaijan+Democratic+Republic+100th+anniversary~Caucasus~Law+and+order]',
        'x14=[03eb3674-6190-4cd7-8104-1a00991d67a3~0f8e45e2-6499-44b1-be1f-1a3dd81e8af7~5307a8d9-f620-40f5-92d4-f99c919a6ffa~6a73afa3-ea6b-45c1-80bb-49060b99f864~75612fa6-147c-4a43-97fa-fcf70d9cced3~8b04c2e8-5409-4e7d-9877-3ccaf04727af~9e6f8e15-894a-45cb-9db9-d8881e8e6ae2~a86bc15e-ccd0-4ea9-9903-df3d4575a176~d94f45db-bb47-4e7b-b1a2-5bc3e6afd0aa]',
        'x17=[News]',
      ].join('&');
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="PGL">
          <ATIAnalytics data={pglAssetData} />
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
        'p=azerbaijan::azeri.azerbaijan.photo_gallery.44208474.page',
        `r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}`,
        `re=\${availableScreenWidth}x\${availableScreenHeight}`,
        'hl=00-00-00',
        `lng=\${browserLanguage}`,
        'x1=[urn:bbc:cps:38229308-a0fb-654a-a274-19bec0414560]',
        'x2=[amp]',
        'x3=[news]',
        'x4=[az]',
        `x5=[\${sourceUrl}]`,
        `x6=[\${documentReferrer}]`,
        'x7=[article-photo-gallery]',
        'x8=[simorgh]',
        'x9=[Azərbaycan+Xalq+Cümhuriyyəti+-+Fotolarda+-+BBC+News]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
        'x13=[History~Azerbaijan~Society~Culture~Politics~Human+rights~Azerbaijan+Democratic+Republic+100th+anniversary~Caucasus~Law+and+order]',
        'x14=[03eb3674-6190-4cd7-8104-1a00991d67a3~0f8e45e2-6499-44b1-be1f-1a3dd81e8af7~5307a8d9-f620-40f5-92d4-f99c919a6ffa~6a73afa3-ea6b-45c1-80bb-49060b99f864~75612fa6-147c-4a43-97fa-fcf70d9cced3~8b04c2e8-5409-4e7d-9877-3ccaf04727af~9e6f8e15-894a-45cb-9db9-d8881e8e6ae2~a86bc15e-ccd0-4ea9-9903-df3d4575a176~d94f45db-bb47-4e7b-b1a2-5bc3e6afd0aa]',
        'x17=[News]',
        `ref=\${documentReferrer}`,
      ].join('&');
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="PGL">
          <ATIAnalytics data={pglAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toEqual({
        pageviewParams,
      });
    });
  });

  describe('pageType=STY', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const pageviewParams = [
        's=598286',
        's2=64',
        'p=story::mundo.story.23263889.page',
        'r=0x0x24x24',
        're=1024x768',
        'hl=00-00-00',
        'lng=en-US',
        'x1=[urn:bbc:cps:f776ad93-e486-b14a-b5ea-55955dd0644f]',
        'x2=[responsive]',
        'x3=[news]',
        'x4=[es]',
        'x5=[http%3A%2F%2Flocalhost%2F]',
        'x7=[article]',
        'x8=[simorgh]',
        'x9=[WS+STY+TEST+-+Full+Headline+-+BBC+News]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
        'x13=[Life~Fake+news]',
        'x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]',
        'x16=[Amuse%20me]',
        'x17=[News]',
      ].join('&');
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="STY">
          <ATIAnalytics data={styAssetData} />
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
        'p=story::mundo.story.23263889.page',
        `r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}`,
        `re=\${availableScreenWidth}x\${availableScreenHeight}`,
        'hl=00-00-00',
        `lng=\${browserLanguage}`,
        'x1=[urn:bbc:cps:f776ad93-e486-b14a-b5ea-55955dd0644f]',
        'x2=[amp]',
        'x3=[news]',
        'x4=[es]',
        `x5=[\${sourceUrl}]`,
        `x6=[\${documentReferrer}]`,
        'x7=[article]',
        'x8=[simorgh]',
        'x9=[WS+STY+TEST+-+Full+Headline+-+BBC+News]',
        'x11=[1970-01-01T00:00:00.000Z]',
        'x12=[1970-01-01T00:00:00.000Z]',
        'x13=[Life~Fake+news]',
        'x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]',
        'x16=[Amuse%20me]',
        'x17=[News]',
        `ref=\${documentReferrer}`,
      ].join('&');
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="STY">
          <ATIAnalytics data={styAssetData} />
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

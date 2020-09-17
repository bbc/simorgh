import React from 'react';
import { node, string } from 'prop-types';
import { render } from '@testing-library/react';
import {
  isNull,
  suppressPropWarnings,
  setWindowValue,
  resetWindowValue,
} from '@bbc/psammead-test-helpers';
import { articleDataNews } from '#pages/ArticlePage/fixtureData';
import mapAssetData from '#pages/MediaAssetPage/fixtureData.json';
import pglAssetData from '#pages/PhotoGalleryPage/fixtureData.json';
import styAssetData from '#pages/StoryPage/fixtureData/mundo.json';
import styUkrainianAssetData from '#data/ukrainian/cpsAssets/news-53561143.json';
import styUkrainianInRussianAssetData from '#data/ukrainian/cpsAssets/features-russian-53477115.json';
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

const ContextWrap = ({ pageType, platform, children, service }) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={platform === 'amp'}
      pageType={pageType}
      service={service}
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
  service: string.isRequired,
};

describe('ATI Analytics Container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('pageType article', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="article" service="news">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=news.articles.c0000000001o.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Aoptimo%3Ac0000000001o]&x2=[responsive]&x3=[news]&x4=[en-gb]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[article]&x8=[simorgh]&x9=[Article%2BHeadline%2Bfor%2BSEO]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Royal%2BWedding%2B2018~Duchess%2Bof%2BSussex]&x14=[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]",
        }
      `);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="article" service="news">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=news.articles.c0000000001o.page&r=%24%7BscreenWidth%7Dx%24%7BscreenHeight%7Dx%24%7BscreenColorDepth%7D&re=%24%7BavailableScreenWidth%7Dx%24%7BavailableScreenHeight%7D&hl=00-00-00&lng=%24%7BbrowserLanguage%7D&x1=[urn%3Abbc%3Aoptimo%3Ac0000000001o]&x2=[amp]&x3=[news]&x4=[en-gb]&x5=[%24%7BsourceUrl%7D]&x6=[%24%7BdocumentReferrer%7D]&x7=[article]&x8=[simorgh]&x9=[Article%2BHeadline%2Bfor%2BSEO]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Royal%2BWedding%2B2018~Duchess%2Bof%2BSussex]&x14=[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]&ref=%24%7BdocumentReferrer%7D",
        }
      `);
    });
  });

  describe('pageType=frontPage', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      setWindowValue('location', {
        href: `https://localhost`,
      });
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="frontPage" service="news">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=news.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x2=[responsive]&x3=[news]&x5=[https%253A%252F%252Flocalhost]&x7=[index-home]&x8=[simorgh]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]",
        }
      `);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="frontPage" service="news">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=news.page&r=%24%7BscreenWidth%7Dx%24%7BscreenHeight%7Dx%24%7BscreenColorDepth%7D&re=%24%7BavailableScreenWidth%7Dx%24%7BavailableScreenHeight%7D&hl=00-00-00&lng=%24%7BbrowserLanguage%7D&x2=[amp]&x3=[news]&x5=[%24%7BsourceUrl%7D]&x6=[%24%7BdocumentReferrer%7D]&x7=[index-home]&x8=[simorgh]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&ref=%24%7BdocumentReferrer%7D",
        }
      `);
    });
  });

  describe('pageType=MAP', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="MAP" service="news">
          <ATIAnalytics data={mapAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=pidgin.media_asset.23248703.page&r=%24%7BscreenWidth%7Dx%24%7BscreenHeight%7Dx%24%7BscreenColorDepth%7D&re=%24%7BavailableScreenWidth%7Dx%24%7BavailableScreenHeight%7D&hl=00-00-00&lng=%24%7BbrowserLanguage%7D&x1=[urn%3Abbc%3Acps%3A5679389a-3ea6-0b40-9de4-f4d33d6bcd9f]&x2=[amp]&x3=[news]&x4=[pcm]&x5=[%24%7BsourceUrl%7D]&x6=[%24%7BdocumentReferrer%7D]&x7=[article-media-asset]&x8=[simorgh]&x9=[Simorgh%3A%2BMedia%2BPod%2BBuild%2BFirst%2BCPS%2BMedia%2BAsset%2BPage%2Bin%2BSimorgh%2B%26%2B%3C%2B%3E%2B-%2BBBC%2BNews]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x16=[Inspire%20me~Give%20me%20perspective~Keep%20me%20on%20trend]&x17=[Opinion]&ref=%24%7BdocumentReferrer%7D",
        }
      `);
    });
  });

  describe('pageType=PGL', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="PGL" service="news">
          <ATIAnalytics data={pglAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=azerbaijan%3A%3Aazeri.azerbaijan.photo_gallery.44208474.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3A38229308-a0fb-654a-a274-19bec0414560]&x2=[responsive]&x3=[news]&x4=[az]&x5=[https%253A%252F%252Flocalhost]&x7=[article-photo-gallery]&x8=[simorgh]&x9=[Az%C9%99rbaycan%2BXalq%2BC%C3%BCmhuriyy%C9%99ti%2B-%2BFotolarda%2B-%2BBBC%2BNews]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[History~Azerbaijan~Society~Culture~Politics~Human%2Brights~Azerbaijan%2BDemocratic%2BRepublic%2B100th%2Banniversary~Caucasus~Law%2Band%2Border]&x14=[03eb3674-6190-4cd7-8104-1a00991d67a3~0f8e45e2-6499-44b1-be1f-1a3dd81e8af7~5307a8d9-f620-40f5-92d4-f99c919a6ffa~6a73afa3-ea6b-45c1-80bb-49060b99f864~75612fa6-147c-4a43-97fa-fcf70d9cced3~8b04c2e8-5409-4e7d-9877-3ccaf04727af~9e6f8e15-894a-45cb-9db9-d8881e8e6ae2~a86bc15e-ccd0-4ea9-9903-df3d4575a176~d94f45db-bb47-4e7b-b1a2-5bc3e6afd0aa]&x17=[News]",
        }
      `);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="PGL" service="news">
          <ATIAnalytics data={pglAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=azerbaijan%3A%3Aazeri.azerbaijan.photo_gallery.44208474.page&r=%24%7BscreenWidth%7Dx%24%7BscreenHeight%7Dx%24%7BscreenColorDepth%7D&re=%24%7BavailableScreenWidth%7Dx%24%7BavailableScreenHeight%7D&hl=00-00-00&lng=%24%7BbrowserLanguage%7D&x1=[urn%3Abbc%3Acps%3A38229308-a0fb-654a-a274-19bec0414560]&x2=[amp]&x3=[news]&x4=[az]&x5=[%24%7BsourceUrl%7D]&x6=[%24%7BdocumentReferrer%7D]&x7=[article-photo-gallery]&x8=[simorgh]&x9=[Az%C9%99rbaycan%2BXalq%2BC%C3%BCmhuriyy%C9%99ti%2B-%2BFotolarda%2B-%2BBBC%2BNews]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[History~Azerbaijan~Society~Culture~Politics~Human%2Brights~Azerbaijan%2BDemocratic%2BRepublic%2B100th%2Banniversary~Caucasus~Law%2Band%2Border]&x14=[03eb3674-6190-4cd7-8104-1a00991d67a3~0f8e45e2-6499-44b1-be1f-1a3dd81e8af7~5307a8d9-f620-40f5-92d4-f99c919a6ffa~6a73afa3-ea6b-45c1-80bb-49060b99f864~75612fa6-147c-4a43-97fa-fcf70d9cced3~8b04c2e8-5409-4e7d-9877-3ccaf04727af~9e6f8e15-894a-45cb-9db9-d8881e8e6ae2~a86bc15e-ccd0-4ea9-9903-df3d4575a176~d94f45db-bb47-4e7b-b1a2-5bc3e6afd0aa]&x17=[News]&ref=%24%7BdocumentReferrer%7D",
        }
      `);
    });
  });

  describe('pageType=STY', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="STY" service="news">
          <ATIAnalytics data={styAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=story%3A%3Amundo.story.23263889.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Af776ad93-e486-b14a-b5ea-55955dd0644f]&x2=[responsive]&x3=[news]&x4=[es]&x5=[https%253A%252F%252Flocalhost]&x7=[article]&x8=[simorgh]&x9=[WS%2BSTY%2BTEST%2B-%2BFull%2BHeadline%2B-%2BBBC%2BNews]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Life~Fake%2Bnews]&x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]&x16=[Amuse%20me]&x17=[News]",
        }
      `);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="STY" service="news">
          <ATIAnalytics data={styAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=story%3A%3Amundo.story.23263889.page&r=%24%7BscreenWidth%7Dx%24%7BscreenHeight%7Dx%24%7BscreenColorDepth%7D&re=%24%7BavailableScreenWidth%7Dx%24%7BavailableScreenHeight%7D&hl=00-00-00&lng=%24%7BbrowserLanguage%7D&x1=[urn%3Abbc%3Acps%3Af776ad93-e486-b14a-b5ea-55955dd0644f]&x2=[amp]&x3=[news]&x4=[es]&x5=[%24%7BsourceUrl%7D]&x6=[%24%7BdocumentReferrer%7D]&x7=[article]&x8=[simorgh]&x9=[WS%2BSTY%2BTEST%2B-%2BFull%2BHeadline%2B-%2BBBC%2BNews]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Life~Fake%2Bnews]&x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]&x16=[Amuse%20me]&x17=[News]&ref=%24%7BdocumentReferrer%7D",
        }
      `);
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Ukrainian on canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="STY" service="ukrainian">
          <ATIAnalytics data={styUkrainianAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=94&p=news%3A%3Aukrainian.news.story.53561143.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3A9e539daf-1d79-4630-900c-7db33c4bf1ac]&x2=[responsive]&x3=[news-ukrainian]&x4=[uk]&x5=[https%253A%252F%252Flocalhost]&x7=[article]&x8=[simorgh]&x9=[%D0%92%D0%B8%D1%80%D0%BE%D0%B1%D0%BD%D0%B8%D1%86%D1%82%D0%B2%D0%BE%2B%D0%B3%D0%B5%D1%80%D0%BE%D1%97%D0%BD%D1%83%2B%D0%B7%D1%80%D0%BE%D1%81%D0%BB%D0%BE%2B%D0%B7%D0%B0%D0%B2%D0%B4%D1%8F%D0%BA%D0%B8%2B%D1%81%D0%BE%D0%BD%D1%8F%D1%87%D0%BD%D0%B8%D0%BC%2B%D0%B1%D0%B0%D1%82%D0%B0%D1%80%D0%B5%D1%8F%D0%BC.%2B%D0%9F%D0%BE%D0%B3%D0%BB%D1%8F%D0%B4%2B%D0%B7%2B%D0%91%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%96%D1%97%2B-%2BBBC%2BNews%2B%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Afghanistan~Drug%2Buse~Drugs%2Btrade~Ukraine]&x14=[1a5696c5-07d0-4a08-8b54-41ad5cd534b6~37cd3473-7b24-44b0-84c1-bf3c4801df5e~4b4cca1c-d458-4310-819e-dd48572b12c4~ee8750ed-a7fb-453f-bfca-2aa8b3fb064c]&x16=[WS%20-%20Educate%20me]&x17=[News]",
        }
      `);
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Ukrainian on Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="STY" service="ukrainian">
          <ATIAnalytics data={styUkrainianAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=94&p=news%3A%3Aukrainian.news.story.53561143.page&r=%24%7BscreenWidth%7Dx%24%7BscreenHeight%7Dx%24%7BscreenColorDepth%7D&re=%24%7BavailableScreenWidth%7Dx%24%7BavailableScreenHeight%7D&hl=00-00-00&lng=%24%7BbrowserLanguage%7D&x1=[urn%3Abbc%3Acps%3A9e539daf-1d79-4630-900c-7db33c4bf1ac]&x2=[amp]&x3=[news-ukrainian]&x4=[uk]&x5=[%24%7BsourceUrl%7D]&x6=[%24%7BdocumentReferrer%7D]&x7=[article]&x8=[simorgh]&x9=[%D0%92%D0%B8%D1%80%D0%BE%D0%B1%D0%BD%D0%B8%D1%86%D1%82%D0%B2%D0%BE%2B%D0%B3%D0%B5%D1%80%D0%BE%D1%97%D0%BD%D1%83%2B%D0%B7%D1%80%D0%BE%D1%81%D0%BB%D0%BE%2B%D0%B7%D0%B0%D0%B2%D0%B4%D1%8F%D0%BA%D0%B8%2B%D1%81%D0%BE%D0%BD%D1%8F%D1%87%D0%BD%D0%B8%D0%BC%2B%D0%B1%D0%B0%D1%82%D0%B0%D1%80%D0%B5%D1%8F%D0%BC.%2B%D0%9F%D0%BE%D0%B3%D0%BB%D1%8F%D0%B4%2B%D0%B7%2B%D0%91%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%96%D1%97%2B-%2BBBC%2BNews%2B%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Afghanistan~Drug%2Buse~Drugs%2Btrade~Ukraine]&x14=[1a5696c5-07d0-4a08-8b54-41ad5cd534b6~37cd3473-7b24-44b0-84c1-bf3c4801df5e~4b4cca1c-d458-4310-819e-dd48572b12c4~ee8750ed-a7fb-453f-bfca-2aa8b3fb064c]&x16=[WS%20-%20Educate%20me]&x17=[News]&ref=%24%7BdocumentReferrer%7D",
        }
      `);
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Russian on canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="STY" service="ukrainian">
          <ATIAnalytics data={styUkrainianInRussianAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=94&p=russian_features%3A%3Aukrainian.russian_features.story.53477115.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3A307108d3-9bcc-4829-990c-4b42c1290258]&x2=[responsive]&x3=[news-ukrainian]&x4=[ru]&x5=[https%253A%252F%252Flocalhost]&x7=[article]&x8=[simorgh]&x9=[%D0%9A%D0%B0%D1%80%D1%82%D0%B0%2B%D0%BD%D0%BE%D0%B2%D1%8B%D1%85%2B%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%BE%D0%B2%2B%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%8B%3A%2B%D0%BA%D1%82%D0%BE%2B%D0%B8%2B%D0%BA%D0%BE%D0%B3%D0%BE%2B%D0%BF%D0%BE%D0%B3%D0%BB%D0%BE%D1%82%D0%B8%D0%BB%2B-%2BBBC%2BNews%2B%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Society~Politics~Ukraine]&x14=[5307a8d9-f620-40f5-92d4-f99c919a6ffa~75612fa6-147c-4a43-97fa-fcf70d9cced3~ee8750ed-a7fb-453f-bfca-2aa8b3fb064c]&x16=[WS%20-%20Update%20me]&x17=[News]",
        }
      `);
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Russian on Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType="STY" service="ukrainian">
          <ATIAnalytics data={styUkrainianInRussianAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=94&p=russian_features%3A%3Aukrainian.russian_features.story.53477115.page&r=%24%7BscreenWidth%7Dx%24%7BscreenHeight%7Dx%24%7BscreenColorDepth%7D&re=%24%7BavailableScreenWidth%7Dx%24%7BavailableScreenHeight%7D&hl=00-00-00&lng=%24%7BbrowserLanguage%7D&x1=[urn%3Abbc%3Acps%3A307108d3-9bcc-4829-990c-4b42c1290258]&x2=[amp]&x3=[news-ukrainian]&x4=[ru]&x5=[%24%7BsourceUrl%7D]&x6=[%24%7BdocumentReferrer%7D]&x7=[article]&x8=[simorgh]&x9=[%D0%9A%D0%B0%D1%80%D1%82%D0%B0%2B%D0%BD%D0%BE%D0%B2%D1%8B%D1%85%2B%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%BE%D0%B2%2B%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%8B%3A%2B%D0%BA%D1%82%D0%BE%2B%D0%B8%2B%D0%BA%D0%BE%D0%B3%D0%BE%2B%D0%BF%D0%BE%D0%B3%D0%BB%D0%BE%D1%82%D0%B8%D0%BB%2B-%2BBBC%2BNews%2B%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Society~Politics~Ukraine]&x14=[5307a8d9-f620-40f5-92d4-f99c919a6ffa~75612fa6-147c-4a43-97fa-fcf70d9cced3~ee8750ed-a7fb-453f-bfca-2aa8b3fb064c]&x16=[WS%20-%20Update%20me]&x17=[News]&ref=%24%7BdocumentReferrer%7D",
        }
      `);
    });
  });

  describe('pageType neither article nor frontPage', () => {
    suppressPropWarnings(['pageType', 'randomvalue']);
    isNull(
      'should render null',
      <ContextWrap platform="canonical" pageType="randomvalue" service="news">
        <ATIAnalytics data={articleDataNews} />
      </ContextWrap>,
    );
  });

  describe('XTO Marketing string', () => {
    const windowLocation = window.location;
    afterEach(() => {
      resetWindowValue('location', windowLocation);
    });

    it('should include the xto marketing string for a valid campaign type', () => {
      setWindowValue('location', {
        href:
          'https://localhost?at_medium=email&at_emailtype=acquisition&at_creation=my_creation',
      });
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="STY" service="news">
          <ATIAnalytics data={styAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=story%3A%3Amundo.story.23263889.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Af776ad93-e486-b14a-b5ea-55955dd0644f]&x2=[responsive]&x3=[news]&x4=[es]&x5=[https%253A%252F%252Flocalhost%253Fat_medium%253Demail%2526at_emailtype%253Dacquisition%2526at_creation%253Dmy_creation]&x7=[article]&x8=[simorgh]&x9=[WS%2BSTY%2BTEST%2B-%2BFull%2BHeadline%2B-%2BBBC%2BNews]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Life~Fake%2Bnews]&x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]&x16=[Amuse%20me]&x17=[News]&xto=EREC--%5Bmy_creation%5D---%40",
        }
      `);
    });

    it('should not include the xto marketing string when a campaign type is not specified', () => {
      setWindowValue('location', {
        href: 'http://localhost?foo=bar',
      });
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType="STY" service="news">
          <ATIAnalytics data={styAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=story%3A%3Amundo.story.23263889.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Af776ad93-e486-b14a-b5ea-55955dd0644f]&x2=[responsive]&x3=[news]&x4=[es]&x5=[http%253A%252F%252Flocalhost%253Ffoo%253Dbar]&x7=[article]&x8=[simorgh]&x9=[WS%2BSTY%2BTEST%2B-%2BFull%2BHeadline%2B-%2BBBC%2BNews]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Life~Fake%2Bnews]&x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]&x16=[Amuse%20me]&x17=[News]",
        }
      `);
    });
  });
});

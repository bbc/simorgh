import React from 'react';
import { node, string } from 'prop-types';
import { render } from '@testing-library/react';
import { articleDataNews } from '#pages/ArticlePage/fixtureData';
import mapAssetData from '#pages/MediaAssetPage/fixtureData.json';
import pglAssetData from '#pages/PhotoGalleryPage/fixtureData.json';
import styAssetData from '#pages/StoryPage/fixtureData/mundo.json';
import fixAssetData from '#data/afrique/cpsAssets/48465371.json';
import styUkrainianAssetData from '#data/ukrainian/cpsAssets/news-53561143.json';
import styUkrainianInRussianAssetData from '#data/ukrainian/cpsAssets/features-russian-53477115.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import * as analyticsUtils from '#lib/analyticsUtils';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import {
  isNull,
  suppressPropWarnings,
  setWindowValue,
  resetWindowValue,
} from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ATIAnalytics from '.';
import * as amp from './amp';
import * as canonical from './canonical';

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
        <ContextWrap
          platform="canonical"
          pageType={ARTICLE_PAGE}
          service="news"
        >
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598286&s2=64&p=news.articles.c0000000001o.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Aoptimo%3Ac0000000001o]&x2=[responsive]&x3=[news]&x4=[en-gb]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[article]&x8=[simorgh]&x9=[Article%2520Headline%2520for%2520SEO]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Royal%2520Wedding%25202018~Duchess%2520of%2520Sussex]&x14=[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]",
        }
      `);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType={ARTICLE_PAGE} service="news">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=$IF($EQUALS($MATCH(\${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598286, 598288)&s2=64&p=news.articles.c0000000001o.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=00-00-00&lng=\${browserLanguage}&x1=[urn%3Abbc%3Aoptimo%3Ac0000000001o]&x2=[amp]&x3=[news]&x4=[en-gb]&x5=[\${sourceUrl}]&x6=[\${documentReferrer}]&x7=[article]&x8=[simorgh]&x9=[Article%2520Headline%2520for%2520SEO]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Royal%2520Wedding%25202018~Duchess%2520of%2520Sussex]&x14=[2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc]&ref=\${documentReferrer}",
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
        <ContextWrap platform="canonical" pageType={FRONT_PAGE} service="news">
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
        <ContextWrap platform="amp" pageType={FRONT_PAGE} service="news">
          <ATIAnalytics data={articleDataNews} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=$IF($EQUALS($MATCH(\${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598286, 598288)&s2=64&p=news.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=00-00-00&lng=\${browserLanguage}&x2=[amp]&x3=[news]&x5=[\${sourceUrl}]&x6=[\${documentReferrer}]&x7=[index-home]&x8=[simorgh]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&ref=\${documentReferrer}",
        }
      `);
    });
  });

  describe('pageType=MAP', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap
          platform="amp"
          pageType={MEDIA_ASSET_PAGE}
          service="pidgin"
        >
          <ATIAnalytics data={mapAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=70&p=pidgin.media_asset.23248703.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=00-00-00&lng=\${browserLanguage}&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3A5679389a-3ea6-0b40-9de4-f4d33d6bcd9f]&x2=[amp]&x3=[news-pidgin]&x4=[pcm]&x5=[\${sourceUrl}]&x6=[\${documentReferrer}]&x7=[article-media-asset]&x8=[simorgh]&x9=[DO%2520NOT%2520EDIT%2520THIS%2520IS%2520AN%2520AUTOMATED%2520TEST%2520dolor%2520sit%2520amet%2C%2520consectetur%2520Lorem%2520'ipsum'%2520dolor%2520sit%2520amet%2C%2520consectetur%2520Lorem%2520ipsum%2520dolor%2520sit%3Cem%3Eamet%3C%2Fem%3E%2C%2520consectetur%2520-%2520BBC%2520News%2520Pidgin]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x16=[Inspire%20me~Give%20me%20perspective~Keep%20me%20on%20trend]&x17=[Opinion]&ref=\${documentReferrer}",
        }
      `);
    });
  });

  describe('pageType=PGL', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap
          platform="canonical"
          pageType={PHOTO_GALLERY_PAGE}
          service="azeri"
        >
          <ATIAnalytics data={pglAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=6&p=azerbaijan%3A%3Aazeri.azerbaijan.photo_gallery.44208474.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3A38229308-a0fb-654a-a274-19bec0414560]&x2=[responsive]&x3=[news-azeri]&x4=[az]&x5=[https%253A%252F%252Flocalhost]&x7=[article-photo-gallery]&x8=[simorgh]&x9=[Az%C9%99rbaycan%2520Xalq%2520C%C3%BCmhuriyy%C9%99ti%2520-%2520Fotolarda%2520-%2520BBC%2520News%2520Az%C9%99rbaycanca]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x17=[News]",
        }
      `);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap
          platform="amp"
          pageType={PHOTO_GALLERY_PAGE}
          service="azeri"
        >
          <ATIAnalytics data={pglAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=6&p=azerbaijan%3A%3Aazeri.azerbaijan.photo_gallery.44208474.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=00-00-00&lng=\${browserLanguage}&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3A38229308-a0fb-654a-a274-19bec0414560]&x2=[amp]&x3=[news-azeri]&x4=[az]&x5=[\${sourceUrl}]&x6=[\${documentReferrer}]&x7=[article-photo-gallery]&x8=[simorgh]&x9=[Az%C9%99rbaycan%2520Xalq%2520C%C3%BCmhuriyy%C9%99ti%2520-%2520Fotolarda%2520-%2520BBC%2520News%2520Az%C9%99rbaycanca]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x17=[News]&ref=\${documentReferrer}",
        }
      `);
    });
  });

  describe('pageType=STY', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType={STORY_PAGE} service="mundo">
          <ATIAnalytics data={styAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=62&p=mundo.story.23263889.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3Af776ad93-e486-b14a-b5ea-55955dd0644f]&x2=[responsive]&x3=[news-mundo]&x4=[es]&x5=[https%253A%252F%252Flocalhost]&x7=[article]&x8=[simorgh]&x9=[WS%2520STY%2520TEST%2520-%2520Full%2520Headline%2520-%2520BBC%2520News%2520Mundo]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Life~Fake%2520news]&x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]&x16=[Amuse%20me]&x17=[News]",
        }
      `);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType={STORY_PAGE} service="mundo">
          <ATIAnalytics data={styAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=62&p=mundo.story.23263889.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=00-00-00&lng=\${browserLanguage}&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3Af776ad93-e486-b14a-b5ea-55955dd0644f]&x2=[amp]&x3=[news-mundo]&x4=[es]&x5=[\${sourceUrl}]&x6=[\${documentReferrer}]&x7=[article]&x8=[simorgh]&x9=[WS%2520STY%2520TEST%2520-%2520Full%2520Headline%2520-%2520BBC%2520News%2520Mundo]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Life~Fake%2520news]&x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]&x16=[Amuse%20me]&x17=[News]&ref=\${documentReferrer}",
        }
      `);
    });

    it('should call AmpATIAnalytics when platform is Amp and pageType is CSP', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap
          platform="amp"
          pageType={CORRESPONDENT_STORY_PAGE}
          service="mundo"
        >
          <ATIAnalytics data={styAssetData} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=62&p=mundo.story.23263889.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=00-00-00&lng=\${browserLanguage}&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3Af776ad93-e486-b14a-b5ea-55955dd0644f]&x2=[amp]&x3=[news-mundo]&x4=[es]&x5=[\${sourceUrl}]&x6=[\${documentReferrer}]&x7=[article-correspondent]&x8=[simorgh]&x9=[WS%2520STY%2520TEST%2520-%2520Full%2520Headline%2520-%2520BBC%2520News%2520Mundo]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Life~Fake%2520news]&x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]&x16=[Amuse%20me]&x17=[News]&ref=\${documentReferrer}",
        }
      `);
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Ukrainian on canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap
          platform="canonical"
          pageType={STORY_PAGE}
          service="ukrainian"
        >
          <ATIAnalytics data={styUkrainianAssetData.data.article} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=94&p=news%3A%3Aukrainian.news.story.53561143.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3A9e539daf-1d79-4630-900c-7db33c4bf1ac]&x2=[responsive]&x3=[news-ukrainian]&x4=[uk]&x5=[https%253A%252F%252Flocalhost]&x7=[article]&x8=[simorgh]&x9=[%D0%92%D0%B8%D1%80%D0%BE%D0%B1%D0%BD%D0%B8%D1%86%D1%82%D0%B2%D0%BE%2520%D0%B3%D0%B5%D1%80%D0%BE%D1%97%D0%BD%D1%83%2520%D0%B7%D1%80%D0%BE%D1%81%D0%BB%D0%BE%2520%D0%B7%D0%B0%D0%B2%D0%B4%D1%8F%D0%BA%D0%B8%2520%D1%81%D0%BE%D0%BD%D1%8F%D1%87%D0%BD%D0%B8%D0%BC%2520%D0%B1%D0%B0%D1%82%D0%B0%D1%80%D0%B5%D1%8F%D0%BC.%2520%D0%9F%D0%BE%D0%B3%D0%BB%D1%8F%D0%B4%2520%D0%B7%2520%D0%91%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%96%D1%97%2520-%2520BBC%2520News%2520%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x16=[WS%20-%20Educate%20me]&x17=[News]",
        }
      `);
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Ukrainian on Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType={STORY_PAGE} service="ukrainian">
          <ATIAnalytics data={styUkrainianAssetData.data.article} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=94&p=news%3A%3Aukrainian.news.story.53561143.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=00-00-00&lng=\${browserLanguage}&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3A9e539daf-1d79-4630-900c-7db33c4bf1ac]&x2=[amp]&x3=[news-ukrainian]&x4=[uk]&x5=[\${sourceUrl}]&x6=[\${documentReferrer}]&x7=[article]&x8=[simorgh]&x9=[%D0%92%D0%B8%D1%80%D0%BE%D0%B1%D0%BD%D0%B8%D1%86%D1%82%D0%B2%D0%BE%2520%D0%B3%D0%B5%D1%80%D0%BE%D1%97%D0%BD%D1%83%2520%D0%B7%D1%80%D0%BE%D1%81%D0%BB%D0%BE%2520%D0%B7%D0%B0%D0%B2%D0%B4%D1%8F%D0%BA%D0%B8%2520%D1%81%D0%BE%D0%BD%D1%8F%D1%87%D0%BD%D0%B8%D0%BC%2520%D0%B1%D0%B0%D1%82%D0%B0%D1%80%D0%B5%D1%8F%D0%BC.%2520%D0%9F%D0%BE%D0%B3%D0%BB%D1%8F%D0%B4%2520%D0%B7%2520%D0%91%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D1%96%D1%97%2520-%2520BBC%2520News%2520%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x16=[WS%20-%20Educate%20me]&x17=[News]&ref=\${documentReferrer}",
        }
      `);
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Russian on canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap
          platform="canonical"
          pageType={STORY_PAGE}
          service="ukrainian"
        >
          <ATIAnalytics data={styUkrainianInRussianAssetData.data.article} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=94&p=russian_features%3A%3Aukrainian.russian_features.story.53477115.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3A307108d3-9bcc-4829-990c-4b42c1290258]&x2=[responsive]&x3=[news-ukrainian]&x4=[ru]&x5=[https%253A%252F%252Flocalhost]&x7=[article]&x8=[simorgh]&x9=[%D0%9A%D0%B0%D1%80%D1%82%D0%B0%2520%D0%BD%D0%BE%D0%B2%D1%8B%D1%85%2520%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%BE%D0%B2%2520%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%8B%3A%2520%D0%BA%D1%82%D0%BE%2520%D0%B8%2520%D0%BA%D0%BE%D0%B3%D0%BE%2520%D0%BF%D0%BE%D0%B3%D0%BB%D0%BE%D1%82%D0%B8%D0%BB%2520-%2520BBC%2520News%2520%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x16=[WS%20-%20Update%20me]&x17=[News]",
        }
      `);
    });

    it('should return the correct language param when service is Ukrainian and pageData language is Russian on Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap platform="amp" pageType={STORY_PAGE} service="ukrainian">
          <ATIAnalytics data={styUkrainianInRussianAssetData.data.article} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=94&p=russian_features%3A%3Aukrainian.russian_features.story.53477115.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=00-00-00&lng=\${browserLanguage}&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3A307108d3-9bcc-4829-990c-4b42c1290258]&x2=[amp]&x3=[news-ukrainian]&x4=[ru]&x5=[\${sourceUrl}]&x6=[\${documentReferrer}]&x7=[article]&x8=[simorgh]&x9=[%D0%9A%D0%B0%D1%80%D1%82%D0%B0%2520%D0%BD%D0%BE%D0%B2%D1%8B%D1%85%2520%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%BE%D0%B2%2520%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%8B%3A%2520%D0%BA%D1%82%D0%BE%2520%D0%B8%2520%D0%BA%D0%BE%D0%B3%D0%BE%2520%D0%BF%D0%BE%D0%B3%D0%BB%D0%BE%D1%82%D0%B8%D0%BB%2520-%2520BBC%2520News%2520%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x16=[WS%20-%20Update%20me]&x17=[News]&ref=\${documentReferrer}",
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
        href: 'https://localhost?at_medium=email&at_emailtype=acquisition&at_creation=my_creation',
      });
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap platform="canonical" pageType={STORY_PAGE} service="mundo">
          <ATIAnalytics data={styAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=62&p=mundo.story.23263889.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3Af776ad93-e486-b14a-b5ea-55955dd0644f]&x2=[responsive]&x3=[news-mundo]&x4=[es]&x5=[https%253A%252F%252Flocalhost%253Fat_medium%253Demail%2526at_emailtype%253Dacquisition%2526at_creation%253Dmy_creation]&x7=[article]&x8=[simorgh]&x9=[WS%2520STY%2520TEST%2520-%2520Full%2520Headline%2520-%2520BBC%2520News%2520Mundo]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Life~Fake%2520news]&x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]&x16=[Amuse%20me]&x17=[News]&xto=EREC--%5Bmy_creation%5D---%40",
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
        <ContextWrap platform="canonical" pageType={STORY_PAGE} service="mundo">
          <ATIAnalytics data={styAssetData} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=62&p=mundo.story.23263889.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3Acurie%3Aasset%3Af776ad93-e486-b14a-b5ea-55955dd0644f]&x2=[responsive]&x3=[news-mundo]&x4=[es]&x5=[http%253A%252F%252Flocalhost%253Ffoo%253Dbar]&x7=[article]&x8=[simorgh]&x9=[WS%2520STY%2520TEST%2520-%2520Full%2520Headline%2520-%2520BBC%2520News%2520Mundo]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&x13=[Life~Fake%2520news]&x14=[0239ab33-1cfc-4f5d-babb-a8159711af3e~e7539dc8-5cfb-413a-b4fe-0ad77bc665aa]&x16=[Amuse%20me]&x17=[News]",
        }
      `);
    });
  });
  describe('pageType=FIX', () => {
    it('should call CanonicalATIAnalytics when platform is canonical', () => {
      const mockCanonical = jest.fn().mockReturnValue('canonical-return-value');
      canonical.default = mockCanonical;

      render(
        <ContextWrap
          platform="canonical"
          pageType={FEATURE_INDEX_PAGE}
          service="afrique"
        >
          <ATIAnalytics data={fixAssetData.data.article} />
        </ContextWrap>,
      );

      expect(mockCanonical.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=3&p=afrique.feature_index.48465371.page&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&x1=[urn%3Abbc%3Acps%3A447a95b6-1c9f-e544-bf60-e23452e7fa71]&x2=[responsive]&x3=[news-afrique]&x4=[fr]&x5=[http%253A%252F%252Flocalhost%252F]&x7=[index-section]&x8=[simorgh]&x9=[Tout%2520savoir%2520sur%2520la%2520CAN%25202019%2520-%2520BBC%2520News%2520Afrique]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]",
        }
      `);
    });

    it('should call AmpATIAnalytics when platform is Amp', () => {
      const mockAmp = jest.fn().mockReturnValue('amp-return-value');
      amp.default = mockAmp;

      render(
        <ContextWrap
          platform="amp"
          pageType={FEATURE_INDEX_PAGE}
          service="afrique"
        >
          <ATIAnalytics data={fixAssetData.data.article} />
        </ContextWrap>,
      );

      expect(mockAmp.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "pageviewParams": "s=598343&s2=3&p=afrique.feature_index.48465371.page&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=00-00-00&lng=\${browserLanguage}&x1=[urn%3Abbc%3Acps%3A447a95b6-1c9f-e544-bf60-e23452e7fa71]&x2=[amp]&x3=[news-afrique]&x4=[fr]&x5=[\${sourceUrl}]&x6=[\${documentReferrer}]&x7=[index-section]&x8=[simorgh]&x9=[Tout%2520savoir%2520sur%2520la%2520CAN%25202019%2520-%2520BBC%2520News%2520Afrique]&x11=[1970-01-01T00%3A00%3A00.000Z]&x12=[1970-01-01T00%3A00%3A00.000Z]&ref=\${documentReferrer}",
        }
      `);
    });
  });
});

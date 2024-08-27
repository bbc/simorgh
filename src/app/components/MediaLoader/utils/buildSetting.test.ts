import { PageTypes, Services } from '#app/models/types/global';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import hindiTvProgramme from '#data/hindi/bbc_hindi_tv/tv_programmes/w13xttlw.json';
import { service as hindiServiceConfig } from '#app/lib/config/services/hindi';
import buildSettings from './buildSettings';
import { aresMediaBlocks, clipMediaBlocks } from '../fixture';
import {
  BuildConfigProps,
  ConfigBuilderReturnProps,
  MediaBlock,
  PlaceholderConfig,
} from '../types';

const baseSettings = {
  pageType: 'article' as PageTypes,
  counterName: 'live_coverage.testID.page',
  isAmp: false,
  lang: 'es',
  service: 'mundo' as Services,
  statsDestination: 'WS_NEWS_LANGUAGES',
  producer: 'MUNDO',
} as BuildConfigProps;

describe('buildSettings', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('Clip Media', () => {
    it('Should process a ClipMedia block into a valid playlist item for a "Live" page.', () => {
      const mockWindowObj = {
        location: {
          hostname: 'https://www.bbc.com/',
        },
      } as Window & typeof globalThis;

      jest
        .spyOn(window, 'window', 'get')
        .mockImplementation(() => mockWindowObj);

      const result = buildSettings({
        ...baseSettings,
        blocks: clipMediaBlocks as MediaBlock[],
        pageType: 'live',
      });

      expect(result).toStrictEqual({
        mediaType: 'video',
        playerConfig: {
          autoplay: true,
          product: 'news',
          statsObject: {
            clipPID: 'p01thw22',
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'MUNDO',
          },
          enableToucan: true,
          appName: 'news-mundo',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
          externalEmbedUrl: '',
          playlistObject: {
            title:
              "BBC launch trailer for We Know Our Place women's sport campaign",
            summary:
              'BBC launch trailer for We Know Our Place women\'s sport campaign"',
            holdingImageURL:
              'https://ichef.test.bbci.co.uk/images/ic/512xn/p01thw3g.jpg.webp',
            items: [
              {
                duration: 54,
                kind: 'programme',
                versionID: 'p01thw22',
              },
            ],
            embedRights: 'allowed',
          },
          ui: {
            controls: { enabled: true },
            locale: { lang: 'es' },
            subtitles: { enabled: true, defaultOn: true },
            fullscreen: { enabled: true },
          },
        },
        placeholderConfig: {
          mediaInfo: {
            datetime: 'PT54S',
            duration: '00:54',
            durationSpoken: 'Duration 0,54',
            guidanceMessage: null,
            title:
              "BBC launch trailer for We Know Our Place women's sport campaign",
            type: 'video',
          },
          placeholderSrc:
            'https://ichef.test.bbci.co.uk/images/ic/512xn/p01thw3g.jpg.webp',
          placeholderSrcset:
            'https://ichef.test.bbci.co.uk/images/ic/240xn/p01thw3g.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01thw3g.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01thw3g.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01thw3g.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01thw3g.jpg.webp 800w',
          translatedNoJSMessage:
            'This video cannot play in your browser. Please enable JavaScript or try a different browser.',
        },
        showAds: false,
      } satisfies ConfigBuilderReturnProps);
    });

    it('Should add an advert item for a "Live" page when showAds is set to true.', () => {
      const mockWindowObj = {
        location: {
          hostname: 'https://www.bbc.com/',
        },
      } as Window & typeof globalThis;

      jest
        .spyOn(window, 'window', 'get')
        .mockImplementation(() => mockWindowObj);

      const result = buildSettings({
        ...baseSettings,
        blocks: clipMediaBlocks as MediaBlock[],
        pageType: 'live',
        adsEnabled: true,
        showAdsBasedOnLocation: true,
      });

      expect(result?.playerConfig.playlistObject?.items[0]).toStrictEqual({
        kind: 'advert',
      });
    });
  });

  describe('AresMedia', () => {
    it('Should process an AresMedia block into a valid playlist item for an "article" page.', () => {
      const mockWindowObj = {
        location: {
          hostname: 'https://www.bbc.com/',
        },
      } as Window & typeof globalThis;

      jest
        .spyOn(window, 'window', 'get')
        .mockImplementation(() => mockWindowObj);

      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
      });

      expect(result).toStrictEqual({
        mediaType: 'video',
        playerConfig: {
          autoplay: true,
          product: 'news',
          statsObject: {
            clipPID: 'p01k6msp',
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'MUNDO',
          },
          enableToucan: true,
          appName: 'news-mundo',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
          externalEmbedUrl: '',
          playlistObject: {
            title: 'Five things ants can teach us about management',
            summary: 'This is a caption!',
            holdingImageURL:
              'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg.webp',
            items: [
              { duration: 191, kind: 'programme', versionID: 'p01k6msp' },
            ],
            guidance: 'Contains strong language and adult humour.',
            embedRights: 'allowed',
          },
          ui: {
            controls: { enabled: true },
            locale: { lang: 'es' },
            subtitles: { enabled: true, defaultOn: true },
            fullscreen: { enabled: true },
          },
        },
        placeholderConfig: {
          mediaInfo: {
            datetime: 'PT3M11S',
            duration: '03:11',
            durationSpoken: 'Duration 3,11',
            guidanceMessage: 'Contains strong language and adult humour.',
            title: 'Five things ants can teach us about management',
            type: 'video',
          },
          placeholderSrc:
            'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg.webp',
          placeholderSrcset:
            'https://ichef.test.bbci.co.uk/images/ic/240xn/p01k6mtv.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01k6mtv.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01k6mtv.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01k6mtv.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01k6mtv.jpg.webp 800w',
          translatedNoJSMessage:
            'This video cannot play in your browser. Please enable JavaScript or try a different browser.',
        } satisfies PlaceholderConfig,
        showAds: false,
      } satisfies ConfigBuilderReturnProps);
    });

    it('Should process an AresMedia block into a valid playlist item for a "mediaArticle" page.', () => {
      const mockWindowObj = {
        location: {
          hostname: 'https://www.bbc.com/',
        },
      } as Window & typeof globalThis;

      jest
        .spyOn(window, 'window', 'get')
        .mockImplementation(() => mockWindowObj);

      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
        pageType: 'mediaArticle',
      });

      expect(result).toStrictEqual({
        mediaType: 'video',
        playerConfig: {
          autoplay: false,
          preload: 'high',
          product: 'news',
          statsObject: {
            clipPID: 'p01k6msp',
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'MUNDO',
          },
          enableToucan: true,
          appName: 'news-mundo',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
          externalEmbedUrl: '',
          playlistObject: {
            title: 'Five things ants can teach us about management',
            summary: 'This is a caption!',
            holdingImageURL:
              'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg.webp',
            items: [
              { duration: 191, kind: 'programme', versionID: 'p01k6msp' },
            ],
            guidance: 'Contains strong language and adult humour.',
            embedRights: 'allowed',
          },
          ui: {
            controls: { enabled: true },
            locale: { lang: 'es' },
            subtitles: { enabled: true, defaultOn: true },
            fullscreen: { enabled: true },
          },
        },
        placeholderConfig: {
          mediaInfo: {
            datetime: 'PT3M11S',
            duration: '03:11',
            durationSpoken: 'Duration 3,11',
            guidanceMessage: 'Contains strong language and adult humour.',
            title: 'Five things ants can teach us about management',
            type: 'video',
          },
          placeholderSrc:
            'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg.webp',
          placeholderSrcset:
            'https://ichef.test.bbci.co.uk/images/ic/240xn/p01k6mtv.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01k6mtv.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01k6mtv.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01k6mtv.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01k6mtv.jpg.webp 800w',
          translatedNoJSMessage:
            'This video cannot play in your browser. Please enable JavaScript or try a different browser.',
        },
        showAds: false,
      } satisfies ConfigBuilderReturnProps);
    });

    it('Should include the mediator parameter if we are on a test url.', () => {
      const mockWindowObj = {
        location: {
          hostname: 'https://www.test.bbc.com/',
          search: '?renderer_env=test',
        },
      } as Window & typeof globalThis;

      jest
        .spyOn(window, 'window', 'get')
        .mockImplementation(() => mockWindowObj);

      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
      });

      expect(result?.playerConfig).toHaveProperty('mediator', {
        host: 'open.test.bbc.co.uk',
      });
    });

    it('Should include the mediator parameter if we are on a dev environment.', () => {
      process.env.SIMORGH_APP_ENV = 'test';

      const mockWindowObj = {
        location: {
          hostname: 'https://www.test.bbc.com/',
          search: '',
        },
      } as Window & typeof globalThis;

      jest
        .spyOn(window, 'window', 'get')
        .mockImplementation(() => mockWindowObj);

      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
      });

      expect(result?.playerConfig).toHaveProperty('mediator', {
        host: 'open.test.bbc.co.uk',
      });
    });

    it('Should NOT include the mediator parameter if we are on a test environemnt, but renderer_env is set to live.', () => {
      const mockWindowObj = {
        location: {
          hostname: 'https://www.test.bbc.com/',
          search: '?renderer_env=live',
        },
      } as Window & typeof globalThis;

      jest
        .spyOn(window, 'window', 'get')
        .mockImplementation(() => mockWindowObj);

      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
      });

      expect(result?.playerConfig.mediator).toBe(undefined);
    });

    it('Should NOT include the mediator parameter if we are on a live url.', () => {
      const mockWindowObj = {
        location: {
          hostname: 'https://www.bbc.com/',
        },
      } as Window & typeof globalThis;

      jest
        .spyOn(window, 'window', 'get')
        .mockImplementation(() => mockWindowObj);

      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
      });

      expect(result?.playerConfig.mediator).toBe(undefined);
    });

    it('Should return null if the AresMedia block contains invalid data.', () => {
      const sampleBlock = [
        {
          model: { blocks: [{ model: { versions: [] } }] },
        },
      ];
      const result = buildSettings({
        ...baseSettings,
        // @ts-expect-error - we are testing an invalid block
        blocks: sampleBlock,
      });

      expect(result).toBe(null);
    });

    it('Should return the statsObject with required values for tracking.', () => {
      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
      });

      expect(result?.playerConfig.statsObject).toStrictEqual({
        clipPID: 'p01k6msp',
        destination: 'WS_NEWS_LANGUAGES',
        producer: 'MUNDO',
      });
    });

    it('Should return required settings for tracking.', () => {
      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
      });

      expect(result?.playerConfig).toHaveProperty(
        'counterName',
        'live_coverage.testID.page',
      );
      expect(result?.playerConfig).toHaveProperty('appName', 'news-mundo');
      expect(result?.playerConfig).toHaveProperty('appType', 'responsive');
      expect(result?.playerConfig.playlistObject).toHaveProperty(
        'title',
        'Five things ants can teach us about management',
      );
    });
  });

  describe('OnDemandTv', () => {
    const hindiTvBaseSettings = {
      counterName: 'hindi.bbc_hindi_tv.tv.w172zm8920nck2z.page',
      lang: 'hi',
      service: 'hindi' as Services,
      statsDestination: 'WS_NEWS_LANGUAGES',
      producer: 'HINDI',
      translations: hindiServiceConfig.default.translations,
    } as BuildConfigProps;

    const hindiTvMediaBlocks = hindiTvProgramme.content.blocks.map(
      tvMediaBlock => {
        return {
          type: 'tvMedia',
          model: {
            ...tvMediaBlock,
          },
        };
      },
    );
    it('Should process a On Demand TV block into a valid playlist item.', () => {
      const result = buildSettings({
        ...hindiTvBaseSettings,
        blocks: hindiTvMediaBlocks as MediaBlock[],
        pageType: MEDIA_PAGE,
      });

      expect(result).toStrictEqual({
        playerConfig: {
          product: 'news',
          enableToucan: true,
          appType: 'responsive',
          autoplay: false,
          externalEmbedUrl: '',
          mediator: { host: 'open.test.bbc.co.uk' },
          appName: 'news-hindi',
          counterName: 'hindi.bbc_hindi_tv.tv.w172zm8920nck2z.page',
          statsObject: {
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'HINDI',
            episodePID: 'w172zm8920nck2z',
          },
          ui: {
            controls: { enabled: true },
            fullscreen: { enabled: true },
            locale: {
              lang: 'hi',
            },
            subtitles: {
              defaultOn: true,
              enabled: true,
            },
          },
          playlistObject: {
            title: 'दुनिया',
            holdingImageURL:
              'https://ichef.bbci.co.uk/images/ic/$recipe/p0hfjjfk.png',
            items: [
              {
                versionID: 'w1mskyp8ybvqtc6',
                kind: 'programme',
                duration: 1192,
                vpid: 'w1mskyp8ybvqtc6',
              },
            ],
            summary:
              'ताज़ा अंतरराष्ट्रीय, क्षेत्रीय ख़बरों और विश्लेषण के लिए देखिए बीबीसी दुनिया',
          },
        },
        mediaType: 'video',
        placeholderConfig: {
          mediaInfo: {
            title: 'दुनिया',
            datetime: 'PT19M52S',
            duration: '19:52',
            durationSpoken: 'अवधि 19,52',
            type: 'video',
            guidanceMessage: undefined,
          },
          placeholderSrc:
            'https://ichef.bbci.co.uk/images/ic/$recipe/p0hfjjfk.png',
          placeholderSrcset:
            'https://ichef.bbci.co.uk/images/ic/240xn/p0hfjjfk.png.webp 240w, https://ichef.bbci.co.uk/images/ic/320xn/p0hfjjfk.png.webp 320w, https://ichef.bbci.co.uk/images/ic/480xn/p0hfjjfk.png.webp 480w, https://ichef.bbci.co.uk/images/ic/624xn/p0hfjjfk.png.webp 624w, https://ichef.bbci.co.uk/images/ic/800xn/p0hfjjfk.png.webp 800w',
          translatedNoJSMessage:
            'This video cannot play in your browser. Please enable JavaScript or try a different browser.',
        },
        showAds: false,
      });
    });
  });
});

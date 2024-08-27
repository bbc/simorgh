import { PageTypes, Services } from '#app/models/types/global';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import hindiTvProgramme from '#data/hindi/bbc_hindi_tv/tv_programmes/w13xttlw.json';
import buildSettings from './buildSettings';
import { aresMediaBlocks, clipMediaBlocks } from '../fixture';
import { BuildConfigProps, MediaBlock } from '../types';

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

  describe('ClipMedia', () => {
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

      expect(result?.playerConfig).toStrictEqual({
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
          items: [{ duration: 54, kind: 'programme', versionID: 'p01thw22' }],
          embedRights: 'allowed',
        },
        ui: {
          controls: { enabled: true },
          locale: { lang: 'es' },
          subtitles: { enabled: true, defaultOn: true },
          fullscreen: { enabled: true },
        },
      });
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

      expect(result?.playerConfig).toStrictEqual({
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
          items: [{ duration: 191, kind: 'programme', versionID: 'p01k6msp' }],
          guidance: 'Contains strong language and adult humour.',
          embedRights: 'allowed',
        },
        ui: {
          controls: { enabled: true },
          locale: { lang: 'es' },
          subtitles: { enabled: true, defaultOn: true },
          fullscreen: { enabled: true },
        },
      });
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

      expect(result?.playerConfig).toStrictEqual({
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
          items: [{ duration: 191, kind: 'programme', versionID: 'p01k6msp' }],
          guidance: 'Contains strong language and adult humour.',
          embedRights: 'allowed',
        },
        ui: {
          controls: { enabled: true },
          locale: { lang: 'es' },
          subtitles: { enabled: true, defaultOn: true },
          fullscreen: { enabled: true },
        },
      });
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
          autoplay: true,
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
            datetime: 1192,
            duration: undefined,
            durationSpoken: undefined,
            type: 'media',
            guidanceMessage: undefined,
          },
          placeholderSrc: '',
          placeholderSrcset: '',
          translatedNoJSMessage: '',
        },
        showAds: false,
      });
    });
  });
});

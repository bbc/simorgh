import { PageTypes, Services } from '#app/models/types/global';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import hindiTvProgramme from '#data/hindi/bbc_hindi_tv/tv_programmes/w13xttlw.json';
import { service as hindiServiceConfig } from '#app/lib/config/services/hindi';
import isLive from '#app/lib/utilities/isLive';
import buildSettings from './buildSettings';
import {
  aresMediaBlocks,
  clipMediaBlocks,
  aresMediaPlayerBlock,
  aresMediaBlock,
  aresMediaLiveStreamBlocks,
} from '../fixture';
import {
  BuildConfigProps,
  ConfigBuilderReturnProps,
  MediaBlock,
  PlaceholderConfig,
} from '../types';

jest.mock('#app/lib/utilities/isLive', () =>
  jest.fn().mockImplementation(() => true),
);

const baseSettings = {
  pageType: 'article' as PageTypes,
  counterName: 'live_coverage.testID.page',
  isAmp: false,
  lang: 'sr-latn',
  service: 'serbian' as Services,
  statsDestination: 'WS_NEWS_LANGUAGES',
  producer: 'SERBIAN',
  id: 'serbian/lat/srbija-68707945',
} as BuildConfigProps;

describe('buildSettings', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('Clip Media', () => {
    it('Should process a ClipMedia block into a valid playlist item for a "Live" page.', () => {
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
            clipPID: 'p01thw20',
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'SERBIAN',
          },
          enableToucan: true,
          externalEmbedUrl:
            '/ws/av-embeds/cps/serbian/lat/srbija-68707945/p01thw22/sr-latn',
          appName: 'news-serbian',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
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
            locale: { lang: 'sr-latn' },
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
            clipPID: 'p01k6msm',
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'SERBIAN',
          },
          enableToucan: true,
          externalEmbedUrl:
            '/ws/av-embeds/cps/serbian/lat/srbija-68707945/p01k6msp/sr-latn',
          appName: 'news-serbian',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
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
            locale: { lang: 'sr-latn' },
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
            clipPID: 'p01k6msm',
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'SERBIAN',
          },
          enableToucan: true,
          externalEmbedUrl:
            '/ws/av-embeds/cps/serbian/lat/srbija-68707945/p01k6msp/sr-latn',
          appName: 'news-serbian',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
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
            locale: { lang: 'sr-latn' },
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

    it('Should process an AresMediaLiveStream block into a valid playlist item for an "live stream" MAP page.', () => {
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
        blocks: aresMediaLiveStreamBlocks as MediaBlock[],
      });

      expect(result?.playerConfig).toStrictEqual({
        autoplay: true,
        product: 'news',
        statsObject: {
          destination: 'WS_NEWS_LANGUAGES',
          producer: 'SERBIAN',
        },
        enableToucan: true,
        appName: 'news-serbian',
        appType: 'responsive',
        counterName: 'live_coverage.testID.page',
        externalEmbedUrl:
          '/ws/av-embeds/cps/serbian/lat/srbija-68707945/bbc_arabic_tv/sr-latn',
        playlistObject: {
          title: 'مباشر: تلفزيون بي بي سي عربي',
          summary: 'This is a caption!',
          holdingImageURL:
            'http://c.files.bbci.co.uk/CF4E/production/_111607035_arabic_16_9_updated.png',
          items: [
            {
              duration: 0,
              kind: 'programme',
              live: true,
              versionID: 'bbc_arabic_tv',
            },
          ],
          simulcast: true,
        },
        ui: {
          controls: { enabled: true },
          locale: { lang: 'sr-latn' },
          subtitles: { enabled: true, defaultOn: true },
          fullscreen: { enabled: true },
        },
      });
    });

    it('Should process an AresMedia block into a valid playlist item for syndication.', () => {
      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
        embedded: true,
      });

      expect(result).toStrictEqual({
        mediaType: 'video',
        playerConfig: {
          autoplay: true,
          product: 'news',
          statsObject: {
            clipPID: 'p01k6msm',
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'SERBIAN',
          },
          enableToucan: true,
          externalEmbedUrl: '/serbian/lat/av-embeds/srbija-68707945',
          insideIframe: true,
          embeddedOffsite: true,
          appName: 'news-serbian',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
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
            locale: { lang: 'sr-latn' },
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
        clipPID: 'p01k6msm',
        destination: 'WS_NEWS_LANGUAGES',
        producer: 'SERBIAN',
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
      expect(result?.playerConfig).toHaveProperty('appName', 'news-serbian');
      expect(result?.playerConfig).toHaveProperty('appType', 'responsive');
      expect(result?.playerConfig.playlistObject).toHaveProperty(
        'title',
        'Five things ants can teach us about management',
      );
    });

    it('Should have a `statsObject.clipPID` when subType is "clip"', async () => {
      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
      });
      expect(result?.playerConfig.statsObject).toStrictEqual({
        clipPID: 'p01k6msm',
        destination: 'WS_NEWS_LANGUAGES',
        producer: 'SERBIAN',
      });
    });

    it('Should have a `statsObject.episodePID` when subType is "episode"', async () => {
      const myFixture = [
        {
          ...aresMediaBlock,
          model: {
            blocks: [
              {
                ...aresMediaPlayerBlock,
                model: {
                  id: 'p01k6msm',
                  subType: 'episode',
                },
              },
            ],
          },
        },
      ] as unknown as MediaBlock[];

      const result = buildSettings({
        ...baseSettings,
        blocks: myFixture,
      });
      expect(result?.playerConfig.statsObject).toStrictEqual({
        destination: 'WS_NEWS_LANGUAGES',
        producer: 'SERBIAN',
        episodePID: 'p01k6msm',
      });
    });

    it('Should have embeddedOffsite property with value `true` to support syndicated routes', async () => {
      const result = buildSettings({
        ...baseSettings,
        embedded: true,
        blocks: aresMediaBlocks as MediaBlock[],
      });

      expect(result?.playerConfig).toHaveProperty('embeddedOffsite', true);
    });

    it('Should have insideIframe property with value `true` to support syndicated and amp routes', async () => {
      const result = buildSettings({
        ...baseSettings,
        embedded: true,
        blocks: aresMediaBlocks as MediaBlock[],
      });

      expect(result?.playerConfig).toHaveProperty('insideIframe', true);
    });

    it('Should set the embed rights  when embedding is allowed', () => {
      const result = buildSettings({
        ...baseSettings,
        embedded: true,
        blocks: aresMediaBlocks as MediaBlock[],
      });
      expect(result?.playerConfig).toHaveProperty('playlistObject.embedRights');
    });

    it('Should exclude the embed rights when embedding is prohibited', () => {
      const myFixture = [
        {
          ...aresMediaBlock,
          model: {
            blocks: [
              {
                ...aresMediaPlayerBlock,
                model: {
                  id: 'p01k6msm',
                  embedding: false,
                },
              },
            ],
          },
        },
      ];
      const result = buildSettings({
        ...baseSettings,
        embedded: true,
        // @ts-expect-error partial data used for testing purposes
        blocks: myFixture as MediaBlock[],
      });
      expect(result?.playerConfig).not.toHaveProperty(
        'playlistObject.embedRights',
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
          type: 'onDemandTV',
          model: {
            ...tvMediaBlock,
          },
        };
      },
    );
    it('Should process an On Demand TV block into a valid playlist item.', () => {
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
          appName: 'news-hindi',
          counterName: 'hindi.bbc_hindi_tv.tv.w172zm8920nck2z.page',
          statsObject: {
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'HINDI',
            episodePID: 'w172zm89sk8n4lc',
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
              'https://ichef.bbci.co.uk/images/ic/$recipe/p0jlxsx8.jpg',
            items: [
              {
                versionID: 'w1mskyp9nwh0dvl',
                kind: 'programme',
                duration: 1192,
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
            'https://ichef.bbci.co.uk/images/ic/$recipe/p0jlxsx8.jpg',
          placeholderSrcset:
            'https://ichef.bbci.co.uk/images/ic/240xn/p0jlxsx8.jpg.webp 240w, https://ichef.bbci.co.uk/images/ic/320xn/p0jlxsx8.jpg.webp 320w, https://ichef.bbci.co.uk/images/ic/480xn/p0jlxsx8.jpg.webp 480w, https://ichef.bbci.co.uk/images/ic/624xn/p0jlxsx8.jpg.webp 624w, https://ichef.bbci.co.uk/images/ic/800xn/p0jlxsx8.jpg.webp 800w',
          translatedNoJSMessage:
            'This video cannot play in your browser. Please enable JavaScript or try a different browser.',
        },
        showAds: false,
      });
    });
  });

  describe('mediator', () => {
    it('should not be set on live environment', () => {
      (isLive as jest.Mock).mockImplementationOnce(() => true);

      const result = buildSettings({
        ...baseSettings,
        blocks: clipMediaBlocks as MediaBlock[],
        pageType: 'live',
      });

      expect(result?.playerConfig).not.toHaveProperty('mediator');
    });

    describe('on non-live environment', () => {
      beforeEach(() => {
        (isLive as jest.Mock).mockImplementationOnce(() => false);
      });

      describe('should be set', () => {
        it.each`
          hostname                           | rendererEnv | reason
          ${'http://localhost.bbc.com:7080'} | ${'test'}   | ${'host is local and renderer_env is test'}
          ${'http://www.test.bbc.com'}       | ${'test'}   | ${'host is test and renderer_env is test'}
          ${'http://test.bbc.com'}           | ${'test'}   | ${'host is test and renderer_env is test'}
        `(
          'when hostname is $hostname and renderer_env is $rendererEnv because $reason',
          ({ hostname, rendererEnv }) => {
            const mockWindowObj = {
              location: {
                hostname,
                ...(rendererEnv && {
                  search: {
                    renderer_env: rendererEnv,
                  },
                }),
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

            expect(result?.playerConfig).toHaveProperty('mediator', {
              host: 'open.test.bbc.co.uk',
            });
          },
        );
      });

      describe('should not be set', () => {
        it.each`
          hostname                           | rendererEnv | reason
          ${'http://localhost.bbc.com:7080'} | ${'live'}   | ${'host is local and renderer_env is live'}
          ${'http://localhost.bbc.com:7080'} | ${null}     | ${'host is local and renderer_env is not set, therefore defaulted to live'}
          ${'https://test.bbc.com'}          | ${'live'}   | ${'host is test and renderer_env is live'}
          ${'https://test.bbc.com'}          | ${null}     | ${'host is local and renderer_env is not set, therefore defaulted to live'}
          ${'https://www.test.bbc.com'}      | ${'live'}   | ${'host is test and renderer_env is live'}
          ${'https://www.test.bbc.com'}      | ${null}     | ${'host is local and renderer_env is not set, therefore defaulted to live'}
        `(
          'when hostname is $hostname and renderer_env is $rendererEnv because $reason',
          ({ hostname, rendererEnv }) => {
            const mockWindowObj = {
              location: {
                hostname,
                ...(rendererEnv && {
                  search: {
                    renderer_env: rendererEnv,
                  },
                }),
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

            expect(result?.playerConfig).not.toHaveProperty('mediator');
          },
        );
      });
    });
  });
});

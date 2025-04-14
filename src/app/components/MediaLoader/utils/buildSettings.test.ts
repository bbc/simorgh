import { PageTypes, Services } from '#app/models/types/global';
import { data as hindiTvProgramme } from '#data/hindi/bbc_hindi_tv/tv_programmes/w13xttlw.json';
import {
  AUDIO_PAGE,
  LIVE_PAGE,
  LIVE_RADIO_PAGE,
  TV_PAGE,
} from '#app/routes/utils/pageTypes';
import hausaLiveRadio from '#data/hausa/bbc_hausa_radio/liveradio.json';
import afriqueRadio from '#data/afrique/bbc_afrique_radio/p030s6dq.json';
import { service as hausaServiceConfig } from '#app/lib/config/services/hausa';
import { service as hindiServiceConfig } from '#app/lib/config/services/hindi';
import { service as afriqueServiceConfig } from '#app/lib/config/services/afrique';
import { service as mundoServiceConfig } from '#app/lib/config/services/mundo';
import { service as arabicServiceConfig } from '#app/lib/config/services/arabic';
import isLive from '#app/lib/utilities/isLive';
import buildSettings from './buildSettings';
import {
  aresMediaBlocks,
  clipMediaBlocks,
  buildAresMediaPlayerBlock,
  aresMediaBlock,
  aresMediaLiveStreamBlocks,
  legacyMediaBlock,
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
            'https://www.bbc.com/serbian/lat/av-embeds/srbija-68707945/vpid/p01thw22',
          appName: 'news-serbian',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
          superResponsive: true,
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
            skin: 'classic',
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
        orientation: 'landscape',
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
            'https://www.bbc.com/serbian/lat/av-embeds/srbija-68707945/vpid/p01k6msp',
          appName: 'news-serbian',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
          superResponsive: true,
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
            skin: 'classic',
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
        ampIframeUrl:
          'https://web-cdn.api.bbci.co.uk/ws/av-embeds/cps/serbian/lat/srbija-68707945/p01k6msp/sr-latn/amp',
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
        orientation: 'landscape',
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
            'https://www.bbc.com/serbian/lat/av-embeds/srbija-68707945/vpid/p01k6msp',
          appName: 'news-serbian',
          appType: 'responsive',
          counterName: 'live_coverage.testID.page',
          superResponsive: true,
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
            skin: 'classic',
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
        ampIframeUrl:
          'https://web-cdn.api.bbci.co.uk/ws/av-embeds/cps/serbian/lat/srbija-68707945/p01k6msp/sr-latn/amp',
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
        superResponsive: true,
        externalEmbedUrl:
          'https://www.bbc.com/serbian/lat/av-embeds/srbija-68707945/vpid/bbc_arabic_tv',
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
          skin: 'classic',
          controls: { enabled: true },
          locale: { lang: 'sr-latn' },
          subtitles: { enabled: true, defaultOn: true },
          fullscreen: { enabled: true },
        },
      });
    });

    it('Should process a LegacyMediaBlock into a valid playlist item for a "MAP" page', () => {
      const legacyMediaOverrides = {
        model: {
          pageTitleOverride: 'Legacy Media Page Title',
        },
        type: 'mediaOverrides',
      };

      const result = buildSettings({
        ...baseSettings,
        service: 'arabic',
        lang: 'ar',
        producer: 'ARABIC',
        counterName: 'arabic.multimedia.2013.12.131208_iraq_blast_.page',
        blocks: [...legacyMediaBlock, legacyMediaOverrides] as MediaBlock[],
      });

      expect(result).toStrictEqual({
        mediaType: 'video',
        playerConfig: {
          autoplay: true,
          product: 'news',
          statsObject: {
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'ARABIC',
          },
          enableToucan: true,
          appName: 'news-arabic',
          appType: 'responsive',
          counterName: 'arabic.multimedia.2013.12.131208_iraq_blast_.page',
          superResponsive: true,
          playlistObject: {
            title: 'Legacy Media Page Title',
            holdingImageURL:
              'http://a.files.bbci.co.uk/worldservice/live/assets/images/2013/12/08/131208135805_iraq_blast_640x360_bbc_nocredit.jpg',
            items: [
              {
                href: 'https://wsodprogrf.akamaized.net/arabic/dps/2013/12/iraqblast_16x9_lo.mp4',
                kind: 'programme',
              },
              {
                href: 'https://wsodprogrf.akamaized.net/arabic/dps/2013/12/iraqblast_16x9_med.mp4',
                kind: 'programme',
              },
              {
                href: 'https://wsodprogrf.akamaized.net/arabic/dps/2013/12/iraqblast_16x9_hi.mp4',
                kind: 'programme',
              },
            ],
          },
          ui: {
            skin: 'classic',
            controls: { enabled: true },
            locale: { lang: 'ar' },
            subtitles: { enabled: true, defaultOn: true },
            fullscreen: { enabled: true },
          },
        },
        placeholderConfig: {
          mediaInfo: {
            datetime: undefined,
            duration: '00:00',
            durationSpoken: 'Duration 0,00',
            guidanceMessage: undefined,
            title: 'Legacy Media Page Title',
            type: 'video',
          },
          placeholderSrc:
            'http://a.files.bbci.co.uk/worldservice/live/assets/images/2013/12/08/131208135805_iraq_blast_640x360_bbc_nocredit.jpg',
          placeholderSrcset: '',
          translatedNoJSMessage:
            'This video cannot play in your browser. Please enable JavaScript or try a different browser.',
        } as PlaceholderConfig,
        showAds: false,
      } satisfies ConfigBuilderReturnProps);
    });

    it('Should process an AresMedia block into a valid playlist item for syndication.', () => {
      const result = buildSettings({
        ...baseSettings,
        blocks: aresMediaBlocks as MediaBlock[],
        embedded: true,
      });

      expect(result).toStrictEqual({
        mediaType: 'video',
        orientation: 'landscape',
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
            'https://www.bbc.com/serbian/lat/av-embeds/srbija-68707945/vpid/p01k6msp',
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
            skin: 'classic',
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
        ampIframeUrl:
          'https://web-cdn.api.bbci.co.uk/ws/av-embeds/cps/serbian/lat/srbija-68707945/p01k6msp/sr-latn/amp',
      } satisfies ConfigBuilderReturnProps);
    });
    it('Should process an AresMedia block with portrait video as the orientation', () => {
      const myFixture = [
        {
          ...aresMediaBlock,
          model: {
            blocks: [
              {
                ...buildAresMediaPlayerBlock({ types: ['Portrait'] }),
              },
            ],
          },
        },
      ] as unknown as MediaBlock[];

      const result = buildSettings({
        ...baseSettings,
        blocks: myFixture,
      });

      expect(result?.orientation).toEqual('portrait');
    });

    it('Should process an AresMedia block with portrait video as the orientation when type is editorial and portrait', () => {
      const myFixture = [
        {
          ...aresMediaBlock,
          model: {
            blocks: [
              {
                ...buildAresMediaPlayerBlock({
                  types: ['Editorial', 'Portrait'],
                }),
              },
            ],
          },
        },
      ] as unknown as MediaBlock[];

      const result = buildSettings({
        ...baseSettings,
        blocks: myFixture,
      });

      expect(result?.orientation).toEqual('portrait');
    });

    it('Should process an AresMedia block with landscape video as the orientation when type is editorial', () => {
      const myFixture = [
        {
          ...aresMediaBlock,
          model: {
            blocks: [
              {
                ...buildAresMediaPlayerBlock({
                  types: ['Editorial'],
                }),
              },
            ],
          },
        },
      ] as unknown as MediaBlock[];

      const result = buildSettings({
        ...baseSettings,
        blocks: myFixture,
      });

      expect(result?.orientation).toEqual('landscape');
    });

    it('Should process an AresMedia block with landscape video as the orientation if nothing exists in types', () => {
      const myFixture = [
        {
          ...aresMediaBlock,
          model: {
            blocks: [
              {
                ...buildAresMediaPlayerBlock({
                  types: [],
                }),
              },
            ],
          },
        },
      ] as unknown as MediaBlock[];

      const result = buildSettings({
        ...baseSettings,
        blocks: myFixture,
      });

      expect(result?.orientation).toEqual('landscape');
    });

    it('Should process an AresMedia block with landscape video as the orientation if type is unrecognised', () => {
      const myFixture = [
        {
          ...aresMediaBlock,
          model: {
            blocks: [
              {
                ...buildAresMediaPlayerBlock({
                  types: ['Foo'],
                }),
              },
            ],
          },
        },
      ] as unknown as MediaBlock[];

      const result = buildSettings({
        ...baseSettings,
        blocks: myFixture,
      });

      expect(result?.orientation).toEqual('landscape');
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
                ...buildAresMediaPlayerBlock({ types: ['Original'] }),
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
                ...buildAresMediaPlayerBlock({ types: ['Original'] }),
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

    it('Should process an On Demand TV block into a valid playlist item.', () => {
      const result = buildSettings({
        ...hindiTvBaseSettings,
        blocks: hindiTvProgramme.mediaBlocks as MediaBlock[],
        pageType: TV_PAGE,
      });

      expect(result).toStrictEqual({
        playerConfig: {
          product: 'news',
          enableToucan: true,
          appType: 'responsive',
          autoplay: false,
          appName: 'news-hindi',
          counterName: 'hindi.bbc_hindi_tv.tv.w172zm8920nck2z.page',
          superResponsive: true,
          statsObject: {
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'HINDI',
            episodePID: 'w172zm8g4s25k2f',
          },
          ui: {
            skin: 'classic',
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
              'https://ichef.bbci.co.uk/images/ic/$recipe/p0jss0kp.jpg',
            items: [
              {
                versionID: 'w1mskypg138jtbn',
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
            title:
              'रूस ने यूक्रेन पर क्या पहली बार किया ताक़तवर इंटरकॉन्टिनेन्टल मिसाइल से हमला?',
            datetime: 'PT19M52S',
            duration: '19:52',
            durationSpoken: 'अवधि 19,52',
            type: 'video',
            guidanceMessage: undefined,
          },
          placeholderSrc:
            'https://ichef.bbci.co.uk/images/ic/$recipe/p0jss0kp.jpg',
          placeholderSrcset:
            'https://ichef.bbci.co.uk/images/ic/240xn/p0jss0kp.jpg.webp 240w, https://ichef.bbci.co.uk/images/ic/320xn/p0jss0kp.jpg.webp 320w, https://ichef.bbci.co.uk/images/ic/480xn/p0jss0kp.jpg.webp 480w, https://ichef.bbci.co.uk/images/ic/624xn/p0jss0kp.jpg.webp 624w, https://ichef.bbci.co.uk/images/ic/800xn/p0jss0kp.jpg.webp 800w',
          translatedNoJSMessage: 'प्लेबैक आपके उपकरण पर नहीं हो पा रहा',
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

  describe('Live Radio', () => {
    const hausaLiveRadioBaseSettings = {
      counterName: 'hausa.bbc_hausa_radio.liveradio.page',
      lang: 'ha',
      service: 'hausa' as Services,
      statsDestination: 'WS_NEWS_LANGUAGES',
      producer: 'HAUSA',
      translations: hausaServiceConfig.default.translations,
    } as BuildConfigProps;

    it('Should process a Live Radio block into a valid playlist item.', () => {
      const result = buildSettings({
        ...hausaLiveRadioBaseSettings,
        blocks: hausaLiveRadio?.data?.mediaBlock as MediaBlock[],
        pageType: LIVE_RADIO_PAGE,
      });

      expect(result).toStrictEqual({
        playerConfig: {
          product: 'news',
          appName: 'news-hausa',
          enableToucan: true,
          appType: 'responsive',
          autoplay: false,
          counterName: 'hausa.bbc_hausa_radio.liveradio.page',
          playlistObject: {
            items: [
              {
                kind: 'radioProgramme',
                live: true,
                serviceID: 'bbc_hausa_radio',
              },
            ],
            liveRewind: true,
            simulcast: true,
            title: 'BBC Hausa Rediyo',
            summary:
              "Labaran duniya da sharhi da kuma bayanai kan al'amuran yau da kullum daga sashin Hausa na BBC.",
          },
          statsObject: {
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'HAUSA',
          },
          ui: {
            skin: 'audio',
            colour: '#b80000',
            foreColour: '#222222',
            baseColour: '#222222',
            colourOnBaseColour: '#ffffff',
            fallbackBackgroundColour: '#ffffff',
            controls: { enabled: true, volumeSlider: true },
            fullscreen: {
              enabled: true,
            },
            locale: {
              lang: 'ha',
            },
            subtitles: {
              defaultOn: true,
              enabled: true,
            },
          },
          superResponsive: false,
        },
        mediaType: 'liveRadio',
        showAds: false,
      });
    });
  });

  describe('OnDemandAudio', () => {
    const afriqueAudioBaseSettings = {
      counterName: 'afrique.bbc_afrique_radio.w172zn0kxd65h3g.page',
      lang: 'fr',
      service: 'afrique' as Services,
      statsDestination: 'WS_NEWS_LANGUAGES',
      producer: 'AFRIQUE',
      translations: afriqueServiceConfig.default.translations,
    } as BuildConfigProps;

    const afriqueAudioMediaBlocks = afriqueRadio.data.mediaBlocks;

    it('Should process an on demand audio block into a valid playlist item.', () => {
      const afriqueAudioMediaOverrides = {
        model: {
          language: 'fr',
          pageIdentifierOverride:
            'afrique.bbc_afrique_radio.w172zn0kxd65h3g.page',
        },
        type: 'mediaOverrides',
      };
      const result = buildSettings({
        ...afriqueAudioBaseSettings,
        blocks: [
          ...afriqueAudioMediaBlocks,
          afriqueAudioMediaOverrides,
        ] as MediaBlock[],
        pageType: AUDIO_PAGE,
      });

      expect(result).toStrictEqual({
        playerConfig: {
          product: 'news',
          enableToucan: true,
          appType: 'responsive',
          autoplay: false,
          appName: 'news-afrique',
          counterName: 'afrique.bbc_afrique_radio.w172zn0kxd65h3g.page',
          superResponsive: false,
          statsObject: {
            destination: 'WS_NEWS_LANGUAGES',
            producer: 'AFRIQUE',
            episodePID: 'w172zzz2x3918yn',
          },
          ui: {
            controls: {
              volumeSlider: true,
              enabled: true,
            },
            fullscreen: { enabled: true },
            locale: {
              lang: 'fr',
            },
            subtitles: {
              defaultOn: true,
              enabled: true,
            },
            skin: 'audio',
            colour: '#b80000',
            foreColour: '#222222',
            baseColour: '#222222',
            colourOnBaseColour: '#ffffff',
            fallbackBackgroundColour: '#ffffff',
          },
          playlistObject: {
            title: '26/11/2024 GMT',
            holdingImageURL:
              'https://ichef.bbci.co.uk/images/ic/$recipe/p0gsjjjl.png',
            items: [
              {
                versionID: 'w1mslblghzlxffm',
                kind: 'radioProgramme',
                duration: 300,
              },
            ],
            summary: "Le tour du monde de l'actualité en 2 minutes ",
          },
        },
        mediaType: 'audio',
        showAds: false,
      });
    });
  });

  describe('liveMedia', () => {
    const mundoMediaBaseSettings = {
      counterName: 'live_coverage.c7dkx155e626t.page',
      lang: 'es',
      service: 'mundo' as Services,
      statsDestination: 'WS_NEWS_LANGUAGES',
      producer: 'MUNDO',
      translations: mundoServiceConfig.default.translations,
    } as BuildConfigProps;

    const arabicMediaBaseSettings = {
      counterName: 'live_coverage.cvp5r6m6mgpt.page',
      lang: 'ar',
      service: 'arabic' as Services,
      statsDestination: 'WS_NEWS_LANGUAGES',
      producer: 'ARABIC',
      translations: arabicServiceConfig.default.translations,
    } as BuildConfigProps;

    it('Should process a live media block into a valid playlist item.', () => {
      const mediaBlock = {
        type: 'liveMedia',
        model: {
          urn: 'urn:bbc:pips:pid:p0gh4n63',
          title: 'Non-Stop Cartoons!',
          type: 'episode',
          synopses: {
            short: 'Toon in, kick back and relax to 100% cartoons!',
            medium:
              'Toon in, kick back and relax. From laugh out loud to mischief and mayhem. 100% cartoons all day long.',
            long: 'Toon in, kick back and relax. From laugh out loud to mischief and mayhem. 100% cartoons all day long. Join your favourites Grizzy, Shaun, Taffy, Boy Girl Dog Cat Mouse Cheese, The Deep and those Monster Loving Maniacs.',
          },
          mediaType: 'audio_video',
          imageUrlTemplate:
            'https://ichef.bbci.co.uk/images/ic/$recipe/p0k31t4d.jpg',
          masterbrand: {
            id: 'cbbc',
            name: 'CBBC',
            networkName: 'CBBC',
            type: 'tv',
            imageUrlTemplate: 'ichef.bbci.co.uk/images/ic/$recipe/p0f8qps2.jpg',
          },
          version: {
            vpid: 'p0gh4n67',
            duration: 'PT24H',
            availabilityType: 'webcast',
            versionTypes: [
              {
                type: 'Original',
                name: 'Original version',
              },
            ],
            schedule: {
              start: '2024-12-15T08:00:21Z',
              accurateStart: '2024-12-15T08:00:21Z',
              end: '2024-12-15T13:00:21Z',
            },
            serviceId: null,
            authToken: null,
            status: 'LIVE',
            warnings: null,
          },
          leadMedia: true,
        },
      };

      const result = buildSettings({
        ...mundoMediaBaseSettings,
        blocks: [mediaBlock] as MediaBlock[],
        pageType: LIVE_PAGE,
      });

      expect(result).toStrictEqual({
        mediaType: 'video',
        playerConfig: {
          appName: 'news-mundo',
          appType: 'responsive',
          autoplay: false,
          counterName: 'live_coverage.c7dkx155e626t.page',
          enableToucan: true,
          superResponsive: true,
          playlistObject: {
            holdingImageURL:
              'https://ichef.bbci.co.uk/images/ic/$recipe/p0k31t4d.jpg',
            items: [
              {
                duration: 86400,
                kind: 'programme',
                live: true,
                versionID: 'p0gh4n67',
              },
            ],
            summary: 'Toon in, kick back and relax to 100% cartoons!',
            title: 'Non-Stop Cartoons!',
          },
          product: 'news',
          statsObject: {
            destination: 'WS_NEWS_LANGUAGES',
            episodePID: undefined,
            producer: 'MUNDO',
          },
          ui: {
            controls: {
              enabled: true,
            },
            fullscreen: {
              enabled: true,
            },
            locale: {
              lang: 'es',
            },
            skin: 'classic',
            subtitles: {
              defaultOn: true,
              enabled: true,
            },
          },
        },
        showAds: false,
      });
    });

    it('Should process a live media block with service ID into a valid playlist item', () => {
      const mediaBlock = {
        type: 'liveMedia',
        model: {
          urn: 'urn:bbc:pips:sid:bbc_arabic_tv',
          title: 'BBC Arabic TV',
          type: 'episode',
          synopses: {
            short:
              'جولة إخبارية يومية تتناول أهم الأحداث العربية والعالمية في تقارير ولقاءات وتحليلات ',
            medium:
              'جولة إخبارية يومية تتناول أهم الأحداث العربية والعالمية في تقارير ولقاءات وتحليلات ',
            long: 'جولة إخبارية يومية تتناول أهم الأحداث العربية والعالمية في تقارير ولقاءات وتحليلات ',
          },
          mediaType: 'audio_video',
          imageUrlTemplate:
            'https://ichef.bbci.co.uk/images/ic/$recipe/p08b23t4.png',
          masterbrand: {
            id: 'bbc_arabic_tv',
            name: 'تلفزيون بي بي سي عربي',
            networkName: 'تلفزيون بي بي سي عربي',
            type: 'tv',
            imageUrlTemplate: 'ichef.bbci.co.uk/images/ic/$recipe/p08b23t4.png',
          },
          version: {
            vpid: 'n4pdm3cdh4',
            duration: 'PT1H',
            availabilityType: 'simulcast',
            versionTypes: [
              {
                type: 'Original',
                name: 'Original version',
              },
            ],
            schedule: null,
            serviceId: 'bbc_arabic_tv',
            authToken: null,
            status: 'LIVE',
            warnings: null,
          },
          leadMedia: true,
        },
      };

      const result = buildSettings({
        ...arabicMediaBaseSettings,
        blocks: [mediaBlock] as MediaBlock[],
        pageType: LIVE_PAGE,
      });

      expect(result).toStrictEqual({
        mediaType: 'video',
        playerConfig: {
          appName: 'news-arabic',
          appType: 'responsive',
          autoplay: false,
          counterName: 'live_coverage.cvp5r6m6mgpt.page',
          enableToucan: true,
          superResponsive: true,
          playlistObject: {
            holdingImageURL:
              'https://ichef.bbci.co.uk/images/ic/$recipe/p08b23t4.png',
            items: [
              {
                kind: 'programme',
                live: true,
                serviceID: 'bbc_arabic_tv',
              },
            ],
            summary:
              'جولة إخبارية يومية تتناول أهم الأحداث العربية والعالمية في تقارير ولقاءات وتحليلات ',
            title: 'BBC Arabic TV',
          },
          product: 'news',
          statsObject: {
            destination: 'WS_NEWS_LANGUAGES',
            episodePID: undefined,
            producer: 'ARABIC',
          },
          ui: {
            controls: {
              enabled: true,
            },
            fullscreen: {
              enabled: true,
            },
            locale: {
              lang: 'ar',
            },
            skin: 'classic',
            subtitles: {
              defaultOn: true,
              enabled: true,
            },
          },
        },
        showAds: false,
      });
    });
  });
});

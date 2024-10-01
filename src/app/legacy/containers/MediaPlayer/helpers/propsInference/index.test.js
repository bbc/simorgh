import getPlayerProps from '.';

import {
  validVideoWithCaptionBlock,
  validTransformedCPSAudioWithCaptionBlock,
  validLivePageVideoWithCaptionBlock,
} from '../../fixtureData';

describe('propsInference', () => {
  it('infers props for an Optimo article', () => {
    const props = {
      assetId: 'c881llnevmeo',
      assetType: 'articles',
      blocks: validVideoWithCaptionBlock,
      isAmp: false,
      isLegacyMedia: false,
      lang: 'pcm',
      pageType: 'mediaArticle',
      translations: {
        media: {
          duration: 'Duration',
          noJs: 'Dem no support media player for your device',
          contentExpired: 'Dis thing no dey again',
        },
        mediaAssetPage: {
          mediaPlayer: 'Foobar',
        },
      },
    };

    expect(getPlayerProps(props)).toEqual({
      blockId: undefined,
      captionBlock: validVideoWithCaptionBlock[0],
      clipId: 'p01k6msp',
      embedUrlParams: {
        isAmp: false,
        mediaId: 'c881llnevmeo/p01k6msp/pcm',
        type: 'articles',
      },
      iframeTitle: 'Foobar',
      mediaBlock: validVideoWithCaptionBlock[1],
      mediaInfo: {
        datetime: 'PT3M11S',
        duration: '03:11',
        durationSpoken: 'Duration 3,11',
        guidanceMessage: 'Contains strong language and adult humour.',
        kind: 'programme',
        rawDuration: 191,
        title: 'Five things ants can teach us about management',
        type: 'video',
      },
      placeholderSrc:
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg.webp',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01k6mtv.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01k6mtv.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01k6mtv.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01k6mtv.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01k6mtv.jpg.webp 800w',
      translatedExpiredContentMessage: 'Dis thing no dey again',
      translatedNoJSMessage: 'Dem no support media player for your device',
    });
  });

  it('infers props for a CPS asset', () => {
    const props = {
      assetId: 'pidgin/world-23252817',
      assetType: 'cps',
      blocks: validTransformedCPSAudioWithCaptionBlock,
      isAmp: false,
      isLegacyMedia: false,
      lang: 'pcm',
      pageType: 'CPS',
      translations: {
        media: {
          duration: 'Duration',
          noJs: 'Dem no support media player for your device',
          contentExpired: 'Dis thing no dey again',
        },
        mediaAssetPage: {
          mediaPlayer: 'Foobar',
        },
      },
    };

    expect(getPlayerProps(props)).toEqual({
      blockId: undefined,
      captionBlock: validTransformedCPSAudioWithCaptionBlock[0].model.blocks[2],
      clipId: 'p01mr6r9',
      embedUrlParams: {
        isAmp: false,
        mediaId: 'pidgin/world-23252817/p01mr6r9/pcm',
        type: 'cps',
      },
      iframeTitle: 'Foobar',
      mediaBlock: validTransformedCPSAudioWithCaptionBlock[0],
      mediaInfo: {
        datetime: 'PT32M41S',
        duration: '32:41',
        durationSpoken: 'Duration 32,41',
        guidanceMessage: undefined,
        kind: 'programme',
        rawDuration: 1961,
        title: 'Подкаст "Разговоры с арбитром": чемпионский парад "Ливерпуля"',
        type: 'audio',
      },
      placeholderSrc:
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01mr7dp.jpg.webp',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01mr7dp.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01mr7dp.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01mr7dp.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01mr7dp.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01mr7dp.jpg.webp 800w',
      translatedExpiredContentMessage: 'Dis thing no dey again',
      translatedNoJSMessage: 'Dem no support media player for your device',
    });
  });

  it('infers props for a Live Page asset', () => {
    const props = {
      assetId: 'c7p765ynk9qt',
      assetType: 'live',
      blocks: validLivePageVideoWithCaptionBlock,
      isAmp: false,
      isLegacyMedia: false,
      lang: 'pcm',
      pageType: 'live',
      translations: {
        media: {
          duration: 'Duration',
          noJs: 'Dem no support media player for your device',
          contentExpired: 'Dis thing no dey again',
        },
        mediaAssetPage: {
          mediaPlayer: 'Foobar',
        },
      },
    };

    expect(getPlayerProps(props)).toEqual({
      captionBlock: validLivePageVideoWithCaptionBlock[0],
      clipId: 'p01thw22',
      embedUrlParams: {
        isAmp: false,
        mediaId: 'c7p765ynk9qt/p01thw20/pcm',
        type: 'live',
      },
      iframeTitle: 'Foobar',
      mediaBlock: validLivePageVideoWithCaptionBlock[1],
      mediaInfo: {
        title:
          "BBC launch trailer for We Know Our Place women's sport campaign",
        duration: '00:54',
        durationSpoken: 'Duration 0,54',
        datetime: 'PT54S',
        type: 'video',
        guidanceMessage: undefined,
        kind: 'programme',
        rawDuration: 54,
      },
      placeholderSrc:
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01thw3g.jpg.webp',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01thw3g.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01thw3g.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01thw3g.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01thw3g.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01thw3g.jpg.webp 800w',
      translatedExpiredContentMessage: 'Dis thing no dey again',
      translatedNoJSMessage: 'Dem no support media player for your device',
    });
  });
});

import getDefaultProps from '.';

import {
  validAudioWithCaptionBlock,
  validVideoWithCaptionBlock,
  validTransformedCPSAudioWithCaptionBlock,
  validAresWebcastVideoBlock,
} from '../../../fixtureData';

describe('getDefaultProps', () => {
  it('infers values for rendering video', () => {
    const props = {
      assetId: 'c881llnevmeo',
      assetType: 'articles',
      blocks: validVideoWithCaptionBlock,
      isAmp: false,
      lang: 'pcm',
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

    expect(getDefaultProps(props)).toEqual({
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
        title: 'Five things ants can teach us about management',
        duration: '03:11',
        durationSpoken: 'Duration 3,11',
        datetime: 'PT3M11S',
        type: 'video',
        guidanceMessage: 'Contains strong language and adult humour.',
      },
      placeholderSrc:
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01k6mtv.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01k6mtv.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01k6mtv.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01k6mtv.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01k6mtv.jpg 800w',
      translatedExpiredContentMessage: 'Dis thing no dey again',
      translatedNoJSMessage: 'Dem no support media player for your device',
    });
  });

  it('infers values for rendering audio', () => {
    const props = {
      assetId: 'c881llnevmeo',
      assetType: 'articles',
      blocks: validAudioWithCaptionBlock,
      isAmp: false,
      lang: 'pcm',
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

    expect(getDefaultProps(props)).toEqual({
      blockId: undefined,
      captionBlock: validAudioWithCaptionBlock[0],
      clipId: 'p01m7d09',
      embedUrlParams: {
        isAmp: false,
        mediaId: 'c881llnevmeo/p01m7d09/pcm',
        type: 'articles',
      },
      iframeTitle: 'Foobar',
      mediaBlock: validAudioWithCaptionBlock[1],
      mediaInfo: {
        title: 'Birmingham checkout',
        duration: '02:07',
        durationSpoken: 'Duration 2,07',
        datetime: 'PT2M7S',
        type: 'audio',
        guidanceMessage: 'Contains some strong language.',
      },
      placeholderSrc:
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01k6mtv.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01k6mtv.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01k6mtv.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01k6mtv.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01k6mtv.jpg 800w',
      translatedExpiredContentMessage: 'Dis thing no dey again',
      translatedNoJSMessage: 'Dem no support media player for your device',
    });
  });

  it('infers values for rendering CPS audio', () => {
    const props = {
      assetId: 'pidgin/world-23252817',
      assetType: 'cps',
      blocks: validTransformedCPSAudioWithCaptionBlock,
      isAmp: false,
      lang: 'pcm',
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

    expect(getDefaultProps(props)).toEqual({
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
        title: 'Подкаст "Разговоры с арбитром": чемпионский парад "Ливерпуля"',
        duration: '32:41',
        durationSpoken: 'Duration 32,41',
        datetime: 'PT32M41S',
        type: 'audio',
        guidanceMessage: undefined,
      },
      placeholderSrc:
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01mr7dp.jpg',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01mr7dp.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01mr7dp.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01mr7dp.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01mr7dp.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01mr7dp.jpg 800w',
      translatedExpiredContentMessage: 'Dis thing no dey again',
      translatedNoJSMessage: 'Dem no support media player for your device',
    });
  });

  it('uses the default prompt messages when missing in translations', () => {
    const props = {
      assetId: 'c881llnevmeo',
      assetType: 'articles',
      blocks: validVideoWithCaptionBlock,
      isAmp: false,
      lang: 'pcm',
      translations: {
        media: {
          duration: 'Duration',
        },
        mediaAssetPage: {
          mediaPlayer: 'Foobar',
        },
      },
    };

    expect(getDefaultProps(props)).toEqual({
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
        title: 'Five things ants can teach us about management',
        duration: '03:11',
        durationSpoken: 'Duration 3,11',
        datetime: 'PT3M11S',
        type: 'video',
        guidanceMessage: 'Contains strong language and adult humour.',
      },
      placeholderSrc:
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01k6mtv.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01k6mtv.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01k6mtv.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01k6mtv.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01k6mtv.jpg 800w',
      translatedExpiredContentMessage: 'This content is no longer available',
      translatedNoJSMessage:
        'This video cannot play in your browser. Please enable JavaScript or try a different browser.',
    });
  });

  it('sets the media block to null where aresMedia is missing in the blocks', () => {
    const props = {
      assetId: 'c881llnevmeo',
      assetType: 'articles',
      blocks: [],
      isAmp: false,
      lang: 'pcm',
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

    expect(getDefaultProps(props)).toEqual({ mediaBlock: null });
  });

  it('infers values for rendering webcast video', () => {
    const props = {
      assetId: 'c881llnevmeo',
      assetType: 'articles',
      blocks: [validAresWebcastVideoBlock],
      isAmp: false,
      lang: 'pcm',
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

    expect(getDefaultProps(props)).toEqual({
      blockId: undefined,
      clipId: 'p01k6msp',
      captionBlock: undefined,
      embedUrlParams: {
        isAmp: false,
        mediaId: 'c881llnevmeo/p01k6msp/pcm',
        type: 'articles',
      },
      iframeTitle: 'Foobar',
      mediaBlock: validAresWebcastVideoBlock,
      mediaInfo: {
        title: 'Five things ants can teach us about management',
        duration: '03:11',
        durationSpoken: 'Duration 3,11',
        datetime: 'PT3M11S',
        type: 'video',
        guidanceMessage: 'Contains strong language and adult humour.',
      },
      placeholderSrc:
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01k6mtv.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01k6mtv.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01k6mtv.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01k6mtv.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01k6mtv.jpg 800w',
      translatedExpiredContentMessage: 'Dis thing no dey again',
      translatedNoJSMessage: 'Dem no support media player for your device',
    });
  });
});

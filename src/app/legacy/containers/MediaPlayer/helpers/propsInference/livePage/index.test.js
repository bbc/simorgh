import getLivePageProps from '.';

import { validLivePageVideoWithCaptionBlock } from '../../../fixtureData';

describe('getLivePageProps', () => {
  it('infers values for rendering video', () => {
    const props = {
      assetId: 'c7p765ynk9qt',
      assetType: 'live',
      blocks: validLivePageVideoWithCaptionBlock,
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

    expect(getLivePageProps(props)).toEqual({
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
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01thw3g.jpg',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01thw3g.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01thw3g.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01thw3g.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01thw3g.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01thw3g.jpg 800w',
      translatedExpiredContentMessage: 'Dis thing no dey again',
      translatedNoJSMessage: 'Dem no support media player for your device',
    });
  });

  it('uses the default prompt messages when missing in translations', () => {
    const props = {
      assetId: 'c7p765ynk9qt',
      assetType: 'live',
      blocks: validLivePageVideoWithCaptionBlock,
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

    expect(getLivePageProps(props)).toEqual({
      blockId: undefined,
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
        'https://ichef.test.bbci.co.uk/images/ic/512xn/p01thw3g.jpg',
      placeholderSrcset:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01thw3g.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01thw3g.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01thw3g.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01thw3g.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01thw3g.jpg 800w',
      translatedExpiredContentMessage: 'This content is no longer available',
      translatedNoJSMessage:
        'This video cannot play in your browser. Please enable JavaScript or try a different browser.',
    });
  });

  it('sets the media block to null where aresMedia is missing in the blocks', () => {
    const props = {
      assetId: 'c7p765ynk9qt',
      assetType: 'live',
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

    expect(getLivePageProps(props)).toEqual({ mediaBlock: null });
  });
});

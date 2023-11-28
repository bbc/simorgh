import getDefaultProps from '.';

import { validVideoWithCaptionBlock } from '../../../fixtureData';

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
});

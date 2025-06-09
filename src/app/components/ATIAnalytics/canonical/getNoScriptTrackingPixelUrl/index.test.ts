import getNoScriptTrackingPixelUrl from '.';
import { ReverbBeaconConfig } from '../../types';

const mockReverbParams = {
  params: {
    env: 'live',
    page: {
      contentId: 'urn:bbc:optimo:asset:cj9ed704jjeo',
      contentType: 'article',
      destination: 'WS_NEWS_LANGUAGES',
      name: 'gahuza.articles.cj9ed704jjeo.page',
      producer: 'GAHUZA',
      additionalProperties: {
        app_name: 'news-gahuza',
        app_type: 'responsive',
        content_language: 'rw',
        product_platform: null,
        referrer_url: null,
        x5: null,
        x8: 'simorgh',
        x9: 'Imbonezamirire:%20Ibiryo%20bitunganyije%20cyane%20bishobora%20kuba%20bifitanye%20isano%20no%20gupfa%20hakiri%20kare',
        x10: null,
        x11: '2025-05-01T07:52:32.280Z',
        x12: '2025-05-01T07:52:32.280Z',
        x13: 'Life~Food~Food+safety~Diet+&+nutrition',
        x14: '0239ab33-1cfc-4f5d-babb-a8159711af3e~99fb9bbd-9150-4e13-a3ac-3fa0610683f8~a9a254fe-0059-441c-9d75-fab5997d371e~b5a68823-bb0c-4229-b142-d6d5e09e113f',
        x16: '',
        x17: 'Life~Food~Food+safety~Diet+&+nutrition',
        x18: null,
      },
    },
    user: { isSignedIn: false },
  },
  eventDetails: { eventName: 'pageView' },
} as unknown as ReverbBeaconConfig;

describe('trackingPixelUrl', () => {
  it('should return the correct tracking pixel URL', () => {
    const { origin, pathname, searchParams } = new URL(
      getNoScriptTrackingPixelUrl(mockReverbParams),
    );

    expect(origin).toEqual('https://a1.api.bbc.co.uk');
    expect(pathname).toEqual('/hit.xiti');
    expect(Object.fromEntries(searchParams)).toStrictEqual({
      s: '598342',
      s2: '40',
      p: 'gahuza.articles.cj9ed704jjeo.page',
      x1: '[urn:bbc:optimo:asset:cj9ed704jjeo]',
      x2: '[responsive]',
      x3: '[news-gahuza]',
      x4: '[rw]',
      x7: '[article]',
      x8: '[simorgh-nojs]',
      x9: '[Imbonezamirire:%20Ibiryo%20bitunganyije%20cyane%20bishobora%20kuba%20bifitanye%20isano%20no%20gupfa%20hakiri%20kare]',
      x11: '[2025-05-01T07:52:32.280Z]',
      x12: '[2025-05-01T07:52:32.280Z]',
      x13: '[Life~Food~Food+safety~Diet+&+nutrition]',
      x14: '[0239ab33-1cfc-4f5d-babb-a8159711af3e~99fb9bbd-9150-4e13-a3ac-3fa0610683f8~a9a254fe-0059-441c-9d75-fab5997d371e~b5a68823-bb0c-4229-b142-d6d5e09e113f]',
      x17: '[Life~Food~Food+safety~Diet+&+nutrition]',
    });
  });
});

import trackingPixelUrl from '.';
import { reverbUrlHelper } from '@bbc/reverb-url-helper';
const mockReverbParams = {
  params: {
    page: {
      contentId: 'urn:bbc:optimo:c0000000001o',
      contentType: 'article',
      destination: 'WS_NEWS_LANGUAGES_TEST',
      name: 'news.articles.c0000000001o.page',
      producer: 'atiAnalyticsProducerName',
      additionalProperties: {
        app_name: 'atiAnalyticsAppName',
        app_type: 'responsive',
        content_language: 'en-gb',
        product_platform: null,
        referrer_url: null,
        x5: 'http%3A%2F%2Flocalhost%2F',
        x8: 'simorgh',
        x9: 'Article%20Headline%20for%20SEO',
        x10: null,
        x11: '2018-01-01T12:01:00.000Z',
        x12: '2018-01-01T14:00:00.000Z',
        x13: 'Royal+Wedding+2018~Duchess+of+Sussex',
        x14: '2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc',
        x16: '',
        x17: 'Royal+Wedding+2018~Duchess+of+Sussex',
        x18: false,
      },
    },
    user: { isSignedIn: false },
  },
  eventDetails: { eventName: 'pageView' },
};
describe('trackingPixelUrl', () => {
  it('should return the correct tracking pixel URL', () => {
    const expectedUrl = reverbUrlHelper.getTrackingPixelSrc(mockReverbParams);
    expect(trackingPixelUrl(mockReverbParams)).toEqual(expectedUrl);
  });
});

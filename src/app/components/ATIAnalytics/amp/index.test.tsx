/* eslint-disable no-template-curly-in-string */
import { render } from '../../react-testing-library-with-providers';
import AmpATIAnalytics from '.';
import { ReverbBeaconConfig } from '../types';
import splitUrl from '../atiUrl/splitUrl';

describe('Amp ATI Analytics', () => {
  const atiBaseUrl = 'https://foobar.com?';

  beforeEach(() => {
    jest.resetModules();
  });

  it('creates an AMP analytics container with required parameters', () => {
    process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;

    const { container } = render(
      <AmpATIAnalytics pageviewParams="key1=value1&key2=value2" />,
    );

    expect(container.querySelectorAll('amp-analytics').length).toEqual(1);
    expect(
      container.querySelectorAll(
        'amp-analytics script[type="application/json"]',
      ).length,
    ).toEqual(1);
    expect(
      container.querySelector('amp-analytics script[type="application/json"]')
        ?.innerHTML,
    ).toMatch(atiBaseUrl);
  });

  it('creates an AMP analytics container with required parameters when the reverbParams prop is provided', () => {
    const mockReverbParams = {
      params: {
        env: 'test',
        page: {
          contentId: 'urn:bbc:optimo:asset:cly1jw4x585o',
          contentType: 'article',
          destination: 'WS_NEWS_LANGUAGES_TEST',
          name: 'gahuza.articles.cly1jw4x585o.page',
          producer: 'GAHUZA',
          additionalProperties: {
            app_name: 'news-gahuza',
            app_type: 'amp',
            content_language: 'rw',
            product_platform: null,
            referrer_url: '${documentReferrer}',
            x5: '${sourceUrl}',
            x8: 'simorgh',
            x9: "US%20irashishikariza%20u%20Rwanda%20na%20DR%20Congo%20kugera%20ku%20mahoro%20bikazana%20n'ishoramari%20rya%20miliyari%20z'amadorari",
            x10: null,
            x11: '2025-05-02T07:00:25.419Z',
            x12: '2025-05-02T07:00:25.419Z',
            x13: 'Democratic+Republic+of+Congo~Rwanda~March+23+Movement~M23+offensive',
            x14: '3548f44f-46f5-4e6e-8628-3f668f161691~8125f2a9-3259-4f35-ab75-d9a6577fdc88~b03e7bfd-9a46-4053-aeed-f9f55f5e5567~c78c7532-43b3-490d-ad5b-0fc47b906e42',
            x16: '',
            x17: 'Democratic+Republic+of+Congo~Rwanda~March+23+Movement~M23+offensive',
            x18: null,
          },
        },
        user: {
          isSignedIn: false,
        },
      },
      eventDetails: {
        eventName:
          'pageView' as ReverbBeaconConfig['eventDetails']['eventName'],
      },
    };

    const { container } = render(
      <AmpATIAnalytics
        pageviewParams="key1=value1&key2=value2"
        reverbParams={mockReverbParams}
      />,
    );

    const ampAnalyticsComponents = container.querySelectorAll(
      'amp-analytics script[type="application/json"]',
    );
    const ampAnalyticsConfiguration = ampAnalyticsComponents[0]?.innerHTML;

    const {
      requests: { base, pageview },
    } = JSON.parse(ampAnalyticsConfiguration);
    const pageViewUrl = pageview.replace('${base}', base);

    expect(ampAnalyticsComponents.length).toEqual(1);
    expect(base).toEqual('https://logws1363.ati-host.net/hit.xiti?');
    expect(splitUrl(pageViewUrl)).toEqual([
      'https://logws1363.ati-host.net/hit.xiti',
      's=598343',
      's2=40',
      'p=gahuza.articles.cly1jw4x585o.page',
      'r=${screenWidth}x${screenHeight}x${screenColorDepth}',
      're=${availableScreenWidth}x${availableScreenHeight}',
      'hl=${timestamp}',
      'lng=${browserLanguage}',
      'x1=[urn%3Abbc%3Aoptimo%3Aasset%3Acly1jw4x585o]',
      'x2=[amp]',
      'x3=[news-gahuza]',
      'x4=[rw]',
      'x5=[${sourceUrl}]',
      'x6=[${documentReferrer}]',
      'x7=[article]',
      'x8=[simorgh]',
      "x9=[US%2520irashishikariza%2520u%2520Rwanda%2520na%2520DR%2520Congo%2520kugera%2520ku%2520mahoro%2520bikazana%2520n'ishoramari%2520rya%2520miliyari%2520z'amadorari]",
      'x11=[2025-05-02T07%3A00%3A25.419Z]',
      'x12=[2025-05-02T07%3A00%3A25.419Z]',
      'x13=[Democratic%2BRepublic%2Bof%2BCongo~Rwanda~March%2B23%2BMovement~M23%2Boffensive]',
      'x14=[3548f44f-46f5-4e6e-8628-3f668f161691~8125f2a9-3259-4f35-ab75-d9a6577fdc88~b03e7bfd-9a46-4053-aeed-f9f55f5e5567~c78c7532-43b3-490d-ad5b-0fc47b906e42]',
      'x17=[Democratic%2BRepublic%2Bof%2BCongo~Rwanda~March%2B23%2BMovement~M23%2Boffensive]',
      'ref=${documentReferrer}',
    ]);
  });
});

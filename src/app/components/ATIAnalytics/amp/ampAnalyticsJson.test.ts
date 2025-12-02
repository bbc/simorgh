/* eslint-disable no-template-curly-in-string */
import { getExpectedAtiDestination } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/helpers';
import { ReverbBeaconConfig } from '../types';
import ampAnalyticsJson from './ampAnalyticsJson';

describe('AMP ATI Analytics', () => {
  it('should match this JSON structure', () => {
    expect(
      ampAnalyticsJson({
        baseUrl: 'https://exampleBaseAtiUrl.com?',
        pageviewParams: 'param1=value1&param2=value2',
      }),
    ).toEqual({
      transport: {
        beacon: false,
        xhrpost: false,
        image: true,
      },
      requests: {
        base: 'https://exampleBaseAtiUrl.com?',
        pageview: '${base}param1=value1&param2=value2', // eslint-disable-line no-template-curly-in-string
      },
      triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
    });
  });

  describe('Reverb URL Helper - getAmpAnalyticsPageViewUrl', () => {
    const mockReverbParams = {
      params: {
        page: {
          contentId: 'urn:bbc:optimo:asset:cly1jw4x585o',
          contentType: 'article',
          name: 'gahuza.articles.cly1jw4x585o.page',
          producer: 'GAHUZA',
          additionalProperties: {
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

    it.each`
      environment | destination                  | appName                | service           | baseUrl
      ${'local'}  | ${'WS_NEWS_LANGUAGES_TEST'}  | ${'news-gahuza'}       | ${'gahuza'}       | ${'https://logws1363.ati-host.net/hit.xiti?'}
      ${'test'}   | ${'WS_NEWS_LANGUAGES_TEST'}  | ${'news-gahuza'}       | ${'gahuza'}       | ${'https://logws1363.ati-host.net/hit.xiti?'}
      ${'live'}   | ${'WS_NEWS_LANGUAGES'}       | ${'news-gahuza'}       | ${'gahuza'}       | ${'https://a1.api.bbc.co.uk/hit.xiti?'}
      ${'live'}   | ${'NEWS_PS'}                 | ${'news'}              | ${'news'}         | ${'https://a1.api.bbc.co.uk/hit.xiti?'}
      ${'test'}   | ${'NEWS_PS_TEST'}            | ${'news'}              | ${'news'}         | ${'https://logws1363.ati-host.net/hit.xiti?'}
      ${'live'}   | ${'NEWS_LANGUAGES_PS'}       | ${'news-cymrufyw'}     | ${'cymrufyw'}     | ${'https://a1.api.bbc.co.uk/hit.xiti?'}
      ${'test'}   | ${'NEWS_LANGUAGES_PS_TEST'}  | ${'news-cymrufyw'}     | ${'cymrufyw'}     | ${'https://logws1363.ati-host.net/hit.xiti?'}
      ${'live'}   | ${'NEWS_LANGUAGES_PS'}       | ${'news-naidheachdan'} | ${'naidheachdan'} | ${'https://a1.api.bbc.co.uk/hit.xiti?'}
      ${'test'}   | ${'NEWS_LANGUAGES_PS_TEST'}  | ${'news-naidheachdan'} | ${'naidheachdan'} | ${'https://logws1363.ati-host.net/hit.xiti?'}
      ${'live'}   | ${'HOMEPAGE_PS'}             | ${'scotland'}          | ${'scotland'}     | ${'https://a1.api.bbc.co.uk/hit.xiti?'}
      ${'test'}   | ${'HOMEPAGE_PS_TEST'}        | ${'scotland'}          | ${'scotland'}     | ${'https://logws1363.ati-host.net/hit.xiti?'}
      ${'live'}   | ${'NEWSROUND'}               | ${'newsround'}         | ${'newsround'}    | ${'https://a1.api.bbc.co.uk/hit.xiti?'}
      ${'test'}   | ${'NEWSROUND_TEST'}          | ${'newsround'}         | ${'newsround'}    | ${'https://logws1363.ati-host.net/hit.xiti?'}
      ${'live'}   | ${'SPORT_PS'}                | ${'sport'}             | ${'sport'}        | ${'https://a1.api.bbc.co.uk/hit.xiti?'}
      ${'test'}   | ${'SPORT_PS_TEST'}           | ${'sport'}             | ${'sport'}        | ${'https://logws1363.ati-host.net/hit.xiti?'}
      ${'live'}   | ${'NEWS_LANGUAGES_GNL'}      | ${'news-japanese'}     | ${'japanese'}     | ${'https://a1.api.bbc.co.uk/hit.xiti?'}
      ${'test'}   | ${'NEWS_LANGUAGES_GNL_TEST'} | ${'news-japanese'}     | ${'japanese'}     | ${'https://logws1363.ati-host.net/hit.xiti?'}
    `(
      'should match this JSON structure for destination - $destination and app name - $appName in environment - $environment',
      ({ environment, destination, appName, service, baseUrl }) => {
        const reverbParams = {
          ...mockReverbParams,
          params: {
            ...mockReverbParams.params,
            env: environment,
            page: {
              ...mockReverbParams.params.page,
              destination,
              additionalProperties: {
                ...mockReverbParams.params.page.additionalProperties,
                app_name: appName,
              },
            },
          },
        };

        const expectedDestination = getExpectedAtiDestination({
          service,
          applicationEnv: environment,
        });

        const expectedPageViewParams = [
          `\${base}s=${expectedDestination}`,
          's2=40',
          'p=gahuza.articles.cly1jw4x585o.page',
          'r=${screenWidth}x${screenHeight}x${screenColorDepth}',
          're=${availableScreenWidth}x${availableScreenHeight}',
          'hl=${timestamp}',
          'lng=${browserLanguage}',
          'x1=[urn%3Abbc%3Aoptimo%3Aasset%3Acly1jw4x585o]',
          'x2=[amp]',
          `x3=[${appName}]`,
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
        ];

        const ampAnalyticsJsonConfiguration = ampAnalyticsJson({
          baseUrl: 'https://exampleBaseAtiUrl.com?',
          pageviewParams: 'param1=value1&param2=value2',
          reverbParams,
        });
        const {
          requests: { base, pageview },
        } = ampAnalyticsJsonConfiguration;
        const parsedPageView = pageview.split('&');

        expect(ampAnalyticsJsonConfiguration).toEqual({
          transport: {
            beacon: false,
            xhrpost: false,
            image: true,
          },
          requests: {
            base: `${baseUrl}`,
            pageview: expectedPageViewParams.join('&'),
          },
          triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
        });

        expect(base).toEqual(`${baseUrl}`);

        expect(parsedPageView).toEqual(expectedPageViewParams);
      },
    );
  });
});

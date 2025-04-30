import React from 'react';
import { Helmet } from 'react-helmet';
import {
  render,
  act,
} from '#app/components/react-testing-library-with-providers';
import * as isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { addSendStaticBeaconToWindow } from '#app/components/ATIAnalytics/canonical/staticBeacon';
import * as beacon from '../../../lib/analyticsUtils/sendBeacon';
import CanonicalATIAnalytics from '.';
import * as renderNoScriptTrackingPixelModule from './index'

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const atiBaseUrl = 'https://foobar.com?';
  const mockPageviewParams = 'key=value&key2=value2&x8=[simorgh]';
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
  const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');
  process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;
  // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
  beacon.default = mockSendBeacon;

  it('calls atiBaseURL and sendBeacon with required params', () => {
    const expectedUrl = `${atiBaseUrl}${mockPageviewParams}`;
    const reverbConfig = undefined;

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    expect(mockSendBeacon).toHaveBeenCalledTimes(1);
    expect(mockSendBeacon).toHaveBeenCalledWith(expectedUrl, reverbConfig);
  });

  it('should render sendStaticBeacon Helmet script for canonical', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => false);

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    const helmet = Helmet.peek();

    expect(helmet.scriptTags).toHaveLength(2);
    expect(helmet.scriptTags[0].innerHTML).toEqual(
      addSendStaticBeaconToWindow(),
    );
  });

  it('should not send beacon when browser is Opera Mini', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => true);

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    expect(mockSendBeacon).not.toHaveBeenCalled();
  });

  it('should render a noscript image for non-JS users', () => {
    const { container } = render(
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />,
    );
    expect(container.querySelector('noscript')).toBeInTheDocument();
  });

  it('should render a noscript tracking pixel for non-JS users', () => {
    const { container } = render(
      <CanonicalATIAnalytics
        reverbParams={mockReverbParams}
        pageviewParams={mockPageviewParams}
      />,
    );
    const image = container.querySelector('noscript');
    console.log(container.innerHTML);
    expect(container.querySelector('noscript')).toBeInTheDocument();
    expect(image?.getAttribute('src')).toEqual('');
  });

  it('should invoke renderNoScriptTrackingPixel with the correct values', () => {
    const spy = jest.spyOn(renderNoScriptTrackingPixelModule, 'default')

  render(
    <CanonicalATIAnalytics
      reverbParams={mockReverbParams}
      pageviewParams={mockPageviewParams}
    />,
  );
 expect(spy).toHaveBeenCalledWith(mockReverbParams)
});
});

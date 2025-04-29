import React from 'react';
import { Helmet } from 'react-helmet';
import {
  render,
  act,
} from '#app/components/react-testing-library-with-providers';
import * as isOperaProxy from '#app/lib/utilities/isOperaProxy';
import * as beacon from '../../../lib/analyticsUtils/sendBeacon';
import CanonicalATIAnalytics from '.';

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const atiBaseUrl = 'https://foobar.com?';
  const mockPageviewParams = 'key=value&key2=value2&x8=[simorgh]';
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

  it('should render lite Helmet script when isLite is true', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => false);

    const expectedUrl = `${atiBaseUrl}${mockPageviewParams}`;

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />, {
        isLite: true,
      });
    });

    const helmet = Helmet.peek();

    expect(helmet.scriptTags).toHaveLength(1);
    expect(helmet.scriptTags[0].innerHTML).toEqual(`
    function sendBeaconLite (atiPageViewUrlString) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", atiPageViewUrlString, true);
        xhr.withCredentials = true;
        xhr.send();
    }
    
    sendBeaconLite("${expectedUrl}");
`);
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
});

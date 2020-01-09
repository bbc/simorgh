import React from 'react';
import { act, render as create } from '@testing-library/react';
import { mount, render } from 'enzyme';
import CanonicalATIAnalytics from '.';
import * as beacon from '#lib/analyticsUtils/sendBeacon';

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const atiBaseUrl = 'https://foobar.com?';
  const mockPageviewParams = 'key=value&key2=value2&x8=[simorgh]';
  const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');

  it('calls atiBaseURL and sendBeacon with required params', () => {
    const expectedUrl = `${atiBaseUrl}${mockPageviewParams}`;

    process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;
    beacon.default = mockSendBeacon;

    act(() => {
      create(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    expect(mockSendBeacon).toHaveBeenCalledTimes(1);
    expect(mockSendBeacon).toHaveBeenCalledWith(expectedUrl);
  });

  it('should render a noscript image for non-JS users', () => {
    const renderedATI = render(
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />,
    );
    expect(renderedATI).toMatchSnapshot();
  });

  it('atiPageViewUrl should contain `x8=[simorgh-nojs]` for non-JS users', () => {
    const mountedATI = mount(
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />,
    );

    expect(mountedATI.find('img').prop('src')).toEqual(
      'https://foobar.com?key=value&key2=value2&x8=[simorgh-nojs]',
    );
  });
});

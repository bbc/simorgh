import React from 'react';
import { node } from 'prop-types';
import renderer from 'react-test-renderer';
import CanonicalATIAnalytics from '.';

import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import * as beacon from '../../../lib/analyticsUtils/sendBeacon';

const ContextWrap = ({ children }) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      isUK
      lang="en-gb"
      platform="canonical"
      origin="https://www.test.bbc.co.uk"
      pageType="article"
      service="news"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o.page"
      articleData={{}}
    >
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

ContextWrap.propTypes = {
  children: node.isRequired,
};

const mockPageviewParams = 'key=value&key2=value2';

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  shouldMatchSnapshot(
    'should render correctly',
    <ContextWrap>
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />
    </ContextWrap>,
  );

  it('should call sendBeacon function with the ATI url', () => {
    const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');
    beacon.default = mockSendBeacon;

    renderer.create(
      <ContextWrap>
        <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />
      </ContextWrap>,
    );

    expect(mockSendBeacon).toHaveBeenCalledTimes(1);
    expect(mockSendBeacon).toHaveBeenCalledWith(
      'https://a1.api.bbc.co.uk/hit.xiti?key=value&key2=value2',
    );
  });
});

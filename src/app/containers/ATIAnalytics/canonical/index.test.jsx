/* TODO undo this disable */
/* eslint-disable */
import React from 'react';
import renderer from  'react-test-renderer';
import CanonicalATIAnalytics from '.';

import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';

const ContextWrap = props => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      isUK={true}
      platform='canonical'
      origin='https://www.test.bbc.co.uk'
      service='news'
      statsDestination='NEWS_PS_TEST'
      statsPageIdentifier='news.articles.c0000000000o.page'
      articleData={{}}
    >
      {props.children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

const mockPageviewParams = 'key=value&key2=value2';

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  shouldMatchSnapshot('should render correctly',
  <ContextWrap><CanonicalATIAnalytics pageviewParams={mockPageviewParams} /></ContextWrap>);

  xit('should call sendBeacon function with the ATI url', () => {
    const sendBeacon = require('../../../lib/analyticsUtils/sendBeacon').default;
    const mock = jest.fn().mockReturnValue('foobar');
    sendBeacon = mock;
    renderer.create(<ContextWrap><CanonicalATIAnalytics pageviewParams={mockPageviewParams} /></ContextWrap>);
    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(sendBeacon).toHaveBeenCalledWith('https://a1.api.bbc.co.uk/hit.xiti?key=value&key2=value2');
  });
});

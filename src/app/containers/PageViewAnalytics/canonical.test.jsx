/* TODO undo this disable */
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
// import sendBeacon from './sendBeacon';

const ContextWrap = props => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      platform="canonical"
      bbcOrigin="https://www.test.bbc.co.uk"
      service="news"
      statsDestination="NEWS_PS_TEST"
      articleData={{}}
    >
      {props.children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

let container;

xdescribe('Canonical Consent Banner Container', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render privacy banner when both banners are set to be shown', () => {
    jest.mock('./atiPageViewParams', () => jest.fn());
    jest.mock('../../../lib/analyticsUtils/sendBeacon', () => jest.fn());

    const sendBeacon = require('../../../lib/analyticsUtils/sendBeacon');
    const atiPageViewParams = require('./atiUrl');

    atiPageViewParams.mockImplementation(
      ({ articleData }) => `beaconFor${articleData.promo.id}`,
    );

    const CanonicalPageViewAnalytics = require('./canonical').default;

    const articleData = {
      promo: {
        id: '1111111',
      },
    };

    act(() => {
      ReactDOM.render(
        <ContextWrap>
          <CanonicalPageViewAnalytics articleData={articleData} />
        </ContextWrap>,
        container,
      );
    });

    expect(container.innerHTML).toBe('');
    expect(atiPageViewParams).toHaveBeenCalledWith({"articleData": {"promo": {"id": "1111111"}}, "env": "live", "isUK": true, "platform": "canonical", "service": "news"});

    expect(sendBeacon).toHaveBeenCalledWith('beaconFor1111111');

    act(() => {
      articleData.promo.id = '2222222';
    });

    expect(atiPageViewParams).toHaveBeenCalledWith({"articleData": {"promo": {"id": "2222222"}}, "env": "live", "isUK": true, "platform": "canonical", "service": "news"});
  });
});

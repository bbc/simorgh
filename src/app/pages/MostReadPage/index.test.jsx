import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import MostReadPage from '.';
import pidginMostReadData from '#data/pidgin/mostRead';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';

fetch.mockResponse(JSON.stringify(pidginMostReadData));

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const MostReadPageWithContext = () => (
  <ToggleContextProvider service="pidgin" origin="https://www.test.bbc.com">
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.com"
        isAmp={false}
        pageType="mostRead"
        pathname="/pathname"
        service="pidgin"
        statusCode={200}
      >
        <BrowserRouter>
          <MostReadPage pageData={pidginMostReadData} />
        </BrowserRouter>
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContextProvider>
);

describe('Most Read Page Main', () => {
  it('should match snapshot for most read page', async () => {
    await matchSnapshotAsync(<MostReadPageWithContext />);
  });

  it('shoulder render most read page', async () => {
    let container;
    await act(async () => {
      container = await render(<MostReadPageWithContext />).container;
    });

    expect(container.querySelector('h1').textContent).toEqual(
      'De one we dem de read well well',
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container.querySelectorAll('li a').length).toEqual(10);
  });
});

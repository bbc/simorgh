import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import MostReadPage from '.';
import pidginMostReadData from '#data/pidgin/mostRead';
import * as analyticsUtils from '#lib/analyticsUtils';

fetch.mockResponse(JSON.stringify(pidginMostReadData));

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const MostReadPageWithContext = () => (
  <BrowserRouter>
    <MostReadPage
      pageData={pidginMostReadData}
      bbcOrigin="https://www.test.bbc.com"
      isAmp={false}
      pageType="mostRead"
      pathname="/pathname"
      service="pidgin"
      status={200}
    />
  </BrowserRouter>
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
    expect(container.querySelectorAll('ol li a').length).toEqual(10);
  });
});

import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import MostWatchedPage from './MostWatchedPage';

const MostWatchedPageWithContext = () => (
  <ServiceContextProvider service="pidgin">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      isAmp={false}
      pageType="mostWatched"
      pathname="/pathname"
      service="pidgin"
      statusCode={200}
    >
      <BrowserRouter>
        <MostWatchedPage />
      </BrowserRouter>
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('Most Watched Page Main', () => {
  it('should match snapshot for most watched page', async () => {
    await matchSnapshotAsync(<MostWatchedPageWithContext />);
  });

  it('shoulder render most watched page', async () => {
    let container;
    await act(async () => {
      container = await render(<MostWatchedPageWithContext />).container;
    });

    expect(container.querySelector('h1').textContent).toEqual(
      'De one we dem don look',
    );
  });
});

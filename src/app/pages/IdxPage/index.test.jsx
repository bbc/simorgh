import React from 'react';
import { act, render } from '@testing-library/react';
import IdxPage from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import persianMostReadData from '#data/persian/mostRead';

const IDXPageWithContext = () => (
  <ToggleContextProvider service="pidgin" origin="https://www.test.bbc.com">
    <RequestContextProvider
      pageType="IDX"
      service="persian"
      pathname="/pathname"
      data={{ status: 200 }}
      isAmp={false}
    >
      <ServiceContextProvider service="persian">
        <IdxPage />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

describe('IdxPage', () => {
  beforeEach(async () => {
    fetch.mockResponse(JSON.stringify(persianMostReadData));
  });

  describe('Snapshots', () => {
    it('should render a persian idx page correctly with most read', async () => {
      let container = null;
      await act(async () => {
        container = render(<IDXPageWithContext />).container;
      });

      expect(container).toMatchSnapshot();
    });
  });
});

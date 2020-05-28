import React from 'react';
import { render } from '@testing-library/react';
import IdxPage from '.';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const requestContextData = {
  isAmp: false,
  pageType: 'IDX',
  service: 'persian',
  pathname: '/pathname',
  data: { status: 200 },
};

const IdxPageWithContext = () => (
  <RequestContextProvider {...requestContextData}>
    <ServiceContextProvider service="pidgin">
      <IdxPage pageData={persianAfghanistanIdxData} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('IdxPage', () => {
  describe('Snapshots', () => {
    it('should render an IDX page correctly', () => {
      const container = render(<IdxPageWithContext />);
      expect(container).toMatchSnapshot();
    });
  });
});

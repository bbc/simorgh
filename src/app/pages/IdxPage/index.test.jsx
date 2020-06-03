import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import IdxPage from '.';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

// eslint-disable-next-line react/prop-types
const IdxPageWithContext = ({ service = 'persian' }) => (
  <BrowserRouter>
    <ToggleContextProvider service={service} origin="https://www.test.bbc.com">
      <RequestContextProvider
        pageType="IDX"
        service={service}
        pathname="/pathname"
        data={{ status: 200 }}
        isAmp={false}
      >
        <ServiceContextProvider service={service}>
          <IdxPage pageData={persianAfghanistanIdxData} />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </BrowserRouter>
);

describe('IdxPage', () => {
  describe('Snapshots', () => {
    it('should render an IDX page correctly', () => {
      const container = render(<IdxPageWithContext />);
      expect(container).toMatchSnapshot();
    });

    it('should render idx page sections', async () => {
      const { container } = render(<IdxPageWithContext />);

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(2);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});

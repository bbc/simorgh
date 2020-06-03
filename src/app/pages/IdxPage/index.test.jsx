import React from 'react';
import { render } from '@testing-library/react';
import IdxPage from '.';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const IdxPageWithContext = () => (
  <ServiceContextProvider service="persian">
    <IdxPage pageData={persianAfghanistanIdxData} />
  </ServiceContextProvider>
);

describe('IdxPage', () => {
  describe('Snapshots', () => {
    it('should render an IDX page correctly', () => {
      const container = render(<IdxPageWithContext />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
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

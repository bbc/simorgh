import React from 'react';
import { render, act } from '@testing-library/react';

import persianMostReadData from '#data/persian/mostRead';
import IdxPageWithContext from './testHelpers';

describe('IdxPage', () => {
  beforeEach(async () => {
    fetch.mockResponse(JSON.stringify(persianMostReadData));
  });

  describe('Snapshots', () => {
    it('should render a persian idx page correctly with most read', async () => {
      let container = null;
      await act(async () => {
        container = render(<IdxPageWithContext />).container;
      });

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

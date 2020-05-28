import React from 'react';
import { act, render } from '@testing-library/react';
import persianMostReadData from '#data/persian/mostRead';
import IDXPageWithContext from './testHelpers';

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

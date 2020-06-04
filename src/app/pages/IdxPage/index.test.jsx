import React from 'react';
import { render, act } from '@testing-library/react';
import persianMostReadData from '#data/persian/mostRead';
import IdxPageWithContext from './testHelpers';
import persianAfghanistanIdxData from '#data/persian/afghanistan';

jest.mock('#containers/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

let container;

describe('IdxPage', () => {
  beforeEach(async () => {
    fetch.mockResponse(JSON.stringify(persianMostReadData));

    container = null;
    await act(async () => {
      container = render(
        <IdxPageWithContext pageData={persianAfghanistanIdxData} />,
      ).container;
    });
  });

  describe('Snapshots', () => {
    it('should render a persian idx page correctly with most read', async () => {
      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should render idx page sections', async () => {
      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(3);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});

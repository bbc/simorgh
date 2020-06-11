import React from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import dariRadioScheduleData from '#data/persian/bbc_dari_radio/schedule.json';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import persianMostReadData from '#data/persian/mostRead';
import IdxPageWithContext from './testHelpers';

fetchMock.config.overwriteRoutes = false; // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration allows us to mock the same endpoint multiple times

jest.mock('#containers/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

let container;

describe('IdxPage', () => {
  beforeEach(async () => {
    fetchMock.restore();
    fetchMock.mock(
      'http://localhost/persian/mostread.json',
      persianMostReadData,
    );
    fetchMock.mock(
      'http://localhost/persian/bbc_dari_radio/schedule.json',
      dariRadioScheduleData,
    );

    await act(async () => {
      container = render(
        <IdxPageWithContext pageData={persianAfghanistanIdxData} />,
      ).container;
    });
  });

  describe('Snapshots', () => {
    it('should render a persian idx page correctly with most read and radio schedule', async () => {
      await act(async () => {
        container = render(
          <IdxPageWithContext pageData={persianAfghanistanIdxData} />,
        ).container;
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should render idx page sections', async () => {
      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(4);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});

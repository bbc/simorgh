import React from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import dariRadioScheduleData from '#data/persian/bbc_dari_radio/schedule.json';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import persianMostReadData from '#data/persian/mostRead';
import IdxPageWithContext from './testHelpers';

const mostReadEndpoint = '/persian/mostRead.json';

jest.mock('#containers/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

let container;

describe('IdxPage', () => {
  beforeEach(async () => {
    fetchMock.restore();
    fetchMock.mock(mostReadEndpoint, persianMostReadData);
    fetchMock.mock(
      '/data/persian/bbc_dari_radio/schedule.json',
      dariRadioScheduleData,
    );

    await act(async () => {
      container = render(
        <IdxPageWithContext
          pageData={persianAfghanistanIdxData}
          mostReadEndpointOverride={mostReadEndpoint}
        />,
      ).container;
    });
  });

  describe('Snapshots', () => {
    it('should render a persian idx page correctly with most read and radio schedule', async () => {
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

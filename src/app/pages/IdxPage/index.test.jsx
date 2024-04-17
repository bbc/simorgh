import React from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import dariRadioScheduleData from '#data/persian/bbc_dari_radio/schedule.json';
import ukraineInRussianIdxData from '#data/ukrainian/ukraine_in_russian';
import getInitialData from '#app/routes/idx/getInitialData';
import IdxPageWithContext from './testHelpers';

const radioScheduleEndpoint = '/persian/bbc_dari_radio/schedule.json';

jest.mock('../../components/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

let container;

describe('IdxPage - Ukrainian', () => {
  beforeEach(async () => {
    delete process.env.SIMORGH_APP_ENV;
    fetchMock.mock(
      'end:/ukrainian/ukraine_in_russian',
      JSON.stringify(ukraineInRussianIdxData),
    );

    fetchMock.mock(`end:${radioScheduleEndpoint}`, dariRadioScheduleData);

    const { pageData } = await getInitialData({
      path: '/ukrainian/ukraine_in_russian',
      service: 'ukrainian',
    });

    await act(async () => {
      container = render(
        <IdxPageWithContext pageData={pageData} service="ukrainian" />,
        {
          service: 'ukrainian',
        },
      ).container;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  describe('Snapshots', () => {
    it('should render a ukrainian idx page correctly', async () => {
      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should render idx page sections', async () => {
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(1);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});

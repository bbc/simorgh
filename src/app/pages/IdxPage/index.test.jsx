import React from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import dariRadioScheduleData from '#data/persian/bbc_dari_radio/schedule.json';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import ukraineInRussianIdxData from '#data/ukrainian/ukraine_in_russian';
import persianMostReadData from '#data/persian/mostRead';
import IdxPageWithContext from './testHelpers';

const mostReadEndpoint = '/data/persian/mostRead/index.json';
const radioScheduleEndpoint = '/data/persian/bbc_dari_radio/schedule.json';

jest.mock('#containers/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

let container;

describe('IdxPage - Persian', () => {
  beforeEach(async () => {
    fetchMock.restore();
    fetchMock.mock(mostReadEndpoint, persianMostReadData);
    fetchMock.mock(radioScheduleEndpoint, dariRadioScheduleData);

    await act(async () => {
      container = render(
        <IdxPageWithContext pageData={persianAfghanistanIdxData} />,
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
      expect(sections.length).toBeGreaterThan(1);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});

describe('IdxPage - Ukrainian', () => {
  beforeEach(async () => {
    fetchMock.restore();

    await act(async () => {
      container = render(
        <IdxPageWithContext
          service="ukrainian"
          variant="ru-UA"
          pageData={ukraineInRussianIdxData}
        />,
      ).container;
    });
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

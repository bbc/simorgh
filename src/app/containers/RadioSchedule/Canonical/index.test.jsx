import React from 'react';
import fetchMock from 'fetch-mock';
import { render, act } from '@testing-library/react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import processRadioSchedule from '../utilities/processRadioSchedule';
import CanonicalRadioSchedule from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const endpoint = 'https://localhost/arabic/bbc_arabic_radio/schedule.json';

/* eslint-disable react/prop-types */
const RadioScheduleWithContext = ({ initialData, lang }) => (
  <RequestContextProvider
    isAmp={false}
    pageType="frontPage"
    service="arabic"
    pathname="/arabic"
    timeOnServer={Date.now()}
  >
    <ServiceContextProvider service="arabic">
      <CanonicalRadioSchedule
        initialData={initialData}
        endpoint={endpoint}
        lang={lang}
      />
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('Canonical RadioSchedule', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  describe('With initial data', () => {
    it('renders correctly for a service', async () => {
      fetchMock.mock(endpoint, arabicRadioScheduleData);
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        Date.now(),
      );
      await matchSnapshotAsync(
        <RadioScheduleWithContext initialData={initialData} />,
      );
      expect(fetchMock.calls(endpoint).length).toBeFalsy();
    });

    it('contains four programs for a service with a radio schedule', async () => {
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        Date.now(),
      );
      let container;

      await act(async () => {
        container = await render(
          <RadioScheduleWithContext initialData={initialData} />,
        ).container;
      });
      expect(container.querySelectorAll('li').length).toEqual(4);
    });

    it('does not render when data contains less than 4 programs', async () => {
      const initialData = processRadioSchedule(
        { schedules: arabicRadioScheduleData.schedules.slice(0, 2) },
        'arabic',
        Date.now(),
      );
      let container;

      await act(async () => {
        container = await render(
          <RadioScheduleWithContext initialData={initialData} />,
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data contains no programs', async () => {
      const initialData = processRadioSchedule(
        { schedules: [] },
        'arabic',
        Date.now(),
      );
      let container;

      await act(async () => {
        container = await render(
          <RadioScheduleWithContext initialData={initialData} />,
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('Without initial data', () => {
    it('renders correctly for a service with a radio schedule and page frequency URL', async () => {
      fetchMock.mock(endpoint, arabicRadioScheduleData);

      await matchSnapshotAsync(<RadioScheduleWithContext />);
      expect(fetchMock.calls(endpoint).length).toBeTruthy();
    });

    it('contains four programs for a service with a radio schedule', async () => {
      fetchMock.mock(endpoint, arabicRadioScheduleData);
      let container;

      await act(async () => {
        container = await render(<RadioScheduleWithContext />).container;
      });
      expect(container.querySelectorAll('li').length).toEqual(4);
    });

    it('render radio schedules container with lang code', async () => {
      fetchMock.mock(endpoint, arabicRadioScheduleData);
      let container;

      await act(async () => {
        container = await render(<RadioScheduleWithContext lang="fa-AF" />)
          .container;
      });
      expect(container.querySelector('section')).toHaveAttribute(
        'lang',
        'fa-AF',
      );
    });

    it('does not render when data contains less than 4 programs', async () => {
      fetchMock.mock(endpoint, {
        schedules: arabicRadioScheduleData.schedules.slice(0, 2),
      });
      let container;

      await act(async () => {
        container = await render(<RadioScheduleWithContext />).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data contains no programs', async () => {
      fetchMock.mock(endpoint, {
        schedules: [],
      });
      let container;

      await act(async () => {
        container = await render(<RadioScheduleWithContext />).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data fetched returns non-ok status code', async () => {
      fetchMock.mock(endpoint, 404);
      let container;

      await act(async () => {
        container = await render(<RadioScheduleWithContext />).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data fetch is rejected', async () => {
      fetchMock.mock(endpoint, {
        throws: 'Server not found',
      });
      let container;

      await act(async () => {
        container = await render(<RadioScheduleWithContext />).container;
      });
      expect(container).toBeEmptyDOMElement();
    });
  });
});

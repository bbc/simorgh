import React from 'react';
import fetchMock from 'fetch-mock';
import { render, wait } from '@testing-library/react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import RadioSchedulesWithContext from '../utilities/testHelpers';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import processRadioSchedule from '#containers/RadioSchedule/utilities/processRadioSchedule';

describe('Canonical RadioSchedule', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
    fetchMock.restore();
  });

  describe('With initial data', () => {
    it('renders correctly for a service', async () => {
      fetchMock.mock(
        'http://localhost/arabic/bbc_arabic_radio/schedule.json',
        arabicRadioScheduleData,
      );
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        Date.now(),
      );
      await matchSnapshotAsync(
        <RadioSchedulesWithContext
          service="arabic"
          initialData={initialData}
          radioScheduleToggle
        />,
      );
      expect(
        fetchMock.calls(
          'http://localhost/arabic/bbc_arabic_radio/schedule.json',
        ).length,
      ).toBeFalsy();
    });

    it('contains four programs for a service with a radio schedule', async () => {
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        Date.now(),
      );
      const { container } = render(
        <RadioSchedulesWithContext
          service="arabic"
          initialData={initialData}
          radioScheduleToggle
        />,
      );

      await wait(() => {
        expect(container.querySelectorAll('li').length).toEqual(4);
      });
    });

    it('does not render when data contains less than 4 programs', async () => {
      const initialData = processRadioSchedule(
        { schedules: arabicRadioScheduleData.schedules.slice(0, 2) },
        'arabic',
        Date.now(),
      );

      const { container } = render(
        <RadioSchedulesWithContext
          service="arabic"
          initialData={initialData}
        />,
      );
      await wait(() => {
        expect(container).toBeEmpty();
      });
    });

    it('does not render when data contains no programs', async () => {
      const initialData = processRadioSchedule(
        { schedules: [] },
        'arabic',
        Date.now(),
      );

      const { container } = render(
        <RadioSchedulesWithContext
          service="arabic"
          initialData={initialData}
        />,
      );
      await wait(() => {
        expect(container).toBeEmpty();
      });
    });
  });

  describe('Without initial data', () => {
    it('renders correctly for a service with a radio schedule and page frequency URL', async () => {
      fetchMock.mock(
        '/arabic/bbc_arabic_radio/schedule.json',
        arabicRadioScheduleData,
      );

      await matchSnapshotAsync(
        <RadioSchedulesWithContext service="arabic" radioScheduleToggle />,
      );
      expect(
        fetchMock.calls('/arabic/bbc_arabic_radio/schedule.json').length,
      ).toBeTruthy();
    });

    it('contains four programs for a service with a radio schedule', async () => {
      fetchMock.mock(
        '/arabic/bbc_arabic_radio/schedule.json',
        arabicRadioScheduleData,
      );
      const { container } = render(
        <RadioSchedulesWithContext service="arabic" radioScheduleToggle />,
      );

      await wait(() => {
        expect(container.querySelectorAll('li').length).toEqual(4);
      });
    });

    it('does not render when data contains less than 4 programs', async () => {
      fetchMock.mock('/arabic/bbc_arabic_radio/schedule.json', {
        schedules: arabicRadioScheduleData.schedules.slice(0, 2),
      });
      const { container } = render(
        <RadioSchedulesWithContext service="arabic" />,
      );
      await wait(() => {
        expect(container).toBeEmpty();
      });
    });

    it('does not render when data contains no programs', async () => {
      fetchMock.mock('/arabic/bbc_arabic_radio/schedule.json', {
        schedules: [],
      });
      const { container } = render(
        <RadioSchedulesWithContext service="arabic" />,
      );
      await wait(() => {
        expect(container).toBeEmpty();
      });
    });

    it('does not render when data fetched returns non-ok status code', async () => {
      fetchMock.mock('/arabic/bbc_arabic_radio/schedule.json', 404);

      const { container } = render(
        <RadioSchedulesWithContext service="arabic" />,
      );

      await wait(() => {
        expect(container).toBeEmpty();
      });
    });

    it('does not render when data fetch is rejected', async () => {
      fetchMock.mock('/arabic/bbc_arabic_radio/schedule.json', {
        throws: 'Server not found',
      });

      const { container } = render(
        <RadioSchedulesWithContext service="arabic" />,
      );

      await wait(() => {
        expect(container).toBeEmpty();
      });
    });
  });
});

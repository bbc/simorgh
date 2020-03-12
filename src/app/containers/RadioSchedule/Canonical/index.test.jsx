import React from 'react';
import { render, wait } from '@testing-library/react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import RadioSchedulesWithContext from '../utilities/testHelpers';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';

describe('Canonical RadioSchedule', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it('renders correctly for a service with a radio schedule and page frequency URL', async () => {
    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));

    await matchSnapshotAsync(
      <RadioSchedulesWithContext service="arabic" radioScheduleToggle />,
    );
  });

  it('contains four programs for a service with a radio schedule', async () => {
    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));
    const { container } = render(
      <RadioSchedulesWithContext service="arabic" radioScheduleToggle />,
    );

    await wait(() => {
      expect(container.querySelectorAll('li').length).toEqual(4);
    });
  });

  it('does not render when data contains less than 4 programs', async () => {
    fetch.mockResponse(
      JSON.stringify(arabicRadioScheduleData.schedules.slice(0, 2)),
    );
    const { container } = render(
      <RadioSchedulesWithContext service="arabic" />,
    );
    await wait(() => {
      expect(container).toBeEmpty();
    });
  });

  it('does not render when data contains no programs', async () => {
    fetch.mockResponse(
      JSON.stringify(arabicRadioScheduleData.schedules.slice(0, 0)),
    );
    const { container } = render(
      <RadioSchedulesWithContext service="arabic" />,
    );
    await wait(() => {
      expect(container).toBeEmpty();
    });
  });
});

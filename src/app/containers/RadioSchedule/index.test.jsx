import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RadioSchedulesWithContext from './utilities/testHelpers';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';

describe('RadioScheduleData', () => {
  afterEach(() => {
    fetch.resetMocks();
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

  it('does not render when radio schedule toggle is disabled', async () => {
    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));
    const { container } = render(
      <RadioSchedulesWithContext service="arabic" />,
    );
    await wait(() => {
      expect(container).toBeEmpty();
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

import React from 'react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import RadioSchedulesWithContext from '../utilities/testHelpers';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import hausaRadioScheduleData from '#data/hausa/bbc_hausa_radio/schedule.json';

describe('Canonical RadioSchedule', () => {
  it('renders correctly for a service with a radio schedule and no page frequency URL', async () => {
    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));

    await matchSnapshotAsync(
      <RadioSchedulesWithContext service="arabic" radioScheduleToggle />,
    );
  });

  it('renders correctly for a service with a radio schedule and page frequency URL', async () => {
    fetch.mockResponse(JSON.stringify(hausaRadioScheduleData));

    await matchSnapshotAsync(
      <RadioSchedulesWithContext service="arabic" radioScheduleToggle />,
    );
  });
});

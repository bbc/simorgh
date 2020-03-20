import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RadioSchedulesWithContext from './utilities/testHelpers';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';

describe('RadioScheduleData', () => {
  afterEach(() => {
    fetch.resetMocks();
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
});

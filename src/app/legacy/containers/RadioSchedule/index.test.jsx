import React from 'react';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import {
  render,
  waitFor,
} from '#components/react-testing-library-with-providers';
import RadioSchedulesWithContext from './utilities/testHelpers';

describe('RadioScheduleData', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it('does not render when radio schedule toggle is disabled', async () => {
    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));
    const { container } = render(
      <RadioSchedulesWithContext service="arabic" />,
    );
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it('does render when radio schedule toggle is enabled', async () => {
    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));
    const { container } = render(
      <RadioSchedulesWithContext service="arabic" radioScheduleToggle />,
    );
    await waitFor(() => {
      expect(container.querySelectorAll('li').length).toEqual(4);
    });
  });

  it('does not render on AMP pages', async () => {
    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));
    const { container } = render(
      <RadioSchedulesWithContext service="arabic" radioScheduleToggle isAmp />,
    );
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});

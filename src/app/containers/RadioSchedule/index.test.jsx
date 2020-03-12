import React from 'react';
import { render, wait } from '@testing-library/react';
import RadioScheduleContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import '@testing-library/jest-dom/extend-expect';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';

const getToggleState = enabled => ({
  local: { radioSchedule: { enabled } },
  test: { radioSchedule: { enabled } },
});

/* eslint-disable react/prop-types */
const RadioSchedulesWithContext = ({
  service,
  radioScheduleToggle = false,
}) => (
  <ToggleContext.Provider
    value={{ toggleState: getToggleState(radioScheduleToggle) }}
  >
    <RequestContextProvider
      isAmp={false}
      pageType="frontPage"
      service={service}
      pathname={`/${service}`}
    >
      <ServiceContextProvider service={service}>
        <RadioScheduleContainer
          endpoint={getRadioScheduleEndpoint({ service })}
        />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContext.Provider>
);
/* eslint-enable react/prop-types */

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

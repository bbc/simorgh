import React from 'react';
import RadioScheduleContainer from '..';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

const localRadioScheduleEndpoint = service => {
  const localhostURL = 'http://localhost:7080';
  const localServiceURL = `${localhostURL}/${service}`;
  return `${localServiceURL}/bbc_${service}_radio/schedule.json`;
};

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
          endpoint={localRadioScheduleEndpoint(service)}
        />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContext.Provider>
);
/* eslint-enable react/prop-types */

export default RadioSchedulesWithContext;

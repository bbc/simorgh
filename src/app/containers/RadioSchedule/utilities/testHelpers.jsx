import React from 'react';
import RadioScheduleContainer from '..';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

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
        <RadioScheduleContainer />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContext.Provider>
);
/* eslint-enable react/prop-types */

export default RadioSchedulesWithContext;

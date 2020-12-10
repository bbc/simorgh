import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RadioScheduleContainer from '..';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';

const getToggleState = enabled => ({
  radioSchedule: { enabled },
});

/* eslint-disable react/prop-types */
const RadioSchedulesWithContext = ({
  service,
  radioScheduleToggle = false,
  isAmp = false,
  initialData,
}) => (
  <ToggleContext.Provider
    value={{
      toggleState: getToggleState(radioScheduleToggle),
      toggleDispatch: jest.fn(),
    }}
  >
    <RequestContextProvider
      isAmp={isAmp}
      pageType={FRONT_PAGE}
      service={service}
      pathname={`/${service}`}
      timeOnServer={Date.now()}
    >
      <ServiceContextProvider service={service}>
        <BrowserRouter>
          <RadioScheduleContainer initialData={initialData} />
        </BrowserRouter>
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContext.Provider>
);
/* eslint-enable react/prop-types */

export default RadioSchedulesWithContext;

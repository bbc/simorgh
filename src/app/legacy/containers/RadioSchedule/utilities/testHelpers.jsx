import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { FRONT_PAGE } from '#routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import RadioScheduleContainer from '..';

const getToggleState = enabled => ({
  radioSchedule: { enabled },
});

const RadioSchedulesWithContext = ({
  service,
  radioScheduleToggle = false,
  isAmp = false,
  initialData,
}) => {
  const toggleContextValue = useMemo(
    () => ({
      toggleState: getToggleState(radioScheduleToggle),
      toggleDispatch: jest.fn(),
    }),
    [radioScheduleToggle],
  );
  return (
    <ToggleContext.Provider value={toggleContextValue}>
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
};

export default RadioSchedulesWithContext;

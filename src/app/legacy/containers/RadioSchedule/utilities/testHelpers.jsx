import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import RadioScheduleContainer from '..';

const RadioSchedulesWithContext = ({
  service,
  radioScheduleToggle = false,
  isAmp = false,
  initialData,
  toggleName,
}) => {
  const toggleContextValue = useMemo(
    () => ({
      toggleState: {
        [toggleName]: { enabled: radioScheduleToggle },
      },
      toggleDispatch: jest.fn(),
    }),
    [radioScheduleToggle, toggleName],
  );

  return (
    <ToggleContext.Provider value={toggleContextValue}>
      <RequestContextProvider
        isAmp={isAmp}
        pageType={HOME_PAGE}
        service={service}
        pathname={`/${service}`}
        timeOnServer={Date.now()}
      >
        <ServiceContextProvider service={service}>
          <BrowserRouter>
            <RadioScheduleContainer
              initialData={initialData}
              toggleName={toggleName}
            />
          </BrowserRouter>
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContext.Provider>
  );
};

export default RadioSchedulesWithContext;

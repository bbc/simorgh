import { useMemo } from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import RadioScheduleContainer from '..';

const timeOnServer = Date.parse('2024-11-20T16:29:30Z');

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
        timeOnServer={timeOnServer}
      >
        <ServiceContextProvider service={service}>
          <RadioScheduleContainer
            initialData={initialData}
            toggleName={toggleName}
          />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContext.Provider>
  );
};

export default RadioSchedulesWithContext;

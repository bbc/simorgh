import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import Canonical from './Canonical';
import radioSchedulesShape from './utilities/radioScheduleShape';
import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';
import { RADIO_SCHEDULE } from '#lib/toggle.const';

const RadioScheduleContainer = ({
  initialData,
  radioScheduleEndpointOverride,
  lang,
  className,
}) => {
  const { enabled } = useToggle(RADIO_SCHEDULE);
  const { isAmp, env } = useContext(RequestContext);
  const { service, radioSchedule } = useContext(ServiceContext);
  const location = useLocation();

  /** Is this necessary? Does this override all radio schedule values for page types e.g. if on Front Page = true, 
  but radioSchedule not enabled, then no schedule will display?
  Is this documented in the run book?

  Should we just remove all checks below?
  */
  const { hasRadioSchedule } = radioSchedule;
  const radioScheduleEnabled = !isAmp && hasRadioSchedule && enabled;

  if (!radioScheduleEnabled) {
    // TODO: Add logging here stating that radio schedule is not enabled for this service
    return null;
  }

  const endpoint =
    radioScheduleEndpointOverride ||
    getRadioScheduleEndpoint({
      service,
      env,
      queryString: location.search,
    });

  return (
    <Canonical
      className={className}
      endpoint={endpoint}
      initialData={initialData}
      lang={lang}
    />
  );
};

RadioScheduleContainer.propTypes = {
  radioScheduleEndpointOverride: string,
  initialData: radioSchedulesShape,
  lang: string,
  className: string,
};

RadioScheduleContainer.defaultProps = {
  radioScheduleEndpointOverride: null,
  initialData: undefined,
  lang: null,
  className: '',
};

export default RadioScheduleContainer;

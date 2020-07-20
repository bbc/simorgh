import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import Canonical from './Canonical';
import radioSchedulesShape from './utilities/radioScheduleShape';
import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';

const RadioScheduleContainer = ({
  initialData,
  radioScheduleEndpointOverride,
  lang,
  className,
}) => {
  const { enabled } = useToggle('radioSchedule');
  const { isAmp, env } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const location = useLocation();
  const radioScheduleEnabled = !isAmp && enabled;

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

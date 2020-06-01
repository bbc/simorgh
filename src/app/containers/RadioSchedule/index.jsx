import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import Canonical from './Canonical';
import radioSchedulesShape from './utilities/radioScheduleShape';
import getRadioScheduleEndpoint from '#lib/utilities/getRadioSchedulesUrl';

const RadioScheduleContainer = ({ initialData }) => {
  const { enabled } = useToggle('radioSchedule');
  const { isAmp, env } = useContext(RequestContext);
  const { service, radioSchedule } = useContext(ServiceContext);
  const location = useLocation();
  const hasRadioSchedule = pathOr(null, ['hasRadioSchedule'], radioSchedule);
  const radioScheduleEnabled = !isAmp && enabled && hasRadioSchedule;

  if (!radioScheduleEnabled) {
    return null;
  }

  const endpoint = getRadioScheduleEndpoint({
    service,
    env,
    queryString: location.search,
  });

  return <Canonical endpoint={endpoint} initialData={initialData} />;
};

RadioScheduleContainer.propTypes = {
  initialData: radioSchedulesShape,
};

RadioScheduleContainer.defaultProps = {
  initialData: undefined,
};

export default RadioScheduleContainer;

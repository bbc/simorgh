import React, { useContext } from 'react';
import { string } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';

// The logic here is sufficient for now for testing locally. This should change once we are ready to put radioschedules on live
const getRadioScheduleEndpoint = (service, environment) =>
  environment === 'local'
    ? `/${service}/bbc_${service}_radio/radioschedule.json`
    : `/${service}/bbc_${service}_radio/schedule.json`;

const RadioScheduleContainer = ({ radioScheduleEndpointOverride }) => {
  const { isAmp, env } = useContext(RequestContext);
  const { enabled } = useToggle('radioSchedule');
  const {
    service,
    radioSchedule: { hasRadioSchedule },
  } = useContext(ServiceContext);
  const radioScheduleEnabled = !isAmp && enabled && hasRadioSchedule;

  if (!radioScheduleEnabled) {
    return null;
  }

  const endpoint =
    radioScheduleEndpointOverride || getRadioScheduleEndpoint(service, env);

  return <Canonical endpoint={endpoint} />;
};

RadioScheduleContainer.propTypes = {
  radioScheduleEndpointOverride: string,
};

RadioScheduleContainer.defaultProps = {
  radioScheduleEndpointOverride: null,
};

export default RadioScheduleContainer;

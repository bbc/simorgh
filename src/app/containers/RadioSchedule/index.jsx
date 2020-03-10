import React, { useContext } from 'react';
import { string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';

const getRadioScheduleEndpoint = service =>
  `/${service}/bbc_${service}_radio/schedule.json`;

const RadioScheduleContainer = ({ radioScheduleEndpointOverride }) => {
  const { enabled } = useToggle('radioSchedule');
  const { isAmp } = useContext(RequestContext);
  const {
    service,
    radioSchedule: { hasRadioSchedule },
  } = useContext(ServiceContext);
  const radioScheduleEnabled = !isAmp && enabled && hasRadioSchedule;

  if (!radioScheduleEnabled) {
    return null;
  }

  const endpoint =
    radioScheduleEndpointOverride || getRadioScheduleEndpoint(service);

  return <Canonical endpoint={endpoint} />;
};

RadioScheduleContainer.propTypes = {
  radioScheduleEndpointOverride: string,
};

RadioScheduleContainer.defaultProps = {
  radioScheduleEndpointOverride: null,
};

export default RadioScheduleContainer;

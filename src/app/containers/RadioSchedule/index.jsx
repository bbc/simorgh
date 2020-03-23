import React, { useContext } from 'react';
import { string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';

const getRadioScheduleEndpoint = service =>
  `${process.env.SIMORGH_BASE_URL}/${service}/bbc_${service}_radio/schedule.json`;

const RadioScheduleContainer = ({ radioScheduleEndpointOverride }) => {
  const { enabled } = useToggle('radioSchedule');
  const { isAmp } = useContext(RequestContext);
  const { service, radioSchedule } = useContext(ServiceContext);
  const hasRadioSchedule = pathOr(null, ['hasRadioSchedule'], radioSchedule);
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

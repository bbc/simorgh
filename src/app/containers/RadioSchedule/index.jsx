import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';
import radioSchedulesShape from './radioSchedulesShape';

const RadioScheduleContainer = ({ schedule }) => {
  const { enabled } = useToggle('radioSchedule');
  const { isAmp } = useContext(RequestContext);
  const { radioSchedule } = useContext(ServiceContext);
  const hasRadioSchedule = pathOr(null, ['hasRadioSchedule'], radioSchedule);
  const radioScheduleEnabled = !isAmp && enabled && hasRadioSchedule;

  if (!radioScheduleEnabled) {
    return null;
  }

  return <Canonical schedule={schedule} />;
};

RadioScheduleContainer.propTypes = {
  schedule: radioSchedulesShape,
};

RadioScheduleContainer.defaultProps = {
  schedule: null,
};

export default RadioScheduleContainer;

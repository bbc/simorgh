import React, { use } from 'react';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Canonical from './Canonical';

const RadioSchedule = ({
  initialData,
  lang = null,
  className = '',
  toggleName,
}) => {
  const { enabled } = useToggle(toggleName);
  const { isAmp } = use(RequestContext);
  const { radioSchedule } = use(ServiceContext);
  const hasRadioSchedule = pathOr(null, ['hasRadioSchedule'], radioSchedule);
  const radioScheduleEnabled = !isAmp && enabled && hasRadioSchedule;

  if (!radioScheduleEnabled) {
    return null;
  }

  return (
    <Canonical className={className} radioSchedule={initialData} lang={lang} />
  );
};

export default RadioSchedule;

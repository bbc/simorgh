import React, { useContext } from 'react';
import { arrayOf, oneOfType, shape, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import useLocation from '#hooks/useLocation';
import useToggle from '#hooks/useToggle';
import { getRadioScheduleEndpoint } from '#lib/utilities/getUrlHelpers/getRadioSchedulesUrls';
import * as RadioScheduleData from '#app/models/types/radioSchedule';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Canonical from './Canonical';
import radioSchedulesShape from './utilities/radioScheduleShape';

const RadioSchedule = ({
  initialData,
  radioScheduleEndpointOverride,
  lang,
  className,
}) => {
  const { enabled } = useToggle('radioSchedule');
  const { isAmp, env } = useContext(RequestContext);
  const { service, radioSchedule } = useContext(ServiceContext);
  const location = useLocation();
  const hasRadioSchedule = pathOr(null, ['hasRadioSchedule'], radioSchedule);
  const radioScheduleEnabled = !isAmp && enabled && hasRadioSchedule;

  if (!radioScheduleEnabled) {
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

RadioSchedule.propTypes = {
  radioScheduleEndpointOverride: string,
  initialData: oneOfType([
    shape(radioSchedulesShape),
    arrayOf(shape(RadioScheduleData)),
  ]),
  lang: string,
  className: string,
};

RadioSchedule.defaultProps = {
  radioScheduleEndpointOverride: null,
  initialData: undefined,
  lang: null,
  className: '',
};

export default RadioSchedule;

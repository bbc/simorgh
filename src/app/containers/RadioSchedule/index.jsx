import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { bool, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';
import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';

const RadioScheduleContainer = ({
  radioScheduleEndpointOverride,
  isOnFrontPage,
}) => {
  const { enabled } = useToggle('radioSchedule');
  const { isAmp, env } = useContext(RequestContext);
  const { service, radioSchedule } = useContext(ServiceContext);
  const location = useLocation();
  const hasRadioSchedule = pathOr(null, ['hasRadioSchedule'], radioSchedule);
  const onFrontPage = pathOr(null, ['onFrontPage'], radioSchedule);
  const renderOnPage = isOnFrontPage ? onFrontPage : true;
  const radioScheduleEnabled =
    !isAmp && enabled && hasRadioSchedule && renderOnPage;

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

  return <Canonical endpoint={endpoint} />;
};

RadioScheduleContainer.propTypes = {
  radioScheduleEndpointOverride: string,
  isOnFrontPage: bool,
};

RadioScheduleContainer.defaultProps = {
  radioScheduleEndpointOverride: null,
  isOnFrontPage: false,
};

export default RadioScheduleContainer;

import { useEffect, useContext } from 'react';
import nodeLogger from '#lib/logger.node';
import { MPULSE_ERROR } from '#lib/logger.const';
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import onClient from '#lib/utilities/onClient';
import boomr from './boomr';

const logger = nodeLogger(__filename);

const MPulseBeaconContainer = () => {
  const { enabled } = useToggle('mpulse');
  const { personalisationEnabled } = useContext(UserContext);
  const { pageType, statusCode } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const API_KEY = process.env.SIMORGH_MPULSE_API_KEY;
  const isEnabled = enabled && API_KEY && onClient();

  useEffect(() => {
    if (isEnabled && personalisationEnabled) {
      try {
        boomr(API_KEY);
      } catch (error) {
        logger.error(MPULSE_ERROR, { error });
      }
    }
  }, [isEnabled, personalisationEnabled, API_KEY]);

  useEffect(() => {
    if (isEnabled && personalisationEnabled) {
      window.SIMORGH_MPULSE_INFO = {
        pageType,
        service,
        statusCode,
      };
    }
  }, [isEnabled, personalisationEnabled, pageType, service, statusCode]);

  return null;
};

export default MPulseBeaconContainer;

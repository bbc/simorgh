import { useEffect, useContext } from 'react';
import nodeLogger from '../../lib/logger.node';
import { UserContext } from '../../contexts/UserContext';
import useToggle from '../Toggle/useToggle';
import boomr from './boomr';

const logger = nodeLogger(__filename);

const MPulseBeaconContainer = () => {
  const { enabled } = useToggle('mpulse');
  const { personalisationEnabled } = useContext(UserContext);
  const API_KEY = process.env.SIMORGH_MPULSE_API_KEY;
  const isEnabled = enabled && API_KEY;

  useEffect(() => {
    if (isEnabled && personalisationEnabled) {
      try {
        boomr(API_KEY);
      } catch (e) {
        logger.error(`Error initialising mPulse: "${e}"`);
      }
    }
  }, [isEnabled, personalisationEnabled, API_KEY]);

  return null;
};

export default MPulseBeaconContainer;

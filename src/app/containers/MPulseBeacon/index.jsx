import { useEffect, useContext } from 'react';
import { DialContext } from '../../contexts/DialContext';
import { UserContext } from '../../contexts/UserContext';
import boomr from './boomr';

const MPulseBeaconContainer = () => {
  const { mpulse } = useContext(DialContext);
  const { personalisationEnabled } = useContext(UserContext);
  const API_KEY = process.env.SIMORGH_MPULSE_API_KEY;
  const isEnabled = mpulse && API_KEY;

  useEffect(() => {
    if (isEnabled && personalisationEnabled) {
      try {
        boomr(API_KEY);
      } catch (e) {
        console.log(e);
      }
    }
  }, [isEnabled, personalisationEnabled, API_KEY]);

  return null;
};

export default MPulseBeaconContainer;

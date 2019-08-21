import { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import useToggle from '../Toggle/useToggle';
import boomr from './boomr';

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
        console.log(e);
      }
    }
  }, [isEnabled, personalisationEnabled, API_KEY]);

  return null;
};

export default MPulseBeaconContainer;

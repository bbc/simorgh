import React, { useContext } from 'react';
import { DialContext } from '../../contexts/DialContext';
import MPulseBeacon from '../../components/MPulseBeacon';

const MPulseBeaconContainer = () => {
  const { mpulse } = useContext(DialContext);
  const API_KEY = process.env.MPULSE_API_KEY;
  const isEnabled = mpulse && API_KEY;

  return isEnabled ? <MPulseBeacon apiKey={API_KEY} /> : null;
};

export default MPulseBeaconContainer;

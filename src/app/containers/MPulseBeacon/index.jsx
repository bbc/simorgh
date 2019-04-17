import React from 'react';
import MPulseBeacon from '../../components/MPulseBeacon';

const MPulseBeaconContainer = () => {
  const API_KEY = process.env.MPULSE_API_KEY;
  return API_KEY ? <MPulseBeacon apiKey={API_KEY} /> : null;
};

export default MPulseBeaconContainer;

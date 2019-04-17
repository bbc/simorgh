import React from 'react';
import MPulseBeacon from '../../components/MPulseBeacon';

const API_KEY = process.env.MPULSE_API_KEY;

const MPulseBeaconContainer = () =>
  API_KEY ? <MPulseBeacon apiKey={API_KEY} /> : null;

export default MPulseBeaconContainer;

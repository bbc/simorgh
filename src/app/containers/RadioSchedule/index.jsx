import React, { useContext } from 'react';
import RadioScheduleData from './RadioScheduleData';
import { ServiceContext } from '#contexts/ServiceContext';

const getLocalRadioScheduleEndpoint = service => {
  const localhostURL = 'http://localhost:7080';
  const localServiceURL = `${localhostURL}/${service}`;

  return `${localServiceURL}/bbc_${service}_radio/most_read.json`;
};

const RadioScheduleContainer = () => {
  const { service } = useContext(ServiceContext);

  return (
    <RadioScheduleData endpoint={getLocalRadioScheduleEndpoint(service)} />
  );
};

export default RadioScheduleContainer;

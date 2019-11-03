import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { SecondaryDataContext } from '#contexts/SecondaryDataContext';
import getSchedules from '#api/getSchedules';
import useFetch from '#lib/utilities/useFetch';
import RadioSchedules from './psammead-radio-schedules';

const RadioSchedulesContainer = () => {
  const { datetimeLocale, timezone, service } = useContext(ServiceContext);
  const { schedules: initialData } = useContext(SecondaryDataContext);
  const [data = {}, loading, error] = useFetch(
    initialData,
    getSchedules(service),
  );

  const { schedules } = data;

  if (error) {
    return <div>Error component</div>;
  }

  if (loading) {
    return <div>Loading component</div>;
  }

  if (schedules && schedules.length > 0) {
    return (
      <RadioSchedules
        schedules={schedules}
        datetimeLocale={datetimeLocale}
        timezone={timezone}
        service={service}
      />
    );
  }

  return null;
};

export default RadioSchedulesContainer;

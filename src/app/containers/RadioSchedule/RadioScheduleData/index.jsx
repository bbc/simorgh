import React, { useEffect, useState } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const RadioScheduleData = ({ endpoint }) => {
  const [schedule, setRadioSchedule] = useState([]);

  const handleResponse = async response => {
    const radioScheduleData = await response.json();
    setRadioSchedule(radioScheduleData.schedules);
  };

  useEffect(() => {
    const fetchRadioScheduleData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(e => logger.error(`HTTP Error: "${e}"`));

    fetchRadioScheduleData(endpoint);
  }, [endpoint]);

  return (
    <>
      <p>Radio schedules:</p>
      {schedule}
    </>
  );
};

RadioScheduleData.propTypes = {
  endpoint: string.isRequired,
};

export default RadioScheduleData;

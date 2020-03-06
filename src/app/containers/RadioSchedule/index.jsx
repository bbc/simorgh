import React, { useContext, useEffect, useState } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const RadioScheduleContainer = ({ endpoint }) => {
  const { enabled } = useToggle('radioSchedule');
  const {
    radioSchedule: { hasRadioSchedule },
  } = useContext(ServiceContext);
  const radioScheduleEnabled = enabled && hasRadioSchedule;

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

    if (radioScheduleEnabled) {
      fetchRadioScheduleData(endpoint);
    }
  }, [endpoint, radioScheduleEnabled]);

  if (!radioScheduleEnabled) {
    return null;
  }

  return (
    <>
      <p>Radio Schedules</p>
      {schedule.map(
        ({
          broadcast,
          transmissionTimeStart,
          transmissionTimeEnd,
          episode: {
            presentationTitle,
            synopses: { short },
          },
        }) => (
          <ul key={broadcast.pid}>
            <li>{presentationTitle}</li>
            <li>{short}</li>
            <li>{transmissionTimeStart}</li>
            <li>{transmissionTimeEnd}</li>
          </ul>
        ),
      )}
    </>
  );
};

RadioScheduleContainer.propTypes = {
  endpoint: string.isRequired,
};

export default RadioScheduleContainer;

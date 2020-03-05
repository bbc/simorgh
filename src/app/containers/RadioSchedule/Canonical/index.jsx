import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import { ServiceContext } from '#contexts/ServiceContext';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const CanonicalRadioSchedule = ({ endpoint }) => {
  const header = 'BBC News Radio';
  const [schedule, setRadioSchedule] = useState([]);
  const { service, script, dir } = useContext(ServiceContext);

  const handleResponse = async response => {
    const radioScheduleData = await response.json();
    setRadioSchedule(radioScheduleData.schedules.slice(0, 4));
  };

  useEffect(() => {
    const fetchRadioScheduleData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(e => logger.error(`HTTP Error: "${e}"`));

    fetchRadioScheduleData(endpoint);
  }, [endpoint]);

  if (!schedule.length) {
    return null;
  }
  return (
    <>
      <SectionLabel
        script={script}
        labelId="Radio-Schedule"
        service={service}
        dir={dir}
      >
        {header}
      </SectionLabel>
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

CanonicalRadioSchedule.propTypes = {
  endpoint: string.isRequired,
};

export default CanonicalRadioSchedule;

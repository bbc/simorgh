import React, { useContext, useEffect, useState } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import RadioSchedule from '@bbc/psammead-radio-schedule';
import moment from 'moment';
import findLastIndex from 'ramda/src/findLastIndex';
import propSatisfies from 'ramda/src/propSatisfies';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const RadioScheduleContainer = ({ endpoint }) => {
  const { enabled } = useToggle('radioSchedule');
  const {
    hasRadioSchedule,
    service,
    script,
    dir,
    timezone,
    locale,
  } = useContext(ServiceContext);
  const radioScheduleEnabled = enabled && hasRadioSchedule;

  const [schedule, setRadioSchedule] = useState();

  const getProgramState = (currentTime, startTime, endTime) => {
    const isCurrentlyLive = currentTime < endTime && currentTime > startTime;
    if (isCurrentlyLive) {
      return 'live';
    }
    const isEndedLive = currentTime > endTime;
    if (isEndedLive) {
      return 'onDemand';
    }
    return 'next';
  };

  const getLink = (state, latestProgram) => {
    const url = `/${service}/${latestProgram.serviceId}`;
    return state === 'live'
      ? `${url}/liveradio`
      : `${url}/${latestProgram.broadcast.pid}`;
  };

  const handleResponse = async response => {
    const radioScheduleData = await response.json();

    const currentTime = parseInt(moment.utc().format('x'), 10);
    // finding latest programme, that may or may not still be live. this is because there isn't
    // always a live programme, in which case we show the most recently played programme on demand.
    const latestProgrammeIndex = findLastIndex(
      propSatisfies(time => time < currentTime, 'publishedTimeStart'),
    )(radioScheduleData.schedules);

    const radioSchedules = radioScheduleData.schedules;

    const scheduleDataIsComplete =
      radioSchedules[latestProgrammeIndex - 2] &&
      radioSchedules[latestProgrammeIndex + 1];
    const schedulesToShow = scheduleDataIsComplete && [
      radioSchedules[latestProgrammeIndex],
      radioSchedules[latestProgrammeIndex - 1],
      radioSchedules[latestProgrammeIndex - 2],
      radioSchedules[latestProgrammeIndex + 1],
    ];

    const schedules =
      schedulesToShow &&
      schedulesToShow.map(program => {
        const currentState = getProgramState(
          currentTime,
          program.publishedTimeStart,
          program.publishedTimeEnd,
        );
        return {
          id: program.broadcast.pid,
          state: currentState,
          stateLabel: currentState,
          startTime: program.publishedTimeStart,
          link: getLink(currentState, program),
          brandTitle: program.brand.title,
          episodeTitle: program.episode.presentationTitle,
          summary: program.episode.synopses.short,
          duration: program.publishedTimeDuration,
          durationLabel: 'Duration',
        };
      });
    setRadioSchedule(schedules);
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
      {schedule && (
        <RadioSchedule
          schedules={schedule}
          locale={locale}
          timezone={timezone}
          script={script}
          service={service}
          dir={dir}
        />
      )}
    </>
  );
};

RadioScheduleContainer.propTypes = {
  endpoint: string.isRequired,
};

export default RadioScheduleContainer;

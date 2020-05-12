import findLastIndex from 'ramda/src/findLastIndex';
import propSatisfies from 'ramda/src/propSatisfies';
import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import { RADIO_SCHEDULE_DATA_INCOMPLETE_ERROR } from '#lib/logger.const';

const logger = nodeLogger(__filename);

export const getProgramState = (currentTime, startTime, endTime) => {
  const isLive = currentTime < endTime && currentTime > startTime;
  if (isLive) {
    return 'live';
  }
  const hasEnded = currentTime > endTime;
  if (hasEnded) {
    return 'onDemand';
  }
  return 'next';
};

export const getLink = (state, program, service) => {
  const pid = path(['episode', 'pid'], program);
  const url = `/${service}/${program.serviceId}`;
  return state === 'live' ? `${url}/liveradio` : `${url}/${pid}`;
};

const logProgramError = ({ error, service }) => {
  logger.error(RADIO_SCHEDULE_DATA_INCOMPLETE_ERROR, {
    error,
    service,
  });
};

export default (data, service, currentTime) => {
  if (!data) {
    return null;
  }

  const { schedules = [] } = data;

  // finding latest program, that may or may not still be live. this is because there isn't
  // always a live program, in which case we show the most recently played program on demand.
  const latestProgramIndex = findLastIndex(
    propSatisfies(time => time < currentTime, 'publishedTimeStart'),
  )(schedules);

  const scheduleDataIsComplete =
    schedules[latestProgramIndex - 2] && schedules[latestProgramIndex + 1];

  if (!scheduleDataIsComplete) {
    logProgramError({ error: 'Incomplete program schedule', service });
  }

  const programsToShow = scheduleDataIsComplete && [
    schedules[latestProgramIndex],
    schedules[latestProgramIndex - 1],
    schedules[latestProgramIndex - 2],
    schedules[latestProgramIndex + 1],
  ];

  const processedSchedule =
    programsToShow &&
    programsToShow.map((program = {}) => {
      const {
        publishedTimeStart,
        publishedTimeEnd,
        publishedTimeDuration,
      } = program;

      const brandTitle = path(['brand', 'title'], program);

      if (!publishedTimeStart) {
        logProgramError({
          error: 'publishTimeStart field is missing in program',
          service,
        });
      }
      if (!brandTitle) {
        logProgramError({
          error: 'title field is missing in program',
          service,
        });
      }

      const currentState = getProgramState(
        currentTime,
        publishedTimeStart,
        publishedTimeEnd,
        service,
      );

      return {
        id: path(['broadcast', 'pid'], program),
        state: currentState,
        startTime: publishedTimeStart,
        link: getLink(currentState, program, service),
        brandTitle,
        summary: path(['episode', 'synopses', 'short'], program),
        duration: publishedTimeDuration || '',
      };
    });

  return processedSchedule;
};

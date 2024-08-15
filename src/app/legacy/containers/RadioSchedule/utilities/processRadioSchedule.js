import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';
import { RADIO_SCHEDULE_DATA_INCOMPLETE_ERROR } from '#lib/logger.const';
import {
  getLastProgramIndex,
  isScheduleDataComplete,
  getIsProgramValid,
} from './evaluateScheduleData';

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

  const logServiceError = error => logProgramError({ error, service });

  const isProgramValid = getIsProgramValid(logServiceError);
  const { schedules: initialSchedules = [] } = data;
  const schedules = initialSchedules.filter(isProgramValid);
  const latestProgramIndex = getLastProgramIndex({ schedules, currentTime });

  console.log({ initialSchedules, schedules, latestProgramIndex });

  const scheduleDataIsComplete = isScheduleDataComplete({
    schedules,
    currentTime,
  });

  console.log({ scheduleDataIsComplete });

  if (!scheduleDataIsComplete) {
    logServiceError('Incomplete program schedule');
  }

  const programsToShow = scheduleDataIsComplete && [
    schedules[latestProgramIndex + 1],
    schedules[latestProgramIndex],
    schedules[latestProgramIndex - 1],
    schedules[latestProgramIndex - 2],
  ];

  const processedSchedule =
    programsToShow &&
    programsToShow.map((program = {}) => {
      const { publishedTimeStart, publishedTimeEnd, publishedTimeDuration } =
        program;

      const brandTitle = path(['brand', 'title'], program);
      const currentState = getProgramState(
        currentTime,
        publishedTimeStart,
        publishedTimeEnd,
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

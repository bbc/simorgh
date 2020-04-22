import findLastIndex from 'ramda/src/findLastIndex';
import propSatisfies from 'ramda/src/propSatisfies';
import path from 'ramda/src/path';
import webLogger from '#lib/logger.web';
import { RADIO_SCHEDULE_DATA_INCOMPLETE_ERROR } from '#lib/logger.const';

const logger = webLogger();

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

const logMissingFieldError = field => {
  logger.error(
    JSON.stringify(
      {
        event: RADIO_SCHEDULE_DATA_INCOMPLETE_ERROR,
        message: `${field} field is missing in program`,
      },
      null,
      2,
    ),
  );
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
      const episodeTitle = path(['episode', 'presentationTitle'], program);

      if (!publishedTimeStart) {
        logMissingFieldError('publishedTimeStart');
      }
      if (!brandTitle) {
        logMissingFieldError('title');
      }
      if (!episodeTitle) {
        logMissingFieldError('presentationTitle');
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
        episodeTitle,
        summary: path(['episode', 'synopses', 'short'], program),
        duration: publishedTimeDuration || '',
        durationLabel: 'Duration',
      };
    });

  return processedSchedule;
};

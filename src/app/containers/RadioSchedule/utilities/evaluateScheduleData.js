import findLastIndex from 'ramda/src/findLastIndex';
import propSatisfies from 'ramda/src/propSatisfies';
import path from 'ramda/src/path';

export const getLastProgramIndex = ({ schedules, currentTime }) => {
  return findLastIndex(
    propSatisfies(time => time < currentTime, 'publishedTimeStart'),
  )(schedules);
};

export const isScheduleDataComplete = ({
  schedules,
  currentTime = Date.now(),
}) => {
  // finding latest program, that may or may not still be live. this is because there isn't
  // always a live program, in which case we show the most recently played program on demand.
  const latestProgramIndex = getLastProgramIndex({ schedules, currentTime });

  return schedules[latestProgramIndex - 2] && schedules[latestProgramIndex + 1];
};

export const isProgramValid = program => {
  const {
    publishedTimeStart,
    publishedTimeEnd,
    publishedTimeDuration,
  } = program;
  const broadcastPid = path(['broadcast', 'pid'], program);
  const brandTitle = path(['brand', 'title'], program);
  const brandPid = path(['brand', 'pid'], program);
  const pid = path(['episode', 'pid'], program);

  const isValid = [
    publishedTimeStart,
    publishedTimeEnd,
    publishedTimeDuration,
    broadcastPid,
    brandTitle,
    brandPid,
    pid,
  ].every(Boolean);

  return isValid;
};

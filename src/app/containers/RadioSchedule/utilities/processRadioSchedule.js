import findLastIndex from 'ramda/src/findLastIndex';
import propSatisfies from 'ramda/src/propSatisfies';
import pathOr from 'ramda/src/pathOr';

const getProgramState = (currentTime, startTime, endTime) => {
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

const getLink = (state, program, service) => {
  const url = `/${service}/${program.serviceId}`;
  return state === 'live'
    ? `${url}/liveradio`
    : `${url}/${program.broadcast.pid}`;
};

export default (radioScheduleData, service, currentTime) => {
  // finding latest program, that may or may not still be live. this is because there isn't
  // always a live program, in which case we show the most recently played program on demand.
  const latestProgramIndex = findLastIndex(
    propSatisfies((time) => time < currentTime, 'publishedTimeStart'),
  )(radioScheduleData.schedules);

  const radioSchedules = radioScheduleData.schedules;

  const scheduleDataIsComplete =
    radioSchedules[latestProgramIndex - 2] &&
    radioSchedules[latestProgramIndex + 1];
  const schedulesToShow = scheduleDataIsComplete && [
    radioSchedules[latestProgramIndex],
    radioSchedules[latestProgramIndex - 1],
    radioSchedules[latestProgramIndex - 2],
    radioSchedules[latestProgramIndex + 1],
  ];

  const schedules =
    schedulesToShow &&
    schedulesToShow.map((program) => {
      const currentState = getProgramState(
        currentTime,
        program.publishedTimeStart,
        program.publishedTimeEnd,
        service,
      );
      return {
        id: pathOr(null, ['broadcast', 'pid'], program),
        state: currentState,
        stateLabel: currentState,
        startTime: pathOr(null, ['publishedTimeStart'], program),
        link: getLink(currentState, program, service),
        brandTitle: pathOr(null, ['brand', 'title'], program),
        episodeTitle: pathOr(null, ['episode', 'presentationTitle'], program),
        summary: pathOr(null, ['episode', 'synopses', 'short'], program),
        duration: pathOr(null, ['publishedTimeDuration'], program),
        durationLabel: 'Duration',
      };
    });

  return schedules;
};

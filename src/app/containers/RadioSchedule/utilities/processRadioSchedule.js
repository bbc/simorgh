import moment from 'moment';
import findLastIndex from 'ramda/src/findLastIndex';
import propSatisfies from 'ramda/src/propSatisfies';

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

export default (radioScheduleData, service) => {
  const currentTime = parseInt(moment.utc().format('x'), 10);

  // finding latest program, that may or may not still be live. this is because there isn't
  // always a live program, in which case we show the most recently played program on demand.
  const latestProgramIndex = findLastIndex(
    propSatisfies(time => time < currentTime, 'publishedTimeStart'),
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
    schedulesToShow.map(program => {
      const currentState = getProgramState(
        currentTime,
        program.publishedTimeStart,
        program.publishedTimeEnd,
        service,
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

  return schedules;
};

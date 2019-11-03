import moment from 'moment';
import findLastIndex from 'ramda/src/findLastIndex';
import propSatisfies from 'ramda/src/propSatisfies';

const formatSchedules = (schedules, currentTime, latestProgrammeIndex) => {
  // what if there's fewer than 4 entries? also will need to update
  // eventually when live updating the schedule.
  const schedulesToShow = schedules.slice(
    latestProgrammeIndex - 2,
    latestProgrammeIndex + 2,
  );

  const formattedSchedules = schedulesToShow.map((programme, index) => {
    const {
      brand,
      episode,
      broadcast,
      transmissionTimeEnd,
      transmissionTimeStart,
      publishedTimeStart,
      publishedTimeEnd,
      serviceId,
    } = programme;

    const durationMilliseconds = publishedTimeEnd - publishedTimeStart;
    const duration = durationMilliseconds / (60 * 1000);

    return {
      title: brand.title,
      episodeTitle: episode.presentationTitle,
      synopsis: episode.synopses.short,
      startTime: publishedTimeStart,
      endTime: publishedTimeEnd,
      duration,
      pid: episode.pid,
      id: broadcast.pid,
      serviceId,
      isLive:
        transmissionTimeStart < currentTime &&
        currentTime < transmissionTimeEnd,
      isNext: index === schedulesToShow.length - 1,
    };
  });

  return { schedules: formattedSchedules };
};

const filterCurrentRadioProgrammes = ({ schedules }) => {
  const currentTime = parseInt(moment.utc().format('x'), 10);

  // finding latest programme, that may or may not still be live. this is because there isn't
  // always a live programme, in which case we show the most recently played programme on demand.
  const latestProgrammeIndex = findLastIndex(
    propSatisfies(time => time < currentTime, 'transmissionTimeStart'),
  )(schedules);

  return formatSchedules(schedules, currentTime, latestProgrammeIndex);
};

export default filterCurrentRadioProgrammes;

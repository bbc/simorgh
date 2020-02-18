import React, { useContext, useEffect, useState } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import { latin } from '@bbc/gel-foundations/scripts';
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
  const { hasRadioSchedule } = useContext(ServiceContext);
  const radioScheduleEnabled = enabled && hasRadioSchedule;

  const [schedule, setRadioSchedule] = useState([]);

  const handleResponse = async response => {
    const radioScheduleData = await response.json();

    const currentTime = parseInt(moment.utc().format('x'), 10);
    // finding latest programme, that may or may not still be live. this is because there isn't
    // always a live programme, in which case we show the most recently played programme on demand.
    const latestProgrammeIndex = findLastIndex(
      propSatisfies(time => time < currentTime, 'transmissionTimeStart'),
    )(radioScheduleData.schedules);

    console.log(latestProgrammeIndex);

    const radioScheduleData1 =
      radioScheduleData.schedules[latestProgrammeIndex];

    console.log('current time', new Date());

    console.log('current time from var', new Date(currentTime));

    const schedules = [
      {
        id: 1,
        state: 'live',
        stateLabel: 'Live',
        startTime: radioScheduleData1.publishedTimeStart,
        link: 'www.bbc.co.uk',
        brandTitle: radioScheduleData1.brand.title,
        episodeTitle: radioScheduleData1.episode.presentationTitle,
        summary: radioScheduleData1.episode.synopses.short,
        duration: radioScheduleData1.publishedTimeDuration,
        durationLabel: 'Duration',
      },
    ];

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

  // if (!radioScheduleEnabled) {
  //   return null;
  // }

  // const schedules = [
  //   {
  //     id: 1,
  //     state: 'live',
  //     stateLabel: 'Live',
  //     startTime: 1566914061212,
  //     link: 'www.bbc.co.uk',
  //     brandTitle: 'This is a brand title',
  //     episodeTitle: 'This is an episode title',
  //     summary: 'This is a summary',
  //     duration: '45:00',
  //     durationLabel: 'Duration',
  //   },
  //   {
  //     id: 2,
  //     state: 'next',
  //     stateLabel: 'Live',
  //     startTime: 1566914061212,
  //     link: 'www.bbc.co.uk',
  //     brandTitle: 'This is a brand title',
  //     episodeTitle: 'This is an episode title',
  //     summary: 'This is a summary',
  //     duration: '45:00',
  //     durationLabel: 'Duration',
  //   },
  //   {
  //     id: 2,
  //     state: 'onDemand',
  //     stateLabel: 'Live',
  //     startTime: 1566914061212,
  //     link: 'www.bbc.co.uk',
  //     brandTitle: 'This is a brand title',
  //     episodeTitle: 'This is an episode title',
  //     summary: 'This is a summary',
  //     duration: '45:00',
  //     durationLabel: 'Duration',
  //   },
  // ];

  return (
    <>
      <RadioSchedule
        schedules={schedule}
        locale="en-gb"
        timezone="Europe/London"
        script={latin}
        service="news"
        dir="ltr"
      />
    </>
    // <>
    //   <p>Radio Schedules</p>
    //   {schedule.map(
    //     ({
    //       broadcast,
    //       transmissionTimeStart,
    //       transmissionTimeEnd,
    //       episode: {
    //         presentationTitle,
    //         synopses: { short },
    //       },
    //     }) => (
    //       <ul key={broadcast.pid}>
    //         <li>{presentationTitle}</li>
    //         <li>{short}</li>
    //         <li>{transmissionTimeStart}</li>
    //         <li>{transmissionTimeEnd}</li>
    //       </ul>
    //     ),
    //   )}
    // </>
  );
};

RadioScheduleContainer.propTypes = {
  endpoint: string.isRequired,
};

export default RadioScheduleContainer;

import React from 'react';
import styled from 'styled-components';
import { string, bool, shape, number, arrayOf } from 'prop-types';
import { GEL_FF_REITH_SANS } from '@bbc/gel-foundations/typography';
import moment from 'moment-timezone';

// this is a dummy component to show POC
// would need to create component(s) in psammead instead

const ProgrammeContainer = styled.div`
  width: 25%;
  margin: 4px;
  font-size: 13px;
  line-height: 16px;
  display: block;
  font-family: ${GEL_FF_REITH_SANS};
  & > * {
    margin-bottom: 4px;
  }
`;

const Title = styled.h4`
  margin: 4px 0;
  font-size: 16px;
`;

const EpisodeTitle = styled.h5`
  margin: 4px 0;
  font-size: 14px;
  font-weight: normal;
`;

const Now = styled.span`
  color: #b80000;
`;

const Next = styled.span`
  color: #11708c;
`;

const Synopsis = styled.div`
  color: #6e6e73;
`;

const formatTime = (time, locale, timezone) =>
  moment
    .utc(time)
    .locale(locale)
    .tz(timezone)
    .format('HH:mm z');

const Link = ({ href, isLive }) => (
  <a href={href}>{isLive ? 'Listen Live' : 'Listen'}</a>
);

Link.propTypes = {
  href: string.isRequired,
  isLive: bool.isRequired,
};

const Programme = ({ programme, datetimeLocale, timezone, service }) => {
  const {
    title,
    episodeTitle,
    synopsis,
    startTime,
    endTime,
    duration,
    isLive,
    isNext,
    pid,
    serviceId,
  } = programme;

  const href = isLive
    ? `https://www.bbc.com/${service}/${serviceId}/liveradio` // making absolute links for POC to show linking to correct page
    : `https://www.bbc.com/${service}/${serviceId}/${pid}`;

  const formattedStart = formatTime(startTime, datetimeLocale, timezone);
  const formattedEnd = formatTime(endTime, datetimeLocale, timezone);

  return (
    <ProgrammeContainer>
      <div>
        {formattedStart} - {formattedEnd}
      </div>
      <div>Duration: {duration} minutes</div>
      <Title>
        {isLive && <Now>NOW ON </Now>}
        {isNext && <Next>NEXT </Next>}
        {title}
      </Title>
      <EpisodeTitle>{episodeTitle}</EpisodeTitle>
      <Synopsis>{synopsis}</Synopsis>
      {!isNext && <Link href={href} isLive={isLive} />}
    </ProgrammeContainer>
  );
};

const programmeShape = {
  title: string.isRequired,
  episodeTitle: string.isRequired,
  synopsis: string.isRequired,
  startTime: number.isRequired,
  endTime: number.isRequired,
  duration: number.isRequired,
  isLive: bool.isRequired,
  isNext: bool.isRequired,
  pid: string.isRequired,
  serviceId: string.isRequired,
};

Programme.propTypes = {
  programme: shape(programmeShape).isRequired,
  datetimeLocale: string.isRequired,
  timezone: string.isRequired,
  service: string.isRequired,
};

const RadioContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

const RadioSchedules = ({ schedules, datetimeLocale, timezone, service }) => {
  return (
    <RadioContainer>
      {schedules.map(programme => (
        <Programme
          key={programme.id}
          programme={programme}
          datetimeLocale={datetimeLocale}
          timezone={timezone}
          service={service}
        />
      ))}
    </RadioContainer>
  );
};

RadioSchedules.propTypes = {
  schedules: arrayOf(shape(programmeShape)).isRequired,
  datetimeLocale: string.isRequired,
  timezone: string.isRequired,
  service: string.isRequired,
};

export default RadioSchedules;

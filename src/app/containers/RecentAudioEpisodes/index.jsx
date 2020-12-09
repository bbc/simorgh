/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import {
  formatDuration,
  formatUnixTimestamp,
} from '@bbc/psammead-timestamp-container/utilities';
import Timestamp from '@bbc/psammead-timestamp-container';
import SectionLabel from '@bbc/psammead-section-label';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import EpisodeList from '@bbc/psammead-episode-list';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledSpan = styled.span`
  padding: 0 ${GEL_SPACING};
`;

const Spacer = styled.aside`
  position: relative;
  margin-bottom: ${GEL_SPACING_QUAD};
`;
const StyledSectionLabel = styled(SectionLabel)`
  margin-bottom: 0;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
`;

const RecentAudioEpisodes = ({ episodes }) => {
  const {
    translations,
    service,
    script,
    dir,
    timezone,
    datetimeLocale,
    altCalendar,
    dateTimeFormat,
  } = useContext(ServiceContext);

  if (!episodes.length) return null;

  const formattedTimestamp = ({ releaseDateTimeStamp, format }) =>
    formatUnixTimestamp({
      timestamp: releaseDateTimeStamp,
      format,
      timezone,
      locale: datetimeLocale,
      isRelative: false,
    });

  const recentEpisodesTranslation = pathOr(
    'Recent Episodes',
    ['media', 'recentEpisodes'],
    translations,
  );
  const durationLabel = pathOr('Duration', ['media', 'duration'], translations);
  const audioLabel = pathOr('Audio', ['media', 'audio'], translations);

  return (
    <Spacer role="complimentary">
      <StyledSectionLabel
        script={script}
        service={service}
        dir={dir}
        bar={false}
        labelId="recent-episodes"
      >
        {recentEpisodesTranslation}
      </StyledSectionLabel>
      <EpisodeList script={script} service={service} dir={dir}>
        {episodes.map(episode => (
          <EpisodeList.Episode key={episode.id}>
            <EpisodeList.Link href={episode.url}>
              {/* these must be concatenated for screen reader UX */}
              <VisuallyHiddenText>{`${audioLabel}, `}</VisuallyHiddenText>
              <EpisodeList.Title className="episode-list__title--hover episode-list__title--visited">
                {episode.brandTitle}
              </EpisodeList.Title>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <EpisodeList.Description className="episode-list__description--hover episode-list__description--visited">
                {episode.episodeTitle ||
                  `${formattedTimestamp({
                    releaseDateTimeStamp: episode.timestamp,
                    format: 'LL',
                  })}, ${formattedTimestamp({
                    releaseDateTimeStamp: episode.timestamp,
                    format: 'HH:mm',
                  })}`}
              </EpisodeList.Description>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <VisuallyHiddenText>
                {` ${durationLabel} ${formatDuration({
                  duration: episode.duration,
                  format: episode.duration.includes('H') ? 'h,mm,ss' : 'mm,ss',
                  locale: datetimeLocale,
                })} `}
              </VisuallyHiddenText>
              <EpisodeList.Metadata>
                <span aria-hidden="true">
                  {` ${durationLabel} ${formatDuration({
                    duration: episode.duration,
                    locale: datetimeLocale,
                  })}`}
                </span>
              </EpisodeList.Metadata>
            </EpisodeList.Link>
            <EpisodeList.Metadata>
              {episode.episodeTitle && (
                <>
                  {' '}
                  <StyledSpan aria-hidden>|</StyledSpan>
                  <Timestamp
                    timestamp={episode.timestamp}
                    format="LL"
                    dateTimeFormat={dateTimeFormat}
                    script={script}
                    locale={datetimeLocale}
                    service={service}
                    timezone={timezone}
                    altCalendar={altCalendar}
                  />
                </>
              )}
            </EpisodeList.Metadata>
          </EpisodeList.Episode>
        ))}
      </EpisodeList>
    </Spacer>
  );
};

RecentAudioEpisodes.propTypes = {
  episodes: arrayOf(
    shape({
      id: string.isRequired,
      url: string.isRequired,
      brandTitle: string.isRequired,
      episodeTitle: string,
      timestamp: number.isRequired,
      duration: string.isRequired,
    }),
  ).isRequired,
};

export default RecentAudioEpisodes;

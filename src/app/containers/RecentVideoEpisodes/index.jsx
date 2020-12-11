/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import EpisodeList from '@bbc/psammead-episode-list';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import Timestamp from '@bbc/psammead-timestamp-container';
import {
  formatDuration,
  formatUnixTimestamp,
} from '@bbc/psammead-timestamp-container/utilities';
import SectionLabel from '@bbc/psammead-section-label';
import { C_WHITE, C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledSectionLabel = styled(SectionLabel)`
  color: ${C_WHITE};
  margin-bottom: 0;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
`;

const RecentVideoEpisodes = ({ episodes }) => {
  const {
    script,
    service,
    dir,
    timezone,
    datetimeLocale,
    translations,
  } = useContext(ServiceContext);

  if (!episodes.length) return null;

  const formatDate = timestamp =>
    formatUnixTimestamp({
      timestamp,
      format: 'D MMMM YYYY',
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
  const videoLabel = pathOr('Video', ['media', 'video'], translations);

  return (
    <aside role="complimentary" aria-labelledby="recent-episodes">
      <StyledSectionLabel
        script={script}
        service={service}
        dir={dir}
        backgroundColor={C_MIDNIGHT_BLACK}
        labelId="recent-episodes"
      >
        {recentEpisodesTranslation}
      </StyledSectionLabel>
      <EpisodeList script={script} service={service} dir={dir} darkMode>
        {episodes.map(episode => (
          <EpisodeList.Episode key={episode.id} dir={dir}>
            <EpisodeList.Image
              dir={dir}
              src={episode.image}
              alt={episode.altText}
              duration={formatDuration({
                duration: episode.duration,
                locale: datetimeLocale,
              })}
            />
            {/* these must be concatenated for screen reader UX */}
            <EpisodeList.Link href={episode.url}>
              <VisuallyHiddenText>{`${videoLabel}, `}</VisuallyHiddenText>
              <EpisodeList.Title className="episode-list__title--hover episode-list__title--visited">
                {episode.brandTitle}
              </EpisodeList.Title>
              <EpisodeList.Description className="episode-list__description--hover episode-list__description--visited">
                {episode.episodeTitle || formatDate(episode.timestamp)}
              </EpisodeList.Description>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <VisuallyHiddenText>
                {`${durationLabel} ${formatDuration({
                  duration: episode.duration,
                  format: episode.duration.includes('H') ? 'h,mm,ss' : 'mm,ss',
                  locale: datetimeLocale,
                })} `}
              </VisuallyHiddenText>
            </EpisodeList.Link>
            {episode.episodeTitle && (
              <span role="text">
                <EpisodeList.Metadata
                  as={Timestamp}
                  timestamp={episode.timestamp}
                  format="D MMMM YYYY"
                  dateTimeFormat="YYYY-MM-DD"
                  padding={false}
                  script={script}
                  locale={datetimeLocale}
                  service={service}
                  timezone={timezone}
                />
              </span>
            )}
          </EpisodeList.Episode>
        ))}
      </EpisodeList>
    </aside>
  );
};

RecentVideoEpisodes.propTypes = {
  episodes: arrayOf(
    shape({
      id: string.isRequired,
      url: string.isRequired,
      brandTitle: string.isRequired,
      episodeTitle: string,
      timestamp: number.isRequired,
      duration: string.isRequired,
      image: string.isRequired,
      altText: string.isRequired,
    }),
  ).isRequired,
};

export default RecentVideoEpisodes;

import React, { useContext } from 'react';
import styled from '@emotion/styled';
import EpisodeList from '@bbc/psammead-episode-list';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
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

// TODO: translations, proptypes, disable on live
const RecentVideoEpisodes = ({ episodes }) => {
  const { script, service, dir, timezone, datetimeLocale } = useContext(
    ServiceContext,
  );

  // if (!episodes) return null;
  // if (isLive()) return null;

  const formatDate = timestamp =>
    formatUnixTimestamp({
      timestamp,
      format: 'D MMMM YYYY',
      timezone,
      locale: datetimeLocale,
      isRelative: false,
    });

  return (
    <div>
      <StyledSectionLabel
        script={script}
        service={service}
        dir={dir}
        backgroundColor={C_MIDNIGHT_BLACK}
      >
        Recent Episodes
      </StyledSectionLabel>
      <EpisodeList script={script} service={service} dir={dir} darkMode>
        {episodes.map(episode => (
          <EpisodeList.Episode key={episode.id}>
            <EpisodeList.Image
              src={episode.image}
              alt={episode.altText}
              duration={formatDuration({
                duration: episode.duration,
                locale: datetimeLocale,
              })}
            />
            <VisuallyHiddenText>Video, </VisuallyHiddenText>
            <EpisodeList.Link href={episode.url}>
              <EpisodeList.Title className="episode-list__title--hover episode-list__title--visited">
                {episode.brandTitle}
              </EpisodeList.Title>
              <EpisodeList.Description className="episode-list__description--hover episode-list__description--visited">
                {episode.episodeTitle || formatDate(episode.timestamp)}
              </EpisodeList.Description>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <VisuallyHiddenText>
                {` Durée ${formatDuration({
                  duration: episode.duration,
                  format: episode.duration.includes('H') ? 'h,mm,ss' : 'mm,ss',
                  locale: datetimeLocale,
                })} `}
              </VisuallyHiddenText>
            </EpisodeList.Link>
            {episode.episodeTitle && (
              <span role="text">
                <EpisodeList.Metadata as="time">
                  {formatDate(episode.timestamp)}
                </EpisodeList.Metadata>
              </span>
            )}
          </EpisodeList.Episode>
        ))}
      </EpisodeList>
    </div>
  );
};

export default RecentVideoEpisodes;

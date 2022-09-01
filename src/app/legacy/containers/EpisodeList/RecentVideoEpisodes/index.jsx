/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import {
  formatDuration,
  formatUnixTimestamp,
} from '#psammead/psammead-timestamp-container/src/utilities';
import SectionLabel from '#psammead/psammead-section-label/src';
import {
  C_WHITE,
  C_MIDNIGHT_BLACK,
} from '#psammead/psammead-styles/src/colours';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { RequestContext } from '#contexts/RequestContext';
import EpisodeList from '#containers/EpisodeList';
import { ServiceContext } from '../../../../contexts/ServiceContext';

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

const InlineDiv = styled.div`
  display: inline;
`;

const RecentVideoEpisodes = ({ masterBrand, episodes }) => {
  const { script, service, dir, timezone, datetimeLocale, translations } =
    useContext(ServiceContext);
  const { isAmp, variant } = useContext(RequestContext);

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
  const getUrl = episodeId =>
    '/'.concat(
      [service, variant, masterBrand, 'tv', episodeId]
        .filter(Boolean)
        .join('/'),
    );
  const ulProps = { 'data-e2e': 'recent-episodes-list' };
  const liProps = { 'data-e2e': 'recent-episodes-list-item' };

  return (
    <aside role="complementary" aria-labelledby="recent-episodes">
      <StyledSectionLabel
        script={script}
        service={service}
        dir={dir}
        backgroundColor={C_MIDNIGHT_BLACK}
        labelId="recent-episodes"
      >
        {recentEpisodesTranslation}
      </StyledSectionLabel>
      <EpisodeList
        script={script}
        service={service}
        dir={dir}
        darkMode
        ulProps={ulProps}
        liProps={liProps}
      >
        {episodes.map((episode, index) => (
          <EpisodeList.Episode key={episode.id} dir={dir}>
            <EpisodeList.Image
              dir={dir}
              src={episode.image}
              alt={episode.altText}
              duration={formatDuration({
                duration: episode.duration,
                locale: datetimeLocale,
              })}
              {...(isAmp && {
                as: () => (
                  <amp-img
                    layout="responsive"
                    width="16"
                    height="9"
                    src={episode.image}
                    alt={episode.altText}
                  />
                ),
              })}
            />
            {/* these must be concatenated for screen reader UX */}
            <EpisodeList.Link href={getUrl(episode.id)} index={index}>
              <VisuallyHiddenText>{`${videoLabel}, `}</VisuallyHiddenText>
              <EpisodeList.Title className="episode-list__title--hover episode-list__title--visited">
                {episode.brandTitle}
              </EpisodeList.Title>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <EpisodeList.Description className="episode-list__description--hover episode-list__description--visited">
                {episode.episodeTitle || formatDate(episode.timestamp)}
              </EpisodeList.Description>
              <VisuallyHiddenText>
                {`, ${durationLabel} ${formatDuration({
                  duration: episode.duration,
                  format: episode.duration.includes('H') ? 'h,mm,ss' : 'mm,ss',
                  locale: datetimeLocale,
                })} `}
              </VisuallyHiddenText>
            </EpisodeList.Link>
            {episode.episodeTitle && (
              <InlineDiv>
                <EpisodeList.DateTimeDuration
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
              </InlineDiv>
            )}
          </EpisodeList.Episode>
        ))}
      </EpisodeList>
    </aside>
  );
};

RecentVideoEpisodes.propTypes = {
  masterBrand: string.isRequired,
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

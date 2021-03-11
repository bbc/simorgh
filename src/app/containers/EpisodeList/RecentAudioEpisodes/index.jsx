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
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import EpisodeList from '#containers/EpisodeList';

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
const StyledTimestamp = styled(Timestamp)`
  display: inline;
`;

const InlineDiv = styled.div`
  display: inline;
`;

const RecentAudioEpisodes = ({ masterBrand, episodes, brandId, pageType }) => {
  const {
    translations,
    service,
    script,
    dir,
    timezone,
    datetimeLocale,
  } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);

  if (!episodes.length) return null;

  const formattedTimestamp = ({ timestamp, format }) =>
    formatUnixTimestamp({
      timestamp,
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
  const getUrl = episodeId =>
    '/'.concat(
      [
        service,
        variant,
        pageType === 'Podcast' ? 'podcasts' : '',
        pageType === 'Podcast' ? brandId : masterBrand,
        episodeId,
      ]
        .filter(Boolean)
        .join('/'),
    );

  const ulProps = { 'data-e2e': 'recent-episodes-list' };
  const liProps = { 'data-e2e': 'recent-episodes-list-item' };

  return (
    <Spacer role="complementary" aria-labelledby="recent-episodes">
      <StyledSectionLabel
        script={script}
        service={service}
        dir={dir}
        bar={false}
        labelId="recent-episodes"
      >
        {recentEpisodesTranslation}
      </StyledSectionLabel>
      <EpisodeList
        script={script}
        service={service}
        dir={dir}
        ulProps={ulProps}
        liProps={liProps}
      >
        {episodes.map(episode => (
          <EpisodeList.Episode key={episode.id}>
            <EpisodeList.Link href={getUrl(episode.id)}>
              {/* these must be concatenated for screen reader UX */}
              <VisuallyHiddenText>{`${audioLabel}, `}</VisuallyHiddenText>
              <EpisodeList.Title className="episode-list__title--hover episode-list__title--visited">
                {episode.brandTitle}
              </EpisodeList.Title>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <EpisodeList.Description className="episode-list__description--hover episode-list__description--visited">
                {episode.episodeTitle ||
                  `${formattedTimestamp({
                    timestamp: episode.timestamp,
                    format: 'LL',
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
              <EpisodeList.DateTimeDuration>
                <span aria-hidden="true">
                  {` ${durationLabel} ${formatDuration({
                    duration: episode.duration,
                    locale: datetimeLocale,
                  })}`}
                </span>
              </EpisodeList.DateTimeDuration>
            </EpisodeList.Link>
            {episode.episodeTitle && (
              <InlineDiv>
                <EpisodeList.DateTimeDuration
                  hasBorder
                  dir={dir}
                  as={StyledTimestamp}
                  timestamp={episode.timestamp}
                  format="LL"
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
    </Spacer>
  );
};

RecentAudioEpisodes.propTypes = {
  masterBrand: string.isRequired,
  brandId: string,
  pageType: string.isRequired,
  episodes: arrayOf(
    shape({
      id: string.isRequired,
      brandTitle: string.isRequired,
      episodeTitle: string,
      timestamp: number.isRequired,
      duration: string.isRequired,
    }),
  ).isRequired,
};

RecentAudioEpisodes.defaultProps = {
  brandId: '',
};

export default RecentAudioEpisodes;

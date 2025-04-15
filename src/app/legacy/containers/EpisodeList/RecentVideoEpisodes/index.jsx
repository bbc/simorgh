/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import {
  formatDuration,
  formatUnixTimestamp,
} from '#psammead/psammead-timestamp-container/src/utilities';
import SectionLabel from '#psammead/psammead-section-label/src';
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
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const StyledSectionLabel = styled(SectionLabel)`
  color: ${props => props.theme.palette.WHITE};
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

const getAmpImageComponent =
  ({ image, altText }) =>
  () => (
    <amp-img
      layout="responsive"
      width="16"
      height="9"
      src={image}
      alt={altText}
    />
  );

const RecentVideoEpisodes = ({ masterBrand, episodes }) => {
  const { script, service, dir, timezone, datetimeLocale, translations } =
    useContext(ServiceContext);
  const { isAmp, variant } = useContext(RequestContext);

  const {
    palette: { MIDNIGHT_BLACK },
  } = useTheme();

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
        backgroundColor={MIDNIGHT_BLACK}
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
                as: getAmpImageComponent(episode),
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

export default RecentVideoEpisodes;

/* eslint-disable jsx-a11y/aria-role */
import React, { use } from 'react';
import { useTheme } from '@emotion/react';
import pathOr from 'ramda/src/pathOr';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import {
  formatDuration,
  formatUnixTimestamp,
} from '#psammead/psammead-timestamp-container/src/utilities';
import SectionLabel from '#psammead/psammead-section-label/src';
import { RequestContext } from '#contexts/RequestContext';
import EpisodeList from '#containers/EpisodeList';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import { ServiceContext } from '../../../../contexts/ServiceContext';

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
    use(ServiceContext);
  const { isAmp, variant } = use(RequestContext);

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
      <SectionLabel
        script={script}
        service={service}
        dir={dir}
        backgroundColor={MIDNIGHT_BLACK}
        labelId="recent-episodes"
        className="text-white mb-0 group-2:mb-double group-3:mb-triple"
      >
        {recentEpisodesTranslation}
      </SectionLabel>
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
              <div className="inline">
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
              </div>
            )}
          </EpisodeList.Episode>
        ))}
      </EpisodeList>
    </aside>
  );
};

export default RecentVideoEpisodes;

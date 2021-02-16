/* eslint-disable react/prop-types */
import React from 'react';
import styled from '@emotion/styled';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { formatDuration } from '@bbc/psammead-timestamp-container/utilities';
import EpisodeList from '..';
import SurroundingComponents from './SurroundingComponentsExample';

const InlineDiv = styled.div`
  display: inline;
`;

const AudioEpisodesExample = ({
  episodes,
  script,
  service,
  dir,
  withSurroundingComponents,
  darkMode,
  ulProps,
  liProps,
}) => {
  const Wrapper = withSurroundingComponents
    ? SurroundingComponents
    : React.Fragment;
  return (
    <Wrapper
      {...(withSurroundingComponents ? { script, service, dir, darkMode } : {})}
    >
      <EpisodeList
        script={script}
        service={service}
        dir={dir}
        ulProps={ulProps}
        liProps={liProps}
      >
        {episodes.map(episode => (
          <EpisodeList.Episode key={episode.id}>
            <EpisodeList.Link href={episode.url}>
              <VisuallyHiddenText>Audio, </VisuallyHiddenText>
              <EpisodeList.Title className="episode-list__title--hover episode-list__title--visited">
                {episode.brandTitle}
              </EpisodeList.Title>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <EpisodeList.Description className="episode-list__description--hover episode-list__description--visited">
                {episode.episodeTitle || `${episode.date}, ${episode.time}`}
              </EpisodeList.Description>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <VisuallyHiddenText>
                {` ${episode.durationLabel} ${formatDuration({
                  duration: episode.duration,
                  format: episode.duration.includes('H') ? 'h,mm,ss' : 'mm,ss',
                  locale: episode.locale,
                })} `}
              </VisuallyHiddenText>
              <EpisodeList.DateTimeDuration>
                <span aria-hidden="true">
                  {` ${episode.durationLabel} ${formatDuration({
                    duration: episode.duration,
                    locale: episode.locale,
                  })}`}
                </span>
              </EpisodeList.DateTimeDuration>
            </EpisodeList.Link>
            {episode.episodeTitle && (
              <InlineDiv>
                <EpisodeList.DateTimeDuration
                  as="time"
                  hasBorder
                  dateTime={episode.dateTime}
                  dir={dir}
                >
                  {episode.date}
                </EpisodeList.DateTimeDuration>
              </InlineDiv>
            )}
          </EpisodeList.Episode>
        ))}
      </EpisodeList>
    </Wrapper>
  );
};

export default AudioEpisodesExample;

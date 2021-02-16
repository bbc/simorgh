/* eslint-disable jsx-a11y/aria-role */
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

const VideoEpisodesExample = ({
  episodes,
  script,
  service,
  dir,
  withSurroundingComponents,
  darkMode,
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
        darkMode={darkMode}
      >
        {episodes.map(episode => (
          <EpisodeList.Episode key={episode.id}>
            <EpisodeList.Image
              src={episode.image}
              alt={episode.altText}
              duration={formatDuration({
                duration: episode.duration,
                locale: episode.locale,
              })}
            />
            <EpisodeList.Link href={episode.url}>
              <VisuallyHiddenText>Video, </VisuallyHiddenText>
              <EpisodeList.Title className="episode-list__title--hover episode-list__title--visited">
                {episode.brandTitle}
              </EpisodeList.Title>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <EpisodeList.Description className="episode-list__description--hover episode-list__description--visited">
                {episode.episodeTitle || episode.date}
              </EpisodeList.Description>
              <VisuallyHiddenText>, </VisuallyHiddenText>
              <VisuallyHiddenText>
                {` ${episode.durationLabel} ${formatDuration({
                  duration: episode.duration,
                  format: episode.duration.includes('H') ? 'h,mm,ss' : 'mm,ss',
                  locale: episode.locale,
                })} `}
              </VisuallyHiddenText>
            </EpisodeList.Link>
            {episode.episodeTitle && (
              <InlineDiv>
                <EpisodeList.DateTimeDuration
                  as="time"
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

export default VideoEpisodesExample;

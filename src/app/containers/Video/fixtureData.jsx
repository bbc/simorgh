import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import {
  captionBlock,
  videoClipGlobalGuidanceBlock,
  videoClipGlobalPortraitBlock,
  videoClipUkGuidanceBlock,
  videoClipNonUkBlock,
  audioClipGlobalGuidanceBlock,
  audioClipNonUkBlock,
  audioClipUkOnlyBlock,
  audioEpisodeGlobalBlock,
} from './helpers/fixtures';

const generateFixtureData = ({ platform, blocks }) => (
  <RequestContextProvider
    id="c0000000000o"
    isUK
    origin="https://www.test.bbc.co.uk"
    platform={platform}
    statsDestination="NEWS_PS_TEST"
    statsPageIdentifier="news.articles.c0000000000o.page"
  >
    <VideoContainer blocks={blocks} />
  </RequestContextProvider>
);

generateFixtureData.propTypes = {
  platform: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.any),
};

generateFixtureData.defaultProps = {
  platform: 'canonical',
  blocks: '',
};

export const VideoClipGlobalWithCaption = generateFixtureData({
  platform: 'canonical',
  blocks: [videoClipGlobalGuidanceBlock, captionBlock],
});

export const VideoClipGlobalWithoutCaption = generateFixtureData({
  platform: 'canonical',
  blocks: [videoClipGlobalGuidanceBlock],
});

export const VideoClipGlobalPortrait = generateFixtureData({
  platform: 'canonical',
  blocks: [videoClipGlobalPortraitBlock],
});

export const VideoClipUkWithGuidance = generateFixtureData({
  platform: 'canonical',
  blocks: [videoClipUkGuidanceBlock],
});

export const VideoClipNonUk = generateFixtureData({
  platform: 'canonical',
  blocks: [videoClipNonUkBlock],
});

export const AudioClipGlobalGuidance = generateFixtureData({
  platform: 'canonical',
  blocks: [audioClipGlobalGuidanceBlock],
});

export const AudioClipUk = generateFixtureData({
  platform: 'canonical',
  blocks: [audioClipUkOnlyBlock],
});

export const AudioClipNonUk = generateFixtureData({
  platform: 'canonical',
  blocks: [audioClipNonUkBlock],
});

export const AudioEpisodeGlobal = generateFixtureData({
  platform: 'canonical',
  blocks: [audioEpisodeGlobalBlock],
});

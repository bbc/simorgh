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
    pageType="article"
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

export const NoData = ({ platform }) =>
  generateFixtureData({ platform, blocks: null });

export const NoAresMedia = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [captionBlock],
  });

export const VideoClipGlobalWithCaption = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [videoClipGlobalGuidanceBlock, captionBlock],
  });

export const VideoClipGlobalWithoutCaption = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [videoClipGlobalGuidanceBlock],
  });

export const VideoClipGlobalPortrait = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [videoClipGlobalPortraitBlock],
  });

export const VideoClipUkWithGuidance = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [videoClipUkGuidanceBlock],
  });

export const VideoClipNonUk = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [videoClipNonUkBlock],
  });

export const AudioClipGlobalGuidance = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [audioClipGlobalGuidanceBlock],
  });

export const AudioClipUk = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [audioClipUkOnlyBlock],
  });

export const AudioClipNonUk = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [audioClipNonUkBlock],
  });

export const AudioEpisodeGlobal = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [audioEpisodeGlobalBlock],
  });

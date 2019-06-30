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
} from './helpers/fixtures';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

const generateFixtureData = ({ platform, blocks }) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      id="c0000000000o"
      bbcOrigin="https://www.test.bbc.co.uk"
      pageType="article"
      isAmp={platform === 'amp'}
      service="news"
    >
      <VideoContainer blocks={blocks} />
    </RequestContextProvider>
  </ServiceContextProvider>
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
    blocks: [captionBlock('No Ares Media')],
  });

export const VideoClipGlobalWithCaption = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [
      videoClipGlobalGuidanceBlock,
      captionBlock('Video Clip Global with Caption'),
    ],
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

export const AudioClipGlobalGuidanceWithCaption = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [
      audioClipGlobalGuidanceBlock,
      captionBlock('Audio Clip Global Guidance with Caption'),
    ],
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

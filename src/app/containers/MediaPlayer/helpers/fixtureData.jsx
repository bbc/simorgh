import React from 'react';
import PropTypes from 'prop-types';
import MediaPlayerContainer from '../index';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import {
  captionBlock,
  videoClipGlobalGuidanceBlock,
  videoClipGlobalPortraitBlock,
  videoClipUkGuidanceBlock,
  videoClipNonUkBlock,
  audioClipGlobalGuidanceBlock,
  audioClipNonUkBlock,
  audioClipUkOnlyBlock,
} from './fixtures';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../../contexts/ToggleContext';

const generateFixtureData = ({ platform, blocks, service }) => {
  return (
    <ServiceContextProvider service={service || 'news'}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={platform === 'amp'}
        pageType="article"
        service="news"
      >
        <ToggleContextProvider>
          <MediaPlayerContainer blocks={blocks} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

generateFixtureData.propTypes = {
  platform: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.any),
  service: PropTypes.string,
};

generateFixtureData.defaultProps = {
  platform: 'canonical',
  blocks: '',
  service: 'news',
};

export const NoData = ({ platform }) =>
  generateFixtureData({ platform, blocks: null });

export const NoAresMedia = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [captionBlock('No Ares Media')],
  });

export const VideoClipGlobalWithCaption = ({ platform, service }) =>
  generateFixtureData({
    platform,
    blocks: [
      videoClipGlobalGuidanceBlock,
      captionBlock('Video Clip Global with Caption'),
    ],
    service,
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

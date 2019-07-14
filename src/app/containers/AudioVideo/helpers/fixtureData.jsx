import React from 'react';
import PropTypes from 'prop-types';
import AudioVideoContainer from '../index';
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
import generateAVSettings from '../../../lib/utilities/audioVideo/generateAVSettings';
import AudioVideoHead from '../../../components/AudioVideoHead';

const generateFixtureData = ({ platform, blocks, type }) => {
  const avBlock = {
    model: {
      blocks,
    },
    type,
  };
  const audioVideoBlocks =
    type === 'audio' || type === 'video' ? [avBlock] : [];
  return (
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={platform === 'amp'}
        pageType="article"
        service="news"
      >
        <AudioVideoHead
          audioVideoAssets={generateAVSettings({
            audioVideoBlocks,
            env: 'local',
            platform: 'canonical',
            statsDestination: 'NEWS_PS_TEST',
            statsPageIdentifier: 'news.articles.c0000000031o.page',
          })}
        />
        <AudioVideoContainer blocks={blocks} />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

generateFixtureData.propTypes = {
  platform: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.any),
  type: PropTypes.string.isRequired,
};

generateFixtureData.defaultProps = {
  platform: 'canonical',
  blocks: '',
};

export const NoData = ({ platform }) =>
  generateFixtureData({ platform, blocks: null, type: null });

export const NoAresMedia = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [captionBlock('No Ares Media')],
    type: null,
  });

export const VideoClipGlobalWithCaption = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [
      videoClipGlobalGuidanceBlock,
      captionBlock('Video Clip Global with Caption'),
    ],
    type: 'video',
  });

export const VideoClipGlobalWithoutCaption = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [videoClipGlobalGuidanceBlock],
    type: 'video',
  });

export const VideoClipGlobalPortrait = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [videoClipGlobalPortraitBlock],
    type: 'video',
  });

export const VideoClipUkWithGuidance = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [videoClipUkGuidanceBlock],
    type: 'video',
  });

export const VideoClipNonUk = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [videoClipNonUkBlock],
    type: 'video',
  });

export const AudioClipGlobalGuidanceWithCaption = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [
      audioClipGlobalGuidanceBlock,
      captionBlock('Audio Clip Global Guidance with Caption'),
    ],
    type: 'audio',
  });

export const AudioClipUk = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [audioClipUkOnlyBlock],
    type: 'audio',
  });

export const AudioClipNonUk = ({ platform }) =>
  generateFixtureData({
    platform,
    blocks: [audioClipNonUkBlock],
    type: 'audio',
  });

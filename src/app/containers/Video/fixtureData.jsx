import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { blockArrayModel } from '../../models/blocks';
import {
  aresMediaBlock,
  captionBlock,
  videoPortraitBlock,
  videoUkGuidanceBlock,
  videoNonUkBlock,
  audioGlobalGuidanceBlock,
  audioUkOnlyBlock,
  audioNonUkNoGuidanceBlock,
  audioEpGlobalNoGuidanceBlock,
} from './helpers/fixtures';

const generateFixtureData = ({ platform, blocks }) => (
  <RequestContextProvider platform={platform}>
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

export const VideoWithCaption = generateFixtureData(
  blockArrayModel([aresMediaBlock, captionBlock]),
);

export const VideoWithoutCaption = generateFixtureData(
  blockArrayModel([aresMediaBlock]),
);

export const VideoPortrait = generateFixtureData(
  blockArrayModel([videoPortraitBlock]),
);

export const VideoWithGuidanceUk = generateFixtureData(
  blockArrayModel([videoUkGuidanceBlock]),
);

export const VideoNonUk = generateFixtureData(
  blockArrayModel([videoNonUkBlock]),
);

export const AudioGlobalGuidance = generateFixtureData(
  blockArrayModel([audioGlobalGuidanceBlock]),
);

export const AudioUkNoGuidance = generateFixtureData(
  blockArrayModel([audioUkOnlyBlock]),
);

export const AudioNonUkNoGuidance = generateFixtureData(
  blockArrayModel([audioNonUkNoGuidanceBlock]),
);

export const AudioEpisodeGlobal = generateFixtureData(
  blockArrayModel([audioEpGlobalNoGuidanceBlock]),
);

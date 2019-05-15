import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { blockArrayModel } from '../../models/blocks';
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

export const VideoClipGlobalWithCaption = generateFixtureData(
  blockArrayModel([videoClipGlobalGuidanceBlock, captionBlock]),
);

export const VideoClipGlobalWithoutCaption = generateFixtureData(
  blockArrayModel([videoClipGlobalGuidanceBlock]),
);

export const VideoClipGlobalPortrait = generateFixtureData(
  blockArrayModel([videoClipGlobalPortraitBlock]),
);

export const VideoClipUkWithGuidance = generateFixtureData(
  blockArrayModel([videoClipUkGuidanceBlock]),
);

export const VideoClipNonUk = generateFixtureData(
  blockArrayModel([videoClipNonUkBlock]),
);

export const AudioClipGlobalGuidance = generateFixtureData(
  blockArrayModel([audioClipGlobalGuidanceBlock]),
);

export const AudioClipUk = generateFixtureData(
  blockArrayModel([audioClipUkOnlyBlock]),
);

export const AudioClipNonUk = generateFixtureData(
  blockArrayModel([audioClipNonUkBlock]),
);

export const AudioEpisodeGlobal = generateFixtureData(
  blockArrayModel([audioEpisodeGlobalBlock]),
);

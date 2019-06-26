import React from 'react';
import { storiesOf } from '@storybook/react';
import Video from './index';
import {
  videoClipGlobalGuidance,
  videoClipUkGuidance,
  videoClipNonUkNoGuidance,
  videoClipGlobalNoGuidancePortrait,
  audioClipGlobalGuidance,
  audioClipUkNoGuidance,
  audioClipNonUkNoGuidance,
} from './helpers/fixtures';

storiesOf('Video', module)
  .add('video, clip, global, with guidance', () => (
    <Video {...videoClipGlobalGuidance} />
  ))
  .add('video, clip, UK only, with guidance', () => (
    <Video {...videoClipUkGuidance} />
  ))
  .add('video, clip, non-UK, without guidance', () => (
    <Video {...videoClipNonUkNoGuidance} />
  ))
  .add('video, clip, global, no guidance, portrait', () => (
    <Video {...videoClipGlobalNoGuidancePortrait} />
  ))
  .add('audio, clip, global, with guidance', () => (
    <Video {...audioClipGlobalGuidance} />
  ))
  .add('audio, clip, UK, without guidance', () => (
    <Video {...audioClipUkNoGuidance} />
  ))
  .add('audio, clip, non-UK, without guidance', () => (
    <Video {...audioClipNonUkNoGuidance} />
  ));

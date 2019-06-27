import React from 'react';
import { storiesOf } from '@storybook/react';
import AudioVideo from '.';

import {
  videoClipGlobalGuidance,
  videoClipUkGuidance,
  videoClipNonUkNoGuidance,
  videoClipGlobalNoGuidancePortrait,
  audioClipGlobalGuidance,
  audioClipUkNoGuidance,
  audioClipNonUkNoGuidance,
} from './helpers/fixtures';

storiesOf('Audio Video', module)
  .add('video, clip, global, with guidance', () => (
    <AudioVideo {...videoClipGlobalGuidance} />
  ))
  .add('video, clip, UK only, with guidance', () => (
    <AudioVideo {...videoClipUkGuidance} />
  ))
  .add('video, clip, non-UK, without guidance', () => (
    <AudioVideo {...videoClipNonUkNoGuidance} />
  ))
  .add('video, clip, global, no guidance, portrait', () => (
    <AudioVideo {...videoClipGlobalNoGuidancePortrait} />
  ))
  .add('audio, clip, global, with guidance', () => (
    <AudioVideo {...audioClipGlobalGuidance} />
  ))
  .add('audio, clip, UK, without guidance', () => (
    <AudioVideo {...audioClipUkNoGuidance} />
  ))
  .add('audio, clip, non-UK, without guidance', () => (
    <AudioVideo {...audioClipNonUkNoGuidance} />
  ));

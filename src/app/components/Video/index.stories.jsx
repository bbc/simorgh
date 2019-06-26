import React from 'react';
import { storiesOf } from '@storybook/react';
import Video from './index';
import {
  videoClipGlobalGuidanceBlock,
  videoClipUkGuidanceBlock,
} from './helpers/fixtures';

storiesOf('Video', module)
  .add('video, clip, global, with guidance', () => (
    <Video {...videoClipGlobalGuidanceBlock} />
  ))
  .add('video, clip, UK only, with guidance', () => (
    <Video {...videoClipUkGuidanceBlock} />
  ));

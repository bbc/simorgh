import { storiesOf } from '@storybook/react'; // eslint-disable-line
import {
  AudioClipGlobalGuidance,
  AudioClipNonUk,
  AudioClipUk,
  AudioEpisodeGlobal,
  VideoClipNonUk,
  VideoClipGlobalPortrait,
  VideoClipGlobalWithCaption,
  VideoClipUkWithGuidance,
  VideoClipGlobalWithoutCaption,
} from './fixtureData';
import AmpDecorator from '../../helpers/storybook/ampDecorator';

storiesOf('Video Container', module)
  .add(
    'video, clip, with guidance, with caption',
    () => VideoClipGlobalWithCaption,
  )
  .add(
    'video, clip, with guidance, without caption',
    () => VideoClipGlobalWithoutCaption,
  )
  .add('video, clip, UK, with guidance', () => VideoClipUkWithGuidance)
  .add('video, clip, non-UK, without guidance', () => VideoClipNonUk)
  .add(
    'video, clip, global, without guidance, portrait',
    () => VideoClipGlobalPortrait,
  )
  .add('audio, clip, global, with guidance', () => AudioClipGlobalGuidance)
  .add('audio, clip, UK, without guidance', () => AudioClipUk)
  .add('audio, clip, non-UK, without guidance', () => AudioClipNonUk)
  .add('audio, episode, global, without guidance', () => AudioEpisodeGlobal);

storiesOf('Video Container - AMP', module)
  .addDecorator(AmpDecorator)
  .add(
    'video, clip, with guidance, with caption',
    () => VideoClipGlobalWithCaption,
  )
  .add(
    'video, clip, with guidance, without caption',
    () => VideoClipGlobalWithoutCaption,
  )
  .add('video, clip, UK, with guidance', () => VideoClipUkWithGuidance)
  .add('video, clip, non-UK, without guidance', () => VideoClipNonUk)
  .add(
    'video, clip, global, without guidance, portrait',
    () => VideoClipGlobalPortrait,
  )
  .add('audio, clip, global, with guidance', () => AudioClipGlobalGuidance)
  .add('audio, clip, UK, without guidance', () => AudioClipUk)
  .add('audio, clip, non-UK, without guidance', () => AudioClipNonUk)
  .add('audio, episode, global, without guidance', () => AudioEpisodeGlobal);

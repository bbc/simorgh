import { storiesOf } from '@storybook/react'; // eslint-disable-line
import {
  AudioGlobalGuidance,
  VideoWithCaption,
  VideoWithoutCaption,
  VideoPortrait,
  VideoWithGuidanceUk,
  VideoNonUk,
  AudioUkNoGuidance,
  AudioNonUkNoGuidance,
  AudioEpisodeGlobal,
} from './fixtureData';
import AmpDecorator from '../../helpers/storybook/ampDecorator';

storiesOf('Video Container', module)
  .add('[video] with caption', () => VideoWithCaption)
  .add('[video] without a caption', () => VideoWithoutCaption)
  .add('[video] portrait', () => VideoPortrait)
  .add('[video] UK with guidance', () => VideoWithGuidanceUk)
  .add('[video] non-UK', () => VideoNonUk)
  .add('[audio] global with guidance', () => AudioGlobalGuidance)
  .add('[audio] UK without guidance', () => AudioUkNoGuidance)
  .add('[audio] non-UK without guidance', () => AudioNonUkNoGuidance)
  .add('[audio] episode, global', () => AudioEpisodeGlobal);

storiesOf('Video Container - AMP', module)
  .addDecorator(AmpDecorator)
  .add('[video] with caption', () => VideoWithCaption)
  .add('[video] without a caption', () => VideoWithoutCaption)
  .add('[video] portrait', () => VideoPortrait)
  .add('[video] UK with guidance', () => VideoWithGuidanceUk)
  .add('[video] non-UK', () => VideoNonUk)
  .add('[audio] global with guidance', () => AudioGlobalGuidance)
  .add('[audio] UK without guidance', () => AudioUkNoGuidance)
  .add('[audio] non-UK without guidance', () => AudioNonUkNoGuidance)
  .add('[audio] episode, global', () => AudioEpisodeGlobal);

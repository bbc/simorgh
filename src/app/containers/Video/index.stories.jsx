import { storiesOf } from '@storybook/react'; // eslint-disable-line
import {
  AudioGlobalGuidance,
  VideoWithCaption,
  VideoWithoutCaption,
  VideoPortrait,
  VideoWithGuidanceUk,
  VideoNonUk,
} from './fixtureData';
import AmpDecorator from '../../helpers/storybook/ampDecorator';

storiesOf('Video Container', module)
  .add('with a caption', () => VideoWithCaption)
  .add('without a caption', () => VideoWithoutCaption)
  .add('with portrait video', () => VideoPortrait)
  .add('UK only with guidance', () => VideoWithGuidanceUk)
  .add('non-UK video', () => VideoNonUk)
  .add('global audio with guidance', () => AudioGlobalGuidance);

storiesOf('Video Container - AMP', module)
  .addDecorator(AmpDecorator)
  .add('with a caption', () => VideoWithCaption)
  .add('without a caption', () => VideoWithoutCaption);

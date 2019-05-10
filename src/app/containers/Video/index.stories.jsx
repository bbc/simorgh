import { storiesOf } from '@storybook/react'; // eslint-disable-line
import {
  VideoWithCaption,
  VideoWithoutCaption,
  VideoPortrait,
} from './fixtureData';
import AmpDecorator from '../../helpers/storybook/ampDecorator';

storiesOf('Video Container', module)
  .add('with a caption', () => VideoWithCaption)
  .add('without a caption', () => VideoWithoutCaption)
  .add('with a portrait video', () => VideoPortrait);

storiesOf('Video Container - AMP', module)
  .addDecorator(AmpDecorator)
  .add('with a caption', () => VideoWithCaption)
  .add('without a caption', () => VideoWithoutCaption);

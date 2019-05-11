import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { VideoWithCaption, VideoWithoutCaption } from './fixtureData';
import AmpDecorator from '../../helpers/storybook/ampDecorator';

storiesOf('Video Container', module)
  .add('with a caption', () => VideoWithCaption)
  .add('without a caption', () => VideoWithoutCaption);

storiesOf('Video Container - AMP', module)
  .addDecorator(AmpDecorator)
  .add('with a caption', () => VideoWithCaption)
  .add('without a caption', () => VideoWithoutCaption);

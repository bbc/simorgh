import { storiesOf } from '@storybook/react'; // eslint-disable-line
import {
  VideoWithCaption,
  VideoWithoutCaption,
  VideoAmpWithCaption,
  VideoAmpWithoutCaption,
} from './fixtureData';
import AmpDecorator from '../../helpers/storybook/ampDecorator';

storiesOf('Video', module)
  .add('with a caption', () => VideoWithCaption)
  .add('without a caption', () => VideoWithoutCaption);

storiesOf('Video - AMP', module)
  .addDecorator(AmpDecorator)
  .add('with a caption', () => VideoAmpWithCaption)
  .add('without a caption', () => VideoAmpWithoutCaption);

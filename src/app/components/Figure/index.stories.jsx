import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {
  FigureImage,
  FigureImageWithCaption,
  FigureImageWithCaptionContainingLink,
  FigureImageWithCopyright,
  FigureImageWithCopyrightAndCaption,
} from './fixtureData';

storiesOf('Figure', module)
  .add('with a caption', () => FigureImageWithCaption)
  .add('without a caption', () => FigureImage)
  .add(
    'with a caption containing a link',
    () => FigureImageWithCaptionContainingLink,
  )
  .add('with non-BBC copyright', () => FigureImageWithCopyright)
  .add(
    'with a caption and non-BBC copyright',
    () => FigureImageWithCopyrightAndCaption,
  );

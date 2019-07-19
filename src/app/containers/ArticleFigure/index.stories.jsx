import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { dirDecorator } from '@bbc/psammead-storybook-helpers';
import {
  FigureImage,
  FigureAmpImage,
  FigureImageWithCaption,
  FigureAmpImageWithCaption,
  FigureImageWithCopyright,
  FigureAmpImageWithCopyright,
  FigureImageWithCopyrightAndCaption,
  FigureAmpImageWithCopyrightAndCaption,
  FigureImageWithCaptionContainingLink,
  FigureAmpImageWithCaptionContainingLink,
  FigureImageWithCaptionContainingMultipleParagraphsAndLink,
  FigureAmpImageWithCaptionContainingMultipleParagraphsAndLink,
  FigureLazyLoadImage,
} from './fixtureData';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('ArticleFigure', module)
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .add('with a caption', ({ service }) => FigureImageWithCaption(service))
  .add('without a caption', () => FigureImage)
  .add('with non-BBC copyright', () => FigureImageWithCopyright)
  .add(
    'with a caption and non-BBC copyright',
    () => FigureImageWithCopyrightAndCaption,
  )
  .add(
    'with a caption containing an inline link',
    () => FigureImageWithCaptionContainingLink,
  )
  .add(
    'with a caption with multiple paragraphs with a link',
    () => FigureImageWithCaptionContainingMultipleParagraphsAndLink,
  )
  .add('with a lazyloaded image', () => FigureLazyLoadImage);

storiesOf('ArticleFigure - AMP', module)
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .addDecorator(AmpDecorator)
  .add('with a caption', ({ service }) => FigureAmpImageWithCaption(service))
  .add('without a caption', () => FigureAmpImage)
  .add('with non-BBC copyright', () => FigureAmpImageWithCopyright)
  .add(
    'with a caption and non-BBC copyright',
    () => FigureAmpImageWithCopyrightAndCaption,
  )
  .add(
    'with a caption containing an inline link',
    () => FigureAmpImageWithCaptionContainingLink,
  )
  .add(
    'with a caption with multiple paragraphs with a link',
    () => FigureAmpImageWithCaptionContainingMultipleParagraphsAndLink,
  );

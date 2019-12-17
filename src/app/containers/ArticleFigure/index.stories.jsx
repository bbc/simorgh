import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
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

storiesOf('Containers|Article/Article Figure/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('with a caption', ({ service }) => FigureImageWithCaption(service))
  .add('without a caption', () => FigureImage)
  .add('with non-BBC copyright', () => FigureImageWithCopyright)
  .add(
    'with a caption and non-BBC copyright',
    () => FigureImageWithCopyrightAndCaption,
    { chromatic: { disable: true } },
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

storiesOf('Containers|Article/Article Figure/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
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

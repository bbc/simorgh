import React from 'react';
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
import FigureContainer from '.';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('ArticleFigure', module)
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .add('story', ({ service }) => {
  /* eslint-disable no-unused-expressions */
    <ServiceContextProvider service={service}>
      <FigureContainer />
    </ServiceContextProvider>;
  })
  .add('with a caption', () => FigureImageWithCaption)
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
  .addDecorator(AmpDecorator)
  .add('with a caption', () => FigureAmpImageWithCaption)
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

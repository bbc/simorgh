import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
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
import { Services } from '../../models/types/global';

export default {
  title: 'Components/ImageWithCaption',
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const WithACaption = ({ service }: { service: Services }) =>
  FigureImageWithCaption(service);
export const WithoutACaption = () => FigureImage;
export const WithNonBBCCopyright = () => FigureImageWithCopyright;
export const WithACaptionAndNonBBCCopyright = () =>
  FigureImageWithCopyrightAndCaption;
export const WithACaptionContainingAnInlineLink = () =>
  FigureImageWithCaptionContainingLink;
export const WithACaptionWithMultipleParagraphsWithALink = () =>
  FigureImageWithCaptionContainingMultipleParagraphsAndLink;
export const WithALazyloadedImage = () => FigureLazyLoadImage;

// AMP
export const WithACaptionAmp = ({ service }: { service: Services }) =>
  FigureAmpImageWithCaption(service);
WithACaptionAmp.decorators = [AmpDecorator];

export const WithoutACaptionAmp = () => FigureAmpImage;
WithACaptionAmp.decorators = [AmpDecorator];

export const WithNonBBCCopyrightAmp = () => FigureAmpImageWithCopyright;
WithNonBBCCopyrightAmp.decorators = [AmpDecorator];

export const WithACaptionAndNonBBCCopyrightAmp = () =>
  FigureAmpImageWithCopyrightAndCaption;
WithACaptionAndNonBBCCopyrightAmp.decorators = [AmpDecorator];

export const WithACaptionContainingAnInlineLinkAmp = () =>
  FigureAmpImageWithCaptionContainingLink;
WithACaptionContainingAnInlineLinkAmp.decorators = [AmpDecorator];

export const WithACaptionWithMultipleParagraphsWithALinkAmp = () =>
  FigureAmpImageWithCaptionContainingMultipleParagraphsAndLink;
WithACaptionWithMultipleParagraphsWithALinkAmp.decorators = [AmpDecorator];

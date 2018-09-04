import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import {
  FigureImage,
  FigureImageWithCaption,
  FigureImageWithCopyright,
  FigureImageWithCopyrightAndCaption,
  FigureImageWithCaptionContainingLink,
} from './fixtureData';

describe('Figure', () => {
  describe('with a caption', () => {
    shouldMatchSnapshot('should render correctly', FigureImageWithCaption);
  });

  describe('with a caption containing a link', () => {
    shouldMatchSnapshot(
      'should render correctly',
      FigureImageWithCaptionContainingLink,
    );
  });

  describe('without a caption', () => {
    shouldMatchSnapshot('should render correctly', FigureImage);
  });

  describe('with non-BBC copyright', () => {
    shouldMatchSnapshot('should render correctly', FigureImageWithCopyright);
  });

  describe('with caption and non-BBC copyright', () => {
    shouldMatchSnapshot(
      'should render correctly',
      FigureImageWithCopyrightAndCaption,
    );
  });
});

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import {
  FigureImage,
  FigureImageWithCaption,
  FigureImageWithCopyright,
  FigureImageWithCopyrightAndCaption,
} from './fixtureData';

describe('Figure', () => {
  describe('with a caption', () => {
    shouldMatchSnapshot('should render correctly', FigureImageWithCaption);
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

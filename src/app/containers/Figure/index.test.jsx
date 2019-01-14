import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
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
} from './fixtureData';

describe('Figure', () => {
  shouldMatchSnapshot('should render an image with alt text', FigureImage);

  shouldMatchSnapshot(
    'should render an AMP image with alt text',
    FigureAmpImage,
  );

  shouldMatchSnapshot(
    'should render an image with copyright text',
    FigureImageWithCopyright,
  );

  shouldMatchSnapshot(
    'should render an AMP image with copyright text',
    FigureAmpImageWithCopyright,
  );

  shouldMatchSnapshot(
    'should render an image with caption text',
    FigureImageWithCaption,
  );

  shouldMatchSnapshot(
    'should render can AMP image with aption text',
    FigureAmpImageWithCaption,
  );

  shouldMatchSnapshot(
    'should render an image with caption text with inline link',
    FigureImageWithCaptionContainingLink,
  );

  shouldMatchSnapshot(
    'should render an AMP image with caption text with inline link',
    FigureAmpImageWithCaptionContainingLink,
  );

  shouldMatchSnapshot(
    'should render an image with caption and copyright',
    FigureImageWithCopyrightAndCaption,
  );

  shouldMatchSnapshot(
    'should render an AMP image with caption and copyright',
    FigureAmpImageWithCopyrightAndCaption,
  );
});

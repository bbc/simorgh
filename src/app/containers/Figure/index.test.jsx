import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import {
  FigureImage,
  FigureImageWithCaption,
  FigureImageWithCopyright,
  FigureImageWithCopyrightAndCaption,
} from './fixtureData';

describe('Figure', () => {
  shouldMatchSnapshot('should render an image with alt text', FigureImage);

  shouldMatchSnapshot('should render copyright text', FigureImageWithCopyright);

  shouldMatchSnapshot('should render caption text', FigureImageWithCaption);

  shouldMatchSnapshot(
    'should render caption and copyright',
    FigureImageWithCopyrightAndCaption,
  );
});

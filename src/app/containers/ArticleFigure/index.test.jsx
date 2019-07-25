import { mount } from 'enzyme';
import LazyLoad from 'react-lazyload';
import { shouldMatchSnapshot } from '../../../testHelpers';
import {
  FigureImage,
  FigureAmpImage,
  FigureLazyLoadImage,
  FigureImageWithCaption,
  FigureAmpImageWithCaption,
  FigureImageWithCopyright,
  FigureImageWithNestedGrid,
  FigureAmpImageWithCopyright,
  FigureImageWithCopyrightAndCaption,
  FigureAmpImageWithCopyrightAndCaption,
  FigureImageWithCaptionContainingLink,
  FigureAmpImageWithCaptionContainingLink,
} from './fixtureData';

describe('ArticleFigure', () => {
  it('should load lazyload component when lazyLoad prop is set to true', () => {
    const wrapper = mount(FigureLazyLoadImage).find(LazyLoad);
    const {
      offset,
      once,
      overflow,
      resize,
      scroll,
      unmountIfInvisible,
    } = wrapper.props();

    expect(offset).toBe(250);
    expect(once).toBe(true);
    expect(overflow).toBe(false);
    expect(resize).toBe(false);
    expect(scroll).toBe(true);
    expect(unmountIfInvisible).toBe(false);
    expect(Object.keys(wrapper.props()).length).toBe(7);
  });

  shouldMatchSnapshot(
    'should render a lazyloaded image when lazyLoad set to true',
    FigureLazyLoadImage,
  );

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
    FigureImageWithCaption('news'),
  );

  shouldMatchSnapshot(
    'should render an AMP image with caption text',
    FigureAmpImageWithCaption('news'),
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

  shouldMatchSnapshot(
    'should render an image and caption for a square with nested grid',
    FigureImageWithNestedGrid(1240, 1240),
  );
  shouldMatchSnapshot(
    'should render an image and caption for a portrait with nested grid',
    FigureImageWithNestedGrid(600, 1240),
  );
});

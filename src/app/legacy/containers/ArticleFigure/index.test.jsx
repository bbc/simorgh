import { render } from '../../../components/react-testing-library-with-providers';
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
    const { container } = render(FigureLazyLoadImage);

    const noScriptEl = container.querySelector('noscript');
    const imageEl = container.querySelector('img');

    expect(noScriptEl).toBeInTheDocument();
    expect(imageEl).not.toBeInTheDocument();
  });

  it('should render a lazyloaded image when lazyLoad set to true', () => {
    const { container } = render(FigureLazyLoadImage);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an image with alt text', () => {
    const { container } = render(FigureImage);

    expect(container).toMatchSnapshot();
  });

  it('should render an AMP image with alt text', () => {
    const { container } = render(FigureAmpImage);

    expect(container).toMatchSnapshot();
  });

  it('should render an image with copyright text', () => {
    const { container } = render(FigureImageWithCopyright);

    expect(container).toMatchSnapshot();
  });

  it('should render an AMP image with copyright text', () => {
    const { container } = render(FigureAmpImageWithCopyright);

    expect(container).toMatchSnapshot();
  });

  it('should render an image with caption text', () => {
    const { container } = render(FigureImageWithCaption('news'));

    expect(container).toMatchSnapshot();
  });

  it('should render an AMP image with caption text', () => {
    const { container } = render(FigureAmpImageWithCaption('news'));

    expect(container).toMatchSnapshot();
  });

  it('should render an image with caption text with inline link', () => {
    const { container } = render(FigureImageWithCaptionContainingLink);

    expect(container).toMatchSnapshot();
  });

  it('should render an AMP image with caption text with inline link', () => {
    const { container } = render(FigureAmpImageWithCaptionContainingLink);

    expect(container).toMatchSnapshot();
  });

  it('should render an image with caption and copyright', () => {
    const { container } = render(FigureImageWithCopyrightAndCaption);

    expect(container).toMatchSnapshot();
  });

  it('should render an AMP image with caption and copyright', () => {
    const { container } = render(FigureAmpImageWithCopyrightAndCaption);

    expect(container).toMatchSnapshot();
  });

  it('should render an image and caption for a square with nested grid', () => {
    const { container } = render(FigureImageWithNestedGrid(1240, 1240));

    expect(container).toMatchSnapshot();
  });
  it('should render an image and caption for a portrait with nested grid', () => {
    const { container } = render(FigureImageWithNestedGrid(600, 1240));

    expect(container).toMatchSnapshot();
  });
});

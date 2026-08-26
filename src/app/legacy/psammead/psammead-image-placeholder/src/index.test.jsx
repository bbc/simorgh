import { render } from '../../../../components/react-testing-library-with-providers';
import ImagePlaceholder from '.';

const landscapeImageRatio = 56.25;
const portraitImageRatio = 177.78;
const squareImageRatio = 100;

describe('ImagePlaceholder', () => {
  it('should render landscape images correctly', () => {
    const { container } = render(
      <ImagePlaceholder ratio={landscapeImageRatio} />,
    );
    expect(
      container.querySelector('[data-e2e="image-placeholder"]'),
    ).toBeInTheDocument();
  });

  it('should render portrait images correctly', () => {
    const { container } = render(
      <ImagePlaceholder ratio={portraitImageRatio} />,
    );
    expect(
      container.querySelector('[data-e2e="image-placeholder"]'),
    ).toBeInTheDocument();
  });

  it('should render square images correctly', () => {
    const { container } = render(<ImagePlaceholder ratio={squareImageRatio} />);
    expect(
      container.querySelector('[data-e2e="image-placeholder"]'),
    ).toBeInTheDocument();
  });

  it('should render dark mode version correctly', () => {
    const { container } = render(
      <ImagePlaceholder ratio={landscapeImageRatio} darkPlaceholder />,
    );
    expect(
      container.querySelector('[data-e2e="image-placeholder"]'),
    ).toBeInTheDocument();
  });
});

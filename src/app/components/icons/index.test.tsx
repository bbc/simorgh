import { render } from '#app/components/react-testing-library-with-providers';
import {
  AccountIconRounded,
  Chevron,
  ChevronOrientation,
  Close,
  ExternalSvg,
  TriangleDown,
} from '.';

describe('icons', () => {
  it('loads shared icons from the static-assets CDN', () => {
    const { container } = render(<Close />);
    const icon = container.querySelector('img');

    expect(icon).toHaveClass('external-svg');
    expect(icon).toHaveAttribute(
      'src',
      expect.stringContaining('images/icons/close.svg'),
    );
  });

  it('uses the direction-appropriate chevron asset', () => {
    const { container } = render(
      <Chevron dir="rtl" orientation={ChevronOrientation.FORWARD} />,
    );

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('images/icons/chevron-backward.svg'),
    );
  });

  it('preserves CSS-unit dimensions for external SVG images', () => {
    const { container } = render(
      <ExternalSvg
        path="images/icons/success.svg"
        width="4rem"
        height="4rem"
      />,
    );

    expect(container.querySelector('img')).toHaveStyle({
      width: '4rem',
      height: '4rem',
    });
  });

  it('renders the disclosure icon at its intended dimensions', () => {
    const { container } = render(<TriangleDown />);

    expect(container.querySelector('img')).toHaveAttribute('width', '16');
    expect(container.querySelector('img')).toHaveAttribute('height', '16');
  });

  it('loads the blue rounded account asset for the default navigation', () => {
    const { container } = render(<AccountIconRounded isBlue />);

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('images/icons/account-rounded-blue.svg'),
    );
  });
});

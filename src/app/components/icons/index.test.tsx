import { render } from '#app/components/react-testing-library-with-providers';
import {
  AccountIconRounded,
  Chevron,
  ChevronOrientation,
  Close,
  ExternalSvg,
  RedCardSVG,
  TriangleDown,
} from '.';

describe('icons', () => {
  it('loads shared icons from the static-assets CDN', () => {
    const { container } = render(<Close />);
    const icon = container.querySelector('.external-svg');

    expect(icon).toHaveClass('external-svg');
    expect(icon).toHaveStyle({
      '--icon-source': `url("${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/icons/close.svg")`,
    });
    expect(icon).toHaveClass('mask');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('img, svg')).not.toBeInTheDocument();
  });

  it('uses the direction-appropriate chevron asset', () => {
    const { container } = render(
      <Chevron dir="rtl" orientation={ChevronOrientation.FORWARD} />,
    );

    expect(container.querySelector('.external-svg')).toHaveStyle({
      '--icon-source': `url("${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/icons/chevron-backward.svg")`,
    });
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

    expect(container.querySelector('.external-svg')).toHaveStyle({
      '--icon-width': '16px',
      '--icon-height': '16px',
    });
  });

  it('uses the recolourable account mask for the default navigation', () => {
    const { container } = render(<AccountIconRounded isDefault />);

    expect(container.querySelector('.external-svg')).toHaveClass(
      'mask',
      'blue',
    );
    expect(container.querySelector('.external-svg')).toHaveStyle({
      '--icon-source': `url("${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/icons/account-rounded-blue.svg")`,
    });
  });

  it('only applies inversion as a fallback for masks', () => {
    const { container } = render(<Close isInverted />);

    expect(container.querySelector('.external-svg')).toHaveClass(
      'fallbackInverted',
    );
    expect(container.querySelector('.external-svg')).not.toHaveClass(
      'inverted',
    );
  });

  it('defaults unspecified mask dimensions to the text size', () => {
    const { container } = render(<ExternalSvg name="close" useCurrentColor />);

    expect(container.querySelector('.external-svg')).toHaveStyle({
      '--icon-width': '1em',
      '--icon-height': '1em',
    });
  });

  it('preserves CSS-unit dimensions for masks', () => {
    const { container } = render(
      <ExternalSvg name="close" width="2rem" height="1.5rem" useCurrentColor />,
    );

    expect(container.querySelector('.external-svg')).toHaveStyle({
      '--icon-width': '2rem',
      '--icon-height': '1.5rem',
    });
  });

  it('keeps fixed-colour artwork as an external image', () => {
    const { container } = render(<RedCardSVG />);

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('images/icons/red-card.svg'),
    );
    expect(container.querySelector('.mask')).not.toBeInTheDocument();
  });
});

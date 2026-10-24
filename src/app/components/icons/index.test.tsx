import { render } from '#app/components/react-testing-library-with-providers';
import { Chevron, ChevronOrientation, Close } from '.';

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
});

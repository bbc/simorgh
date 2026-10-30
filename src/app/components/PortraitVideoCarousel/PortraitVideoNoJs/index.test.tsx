import { render } from '#app/components/react-testing-library-with-providers';
import PortraitVideoNoJs from '.';

describe('PortraitVideoNoJs', () => {
  it('keeps the warning recolourable without an inverted fallback on its light background', () => {
    const { container } = render(<PortraitVideoNoJs />);
    const icon = container.querySelector('.external-svg');

    expect(icon).toHaveClass('mask');
    expect(icon).not.toHaveClass('fallbackInverted');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
  it('Should contain a no-js message with translations for the appropriate service.', () => {
    const { container } = render(<PortraitVideoNoJs />, {
      service: 'portuguese',
    });

    const textContents = container.querySelector('p')?.innerHTML;
    expect(textContents).toBe(
      'A reprodução deste formato de vídeo não é compatível com seu dispositivo',
    );
  });
});

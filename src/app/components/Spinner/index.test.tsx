import { css } from '@emotion/react';
import { render } from '#app/components/react-testing-library-with-providers';
import Spinner from '.';
import styles from './index.module.scss';

describe('Spinner', () => {
  it('applies the spinner class to the SVG', () => {
    const { container } = render(<Spinner />);

    expect(container.querySelector('svg')).toHaveClass(styles.spinner);
  });

  it('preserves consumer classes alongside the spinner class', () => {
    const { container } = render(<Spinner className="consumerSpinner" />);

    expect(container.querySelector('svg')).toHaveClass(
      styles.spinner,
      'consumerSpinner',
    );
  });

  it('preserves sizing supplied by an Emotion consumer', () => {
    const { container } = render(
      <Spinner css={css({ width: '2rem', height: '2rem' })} />,
    );
    const icon = container.querySelector('svg');

    expect(icon).toHaveClass(styles.spinner);
    expect(icon).toHaveStyle({ width: '2rem', height: '2rem' });
  });

  it('keeps the decorative icon hidden from assistive technology', () => {
    const { container } = render(<Spinner />);
    const icon = container.querySelector('svg');

    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('focusable', 'false');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');
  });
});

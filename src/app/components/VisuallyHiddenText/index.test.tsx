import { render, screen } from '../react-testing-library-with-providers';
import VisuallyHiddenText from './index';

describe('VisuallyHiddenText', () => {
  it('should render off screen text for screen readers', () => {
    render(<VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>);

    const hiddenText = screen.getByText('Some offscreen text');

    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText.tagName).toBe('SPAN');
    expect(hiddenText).toHaveClass('visuallyHiddenText');
  });

  it('should render off screen text for screen readers as an h1', () => {
    render(
      <VisuallyHiddenText as="h1" id="content" tabIndex={-1}>
        Some offscreen text
      </VisuallyHiddenText>,
    );

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Some offscreen text',
    });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute('id', 'content');
    expect(heading).toHaveAttribute('tabindex', '-1');
    expect(heading).toHaveClass('visuallyHiddenText');
  });

  it('should render off screen text for screen readers as an h1 with lang as en-GB', () => {
    render(
      <VisuallyHiddenText as="h1" lang="en-GB">
        Some offscreen text
      </VisuallyHiddenText>,
    );

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Some offscreen text',
    });

    expect(heading).toHaveAttribute('lang', 'en-GB');
  });

  it('ignores unsupported classes passed through an attribute spread', () => {
    const unsupportedAttributes = { className: 'consumerClass' };

    render(
      <VisuallyHiddenText {...unsupportedAttributes}>
        Hidden text
      </VisuallyHiddenText>,
    );

    expect(screen.getByText('Hidden text')).toHaveAttribute(
      'class',
      'visuallyHiddenText',
    );
  });

  it('forwards live-region, direction and focus attributes', () => {
    render(
      <VisuallyHiddenText
        id="loading-status"
        tabIndex={-1}
        dir="rtl"
        aria-live="polite"
        aria-atomic="true"
      >
        Loading
      </VisuallyHiddenText>,
    );

    const hiddenText = screen.getByText('Loading');

    expect(hiddenText).toHaveAttribute('id', 'loading-status');
    expect(hiddenText).toHaveAttribute('tabindex', '-1');
    expect(hiddenText).toHaveAttribute('dir', 'rtl');
    expect(hiddenText).toHaveAttribute('aria-live', 'polite');
    expect(hiddenText).toHaveAttribute('aria-atomic', 'true');
  });
});

import { render, screen } from '../react-testing-library-with-providers';
import VisuallyHiddenText from './index';

describe('VisuallyHiddenText', () => {
  it('should render off screen text for screen readers', () => {
    render(<VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>);

    const hiddenText = screen.getByText('Some offscreen text');

    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText.tagName).toBe('SPAN');
  });

  it('should render off screen text for screen readers as an h1', () => {
    render(
      <VisuallyHiddenText as="h1">Some offscreen text</VisuallyHiddenText>,
    );

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Some offscreen text',
    });

    expect(heading).toBeInTheDocument();
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
});

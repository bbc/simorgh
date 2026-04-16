import { render } from '@testing-library/react';
import MostReadSection from '.';

describe('MostReadSectionLabel assertion', () => {
  it('should render most-read section with correct attributes', async () => {
    const { container } = render(
      <MostReadSection>Some child content</MostReadSection>,
    );
    const section = container.getElementsByTagName('section')[0];
    expect(section).toHaveAttribute('aria-labelledby', 'Most-Read');
    expect(section).toHaveAttribute('role', 'region');
    expect(container).toMatchSnapshot();
  });

  it('should render most-read section without aria attributes when showSectionLabel is false', async () => {
    const { container } = render(
      <MostReadSection showSectionLabel={false}>
        Some child content
      </MostReadSection>,
    );
    const section = container.getElementsByTagName('section')[0];
    expect(section).not.toHaveAttribute('aria-labelledby');
    expect(section).not.toHaveAttribute('role');
    expect(container).toMatchSnapshot();
  });
});

import React from 'react';
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
});

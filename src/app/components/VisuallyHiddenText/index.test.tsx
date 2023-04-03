import React from 'react';
import { render } from '@testing-library/react';
import VisuallyHiddenText from './index';

describe('VisuallyHiddenText', () => {
  it('should render off screen text for screen readers', () => {
    const { container } = render(
      <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

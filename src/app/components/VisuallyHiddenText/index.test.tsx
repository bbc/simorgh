import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import VisuallyHiddenText from './index';

describe('VisuallyHiddenText', () => {
  it('should render off screen text for screen readers', () => {
    const { container } = render(
      <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render off screen text for screen readers as an h1', () => {
    const { container } = render(
      <VisuallyHiddenText as="h1">Some offscreen text</VisuallyHiddenText>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render off screen text for screen readers as an h1 with lang as en-GB', () => {
    const { container } = render(
      <VisuallyHiddenText as="h1" lang="en-GB">
        Some offscreen text
      </VisuallyHiddenText>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

/** @jsx jsx */
import { jsx } from '@emotion/react';

import VisuallyHiddenText from '.';
import { render } from '../../react-testing-library-with-providers';

describe('VisuallyHiddenText', () => {
  it('should render off screen text for screen readers', () => {
    const { container } = render(
      <VisuallyHiddenText>Some offscreen text</VisuallyHiddenText>,
    );

    expect(container).toBeInTheDocument();
  });
});

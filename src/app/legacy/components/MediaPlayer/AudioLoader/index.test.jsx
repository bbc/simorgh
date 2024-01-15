import React from 'react';
import { render } from '@testing-library/react';
import {
  shouldMatchSnapshot,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';

import AudioLoader from '.';

describe('Audio Loader', () => {
  suppressPropWarnings(['children', 'string']);
  shouldMatchSnapshot(
    'should match snapshot',
    <AudioLoader isLoading>Content</AudioLoader>,
  );

  it('should transclude the children', () => {
    const { getByText } = render(<AudioLoader>Test Content</AudioLoader>);

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should NOT render an overlay by default', () => {
    const { container } = render(<AudioLoader>Test Content</AudioLoader>);

    const overlay = container.querySelector(
      '[data-testid=audio-loader-overlay]',
    );
    expect(overlay).not.toBeInTheDocument();
  });

  it('should render an aria-hidden overlay when isLoading is true', () => {
    const { container } = render(
      <AudioLoader isLoading>Test Content</AudioLoader>,
    );

    const overlay = container.querySelector(
      '[data-testid=audio-loader-overlay]',
    );
    expect(overlay).toBeInTheDocument();
    expect(overlay.getAttribute('aria-hidden')).toEqual('true');
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';

import AudioLoader from '.';

describe('Audio Loader', () => {
  shouldMatchSnapshot(
    'should match snapshot',
    <AudioLoader>Content</AudioLoader>,
  );

  it('should transclude the children', () => {
    const { getByText } = render(<AudioLoader>Test Content</AudioLoader>);

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should render an aria-hidden overlay', () => {
    const { container } = render(<AudioLoader>Test Content</AudioLoader>);

    const overlay = container.querySelector(
      '[data-testid=audio-loader-overlay]',
    );
    expect(overlay).toBeInTheDocument();
    expect(overlay.getAttribute('aria-hidden')).toEqual('true');
  });
});

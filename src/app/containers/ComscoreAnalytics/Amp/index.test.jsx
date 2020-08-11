import React from 'react';
import { render } from '@testing-library/react';
import AmpComscore from '.';

describe('Snapshots', () => {
  it('should render comscore script when on amp and toggle is enabled', () => {
    const { container } = render(<AmpComscore />);

    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });
});

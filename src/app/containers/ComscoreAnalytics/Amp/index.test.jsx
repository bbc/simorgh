import React from 'react';
import { render } from '@testing-library/react';
import AmpComscore from '.';

describe('Snapshots', () => {
  it('should render comscore amp-analytics component', () => {
    const { container } = render(<AmpComscore />);

    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });
});

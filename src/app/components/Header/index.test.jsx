import React from 'react';
import renderer from 'react-test-renderer';

import Header from './index';

describe('Header', () => {
  it('should render correctly', () => {
    const header = renderer.create(<Header />);
    expect(header).toMatchSnapshot();
  });
});

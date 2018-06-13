import React from 'react';
import renderer from 'react-test-renderer';

import BBCNewsBanner from './index';

describe('Header', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BBCNewsBanner />);
    expect(tree).toMatchSnapshot();
  });
});

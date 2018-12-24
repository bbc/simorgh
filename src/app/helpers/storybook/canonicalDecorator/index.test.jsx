import React from 'react';
import CanonicalDecorator from '.';

describe('CanonicalDecorator', () => {
  it('should render correctly', () => {
    const component = CanonicalDecorator(() => <span>Text here</span>);
    expect(component).toMatchSnapshot();
  });
});

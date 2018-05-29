import React from 'react';
import { shallow } from 'enzyme';
import Status from './Status';

describe('Status', () => {
  it('renders a page with a 200', () => {
    const component = shallow(<Status />);
    expect(component.text()).toContain('200');
  });
});

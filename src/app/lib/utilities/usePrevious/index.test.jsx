import React from 'react';
import { mount } from 'enzyme';
import usePrevious from '.';

describe('usePrevious', () => {
  let value;
  const initialProp = 'first';

  const ComponentWithHook = ({ prop }) => {
    value = usePrevious(prop);
    return null;
  };

  const wrapper = mount(<ComponentWithHook prop={initialProp} />);

  it('should set initial value to null', () => {
    expect(value).toBe(null);
  });

  it('should return previous value after updates to dependency', () => {
    wrapper.setProps({ prop: 'ppp' });
    expect(value).toBe('first');

    wrapper.setProps({ prop: 'third' });
    expect(value).toBe('second');
  });
});

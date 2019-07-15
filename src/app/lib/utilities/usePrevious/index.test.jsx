import React from 'react';
import { mount } from 'enzyme';
import usePrevious from '.';

describe('usePrevious', () => {
  let wrapper;
  let value;
  const initialProp = 'first';

  const ComponentWithHook = ({ prop }) => {
    value = usePrevious(prop);
    return null;
  };
  beforeAll(() => {
    wrapper = mount(<ComponentWithHook prop={initialProp} />);
  });

  it('should set initial value to null', () => {
    expect(value).toBe(null);
  });

  it('should return the previous value after dependency has changed', async () => {
    wrapper.setProps({ prop: 'second' });
    wrapper.mount();
    expect(value).toBe('first');

    wrapper.setProps({ prop: 'third' });
    wrapper.mount();
    expect(value).toBe('second');

    wrapper.setProps({ prop: 'fourth' });
    wrapper.mount();
    expect(value).toBe('third');
  });
});

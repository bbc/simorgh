import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Canonical from './Canonical';

describe('Media Player: Canonical', () => {
  it('should render a placeholder image', () => {
    const tree = renderer.create(
      <Canonical
        embedSrc="https://foo.bar/"
        placeholderSrc="https://foo.bar/img"
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should render a MediaPlayer component when placeholder is clicked', () => {
    const component = mount(
      <Canonical embedSrc="http://foo.com" placeholderSrc="http://bar.com" />,
    );

    component.simulate('click');

    expect(component).toMatchSnapshot();
  });
});

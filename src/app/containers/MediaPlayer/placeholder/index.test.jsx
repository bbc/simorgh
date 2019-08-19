import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import MediaPlayerPlaceholder from '.';

describe('Media Player: MediaPlayerPlaceholder', () => {
  it('should render a placeholder image', () => {
    const mockCallback = jest.fn();
    const tree = renderer.create(
      <MediaPlayerPlaceholder
        onClick={mockCallback}
        src="http://foo.bar/img.png"
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should register a click when placeholder is clicked', () => {
    const mockCallback = jest.fn();
    const tree = mount(
      <MediaPlayerPlaceholder
        onClick={mockCallback}
        src="http://foo.bar/img.png"
      />,
    );

    tree.simulate('click');

    expect(mockCallback.mock.calls.length).toEqual(1);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import MediaPlayerPlaceholder from '.';

describe('Media Player: MediaPlayerPlaceholder', () => {
  const mockCallback = jest.fn();

  afterEach(() => {
    jest.resetModules();
  });

  shouldMatchSnapshot(
    'should render a placeholder image',
    <MediaPlayerPlaceholder
      onClick={mockCallback}
      src="http://foo.bar/img.png"
    />,
  );

  it('should register a click when placeholder is clicked', () => {
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

import React from 'react';
import renderer from 'react-test-renderer';
import CanonicalMediaPlayer from '.';

describe('Media Player: CanonicalMediaPlayer', () => {
  it('should render a placeholder image', () => {
    const tree = renderer.create(
      <CanonicalMediaPlayer embedSrc="https://foo.bar/" />,
    );

    expect(tree).toMatchSnapshot();
  });
});

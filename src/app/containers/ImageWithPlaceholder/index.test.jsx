import React from 'react';
import { mount, render } from 'enzyme';
import LazyLoad from 'react-lazyload';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  LazyLoadImageWithPlaceholder,
} from './fixtureData';

describe('ImageWithPlaceholder', () => {
  it('should load lazyload component when lazyLoad prop is set to true', () => {
    const wrapper = mount(<LazyLoadImageWithPlaceholder />).find(LazyLoad);
    const {
      offset,
      once,
      overflow,
      resize,
      scroll,
      unmountIfInvisible,
    } = wrapper.props();

    expect(offset).toBe(250);
    expect(once).toBe(true);
    expect(overflow).toBe(false);
    expect(resize).toBe(false);
    expect(scroll).toBe(true);
    expect(unmountIfInvisible).toBe(false);
    expect(Object.keys(wrapper.props()).length).toBe(8);
  });

  it('should render a lazyloaded image when lazyLoad set to true', () => {
    // Render using enzyme to capture noscript contents
    const container = render(<LazyLoadImageWithPlaceholder />);
    expect(container).toMatchSnapshot();
  });

  shouldMatchSnapshot(
    'should not provide non-js fallback',
    <LazyLoadImageWithPlaceholder fallback={false} />,
  );

  shouldMatchSnapshot('should render an image', <ImageWithPlaceholder />);

  shouldMatchSnapshot(
    'should render an AMP image',
    <AmpImageWithPlaceholder />,
  );
});

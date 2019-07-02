import React from 'react';
import { mount } from 'enzyme';
import LazyLoad from 'react-lazyload';
import { shouldMatchSnapshot } from '../../../testHelpers';
import {
  FigureImage,
  FigureAmpImage,
  FigureLazyLoadImage,
} from './fixtureData';

describe('Figure', () => {
  it('should load lazyload component when lazyLoad prop is set to true', () => {
    const wrapper = mount(<FigureLazyLoadImage />).find(LazyLoad);
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
    expect(Object.keys(wrapper.props()).length).toBe(7);
  });

  shouldMatchSnapshot(
    'should render a lazyloaded image when lazyLoad set to true',
    <FigureLazyLoadImage />,
  );

  shouldMatchSnapshot('should render an image with alt text', <FigureImage />);

  shouldMatchSnapshot(
    'should render an AMP image with alt text',
    <FigureAmpImage />,
  );
});

import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import ImagePlaceholderAmp from './index.amp';

describe('ImagePlaceholderAmp', () => {
  it('should render normal version correctly', () => {
    const { container } = render(
      <amp-img src="foo" width="645px" height="128px">
        <ImagePlaceholderAmp />
      </amp-img>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render dark mode version correctly', () => {
    const { container } = render(
      <amp-img src="foo" width="645px" height="128px">
        <ImagePlaceholderAmp darkPlaceholder />
      </amp-img>,
    );
    expect(container).toMatchSnapshot();
  });
});

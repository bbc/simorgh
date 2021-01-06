import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  LazyLoadImageWithPlaceholder,
} from './fixtureData';

describe('ImageWithPlaceholder', () => {
  it('should not load lazyload component when lazyLoad prop is set to false', async () => {
    const { getByAltText } = render(
      <LazyLoadImageWithPlaceholder lazyLoad={false} />,
    );

    expect(getByAltText('Pauline Clayton')).toBeInTheDocument();
  });

  it('should lazyload component when lazyLoad prop is set to true', async () => {
    const { container, queryByAltText } = render(
      <LazyLoadImageWithPlaceholder lazyLoad />,
    );

    expect(queryByAltText('Pauline Clayton')).not.toBeInTheDocument();
    expect(container.querySelector('noscript')).toBeInTheDocument();
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

import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import RecommendationsImage from '.';

const indexFixtureData = {
  width: 1023,
  height: 575,
  altText: 'dolar TL',
  copyrightHolder: 'Getty Images',
  originCode: 'cpsprodpb',
  locator: '98dd/live/59717db0-1f53-11ed-aa9d-57accb179502.jpg',
};

describe('RecommendationsImage', () => {
  it('should render one image with src & alt attributes', () => {
    const { container } = render(
      <RecommendationsImage image={indexFixtureData} />,
    );

    expect(container.getElementsByTagName('img').length).toEqual(1);
    expect(
      container.getElementsByTagName('img')[0].getAttribute('src'),
    ).toEqual(
      `https://ichef.bbci.co.uk/ace/ws/660/cpsprodpb/98dd/live/59717db0-1f53-11ed-aa9d-57accb179502.jpg.webp`,
    );
    expect(
      container.getElementsByTagName('img')[0].getAttribute('alt'),
    ).toEqual('dolar TL');
  });
});

import { render } from '@testing-library/react';
import RecommendationsImage from '.';

const indexFixtureData = {
  id: '111155484',
  subType: 'index',
  href: 'http://c.files.bbci.co.uk/BD47/production/_111155484_mediaitem111155481.jpg',
  path: '/cpsprodpb/BD47/production/_111155484_mediaitem111155481.jpg',
  height: 549,
  width: 976,
  altText: 'Angie Dodge',
  copyrightHolder: 'BBC',
  type: 'image',
};

describe('RecommendationsImage', () => {
  it('should render one image with src & alt attributes', () => {
    const { container } = render(
      <RecommendationsImage indexImage={indexFixtureData} />,
    );

    expect(container.getElementsByTagName('img').length).toEqual(1);
    expect(
      container.getElementsByTagName('img')[0].getAttribute('src'),
    ).toEqual(
      `https://ichef.bbci.co.uk/news/660/cpsprodpb/BD47/production/_111155484_mediaitem111155481.jpg`,
    );
    expect(
      container.getElementsByTagName('img')[0].getAttribute('alt'),
    ).toEqual('Angie Dodge');
  });
});

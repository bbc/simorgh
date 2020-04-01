import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import BulletinContainer from '.';

const tvBulletinItem = {
  name: 'Test TV Bulletin promo',
  summary: 'Test TV summary',
  indexImage: {
    path: '/cpsdevpb/4917/test/_63711781_clinton.jpg',
    height: 371,
    width: 660,
    altText: 'Clinton',
    copyrightHolder: 'BBC',
  },
  uri: 'https://www.bbc.co.uk/news',
  contentType: 'TVBulletin',
  assetTypeCode: 'PRO',
  timestamp: 1565085977000,
  type: 'link',
};

const liveTvBulletinItem = {
  ...tvBulletinItem,
  isLive: true,
};

const radioBulletinItem = {
  name: 'Test Radio Bulletin promo',
  summary: 'Test Radio summary',
  indexImage: {
    path: '/cpsdevpb/4917/test/_63711781_clinton.jpg',
    height: 371,
    width: 660,
    altText: 'Clinton',
    copyrightHolder: 'BBC',
  },
  uri: 'https://www.bbc.co.uk/news',
  contentType: 'RadioBulletin',
  assetTypeCode: 'PRO',
  timestamp: 1571655919000,
  type: 'link',
};

const liveRadioBulletinItem = {
  ...radioBulletinItem,
  isLive: true,
};

const BulletinWithContext = (item) => (
  <ServiceContextProvider service="igbo">
    <BulletinContainer item={item} />
  </ServiceContextProvider>
);

describe('Bulletin Container', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should render a TV bulletin correctly',
      BulletinWithContext(tvBulletinItem),
    );

    shouldMatchSnapshot(
      'should render a Live TV bulletin correctly',
      BulletinWithContext(liveTvBulletinItem),
    );

    shouldMatchSnapshot(
      'should render a Radio bulletin correctly',
      BulletinWithContext(radioBulletinItem),
    );

    shouldMatchSnapshot(
      'should render a Live Radio bulletin correctly',
      BulletinWithContext(liveRadioBulletinItem),
    );
  });

  describe('assertion tests', () => {
    it('should render the Live TV offscreen text', () => {
      const { container } = render(BulletinWithContext(liveTvBulletinItem));
      const span = container.getElementsByTagName('span')[1];

      expect(span.textContent).toEqual('Lee Live, ');
    });

    it('should render the Live Radio offscreen text', () => {
      const { container } = render(BulletinWithContext(liveRadioBulletinItem));
      const span = container.getElementsByTagName('span')[1];

      expect(span.textContent).toEqual('Gee ntị Live, ');
    });

    it('should render the LIVE label', () => {
      const { container } = render(BulletinWithContext(liveTvBulletinItem));
      const span = container.getElementsByTagName('span')[2];

      expect(span.getAttribute('aria-hidden')).toBeDefined();
      expect(span.getAttribute('aria-hidden')).toEqual('true');
      expect(span.textContent).toEqual('NA EME UGBU A ');
    });
  });
});

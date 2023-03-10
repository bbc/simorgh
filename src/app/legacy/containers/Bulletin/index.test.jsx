import React from 'react';
import { render } from '../../../components/react-testing-library-with-providers';
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

describe('Bulletin Container', () => {
  describe('snapshots', () => {
    it('should render a TV bulletin correctly', () => {
      const { container } = render(
        <BulletinContainer item={tvBulletinItem} />,
        { service: 'igbo' },
      );
      expect(container).toMatchSnapshot();
    });

    it('should render a TV bulletin with lang attribute', () => {
      const { container } = render(
        <BulletinContainer item={tvBulletinItem} />,
        { service: 'scotland' },
      );
      expect(container).toMatchSnapshot();
    });

    it('should render a Live TV bulletin correctly', () => {
      const { container } = render(
        <BulletinContainer item={liveTvBulletinItem} />,
        { service: 'igbo' },
      );
      expect(container).toMatchSnapshot();
    });

    it('should render a Radio bulletin correctly', () => {
      const { container } = render(
        <BulletinContainer item={radioBulletinItem} />,
        { service: 'igbo' },
      );
      expect(container).toMatchSnapshot();
    });

    it('should render a Live Radio bulletin correctly', () => {
      const { container } = render(
        <BulletinContainer item={liveRadioBulletinItem} />,
        { service: 'igbo' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('assertion tests', () => {
    it('should render the Live TV offscreen text', () => {
      const { container } = render(
        <BulletinContainer item={liveTvBulletinItem} />,
        { service: 'igbo' },
      );
      const span = container.getElementsByTagName('span')[1];

      expect(span.textContent).toEqual('NA EME UGBU A ');
    });

    it('should render the Live Radio offscreen text', () => {
      const { container } = render(
        <BulletinContainer item={liveRadioBulletinItem} />,
        { service: 'igbo' },
      );
      const span = container.getElementsByTagName('span')[1];

      expect(span.textContent).toEqual('NA EME UGBU A ');
    });

    it('should render the LIVE label', () => {
      const { container } = render(
        <BulletinContainer item={liveTvBulletinItem} />,
        { service: 'igbo' },
      );
      const span = container.getElementsByTagName('span')[1];

      expect(span.getAttribute('aria-hidden')).toBeDefined();
      expect(span.getAttribute('aria-hidden')).toEqual('true');
      expect(span.textContent).toEqual('NA EME UGBU A ');
    });
  });
});

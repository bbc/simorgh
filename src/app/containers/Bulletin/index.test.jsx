import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { service as newsConfig } from '#lib/config/services/news';
import BulletinContainer from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const tvBulletinItem = {
  name: 'Test TV Bul promo live',
  summary: 'Test TV Bul promo',
  indexImage: {
    id: '63711781',
    subType: 'index',
    href: 'http://b.files.bbci.co.uk/4917/test/_63711781_clinton.jpg',
    path: '/cpsdevpb/4917/test/_63711781_clinton.jpg',
    height: 371,
    width: 660,
    altText: 'Clinton',
    caption: 'Clinton',
    copyrightHolder: 'BBC',
  },
  uri: 'https://www.bbc.co.uk/news',
  contentType: 'TVBulletin',
  assetTypeCode: 'PRO',
  timestamp: 1565085977000,
  type: 'link',
};

const radioBulletinItem = {
  name: 'Test Radio Bul promo live',
  summary: 'Test Radio summary',
  indexImage: {
    id: '63711781',
    subType: 'index',
    href: 'http://b.files.bbci.co.uk/4917/test/_63711781_clinton.jpg',
    path: '/cpsdevpb/4917/test/_63711781_clinton.jpg',
    height: 371,
    width: 660,
    altText: 'Clinton',
    caption: 'Clinton',
    copyrightHolder: 'BBC',
  },
  uri: 'https://www.bbc.co.uk/news',
  contentType: 'RadioBulletin',
  assetTypeCode: 'PRO',
  timestamp: 1571655919000,
  type: 'link',
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});

const { useContext } = jest.requireMock('react');

describe('Bulletin Container', () => {
  describe('snapshots', () => {
    beforeEach(() => {
      useContext.mockReturnValue(newsConfig.default);
    });

    afterEach(() => {
      useContext.mockReset();
    });

    shouldMatchSnapshot(
      'should render a TV bulletin correctly',
      <ServiceContextProvider service="igbo">
        <BulletinContainer item={tvBulletinItem} />
      </ServiceContextProvider>,
    );

    shouldMatchSnapshot(
      'should render a Radio bulletin correctly',
      <ServiceContextProvider service="igbo">
        <BulletinContainer item={radioBulletinItem} />
      </ServiceContextProvider>,
    );
  });
});

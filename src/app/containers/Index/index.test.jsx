import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Index from '.';

const group = {
  type: 'responsive-top-stories',
  title: 'Top Stories',
  items: [
    {
      headlines: {
        headline: 'Top Story 1 headline',
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Summary text 1',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image1.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 1',
        copyrightHolder: 'Image provider 1',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000001',
    },
    {
      headlines: {
        headline: 'Top Story 2 headline',
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Summary text 2',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image2.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 2',
        copyrightHolder: 'Image provider 2',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000002',
    },
  ],
  strapline: {
    name: 'Top Stories',
  },
};

describe(`Index`, () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should render promo groups with visually hidden title',
      <ServiceContextProvider service="igbo">
        <Index groups={[group]} title="Index Title" hideTitle />
      </ServiceContextProvider>,
    );

    shouldMatchSnapshot(
      'should render promo groups with visual title',
      <ServiceContextProvider service="igbo">
        <Index groups={[group]} title="Index Title" />
      </ServiceContextProvider>,
    );
  });
});

import React from 'react';
import newsConfig from '../../lib/config/services/news';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import FrontPageSection from '.';

const group = {
  type: 'responsive-top-stories',
  title: 'Top Stories',
  items: [
    {
      headlines: {
        headline: 'Top Story 1 headline',
      },
      summary: 'Summary text 1',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 1',
        copyrightHolder: 'Image provider 1',
      },
    },
    {
      headlines: {
        headline: 'Top Story 2 headline',
      },
      summary: 'Summary text 2',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 2',
        copyrightHolder: 'Image provider 2',
      },
    },
  ],
  strapline: {
    name: 'Top Stories',
  },
};

const hasNoStrapline = {
  type: 'responsive-no-strapline',
  title: "We don't need no strapline!",
  items: [
    {
      headlines: {
        headline: "Nothing rendered because we didn't set a strapline",
      },
      summary: 'Oops',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 1',
        copyrightHolder: 'Image provider 1',
      },
    },
    {
      headlines: {
        headline: 'Top Story 2 headline',
      },
      summary: 'Summary text 2',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 2',
        copyrightHolder: 'Image provider 2',
      },
    },
  ],
};

describe('FrontPageSection Container', () => {
  // The following awfulness is a work around for an inability to use context
  // with the shallow renderer. Sorry.
  // https://stackoverflow.com/a/55013256
  let realUseContext;
  let mockedUseContext;

  beforeEach(() => {
    realUseContext = React.useContext;

    React.useContext = jest.fn();
    mockedUseContext = React.useContext;
    mockedUseContext.mockReturnValue(newsConfig);
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  shouldShallowMatchSnapshot(
    'should render correctly for canonical',
    <FrontPageSection group={group} />,
  );

  shouldShallowMatchSnapshot(
    'should render null when there is no strapline',
    <FrontPageSection group={hasNoStrapline} />,
  );
});

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
};

// The following awfulness is a work around for an inability to use context
// with the shallow renderer. Sorry.
// https://stackoverflow.com/a/55013256
let realUseContext;
let mockedUseContext;
beforeEach(() => {
  realUseContext = React.useContext;
  // eslint-disable-next-line no-multi-assign
  mockedUseContext = React.useContext = jest.fn();
});
afterEach(() => {
  React.useContext = realUseContext;
});

describe('FrontPageSection Container', () => {
  beforeEach(() => {
    mockedUseContext.mockReturnValue(newsConfig);
  });

  shouldShallowMatchSnapshot(
    'should render correctly for canonical',
    <FrontPageSection group={group} />,
  );
});

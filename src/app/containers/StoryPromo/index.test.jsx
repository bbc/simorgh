import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import StoryPromo from '.';

let item = {
  headlines: {
    headline: 'A headline',
  },
  summary: 'Summary text',
  timestamp: 1556795033,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'ในหลวง ร 10',
  },
};

describe('StoryPromo Container', () => {
  shouldMatchSnapshot('should render correctly', <StoryPromo item={item} />);
});

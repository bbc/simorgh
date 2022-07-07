import React from 'react';
import { render } from '@testing-library/react';
import RelatedContentItem from './RelatedContentItem';
import {
  RelatedContentData,
  RelatedContentWithNoImage,
  RelatedContentWithNoTimestamp,
} from './fixture/RelatedContentitemFixtures';

// eslint-disable-next-line react/prop-types
const RelatedContentitem = ({ fixtureData }) => (
  <RelatedContentItem item={fixtureData} labelId="RelatedContent" index={0} />
);

describe('Related Content Promo', () => {
  it('should render Related Content correctly', () => {});

  it('should return null if no data is passed', () => {
    const { container } = render(<RelatedContentitem blocks={{}} />);
    expect(container).toBeEmptyDOMElement();
  });
});

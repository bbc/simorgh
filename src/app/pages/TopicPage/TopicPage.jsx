import React from 'react';
import styled from '@emotion/styled';
// import { string } from 'prop-types';
import StoryPromoContainer from '../../containers/StoryPromo';
// import HeadingsContainer from '../../containers/Headings';

// import { storyItem } from '#models/propTypes/storyItem';
// display inline block

const StyledTopicPromo = styled.div`
  display: inline-block;
  padding-left: 25px;
  padding-bottom: 25px;
`;

const StyledTopicPromoHeader = styled.h1`
  padding-left: 25px;
  font-family: ReithSans;
  font-size: 44px;
`;

const pageData = [
  {
    headlines: {
      headline: 'A headline',
    },
    locators: {
      assetUri: 'https://www.bbc.co.uk',
    },
    summary: 'Summary text',
    timestamp: 1556795033000,
    indexImage: {
      path: '/cpsprodpb/0A06/production/image.jpg',
      height: 1152,
      width: 2048,
      altText: 'Image Alt text',
      copyrightHolder: 'Image provider',
    },
  },
  {
    headlines: {
      headline: 'A headline',
    },
    locators: {
      assetUri: 'https://www.bbc.co.uk',
    },
    summary: 'Summary text',
    timestamp: 1556795033000,
    indexImage: {
      path: '/cpsprodpb/0A06/production/image.jpg',
      height: 1152,
      width: 2048,
      altText: 'Image Alt text',
      copyrightHolder: 'Image provider',
    },
  },
  {
    headlines: {
      headline: 'A headline',
    },
    locators: {
      assetUri: 'https://www.bbc.co.uk',
    },
    summary: 'Summary text',
    timestamp: 1556795033000,
    indexImage: {
      path: '/cpsprodpb/0A06/production/image.jpg',
      height: 1152,
      width: 2048,
      altText: 'Image Alt text',
      copyrightHolder: 'Image provider',
    },
  },
  {
    headlines: {
      headline: 'A headline',
    },
    locators: {
      assetUri: 'https://www.bbc.co.uk',
    },
    summary: 'Summary text',
    timestamp: 1556795033000,
    indexImage: {
      path: '/cpsprodpb/0A06/production/image.jpg',
      height: 1152,
      width: 2048,
      altText: 'Image Alt text',
      copyrightHolder: 'Image provider',
    },
  },
];

const TopicPage = () => {
  return (
    <>
      <StyledTopicPromoHeader>THIS IS A HEADING</StyledTopicPromoHeader>
      {pageData.map(promo => (
        <StyledTopicPromo>
          <StoryPromoContainer
            key={promo.id}
            platform="canonical"
            item={promo}
            displaySummary={false}
          />
        </StyledTopicPromo>
      ))}
    </>
  );
};

// TopicPage.propTypes = {
//   pageData: {},
//   title: string,
// };

// TopicPage.defaultProps = {
//   pageData: {},
//   title: '',
// };

export default TopicPage;

import React from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING_DBL } from '#legacy/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/src/breakpoints';

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 50%;
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
  }
`;

const ImageWrapper = styled.div`
  width: 48px;
  height: 48px;

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 64px;
    height: 64px;
  }
  display: flex;
  justify-content: center;
  margin-inline-end: ${GEL_SPACING_DBL};
`;

const TopicImage = ({ image, altText }) => {
  return (
    <ImageWrapper>
      <Image src={image} alt={altText} />
    </ImageWrapper>
  );
};

export default TopicImage;

import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { ServiceContext } from '#contexts/ServiceContext';
import { GEL_SPACING_DBL } from '#legacy/gel-foundations/src/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#legacy/gel-foundations/src/breakpoints';

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 50%;
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
  }
`;

const ImageWrapper = styled.div`
  width: 64px;
  height: 64px;
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

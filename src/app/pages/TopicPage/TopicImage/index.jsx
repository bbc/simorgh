import React from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_SEXT,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const BadgeWrapper = styled.div`
  padding-bottom: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: 0;
  }
`;

const ImageWrapper = styled.div`
  width: ${GEL_SPACING_SEXT};
  height: ${GEL_SPACING_SEXT};
  display: flex;
  justify-content: center;
  margin-inline-end: ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 4rem;
    height: 4rem;
  }
`;

const TopicImage = ({ image }) => {
  return (
    <BadgeWrapper>
      <ImageWrapper>
        <Image src={image} alt="" data-testid="topic-badge" />
      </ImageWrapper>
    </BadgeWrapper>
  );
};

TopicImage.propTypes = {
  image: string.isRequired,
};

export default TopicImage;

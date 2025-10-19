import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';

const Paragraph = styled.p`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  ${({ theme: { fontSizes } }) => fontSizes.greatPrimer};
  color: ${props => props.theme.palette.GREY_10};
  padding-top: ${GEL_SPACING_DBL};
  margin: 0;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: calc(50% - ${GEL_SPACING});
  }
`;

const TopicDescription = ({ children }) => {
  return <Paragraph>{children}</Paragraph>;
};

export default TopicDescription;

import React from 'react';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';

const H1 = styled.h1`
  ${({ theme: { fontVariants } }) => fontVariants.sansBold}
  ${({ theme: { fontSizes } }) => fontSizes.canon}
  color: ${props => props.theme.palette.GREY_10};
  margin: 0;
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: inline-block;
  }
`;

const TopicTitle = ({ children }) => {
  return (
    <H1 id="content" tabIndex="-1">
      {children}
    </H1>
  );
};

export default TopicTitle;

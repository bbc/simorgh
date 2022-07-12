import React from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_SEXT,
  GEL_SPACING_QUIN,
} from '#legacy/gel-foundations/src/spacings';

const Paragraph = styled.p`
  margin: ${GEL_SPACING_TRPL} 0;
  font-size: 1.75rem;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_QUAD} 0;
    font-size: 2rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_SEXT} 0 ${GEL_SPACING_SEXT} 0;
    font-size: 3.25rem;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUIN} 0 ${GEL_SPACING_SEXT} 0;
    font-size: 2.75rem;
  }
`;

const TopicDescription = ({ children }) => {
  return <Paragraph>{children}</Paragraph>;
};

TopicDescription.propTypes = {
  children: string.isRequired,
};

export default TopicDescription;

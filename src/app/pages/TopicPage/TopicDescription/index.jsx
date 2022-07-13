import React from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#legacy/gel-foundations/src/spacings';

const Paragraph = styled.p`
  margin-top: ${GEL_SPACING_DBL};
  font-size: 1.125rem;
`;

const TopicDescription = ({ children }) => {
  return <Paragraph>{children}</Paragraph>;
};

TopicDescription.propTypes = {
  children: string.isRequired,
};

export default TopicDescription;

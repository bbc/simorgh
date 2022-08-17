import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { ServiceContext } from '#contexts/ServiceContext';
import { string } from 'prop-types';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { C_GREY_10 } from '#psammead/psammead-styles/src/colours';
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
  ${({ service }) => getSansRegular(service)}
  color: ${C_GREY_10};
  padding-top: ${GEL_SPACING_DBL};
  margin: 0;
  font-size: 1.125rem;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_TRPL};
    font-size: 1.3125rem;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    font-size: 1.25rem;
    width: calc(50% - ${GEL_SPACING});
  }
`;

const TopicDescription = ({ children }) => {
  const { service } = useContext(ServiceContext);
  return <Paragraph service={service}>{children}</Paragraph>;
};

TopicDescription.propTypes = {
  children: string.isRequired,
};

export default TopicDescription;

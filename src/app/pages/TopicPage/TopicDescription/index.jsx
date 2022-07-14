import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { ServiceContext } from '#contexts/ServiceContext';
import { string } from 'prop-types';
import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#legacy/gel-foundations/src/spacings';

const Paragraph = styled.p`
  ${({ service }) => getSansRegular(service)}
  margin-top: ${GEL_SPACING_DBL};
  font-size: 1.125rem;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    font-size: 1.3125rem;
    margin-top: ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    font-size: 1.25rem;
    width: 49%;
    display: inline-block;
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

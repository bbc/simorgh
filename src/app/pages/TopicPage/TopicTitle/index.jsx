import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { getSansBold } from '#legacy/psammead-styles/src/font-styles';
import { C_GREY_10 } from '#legacy/psammead-styles/src/colours';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/src/breakpoints';

const H1 = styled.h1`
  ${({ service }) => getSansBold(service)}
  color: ${C_GREY_10};
  font-size: 1.75rem;
  line-height: 2rem;
  margin: 0;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    font-size: 2rem;
    line-height: 2.25rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    font-size: 3.25rem;
    line-height: 3.5rem;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    font-size: 2.75rem;
    line-height: 3rem;
    display: inline-block;
  }
`;

const TopicTitle = ({ children }) => {
  const { script, service } = useContext(ServiceContext);
  return (
    <H1 service={service} script={script} id="content" tabIndex="-1">
      {children}
    </H1>
  );
};

TopicTitle.propTypes = {
  children: string.isRequired,
};

export default TopicTitle;

import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import { getCanon } from '#psammead/gel-foundations/src/typography';
import { ServiceContext } from '../../../contexts/ServiceContext';

const H1 = styled.h1`
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getCanon(script)}
  color: ${props => props.theme.palette.GREY_10};
  margin: 0;
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
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

export default TopicTitle;

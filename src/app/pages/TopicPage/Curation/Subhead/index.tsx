import React, { useContext } from 'react';
import styled from '@emotion/styled';

import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '../../../../legacy/psammead/gel-foundations/src/breakpoints';

import { ServiceContext } from '../../../../contexts/ServiceContext';
import { getSansBold } from '../../../../legacy/psammead/psammead-styles/src/font-styles';
import { C_GREY_10 } from '../../../../legacy/psammead/psammead-styles/src/colours';

interface Props {
  children: React.ReactNode;
}

const H1 = styled.h1<{ service: string }>`
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

const Subhead = ({ children }: Props) => {
  const { service } = useContext(ServiceContext) as {
    script: string;
    service: string;
  };
  return (
    <H1 service={service} id="content" tabIndex={-1}>
      {children}
    </H1>
  );
};

export default Subhead;

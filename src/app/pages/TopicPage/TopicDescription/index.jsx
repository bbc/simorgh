import React, { useContext } from 'react';
import styled from '@emotion/styled';
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
import { getGreatPrimer } from '#psammead/gel-foundations/src/typography';
import { ServiceContext } from '../../../contexts/ServiceContext';

const Paragraph = styled.p`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getGreatPrimer(script)}
  color: ${C_GREY_10};
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
  const { service, script } = useContext(ServiceContext);

  return (
    <Paragraph service={service} script={script}>
      {children}
    </Paragraph>
  );
};

TopicDescription.propTypes = {
  children: string.isRequired,
};

export default TopicDescription;

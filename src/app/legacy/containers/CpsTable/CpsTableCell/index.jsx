import React from 'react';
import styled from '@emotion/styled';

import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';

import Blocks from '../../Blocks';
import Text from '../../Text';

const StyledTd = styled.td`
  border-bottom: 1px solid ${props => props.theme.palette.SPORT_SILVER};
  padding-top: ${GEL_SPACING};
  padding-bottom: ${GEL_SPACING};
  padding-left: ${GEL_SPACING};
  vertical-align: middle;
  text-align: left;

  ${({ isHeaderCell }) =>
    props =>
      isHeaderCell && `background: ${props.theme.palette.SPORT_MIST};`}

  & p {
    padding-bottom: 0;
  }
`;

const componentsToRender = {
  text: Text,
};

const CpsTableCell = ({ blocks, type = 'tableCell' }) => {
  const isHeaderCell = type === 'tableHeader';
  return (
    <StyledTd as={isHeaderCell ? 'th' : 'td'} isHeaderCell={isHeaderCell}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </StyledTd>
  );
};

export default CpsTableCell;

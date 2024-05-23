import React from 'react';
import styled from '@emotion/styled';

import Blocks from '../../Blocks';
import CpsTableCell from '../CpsTableCell';

const StyledTr = styled.tr`
  &:hover {
    background-color: ${props => props.theme.palette.SPORT_MIST};
  }
`;

const componentsToRender = {
  tableCell: CpsTableCell,
  tableHeader: CpsTableCell,
};

const CpsTableRow = ({ blocks }) => (
  <StyledTr>
    <Blocks blocks={blocks} componentsToRender={componentsToRender} />
  </StyledTr>
);

export default CpsTableRow;

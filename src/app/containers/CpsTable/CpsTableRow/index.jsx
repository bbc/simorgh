import React from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape } from 'prop-types';

import Blocks from '../../Blocks';
import CpsTableCell from '../CpsTableCell';
import CpsTableHeader from '../CpsTableHeader';

const StyledTr = styled.tr`
  &:hover {
    background-color: #f7f7f5;
  }
`;

const componentsToRender = {
  tableCell: CpsTableCell,
  tableHeader: CpsTableHeader,
};

const CpsTableRow = ({ blocks }) => {
  return (
    <StyledTr>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </StyledTr>
  );
};

CpsTableRow.propTypes = {
  blocks: arrayOf(shape({})).isRequired,
};

export default CpsTableRow;

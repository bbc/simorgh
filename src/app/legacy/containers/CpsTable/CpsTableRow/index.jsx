import React from 'react';
import styled from '@emotion/styled';
import { arrayOf, oneOf, shape } from 'prop-types';

import { textBlockPropTypes } from '#models/propTypes/text';

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

CpsTableRow.propTypes = {
  blocks: arrayOf(
    shape({
      type: oneOf(['tableCell', 'tableHeader']),
      blocks: arrayOf(textBlockPropTypes),
    }),
  ).isRequired,
};

export default CpsTableRow;

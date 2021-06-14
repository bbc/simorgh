import React from 'react';
import styled from '@emotion/styled';
import { arrayOf, string } from 'prop-types';

import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { textBlockPropTypes } from '#models/propTypes/text';

import Blocks from '../../Blocks';
import CpsText from '../../CpsText';

const StyledTd = styled.td`
  border-bottom: 1px solid #dbdbdb;
  padding-top: ${GEL_SPACING};
  padding-bottom: ${GEL_SPACING};
  padding-left: ${GEL_SPACING};
  vertical-align: middle;

  ${({ isHeaderCell }) => isHeaderCell && 'background: #f7f7f5;'}

  & p {
    padding-bottom: 0;
  }
`;

const componentsToRender = {
  text: CpsText,
};

const CpsTableCell = ({ blocks, type }) => {
  const isHeaderCell = type === 'tableHeader';
  return (
    <StyledTd as={isHeaderCell ? 'th' : 'td'} isHeaderCell={isHeaderCell}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </StyledTd>
  );
};

CpsTableCell.propTypes = {
  blocks: arrayOf(textBlockPropTypes).isRequired,
  type: string,
};

CpsTableCell.defaultProps = {
  type: 'tableCell',
};

export default CpsTableCell;

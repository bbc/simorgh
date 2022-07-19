import React from 'react';
import styled from '@emotion/styled';
import { arrayOf, string } from 'prop-types';

import {
  C_SPORT_SILVER,
  C_SPORT_MIST,
} from '#legacy/psammead-styles/src/colours';

import { GEL_SPACING } from '#legacy/gel-foundations/src/spacings';
import { textBlockPropTypes } from '#models/propTypes/text';

import Blocks from '../../Blocks';
import Text from '../../Text';

const StyledTd = styled.td`
  border-bottom: 1px solid ${C_SPORT_SILVER};
  padding-top: ${GEL_SPACING};
  padding-bottom: ${GEL_SPACING};
  padding-left: ${GEL_SPACING};
  vertical-align: middle;
  text-align: left;

  ${({ isHeaderCell }) => isHeaderCell && `background: ${C_SPORT_MIST};`}

  & p {
    padding-bottom: 0;
  }
`;

const componentsToRender = {
  text: Text,
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

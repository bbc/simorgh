import React from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape } from 'prop-types';

import Blocks from '../../Blocks';
import CpsText from '../../CpsText';

const StyledTh = styled.th`
  background: #f7f7f5;
  border-bottom: 1px solid #dbdbdb;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  vertical-align: middle;

  & p {
    padding-bottom: 0;
  }
`;

const componentsToRender = {
  text: CpsText,
};

const CpsTableHeader = ({ blocks }) => {
  return (
    <StyledTh>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </StyledTh>
  );
};

CpsTableHeader.propTypes = {
  blocks: arrayOf(shape({})).isRequired,
};

export default CpsTableHeader;

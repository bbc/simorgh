import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, string, oneOf } from 'prop-types';

import { GEL_BODY_COPY } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { textBlockPropTypes } from '#models/propTypes/text';

import { ServiceContext } from '../../../contexts/ServiceContext';
import Blocks from '../Blocks';
import CpsTableRow from './CpsTableRow';

const StyledTable = styled.table`
  ${({ service }) => getSansRegular(service)}
  ${GEL_BODY_COPY}
  border-spacing: 0;
  width: 100%;
`;

const componentsToRender = {
  tableHeaderRow: CpsTableRow,
  tableRow: CpsTableRow,
};

const CpsTable = ({ blocks, supportedServices }) => {
  const { service } = useContext(ServiceContext);
  if (!supportedServices.includes(service)) return null;

  const headerBlocks = blocks.filter(block => block.type === 'tableHeaderRow');
  const bodyBlocks = blocks.filter(block => block.type === 'tableRow');

  return (
    <StyledTable service={service}>
      <thead>
        <Blocks blocks={headerBlocks} componentsToRender={componentsToRender} />
      </thead>
      <tbody>
        <Blocks blocks={bodyBlocks} componentsToRender={componentsToRender} />
      </tbody>
    </StyledTable>
  );
};

CpsTable.propTypes = {
  blocks: arrayOf(
    shape({
      type: oneOf(['tableHeaderRow', 'tableRow']),
      blocks: arrayOf(
        shape({
          type: oneOf(['tableCell', 'tableHeader']),
          blocks: arrayOf(textBlockPropTypes),
        }),
      ),
    }),
  ).isRequired,
  supportedServices: arrayOf(string),
};

CpsTable.defaultProps = {
  supportedServices: ['sport'],
};

export default CpsTable;

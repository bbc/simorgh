import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, string, oneOf } from 'prop-types';

import { GEL_BODY_COPY } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { textBlockPropTypes } from '#models/propTypes/text';

import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import CpsTableRow from './CpsTableRow';

const StyledTable = styled.table`
  ${({ service }) => getSansRegular(service)}
  ${GEL_BODY_COPY}
  border-spacing: 0;
  width: 100%;
`;

const componentsToRender = {
  tableRow: CpsTableRow,
};

const CpsTable = ({ blocks, supportedServices }) => {
  const { service } = useContext(ServiceContext);
  if (!supportedServices.includes(service)) return null;

  return (
    <StyledTable service={service}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </StyledTable>
  );
};

CpsTable.propTypes = {
  blocks: arrayOf(
    shape({
      type: ['tableRow'],
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

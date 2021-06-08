import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, string } from 'prop-types';

import { GEL_BODY_COPY } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';

import { ServiceContext } from '#contexts/ServiceContext';

const StyledTable = styled.table`
  ${({ service }) => getSansRegular(service)}
  ${GEL_BODY_COPY}
`;

const CPSTable = ({ blocks, supportedServices }) => {
  const { service } = useContext(ServiceContext);
  if (!supportedServices.includes(service)) return null;

  return (
    <StyledTable service={service}>
      <tr>
        <td>{JSON.stringify(blocks[0])}</td>
      </tr>
    </StyledTable>
  );
};

CPSTable.propTypes = {
  blocks: arrayOf(shape({})).isRequired,
  supportedServices: arrayOf(string),
};

CPSTable.defaultProps = {
  supportedServices: [
    // 'sport',
  ],
};

export default CPSTable;

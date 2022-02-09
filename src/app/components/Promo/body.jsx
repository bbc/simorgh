import React from 'react';
import styled from '@emotion/styled';

import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getBodyCopy } from '@bbc/gel-foundations/typography';
import { C_EBON } from '@bbc/psammead-styles/colours';

const StyledP = styled.p`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBodyCopy(script)}
  color: ${C_EBON}
`;

const Body = props => {
  return <StyledP {...props} />;
};

Body.propTypes = {};

Body.defaultProps = {};

export default Body;

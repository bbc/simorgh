import React from 'react';
import styled from '@emotion/styled';

import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getBodyCopy } from '@bbc/gel-foundations/typography';
import { C_EBON } from '@bbc/psammead-styles/colours';

const H1 = styled.h1`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBodyCopy(script)}
  color: ${C_EBON}
`;

const Heading = props => {
  return <H1 {...props} />;
};

Heading.propTypes = {};

Heading.defaultProps = {};

export default Heading;

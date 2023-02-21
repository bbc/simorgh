import styled from '@emotion/styled';
import { string } from 'prop-types';
import { GEL_SPACING_TRPL } from '#psammead/gel-foundations/src/spacings';

const InlineSpan = styled.span`
  padding-bottom: ${GEL_SPACING_TRPL};
  margin: 0; /* Reset */
`;

InlineSpan.propTypes = {
  lang: string.isRequired,
};

export default InlineSpan;

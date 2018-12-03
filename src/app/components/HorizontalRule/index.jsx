import styled from 'styled-components';
import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { GEL_SPACING_DBL } from '../../lib/constants/styles';

const HorizontalRule = styled.hr`
  background-color: ${C_POSTBOX};
  height: 0.25rem;
  width: 3rem;
  margin: ${GEL_SPACING_DBL} 0;
  border: 0;
`;

export default HorizontalRule;

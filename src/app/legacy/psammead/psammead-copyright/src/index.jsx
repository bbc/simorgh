import styled from '@emotion/styled';
import { oneOf } from 'prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_HLF,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_MINION,
  GEL_FF_REITH_SANS,
} from '#psammead/gel-foundations/src/typography';

const Copyright = styled.p`
  ${GEL_MINION};
  background-color: rgba(34, 34, 34, 0.75);
  text-transform: uppercase;
  color: ${props => props.theme.palette.WHITE};
  padding: ${GEL_SPACING_HLF} ${GEL_SPACING};
  font-family: ${GEL_FF_REITH_SANS};
  position: absolute;
  bottom: 0;
  margin: 0;
  ${props => props.position}: 0;
`;

Copyright.propTypes = {
  position: oneOf(['left', 'right']),
};

Copyright.defaultProps = {
  position: 'left',
  role: 'text',
};

export default Copyright;

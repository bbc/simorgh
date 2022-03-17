import styled from '@emotion/styled';
import { getBrevier } from '#legacy/gel-foundations/typography';
import { GEL_SPACING } from '#legacy/gel-foundations/spacings';
import { C_METAL, C_PEBBLE } from '#legacy/psammead-styles/colours';
import { getSansRegular } from '#legacy/psammead-styles/font-styles';

import { withEpisodeContext } from './helpers';

const borderStyling = dir => `
${
  dir === 'ltr'
    ? `  
    padding-left: ${GEL_SPACING};
    margin-left: ${GEL_SPACING};
    border-left: 0.0625rem solid ${C_PEBBLE};`
    : `
    padding-right: ${GEL_SPACING};
    margin-right: ${GEL_SPACING};
    border-right: 0.0625rem solid ${C_PEBBLE};`
}
`;

const DateTimeDuration = styled.span`
  ${({ script }) => getBrevier(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${({ darkMode }) => (darkMode ? C_PEBBLE : C_METAL)};
  ${({ hasBorder, dir }) => hasBorder && borderStyling(dir)}
`;

export default withEpisodeContext(DateTimeDuration);

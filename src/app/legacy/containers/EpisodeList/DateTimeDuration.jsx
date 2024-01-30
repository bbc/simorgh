import styled from '@emotion/styled';
import { getBrevier } from '#psammead/gel-foundations/src/typography';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

import { withEpisodeContext } from './helpers';

const borderStyling = dir => props =>
  `
${
  dir === 'ltr'
    ? `  
    padding-left: ${GEL_SPACING};
    margin-left: ${GEL_SPACING};
    border-left: 0.0625rem solid ${props.theme.palette.PEBBLE};`
    : `
    padding-right: ${GEL_SPACING};
    margin-right: ${GEL_SPACING};
    border-right: 0.0625rem solid ${props.theme.palette.PEBBLE};`
}
`;

const DateTimeDuration = styled.span`
  ${({ script }) => getBrevier(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.PEBBLE : theme.palette.METAL};
  ${({ hasBorder, dir }) => hasBorder && borderStyling(dir)}
`;

export default withEpisodeContext(DateTimeDuration);

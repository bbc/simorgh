import styled from '@emotion/styled';
import { getLongPrimer } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';

import { withEpisodeContext } from './helpers';

const Description = styled.span`
  ${({ script }) => getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.WHITE : theme.palette.EBON};
  display: inline-block;
  width: 100%;
  margin: ${GEL_SPACING_HLF} 0;
`;

export default withEpisodeContext(Description);

import styled from '@emotion/styled';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';

import { withEpisodeContext } from './helpers';

const Description = styled.span`
  ${({ theme: { fontSizes } }) => fontSizes.longPrimer};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.WHITE : theme.palette.EBON};
  display: inline-block;
  width: 100%;
  margin: ${GEL_SPACING_HLF} 0;
`;

export default withEpisodeContext(Description);

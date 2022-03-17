import styled from '@emotion/styled';
import { getLongPrimer } from '#legacy/gel-foundations/typography';
import { C_WHITE, C_EBON } from '#legacy/psammead-styles/colours';
import { getSansRegular } from '#legacy/psammead-styles/font-styles';
import { GEL_SPACING_HLF } from '#legacy/gel-foundations/spacings';

import { withEpisodeContext } from './helpers';

const Description = styled.span`
  ${({ script }) => getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${({ darkMode }) => (darkMode ? C_WHITE : C_EBON)};
  display: inline-block;
  width: 100%;
  margin: ${GEL_SPACING_HLF} 0;
`;

export default withEpisodeContext(Description);

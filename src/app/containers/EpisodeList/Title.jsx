import styled from '@emotion/styled';
import { C_WHITE, C_EBON } from '#legacy/psammead-styles/src/colours';
import { getPica } from '#legacy/gel-foundations/src/typography';
import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';

import { withEpisodeContext } from './helpers';

const Title = styled.span`
  ${({ script }) => getPica(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${({ darkMode }) => (darkMode ? C_WHITE : C_EBON)};
  display: inline-block;
  width: 100%;
  font-weight: 700;
`;

export default withEpisodeContext(Title);

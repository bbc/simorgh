import styled from '@emotion/styled';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

import { withEpisodeContext } from './helpers';

const Title = styled.span`
  ${({ script }) => getPica(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.WHITE : theme.palette.EBON};
  display: inline-block;
  width: 100%;
  font-weight: 700;
`;

export default withEpisodeContext(Title);

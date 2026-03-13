import styled from '@emotion/styled';

import { withEpisodeContext } from './helpers';

const Title = styled.span`
  ${({ theme: { fontSizes } }) => fontSizes.pica};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};

  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.WHITE : theme.palette.EBON};
  display: inline-block;
  width: 100%;
  font-weight: 700;
`;

export default withEpisodeContext(Title);

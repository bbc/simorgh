import styled from '@emotion/styled';

import { getBodyCopy } from '#psammead/gel-foundations/src/typography';

const P = styled.p`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular}
  ${({ script }) => getBodyCopy(script)}
  color: ${props => props.theme.palette.EBON}
`;

export default P;

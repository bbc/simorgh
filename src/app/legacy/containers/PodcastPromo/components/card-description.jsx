import styled from '@emotion/styled';
import { getLongPrimer } from '#psammead/gel-foundations/src/typography';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';

const CardDescription = styled.p`
  ${({ script }) => getLongPrimer(script)}
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular}
  max-width: 30rem;
  color: ${props => props.theme.palette.METAL};
  margin-top: ${GEL_SPACING};
`;

export default CardDescription;

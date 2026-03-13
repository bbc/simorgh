import styled from '@emotion/styled';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';

const CardDescription = styled.p`
  ${({ theme: { fontSizes } }) => fontSizes.longPrimer};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  max-width: 30rem;
  color: ${props => props.theme.palette.METAL};
  margin-top: ${GEL_SPACING};
`;

export default CardDescription;

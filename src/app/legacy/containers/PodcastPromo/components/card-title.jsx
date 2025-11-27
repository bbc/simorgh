import styled from '@emotion/styled';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';

const CardTitle = styled.h3`
  ${({ theme: { fontSizes } }) => fontSizes.pica};
  ${({ theme: { fontVariants } }) => fontVariants.serifMedium};
  margin-top: 0;
  margin-bottom: ${GEL_SPACING};
  color: ${props => props.theme.palette.EBON};
`;

export default CardTitle;

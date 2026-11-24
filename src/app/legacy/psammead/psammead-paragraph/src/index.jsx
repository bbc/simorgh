import styled from '@emotion/styled';
import { GEL_SPACING_TRPL } from '#psammead/gel-foundations/src/spacings';

const Paragraph = styled.p`
  ${({ theme: { fontSizes } }) => fontSizes.bodyCopy};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.GREY_10};
  padding-bottom: ${GEL_SPACING_TRPL};
  margin: 0; /* Reset */
`;

export default Paragraph;

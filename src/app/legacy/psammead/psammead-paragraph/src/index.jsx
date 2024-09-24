import styled from '@emotion/styled';
import { GEL_SPACING_TRPL } from '#psammead/gel-foundations/src/spacings';
import { getBodyCopy } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

const Paragraph = styled.p`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansRegular(service)}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.GREY_10};
  padding-bottom: ${GEL_SPACING_TRPL};
  margin: 0; /* Reset */
`;

export default Paragraph;

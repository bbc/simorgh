import styled from '@emotion/styled';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { C_EBON } from '@bbc/psammead-styles/colours';

const CardTitle = styled.h3`
  ${({ script }) => getPica(script)};
  ${({ service }) => getSerifMedium(service)}
  margin-top: 0;
  margin-bottom: ${GEL_SPACING};
  color: ${C_EBON};
`;

export default CardTitle;

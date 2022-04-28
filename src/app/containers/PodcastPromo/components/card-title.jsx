import styled from '@emotion/styled';
import { GEL_SPACING } from '#legacy/gel-foundations/src/spacings';
import { getPica } from '#legacy/gel-foundations/src/typography';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { C_EBON } from '@bbc/psammead-styles/colours';

const CardTitle = styled.h3`
  ${({ script }) => getPica(script)}
  ${({ service }) => getSerifMedium(service)}
  margin-top: 0;
  margin-bottom: ${GEL_SPACING};
  color: ${C_EBON};
`;

export default CardTitle;

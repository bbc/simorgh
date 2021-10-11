import styled from '@emotion/styled';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { C_EBON } from '@bbc/psammead-styles/colours';

const CardTitle = styled.h3`
  ${({ service }) => getSerifMedium(service)}
  display: inline-block;
  width: 145px;
  height: 20px;
  margin: 2px 103.5px 5px 9.5px;
  font-family: BBCReithSerif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #222;
`;

export default CardTitle;

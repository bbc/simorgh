import styled from '@emotion/styled';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';

const CardTitle = styled.h3`
  ${({ script }) => getPica(script)}
  ${({ service }) => getSerifMedium(service)}
  width: 145px;
  height: 20px;
  margin: 2px 103.5px 5px 9.5px;
  line-height: 1.33;
`;

export default CardTitle;

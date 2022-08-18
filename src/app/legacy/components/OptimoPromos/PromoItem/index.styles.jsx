import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import styled from '@emotion/styled';

const PromoItem = styled.li`
  height: 100%;
  margin-bottom: ${GEL_SPACING_DBL};
  &:last-child {
    margin: 0;
  }
`;

export default PromoItem;

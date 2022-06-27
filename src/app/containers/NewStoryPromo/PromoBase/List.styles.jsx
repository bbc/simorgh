import { GEL_SPACING_DBL } from '#app/legacy/gel-foundations/src/spacings';
import styled from '@emotion/styled';

export const ListItem = styled.li`
  margin-bottom: ${GEL_SPACING_DBL};
  &:last-child {
    margin: 0;
  }
`;
export const OrderedList = styled.ol``;
export const UnorderedList = styled.ul`
  padding: 0;
  list-style: none;
`;

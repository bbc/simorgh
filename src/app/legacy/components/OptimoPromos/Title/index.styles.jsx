import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import styled from '@emotion/styled';

const StyledTitle = styled.span`
  color: ${props => props.theme.palette.GREY_10};
  margin: 0;
  ${({ service }) => getSerifMedium(service)}
`;

export default StyledTitle;

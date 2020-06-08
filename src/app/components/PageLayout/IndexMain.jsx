import styled from 'styled-components';
import IndexMarginStyles from './IndexMarginStyles';

const IndexMain = styled.main.attrs({ role: 'main' })`
  flex-grow: 1;
  ${IndexMarginStyles}
`;

export default IndexMain;

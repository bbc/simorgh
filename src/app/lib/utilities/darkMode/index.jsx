import { createGlobalStyle } from 'styled-components';
import { C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';

export default createGlobalStyle`
#main-wrapper {
  background-color: ${C_MIDNIGHT_BLACK}; /* create a theme provider */
}
`;

import { css } from 'styled-components';
import mediaQuery from '../../helpers/mediaQueries';

// Font styling below is a subset of BBC GEL Typography "Long Primer"
const LONG_PRIMER = css`
  font-size: 0.9375em;
  line-height: 1.125rem;

  ${mediaQuery.laptopAndLarger} {
    font-size: 0.875em;
  }
`;

export default LONG_PRIMER;

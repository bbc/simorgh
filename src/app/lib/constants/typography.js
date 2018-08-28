// Note - this file contains the css for the various typography groups we
// use as defined in the GEL specs. Further details in /src/app/lib/README.md
//
// The typography constants are defined seperately to those in styles.js
// as there are many typography groups and they differ per service meaning
// there is scope for the typography definitions being isolated from the
// other constants

import { css } from 'styled-components';
import mediaQuery from '../../helpers/mediaQueries';

export const T_LONG_PRIMER = css`
  font-size: 0.9375em;
  line-height: 1.125rem;

  ${mediaQuery.laptopAndLarger} {
    font-size: 0.875em;
  }
`;

export const T_BREVIER = css`
  font-size: 0.875em;
  line-height: 1rem;
  ${mediaQuery.smartPhoneOnly} {
    line-height: 1.125rem;
  }
  ${mediaQuery.laptopAndLarger} {
    font-size: 0.8125em;
  }
`;

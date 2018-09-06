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

/* Font styling below is a subset of BBC GEL Typography "Body Copy" */
export const T_BODY_COPY = css`
  font-size: 0.9375em;
  line-height: 1.25rem;
  ${mediaQuery.smartPhoneAndLarger} {
    font-size: 1em;
    line-height: 1.375rem;
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

/* Font styling below is a subset of BBC GEL Typography "Canon" */
export const T_CANON = css`
  font-size: 1.75em;
  line-height: 2rem;
  ${mediaQuery.smartPhoneOnly} {
    font-size: 2em;
    line-height: 2.25rem;
  }
  ${mediaQuery.laptopAndLarger} {
    font-size: 2.75em;
    line-height: 3rem;
  }
`;

/* Font styling below is a subset of BBC GEL Typography "Trafalgar" */
export const T_TRAFALGAR = css`
  font-size: 1.25em;
  line-height: 1.5rem;
  ${mediaQuery.smartPhoneOnly} {
    font-size: 1.5em;
    line-height: 1.75rem;
  }
  ${mediaQuery.laptopAndLarger} {
    font-size: 2em;
    line-height: 2.25rem;
  }
`;

export const T_MINION = css`
  font-size: 0.75em;
  line-height: 1em;
`;

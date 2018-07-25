import styled from 'styled-components';
import { C_EBON, FF_NEWS_SANS_REG } from '../../lib/constants/styles';
import mediaQuery from '../../helpers/mediaQueries';

export const Headline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS_SANS_REG};

  // Font styling below is a subset of BBC GEL Typography "Canon"
  font-size: 1.75em;
  line-height: 2em;
  ${mediaQuery.smartPhoneOnly} {
    font-size: 2em;
    line-height: 2.25em;
  }
  ${mediaQuery.desktopOnly} {
    font-size: 2.75em;
    line-height: 3em;
  }
`;

export const SubHeading = styled.h2`
  // Font styling below is a subset of BBC GEL Typography "Double Pica"
  // The styling provided by Sareh and the GEL typography Double pica don't match :(
  font-size: 1.25em;
  line-height: 1.5em;
  ${mediaQuery.smartPhoneOnly} {
    font-size: 1.5em;
    line-height: 1.75em;
  }
  ${mediaQuery.desktopOnly} {
    font-size: 2em;
    line-height: 2.25em;
  }
`;

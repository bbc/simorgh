import styled from 'styled-components';
import { C_EBON, FF_NEWS_SANS_REG } from '../../lib/constants/styles';
import mediaQuery from '../../helpers/mediaQueries';

const Headline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS_SANS_REG};
  font-size: 1.75em;
  line-height: 2em;
  ${mediaQuery.smartPhoneOnly} {
    font-size: 2em;
    line-height: 2.25em;
  }
  ${mediaQuery.tabletOnly} {
    font-size: 3.25em;
    line-height: 3.5em;
  }
  ${mediaQuery.desktopOnly} {
    font-size: 2.75em;
    line-height: 3em;
  }
`;

export default Headline;

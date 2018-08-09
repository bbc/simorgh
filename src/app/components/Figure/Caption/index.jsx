import styled from 'styled-components';
import {
  FF_NEWS_SANS_REG,
  C_STORM,
  REM_HLF,
} from '../../../lib/constants/styles';
import mediaQuery from '../../../helpers/mediaQueries';

const Caption = styled.figcaption`
  background-color: #d5d0cd;
  color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  padding: ${REM_HLF};

  // Font styling below is a subset of BBC GEL Typography "Long Primer"
  font-size: 0.9375em;
  line-height: 1.125em;
  ${mediaQuery.laptopAndLarger} {
    font-size: 0.875em;
  }
`;

export default Caption;

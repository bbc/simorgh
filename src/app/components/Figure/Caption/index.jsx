import styled from 'styled-components';
import { FF_NEWS_SANS_REG, C_STORM } from '../../../lib/constants/styles';
import mediaQuery from '../../../helpers/mediaQueries';

const Caption = styled.figcaption`
  background-color: #d5d0cd;
  color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  font-size: 0.875em;
  line-height: 1em;
  padding: 8px;
  ${mediaQuery.smartPhone} {
    font-size: 0.875em;
    line-height: 1.125em;
  }
  ${mediaQuery.tablet} {
    font-size: 0.875em;
    line-height: 1.125em;
  }
  ${mediaQuery.desktop} {
    font-size: 0.813em;
    line-height: 1em;
  }
`;

export default Caption;

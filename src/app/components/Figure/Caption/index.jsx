import styled from 'styled-components';
import { C_STORM, C_STONE } from '@bbc/psammead-styles/colours';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';
import { GEL_SPACING, GEL_SPACING_DBL } from '../../../lib/constants/styles';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import mediaQuery from '../../../helpers/mediaQueries';
import { T_LONG_PRIMER } from '../../../lib/constants/typography';

const Caption = styled.figcaption`
  ${T_LONG_PRIMER};
  background-color: ${C_STONE};
  color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  padding: ${GEL_SPACING};
  width: 100%;
  ${mediaQuery.laptopAndLarger} {
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
  }
`;

export default Caption;

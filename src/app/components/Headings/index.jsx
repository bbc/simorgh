import styled from 'styled-components';
import {
  C_EBON,
  C_STORM,
  FF_NEWS_SERIF_MDM,
  FF_NEWS_SANS_REG,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '../../lib/constants/styles';
import { T_CANON, T_TRAFALGAR } from '../../lib/constants/typography';

export const Headline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS_SERIF_MDM};
  margin: 0; /* Reset */
  padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_DBL} 0;
  ${T_CANON};
`;

const regexPunctuationSymbols = /[^a-z0-9\s-]/gi;
const regexSpaces = /\s+/g;

export const SubHeading = styled.h2.attrs({
  id: ({ text }) =>
    text.replace(regexPunctuationSymbols, '').replace(regexSpaces, '-'),
  tabIndex: '-1',
})`
  color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  margin: 0; /* Reset */
  padding: ${GEL_SPACING_DBL} 0;
  font-weight: 400;
  ${T_TRAFALGAR};
`;

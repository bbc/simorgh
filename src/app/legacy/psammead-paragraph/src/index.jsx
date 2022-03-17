import styled from '@emotion/styled';
import { shape, string, bool } from 'prop-types';
import { C_SHADOW, C_LUNAR } from '#legacy/psammead-styles/colours';
import { GEL_SPACING_TRPL } from '#legacy/gel-foundations/spacings';
import { getBodyCopy } from '#legacy/gel-foundations/typography';
import { scriptPropType } from '#legacy/gel-foundations/prop-types';
import { getSansRegular } from '#legacy/psammead-styles/font-styles';

const Paragraph = styled.p`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansRegular(service)}
  color: ${({ darkMode }) => (darkMode ? C_LUNAR : C_SHADOW)};
  padding-bottom: ${GEL_SPACING_TRPL};
  margin: 0; /* Reset */
`;

Paragraph.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  darkMode: bool,
};

Paragraph.defaultProps = {
  darkMode: false,
};

export default Paragraph;

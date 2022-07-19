import styled from '@emotion/styled';
import { oneOf, string, shape } from 'prop-types';
import { C_EBON, C_METAL } from '#legacy/psammead-styles/src/colours';
import { getSansBold } from '#legacy/psammead-styles/src/font-styles';
import { getLongPrimer } from '#legacy/gel-foundations/src/typography';
import { scriptPropType } from '#legacy/gel-foundations/src/prop-types';

const Link = styled.a`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => getSansBold(service)}
  ${({ dir }) =>
    dir === 'rtl' ? 'padding-left: 1rem;' : 'padding-right: 1rem;'}
  color: ${C_EBON};
  text-decoration: none;
  display: inline-block;

  > span {
    margin: 0.8125rem 0;
    display: inline-block;
  }

  &:visited {
    color: ${C_METAL};
  }

  &:focus,
  &:hover > span {
    text-decoration: underline;
  }
`;

Link.propTypes = {
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']).isRequired,
  service: string.isRequired,
};

export default Link;

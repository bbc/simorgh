import styled from '@emotion/styled';
import { oneOf, string, shape } from 'prop-types';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { getLongPrimer } from '#psammead/gel-foundations/src/typography';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';

const Link = styled.a`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => getSansBold(service)}
  ${({ dir }) =>
    dir === 'rtl' ? 'padding-left: 1rem;' : 'padding-right: 1rem;'}
  color: ${props => props.theme.palette.EBON};
  text-decoration: none;
  display: inline-block;
  margin: 0.1875rem 0;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;

  > span {
    display: inline-block;
  }

  &:visited {
    color: ${props => props.theme.palette.METAL};
  }

  &:focus > span,
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

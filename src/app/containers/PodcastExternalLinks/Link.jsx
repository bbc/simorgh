import styled from '@emotion/styled';
import { oneOf, string, shape } from 'prop-types';
import { C_CLOUD_LIGHT, C_EBON, C_METAL } from '@bbc/psammead-styles/colours';
import { getSansBold } from '@bbc/psammead-styles/font-styles';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';

const Link = styled.a`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => getSansBold(service)}
  ${({ dir }) =>
    dir === 'rtl' ? 'padding-left: 1rem' : 'padding-right: 1rem'};
  color: ${C_EBON};
  text-decoration: none;
  display: inline-block;

  &:visited {
    color: ${C_METAL};
  }

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  > span {
    margin: 0.8125rem 0;
    display: inline-block;
  }

  &:not(:first-of-type) > span {
    ${({ dir }) =>
      dir === 'rtl'
        ? `
      padding-right: 1rem;
      border-right: 1px ${C_CLOUD_LIGHT} solid;`
        : `
      padding-left: 1rem;
      border-left: 1px ${C_CLOUD_LIGHT} solid;
      `}
  }
`;

Link.propTypes = {
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']).isRequired,
  service: string.isRequired,
};

export default Link;

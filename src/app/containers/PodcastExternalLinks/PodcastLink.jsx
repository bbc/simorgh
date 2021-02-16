import styled from '@emotion/styled';
import { oneOf, string } from 'prop-types';
import { C_CLOUD_LIGHT, C_EBON, C_METAL } from '@bbc/psammead-styles/colours';
import { getSansBold } from '@bbc/psammead-styles/font-styles';
import { getLongPrimer } from '@bbc/gel-foundations/typography';

const PodcastLink = styled.a`
  ${({ script }) => script && getLongPrimer(script)};
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

  &:not(:first-child) {
    ${({ dir }) =>
      dir === 'rtl'
        ? `
      padding-right: 1rem;
      border-left: 1px ${C_CLOUD_LIGHT} solid;`
        : `
      padding-left: 1rem;
      border-left: 1px ${C_CLOUD_LIGHT} solid;
      `}
  }
`;

PodcastLink.propTypes = {
  script: string.isRequired,
  dir: oneOf(['rtl', 'ltr']).isRequired,
  service: string.isRequired,
};

export default PodcastLink;

import React from 'react';
import { string, bool, shape } from 'prop-types';
import styled from '@emotion/styled';
import {
  C_LUNAR,
  C_SHADOW,
  C_EBON,
  C_METAL,
} from '@bbc/psammead-styles/colours';
import { GEL_SPACING_TRPL, GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getSansRegular, getSansBold } from '@bbc/psammead-styles/font-styles';
import { GEL_BODY_COPY } from '@bbc/gel-foundations/typography';
import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';

const GOLDEN_RATIO_PERCENT = '38.2%';
const BBC_BLOCKS_WIDTH = '10rem';
const FAUX_BBC_BLOCKS_SPACE = '6rem';

const FILL_VIEWPORT_STYLES = `
  background-position: center;
  background-size: ${GOLDEN_RATIO_PERCENT};
  height: 100vh;
`;

const StyledEmbedError = styled.div`
  ${({ service }) => getSansRegular(service)}
  ${GEL_BODY_COPY};
  background-color: ${C_LUNAR};
  background-image: url(data:image/svg+xml;base64,${BBC_BLOCKS});
  background-position: center ${GEL_SPACING_TRPL};
  background-repeat: no-repeat;
  background-size: ${BBC_BLOCKS_WIDTH};
  color: ${C_SHADOW};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: ${FAUX_BBC_BLOCKS_SPACE};
  padding-bottom: ${GEL_SPACING_TRPL};
  border: 0.0625rem solid transparent;
  ${({ fillViewport }) => fillViewport && FILL_VIEWPORT_STYLES}
`;

const StyledErrorMessage = styled.div`
  margin: 0 ${GEL_SPACING_TRPL};

  strong {
    font-weight: normal;
  }

  a {
    ${({ service }) => getSansBold(service)}
    color: ${C_EBON};
    display: block;
    margin-top: ${GEL_SPACING};
    text-decoration: none;

    &:visited {
      color: ${C_METAL};
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const EmbedError = ({ service, message, fillViewport, link }) => (
  <StyledEmbedError service={service} fillViewport={fillViewport}>
    <StyledErrorMessage service={service}>
      <div>
        <strong>{message}</strong>
      </div>
      {link && link.text && link.href && <a href={link.href}>{link.text}</a>}
    </StyledErrorMessage>
  </StyledEmbedError>
);

EmbedError.defaultProps = {
  service: 'news',
  fillViewport: false,
  link: null,
};

EmbedError.propTypes = {
  service: string,
  fillViewport: bool,
  message: string.isRequired,
  link: shape({
    text: string.isRequired,
    href: string.isRequired,
  }),
};

export default EmbedError;

import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING,
} from '#psammead/gel-foundations/src/spacings';
import {
  getSansRegular,
  getSansBold,
} from '#psammead/psammead-styles/src/font-styles';
import { GEL_BODY_COPY } from '#psammead/gel-foundations/src/typography';
import { BBC_BLOCKS } from '#psammead/psammead-assets/src/svgs';

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
  background-color: ${props => props.theme.palette.LUNAR};
  background-image: url(data:image/svg+xml;base64,${BBC_BLOCKS});
  background-position: center ${GEL_SPACING_TRPL};
  background-repeat: no-repeat;
  background-size: ${BBC_BLOCKS_WIDTH};
  color: ${props => props.theme.palette.SHADOW};
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
    color: ${props => props.theme.palette.EBON};
    display: block;
    margin-top: ${GEL_SPACING};
    text-decoration: none;

    &:visited {
      color: ${props => props.theme.palette.METAL};
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const EmbedError = ({
  service = 'news',
  message,
  fillViewport = false,
  link = null,
}) => (
  <StyledEmbedError service={service} fillViewport={fillViewport}>
    <StyledErrorMessage service={service}>
      <div>
        <strong>{message}</strong>
      </div>
      {link && link.text && link.href && <a href={link.href}>{link.text}</a>}
    </StyledErrorMessage>
  </StyledEmbedError>
);

export default EmbedError;

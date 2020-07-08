import React from 'react';
import styled from 'styled-components';
import { shape, string, node } from 'prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/dist/spacings';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const KEYLINE_WIDTH = '0.125rem';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const AmpIframe = ({ children, className, width, height, src }) => (
  <amp-iframe
    class={className}
    width={width}
    height={height}
    layout="responsive"
    sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
    resizable
    src={src}
  >
    {children}
  </amp-iframe>
);

const StyledAmpIframe = styled(AmpIframe)`
  > [overflow] {
    background: linear-gradient(
      0deg,
      #fff 0%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0) 100%
    );
    display: flex;
    justify-content: center;

    &::after {
      background-color: #fff;
      border-top: ${KEYLINE_WIDTH} solid #1380a1;
      content: '';
      display: block;
      height: 50%;
      left: 0;
      position: absolute;
      top: 50%;
      width: 100%;
      z-index: -10;
    }

    button {
      background-color: #1380a1;
      border: none;
      color: #fff;
      cursor: pointer;
      display: block;
      padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
    }
  }
`;

const VjAmp = ({ ampMetadata: { imageWidth, imageHeight, image, src } }) => {
  return (
    <IncludeGrid>
      <StyledAmpIframe width={imageWidth} height={imageHeight} src={src}>
        <div overflow="true">
          <button type="button" aria-label="Show More">
            Show More
          </button>
        </div>
        <amp-img layout="fill" src={image} placeholder />
      </StyledAmpIframe>
    </IncludeGrid>
  );
};

AmpIframe.propTypes = {
  children: node.isRequired,
  width: string.isRequired,
  height: string.isRequired,
  src: string.isRequired,
  className: string.isRequired,
};

VjAmp.propTypes = {
  ampMetadata: shape({
    imageWidth: string.isRequired,
    imageHeight: string.isRequired,
    image: string.isRequired,
    src: string.isRequired,
  }).isRequired,
};

export default VjAmp;

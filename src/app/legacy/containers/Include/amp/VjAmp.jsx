import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { shape, string, node } from 'prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import { C_EBON } from '#psammead/psammead-styles/src/colours';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { GEL_PICA } from '#psammead/gel-foundations/src/typography';
import { Helmet } from 'react-helmet';
import { GridItemMedium } from '#components/Grid';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const KEYLINE_WIDTH = '0.125rem';

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-iframe"
      src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
    />
  </Helmet>
);

const AmpIframe = ({ children, className, width, height, src }) => (
  <amp-iframe
    class={className}
    width={width}
    height={height}
    layout="responsive"
    sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
    resizable=""
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
      border-top: ${KEYLINE_WIDTH} solid ${C_EBON};
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
      ${({ service }) => getSansBold(service)}
      ${GEL_PICA}
      background-color: ${C_EBON};
      border: 0.0625rem solid transparent;
      color: #fff;
      cursor: pointer;
      display: block;
      padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }
`;

const VjAmp = ({ ampMetadata: { imageWidth, imageHeight, image, src } }) => {
  const { service } = useContext(ServiceContext);
  return (
    <>
      <AmpHead />
      <GridItemMedium>
        <StyledAmpIframe
          width={imageWidth}
          height={imageHeight}
          src={src}
          service={service}
        >
          <div overflow="">
            <button type="button">Show more</button>
          </div>
          <amp-img layout="fill" src={image} placeholder />
        </StyledAmpIframe>
      </GridItemMedium>
    </>
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

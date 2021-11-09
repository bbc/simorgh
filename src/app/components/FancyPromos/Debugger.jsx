/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import { getRelativeLuminance, contrastRatioFromLuminances } from './utils';

const Img = styled.img`
  width: 770px;
  display: block;
`;

const StyledSwatch = styled.div`
  display: inline-block;
  width: 110px;
  font-family: sans-serif;
  margin-bottom: 12px;
  strong {
    display: inline-block;
    margin: 10px 0 0 0;
  }
`;

const SwatchSample = styled.div`
  height: 60px;
  background: ${({ colour }) => `rgb(${colour.rgb.join(',')})`};
  color: white;
  text-align: center;
  padding: 0.7rem;
`;

const Title = styled.div`
  margin-top: 5rem;
  margin-bottom: 0.5rem;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
`;

const SwatchInfo = ({ name, colour }) => {
  const [r, g, b] = colour.rgb;
  const relativeLuminance = getRelativeLuminance([r, g, b]);
  const contrastRatio = contrastRatioFromLuminances(relativeLuminance, 1);
  return (
    <>
      <strong>{name}</strong>
      <div>R: {Math.round(r)}</div>
      <div>G: {Math.round(g)}</div>
      <div>B: {Math.round(b)}</div>
      <strong>Relative Luminance</strong>
      <div>{relativeLuminance.toFixed(5)}</div>

      <strong>Contrast Ratio</strong>
      <div style={{ color: contrastRatio < 7 ? 'red' : 'black' }}>
        {contrastRatio.toFixed(5)}
      </div>
    </>
  );
};

const Swatch = ({ name, colour }) => (
  <StyledSwatch>
    <SwatchSample colour={colour}>Sample White Text</SwatchSample>
    <SwatchInfo name={name} colour={colour} />
  </StyledSwatch>
);

const Debugger = ({ image, palette, showImage, children }) => {
  if (!palette) return null;
  return (
    <>
      {children && <Title>{children}</Title>}
      {showImage && <Img src={image} />}
      <div>
        {Object.entries(palette).map(([name, colour]) => (
          <Swatch key={name} name={name} colour={colour} />
        ))}
      </div>
    </>
  );
};

export default Debugger;

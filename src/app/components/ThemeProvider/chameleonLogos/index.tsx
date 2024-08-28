import React from 'react';
import { BrandSVG } from '#models/types/theming';

// Chameleon logos have an additional margin on their viewbox
const buildLogo = ({ width, height, group, viewbox }: BrandSVG) => {
  const margin = 140;

  const croppedWidth = (width || 0) - 2 * margin;
  const croppedHeight = (height || 0) - 2 * margin;

  return {
    group: (
      <g
        fillRule="evenodd"
        stroke="#000"
        strokeWidth=".335"
        style={{ stroke: '#fff' }}
      >
        {group}
      </g>
    ),
    ratio: croppedWidth / croppedHeight,
    viewbox: viewbox || {
      minX: margin,
      minY: margin,
      width: croppedWidth,
      height: croppedHeight,
    },
  };
};

export default buildLogo;

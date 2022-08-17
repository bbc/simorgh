import React from 'react';

// Chameleon logos have an additional margin on their viewbox
const buildLogo = ({ width, height, group, viewbox }) => {
  const margin = 140;

  const croppedWidth = width - 2 * margin;
  const croppedHeight = height - 2 * margin;

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

// Chameleon logos have an additional margin on their viewbox
const buildLogo = ({ width, height, group }) => {
  const margin = 140;

  const croppedWidth = width - 2 * margin;
  const croppedHeight = height - 2 * margin;

  return {
    group,
    ratio: croppedWidth / croppedHeight,
    viewbox: {
      minX: margin,
      minY: margin,
      width: croppedWidth,
      height: croppedHeight,
    },
  };
};

export default buildLogo;

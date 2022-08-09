type ViewBox = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

type Logo = {
  group: JSX.Element;
  ratio: number;
  viewbox: ViewBox;
};

const buildBrandLogo = ({
  width,
  height,
  group,
  viewbox,
}: {
  width: number;
  height: number;
  group: JSX.Element;
  viewbox?: ViewBox;
}): Logo => {
  const margin = 140;

  // Chameleon logos have an additional margin on their viewbox
  const croppedWidth = width - 2 * margin;
  const croppedHeight = height - 2 * margin;

  return {
    group: (
      <g
        fillRule="evenodd" // TODO does this do anything?
        stroke="#000" // TODO is this right?
        strokeWidth=".335" // TODO does this do anything?
        style={{ stroke: '#fff' }} // TODO is this right?
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

export default buildBrandLogo;

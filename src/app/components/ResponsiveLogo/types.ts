import { BrandSVG } from '#app/models/types/theming';

export interface SVGLogoProps {
  group: React.JSX.Element;
  ratio: number;
  viewbox: {
    height?: number;
    width?: number;
    minY?: number;
    minX?: number;
  };
}

export interface ResponsiveLogoProps {
  defaultLogo: BrandSVG;
  // mobileLogo: BrandSVG;
}

export interface BrandPalette {
  BRAND_BACKGROUND: string;
  BRAND_LOGO: string;
}

interface Palette extends BrandPalette {
  ARCHIVE_BLUE: string;
  BLACK: string;
  CLOUD_LIGHT: string;
  CONSENT_ACTION: string;
  CONSENT_BACKGROUND: string;
  CONSENT_CONTENT: string;
  GREY_1: string;
  GREY_10: string;
  GREY_2: string;
  GREY_3: string;
  GREY_4: string;
  GREY_5: string;
  GREY_6: string;
  GREY_7: string;
  GREY_8: string;
  KINGFISHER: string;
  METAL: string;
  NEWSROUND_PURPLE: string;
  NEWS_CORE: string;
  SPORT_SILVER: string;
  SPORT_CORE: string;
  STONE: string;
  WHITE: string;
}

interface MediaQueries {
  GROUP_0_MAX_WIDTH: string;
  GROUP_1_MAX_WIDTH: string;
  GROUP_1_MIN_WIDTH: string;
  GROUP_1_ONLY: string;
  GROUP_2_MAX_WIDTH: string;
  GROUP_2_MIN_WIDTH: string;
  GROUP_2_ONLY: string;
  GROUP_3_MAX_WIDTH: string;
  GROUP_3_MIN_WIDTH: string;
  GROUP_3_ONLY: string;
  GROUP_4_MAX_WIDTH: string;
  GROUP_4_MIN_WIDTH: string;
  GROUP_4_ONLY: string;
  GROUP_5_MIN_WIDTH: string;
  HIGH_CONTRAST: string;
}

interface Spacings {
  HALF: number;
  FULL: number;
  DOUBLE: number;
  TRIPLE: number;
  QUADRUPLE: number;
  QUINTUPLE: number;
  SEXTUPLE: number;
}

export type TypographyScript = {
  atlas: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  elephant: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  imperial: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  royal: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  foolscap: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  canon: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  trafalgar: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  paragon: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  doublePica: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  greatPrimer: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  bodyCopy: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  pica: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  longPrimer: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  brevier: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
  minion: {
    groupA: {
      fontSize: number;
      lineHeight: number;
    };
    groupB: {
      fontSize: number;
      lineHeight: number;
    };
    groupD: {
      fontSize: number;
      lineHeight: number;
    };
  };
};

export type FontVariants = {
  sans: {
    regular: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
    regularItalic?: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
    bold: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
    boldItalic?: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
    light?: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
  };
  serif?: {
    regular: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
    medium: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
    mediumItalic: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
    bold: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
    light: {
      fontFamily: string;
      fontStyle: string;
      fontWeight: number;
    };
  };
};

export interface Typography {
  fontFaces: {
    '@font-face'?: {
      fontFamily: string;
      fontWeight?: number;
      fontStyle?: string;
      src: string;
      fontDisplay: string;
    };
  }[];
  fontVariants: FontVariants;
  script: TypographyScript;
}

export type GelFontSize =
  | 'atlas'
  | 'elephant'
  | 'imperial'
  | 'royal'
  | 'foolscap'
  | 'canon'
  | 'trafalgar'
  | 'paragon'
  | 'doublePica'
  | 'greatPrimer'
  | 'bodyCopy'
  | 'pica'
  | 'longPrimer'
  | 'brevier'
  | 'minion';

type FontSize = {
  [x: string]:
    | string
    | {
        fontSize: string;
        lineHeight: string;
      };
  fontSize: string;
  lineHeight: string;
};

export type FontVariant =
  | 'sansRegular'
  | 'sansRegularItalic'
  | 'sansBold'
  | 'sansBoldItalic'
  | 'sansLight'
  | 'serifRegular'
  | 'serifMedium'
  | 'serifMediumItalic'
  | 'serifBold'
  | 'serifLight';

export type FontStyles = {
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
};

export type BrandSVG = {
  width?: number;
  height?: number;
  group: JSX.Element;
  ratio?: number;
  viewbox?: {
    height?: number;
    width?: number;
    minY?: number;
    minX?: number;
  };
};

export type GridWidths = {
  240: number;
  360: number;
  400: number;
  600: number;
  900: number;
  1008: number;
  1280: number;
};

declare module '@emotion/react' {
  export interface Theme {
    palette: Palette;
    mq: MediaQueries;
    spacings: Spacings;
    fontSizes: {
      atlas: FontSize;
      elephant: FontSize;
      imperial: FontSize;
      royal: FontSize;
      foolscap: FontSize;
      canon: FontSize;
      trafalgar: FontSize;
      paragon: FontSize;
      doublePica: FontSize;
      greatPrimer: FontSize;
      bodyCopy: FontSize;
      pica: FontSize;
      longPrimer: FontSize;
      brevier: FontSize;
      minion: FontSize;
    };
    fontMq: {
      GROUP_A_MAX_WIDTH: string;
      GROUP_B_MAX_WIDTH: string;
      GROUP_B_MIN_WIDTH: string;
      GROUP_B_ONLY: string;
      GROUP_D_MIN_WIDTH: string;
    };
    fontVariants: {
      sansRegular: FontStyles;
      sansRegularItalic: FontStyles;
      sansBold: FontStyles;
      sansBoldItalic: FontStyles;
      sansLight: FontStyles;
      serifRegular: FontStyles;
      serifMedium: FontStyles;
      serifMediumItalic: FontStyles;
      serifBold: FontStyles;
      serifLight: FontStyles;
    };
    brandSVG: BrandSVG;
    gridWidths: GridWidths;
    isDarkUi: boolean;
  }
}

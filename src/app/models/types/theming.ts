import type { JSX } from 'react';

export interface BrandPalette {
  BRAND_BACKGROUND: string;
  BRAND_LOGO: string;
  BRAND_FOREGROUND: string;
  BRAND_HIGHLIGHT: string;
  BRAND_BORDER: string;
}

interface Palette extends BrandPalette {
  ARCHIVE_BLUE: string;
  BLACK: string;
  BLUEJAY: string;
  BLUEJAY_LHT: string;
  CHALK: string;
  CLOUD_DARK: string;
  CLOUD_LIGHT: string;
  CONSENT_ACTION: string;
  CONSENT_BACKGROUND: string;
  CONSENT_CONTENT: string;
  CONSENT_FOCUS: string;
  DARK_SALTIRE: string;
  DIM_GREY: string;
  EBON: string;
  ERROR_CORE: string;
  GHOST: string;
  GREY_10: string;
  GREY_11: string;
  GREY_1: string;
  GREY_2: string;
  GREY_3: string;
  GREY_4: string;
  GREY_5: string;
  GREY_6: string;
  GREY_7: string;
  GREY_8: string;
  KINGFISHER: string;
  LE_TEAL: string;
  LIVE_LIGHT: string;
  LIVE_MEDIUM: string;
  LIVE_DARK: string;
  LIVE_CORE: string;
  LUNAR: string;
  LUNAR_LIGHT: string;
  METAL: string;
  MIDNIGHT_BLACK: string;
  NEWSROUND_PURPLE: string;
  NEWSROUND_PURPLE_30: string;
  OAT_LHT: string;
  ORBIT_GREY: string;
  PEBBLE: string;
  PHILIPPINE_GREY: string;
  POSTBOX: string;
  POSTBOX_30: string;
  RHINO: string;
  SERVICE_NEUTRAL_CORE: string;
  SERVICE_NEUTRAL_DARK: string;
  SHADOW: string;
  SPORT_MIST: string;
  SPORT_SILVER: string;
  SPORT_YELLOW: string;
  SPORT_YELLOW_30: string;
  STONE: string;
  STORM: string;
  SUCCESS_CORE: string;
  WEATHER_BLUE: string;
  WHITE: string;
}

interface MediaQueries {
  /** 239px and below  */
  GROUP_0_MAX_WIDTH: string;
  /** 399px and below  */
  GROUP_1_MAX_WIDTH: string;
  /** 240px and above  */
  GROUP_1_MIN_WIDTH: string;
  /** between 240px and 399px  */
  GROUP_1_ONLY: string;
  /** 599px and below  */
  GROUP_2_MAX_WIDTH: string;
  /** 400px and above  */
  GROUP_2_MIN_WIDTH: string;
  /** between 400px and 599px  */
  GROUP_2_ONLY: string;
  /** between 240px and 599px  */
  GROUP_1_AND_GROUP_2: string;
  /** 1007px and below  */
  GROUP_3_MAX_WIDTH: string;
  /** 600px and above  */
  GROUP_3_MIN_WIDTH: string;
  /** between 600px and 1007px  */
  GROUP_3_ONLY: string;
  /** 1279px and below  */
  GROUP_4_MAX_WIDTH: string;
  /** 1008px and above  */
  GROUP_4_MIN_WIDTH: string;
  /** between 1008px and 1279px  */
  GROUP_4_ONLY: string;
  /** 1280px and abovex  */
  GROUP_5_MIN_WIDTH: string;
  /** @media screen and (forced-colors: active) */
  FORCED_COLOURS: string;
}

interface Spacings {
  /** 0.25rem (4px) */
  HALF: number;
  /** 0.5rem (8px) */
  FULL: number;
  /** 1rem (16px) */
  DOUBLE: number;
  /** 1.5rem (24px) */
  TRIPLE: number;
  /** 2rem (32px) */
  QUADRUPLE: number;
  /** 2.5rem (40px) */
  QUINTUPLE: number;
  /** 3rem (48px) */
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
      /** 319px and below */
      GROUP_A_MAX_WIDTH: string;
      /** 599px and below */
      GROUP_B_MAX_WIDTH: string;
      /** 320px and above */
      GROUP_B_MIN_WIDTH: string;
      /** between 320px and 599px */
      GROUP_B_ONLY: string;
      /** 600px and above */
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
    isLite: boolean;
  }
}

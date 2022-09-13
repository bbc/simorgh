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
  GHOST: string;
  GREY_10: string;
  GREY_11: string;
  GREY_2: string;
  GREY_3: string;
  GREY_5: string;
  GREY_6: string;
  GREY_8: string;
  KINGFISHER: string;
  LE_TEAL: string;
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
  SHADOW: string;
  SPORT_MIST: string;
  SPORT_SILVER: string;
  SPORT_YELLOW: string;
  SPORT_YELLOW_30: string;
  STONE: string;
  STORM: string;
  WEATHER_BLUE: string;
  WHITE: string;
}

interface MediaQueries {
  GROUP_0_MAX_WIDTH: string;
  GROUP_0_MIN_WIDTH: string;
  GROUP_0_ONLY: string;
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
}

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
  fontFamilies: {
    primary: string;
    secondary?: string;
  };
  script: {
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
}

declare module '@emotion/react' {
  export interface Theme {
    palette: Palette;
    mq: MediaQueries;
    spacings: Spacings;
    typography: Typography;
  }
}

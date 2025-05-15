import React, { useContext } from 'react';
import {
  Global,
  ThemeProvider as EmotionThemeProvider,
  Theme,
} from '@emotion/react';
import focusIndicator from './focusIndicator';
import { RequestContext } from '../../contexts/RequestContext';

import {
  ARCHIVE_BLUE,
  BLACK,
  BLUEJAY,
  BLUEJAY_LHT,
  CHALK,
  CLOUD_DARK,
  CLOUD_LIGHT,
  CONSENT_ACTION,
  CONSENT_BACKGROUND,
  CONSENT_CONTENT,
  CONSENT_FOCUS,
  DARK_SALTIRE,
  DIM_GREY,
  EBON,
  ERROR_CORE,
  GHOST,
  GREY_10,
  GREY_11,
  GREY_1,
  GREY_2,
  GREY_3,
  GREY_4,
  GREY_5,
  GREY_6,
  GREY_7,
  GREY_8,
  KINGFISHER,
  LE_TEAL,
  LIVE_LIGHT,
  LIVE_MEDIUM,
  LIVE_DARK,
  LIVE_CORE,
  LUNAR,
  LUNAR_LIGHT,
  METAL,
  MIDNIGHT_BLACK,
  NEWSROUND_PURPLE,
  NEWSROUND_PURPLE_30,
  OAT_LHT,
  ORBIT_GREY,
  PEBBLE,
  PHILIPPINE_GREY,
  POSTBOX,
  POSTBOX_30,
  RHINO,
  SERVICE_NEUTRAL_CORE,
  SERVICE_NEUTRAL_DARK,
  SHADOW,
  SPORT_MIST,
  SPORT_SILVER,
  SPORT_YELLOW,
  SPORT_YELLOW_30,
  STONE,
  STORM,
  SUCCESS_CORE,
  WEATHER_BLUE,
  WHITE,
} from './palette';
import {
  GROUP_0_MAX_WIDTH,
  GROUP_1_MAX_WIDTH,
  GROUP_1_MIN_WIDTH,
  GROUP_1_ONLY,
  GROUP_2_MAX_WIDTH,
  GROUP_2_MIN_WIDTH,
  GROUP_2_ONLY,
  GROUP_1_AND_GROUP_2,
  GROUP_3_MAX_WIDTH,
  GROUP_3_MIN_WIDTH,
  GROUP_3_ONLY,
  GROUP_4_MAX_WIDTH,
  GROUP_4_MIN_WIDTH,
  GROUP_4_ONLY,
  GROUP_5_MIN_WIDTH,
  FORCED_COLOURS,
} from './mediaQueries';
import {
  HALF,
  FULL,
  DOUBLE,
  TRIPLE,
  QUADRUPLE,
  QUINTUPLE,
  SEXTUPLE,
} from './spacings';
import {
  getAtlasSize,
  getElephantSize,
  getImperialSize,
  getRoyalSize,
  getFoolscapSize,
  getCanonSize,
  getTrafalgarSize,
  getParagonSize,
  getDoublePicaSize,
  getGreatPrimerSize,
  getBodyCopySize,
  getPicaSize,
  getLongPrimerSize,
  getBrevierSize,
  getMinionSize,
} from './fontSizes';
import {
  getSansRegular,
  getSansRegularItalic,
  getSansBold,
  getSansBoldItalic,
  getSansLight,
  getSerifRegular,
  getSerifMedium,
  getSerifMediumItalic,
  getSerifBold,
  getSerifLight,
} from './fontVariants';
import {
  GROUP_A_MAX_WIDTH,
  GROUP_B_MAX_WIDTH,
  GROUP_B_MIN_WIDTH,
  GROUP_B_ONLY,
  GROUP_D_MIN_WIDTH,
} from './fontMediaQueries';

import gridWidths from './gridWidths';

import { MEDIA_ARTICLE_PAGE, TV_PAGE } from '../../routes/utils/pageTypes';
import { BrandPalette, Typography, BrandSVG } from '../../models/types/theming';
import { PageTypes } from '../../models/types/global';

const isDarkUiPage = (pageType: PageTypes) =>
  pageType === MEDIA_ARTICLE_PAGE || pageType === TV_PAGE;

type Props = {
  children: React.ReactNode;
};

const withThemeProvider = ({
  typography,
  palette: brandPalette,
  brandSVG,
}: {
  palette: BrandPalette;
  typography: Typography;
  brandSVG: BrandSVG;
}) => {
  const { fontVariants, fontFaces, script } = typography;
  const {
    BRAND_BACKGROUND,
    BRAND_LOGO,
    BRAND_FOREGROUND,
    BRAND_HIGHLIGHT,
    BRAND_BORDER,
  } = brandPalette;
  const themeConfig: Theme = {
    fontSizes: {
      atlas: getAtlasSize(script),
      elephant: getElephantSize(script),
      imperial: getImperialSize(script),
      royal: getRoyalSize(script),
      foolscap: getFoolscapSize(script),
      canon: getCanonSize(script),
      trafalgar: getTrafalgarSize(script),
      paragon: getParagonSize(script),
      doublePica: getDoublePicaSize(script),
      greatPrimer: getGreatPrimerSize(script),
      bodyCopy: getBodyCopySize(script),
      pica: getPicaSize(script),
      longPrimer: getLongPrimerSize(script),
      brevier: getBrevierSize(script),
      minion: getMinionSize(script),
    },
    fontVariants: {
      sansRegular: getSansRegular(fontVariants),
      sansRegularItalic: getSansRegularItalic(fontVariants),
      sansBold: getSansBold(fontVariants),
      sansBoldItalic: getSansBoldItalic(fontVariants),
      sansLight: getSansLight(fontVariants),
      serifRegular: getSerifRegular(fontVariants),
      serifMedium: getSerifMedium(fontVariants),
      serifMediumItalic: getSerifMediumItalic(fontVariants),
      serifBold: getSerifBold(fontVariants),
      serifLight: getSerifLight(fontVariants),
    },
    fontMq: {
      GROUP_A_MAX_WIDTH,
      GROUP_B_MAX_WIDTH,
      GROUP_B_MIN_WIDTH,
      GROUP_B_ONLY,
      GROUP_D_MIN_WIDTH,
    },
    mq: {
      GROUP_0_MAX_WIDTH,
      GROUP_1_MAX_WIDTH,
      GROUP_1_MIN_WIDTH,
      GROUP_1_ONLY,
      GROUP_2_MAX_WIDTH,
      GROUP_2_MIN_WIDTH,
      GROUP_2_ONLY,
      GROUP_1_AND_GROUP_2,
      GROUP_3_MAX_WIDTH,
      GROUP_3_MIN_WIDTH,
      GROUP_3_ONLY,
      GROUP_4_MAX_WIDTH,
      GROUP_4_MIN_WIDTH,
      GROUP_4_ONLY,
      GROUP_5_MIN_WIDTH,
      FORCED_COLOURS,
    },
    palette: {
      ARCHIVE_BLUE,
      BLACK,
      BLUEJAY,
      BLUEJAY_LHT,
      CHALK,
      CLOUD_DARK,
      CLOUD_LIGHT,
      CONSENT_ACTION,
      CONSENT_BACKGROUND,
      CONSENT_CONTENT,
      CONSENT_FOCUS,
      DARK_SALTIRE,
      DIM_GREY,
      EBON,
      ERROR_CORE,
      GHOST,
      GREY_10,
      GREY_11,
      GREY_1,
      GREY_2,
      GREY_3,
      GREY_4,
      GREY_5,
      GREY_6,
      GREY_7,
      GREY_8,
      KINGFISHER,
      LE_TEAL,
      LIVE_LIGHT,
      LIVE_MEDIUM,
      LIVE_DARK,
      LIVE_CORE,
      LUNAR,
      LUNAR_LIGHT,
      METAL,
      MIDNIGHT_BLACK,
      NEWSROUND_PURPLE,
      NEWSROUND_PURPLE_30,
      OAT_LHT,
      ORBIT_GREY,
      PEBBLE,
      PHILIPPINE_GREY,
      POSTBOX,
      POSTBOX_30,
      RHINO,
      SERVICE_NEUTRAL_CORE,
      SERVICE_NEUTRAL_DARK,
      SHADOW,
      SPORT_MIST,
      SPORT_SILVER,
      SPORT_YELLOW,
      SPORT_YELLOW_30,
      STONE,
      STORM,
      SUCCESS_CORE,
      WEATHER_BLUE,
      WHITE,
      BRAND_BACKGROUND,
      BRAND_LOGO,
      BRAND_FOREGROUND,
      BRAND_HIGHLIGHT,
      BRAND_BORDER,
    },
    spacings: {
      HALF,
      FULL,
      DOUBLE,
      TRIPLE,
      QUADRUPLE,
      QUINTUPLE,
      SEXTUPLE,
    },
    brandSVG,
    gridWidths,
    isDarkUi: false,
    isLite: false,
  };

  const ThemeProvider: React.FC<Props> = ({ children }) => {
    const { isAmp, isLite, pageType } = useContext(RequestContext);

    const theme = {
      ...themeConfig,
      isDarkUi: isDarkUiPage(pageType),
      isLite,
    };

    return (
      <EmotionThemeProvider theme={theme}>
        {children}
        {isAmp && <Global styles={fontFaces} />}
        <Global styles={focusIndicator} />
      </EmotionThemeProvider>
    );
  };

  return ThemeProvider;
};

export default withThemeProvider;

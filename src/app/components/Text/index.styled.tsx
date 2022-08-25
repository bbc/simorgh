import { css, Theme } from '@emotion/react';

import pixelsToRem from '../../utilities/pixelsToRem';

/* 
   Screen sizes for GEL Typography
   These namings are based on the GEL description. They are also known as group A, group B and group D
   Link to relevant GEL docs: http://www.bbc.co.uk/gel/guidelines/typography#type-sizes
*/

const GROUP_B_MIN_WIDTH_BP = pixelsToRem(320);
const GROUP_C_MIN_WIDTH_BP = pixelsToRem(600);

const GROUP_B_MIN_WIDTH_MQ = `@media (min-width: ${GROUP_B_MIN_WIDTH_BP}rem)`;
const GROUP_D_MIN_WIDTH_MQ = `@media (min-width: ${GROUP_C_MIN_WIDTH_BP}rem)`;

export const getBaseStyles = ({ palette }: Theme) =>
  css({
    color: palette.GREY_10,
  });

export const getAtlasSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.atlas.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(typography.script.atlas.groupA.lineHeight)}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.atlas.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.atlas.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.atlas.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.atlas.groupD.lineHeight,
      )}rem`,
    },
  });

export const getElephantSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.elephant.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.elephant.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.elephant.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.elephant.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.elephant.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.elephant.groupD.lineHeight,
      )}rem`,
    },
  });

export const getImperialSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.imperial.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.imperial.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.imperial.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.imperial.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.imperial.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.imperial.groupD.lineHeight,
      )}rem`,
    },
  });

export const getRoyalSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.royal.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(typography.script.royal.groupA.lineHeight)}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.royal.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.royal.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.royal.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.royal.groupD.lineHeight,
      )}rem`,
    },
  });

export const getFoolscapSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.foolscap.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.foolscap.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.foolscap.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.foolscap.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.foolscap.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.foolscap.groupD.lineHeight,
      )}rem`,
    },
  });

export const getCanonSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.canon.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(typography.script.canon.groupA.lineHeight)}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.canon.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.canon.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.canon.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.canon.groupD.lineHeight,
      )}rem`,
    },
  });

export const getTrafalgarSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.trafalgar.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.trafalgar.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(
        typography.script.trafalgar.groupB.fontSize,
      )}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.trafalgar.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(
        typography.script.trafalgar.groupD.fontSize,
      )}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.trafalgar.groupD.lineHeight,
      )}rem`,
    },
  });

export const getParagonSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.paragon.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.paragon.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.paragon.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.paragon.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.paragon.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.paragon.groupD.lineHeight,
      )}rem`,
    },
  });

export const getDoublePicaSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.doublePica.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.doublePica.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(
        typography.script.doublePica.groupB.fontSize,
      )}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.doublePica.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(
        typography.script.doublePica.groupD.fontSize,
      )}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.doublePica.groupD.lineHeight,
      )}rem`,
    },
  });

export const getGreatPrimerSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(
      typography.script.greatPrimer.groupA.fontSize,
    )}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.greatPrimer.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(
        typography.script.greatPrimer.groupB.fontSize,
      )}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.greatPrimer.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(
        typography.script.greatPrimer.groupD.fontSize,
      )}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.greatPrimer.groupD.lineHeight,
      )}rem`,
    },
  });

export const getBodyCopySize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.bodyCopy.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.bodyCopy.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.bodyCopy.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.bodyCopy.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.bodyCopy.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.bodyCopy.groupD.lineHeight,
      )}rem`,
    },
  });

export const getPicaSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.pica.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(typography.script.pica.groupA.lineHeight)}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.pica.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(typography.script.pica.groupB.lineHeight)}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.pica.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(typography.script.pica.groupD.lineHeight)}rem`,
    },
  });

export const getLongPrimerSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.longPrimer.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.longPrimer.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(
        typography.script.longPrimer.groupB.fontSize,
      )}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.longPrimer.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(
        typography.script.longPrimer.groupD.fontSize,
      )}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.longPrimer.groupD.lineHeight,
      )}rem`,
    },
  });

export const getBrevierSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.brevier.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(
      typography.script.brevier.groupA.lineHeight,
    )}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.brevier.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.brevier.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.brevier.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.brevier.groupD.lineHeight,
      )}rem`,
    },
  });

export const getMinionSize = ({ typography }: Theme) =>
  css({
    fontSize: `${pixelsToRem(typography.script.minion.groupA.fontSize)}rem`,
    lineHeight: `${pixelsToRem(typography.script.minion.groupA.lineHeight)}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.minion.groupB.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.minion.groupB.lineHeight,
      )}rem`,
    },

    [GROUP_D_MIN_WIDTH_MQ]: {
      fontSize: `${pixelsToRem(typography.script.minion.groupD.fontSize)}rem`,
      lineHeight: `${pixelsToRem(
        typography.script.minion.groupD.lineHeight,
      )}rem`,
    },
  });

export const getSansRegular = (theme: Theme) =>
  theme.typography.fontVariants.sans.regular;

export const getSansRegularItalic = (theme: Theme) => {
  const { regularItalic, regular } = theme.typography.fontVariants.sans;

  return regularItalic || regular;
};

export const getSansBold = (theme: Theme) => {
  const { bold, regular } = theme.typography.fontVariants.sans;

  return bold || regular;
};

export const getSansBoldItalic = (theme: Theme) =>
  theme.typography.fontVariants.sans.boldItalic || getSansBold(theme);

export const getSansLight = (theme: Theme) =>
  theme.typography.fontVariants.sans.light || getSansRegular(theme);

export const getSerifRegular = (theme: Theme) =>
  theme.typography.fontVariants.serif?.medium || getSansRegular(theme);

export const getSerifMedium = (theme: Theme) =>
  theme.typography.fontVariants.serif?.medium || getSansBold(theme);

export const getSerifMediumItalic = (theme: Theme) =>
  theme.typography.fontVariants.serif?.mediumItalic || getSansBoldItalic(theme);

export const getSerifBold = (theme: Theme) =>
  theme.typography.fontVariants.serif?.bold || getSansBold(theme);

export const getSerifLight = (theme: Theme) =>
  theme.typography.fontVariants.serif?.light || getSerifRegular(theme);

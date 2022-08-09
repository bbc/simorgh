import { css, Theme, SerializedStyles } from '@emotion/react';

import pixelsToRem from '../../utilities/pixelsToRem';

/* 
   Screen sizes for GEL Typography
   These namings are based on the GEL description. They are also known as group A, group B and group D
   Link to relevant GEL docs: http://www.bbc.co.uk/gel/guidelines/typography#type-sizes
*/

const GROUP_B_MIN_WIDTH_BP = pixelsToRem(320);
const GROUP_C_MIN_WIDTH_BP = pixelsToRem(600);

const GROUP_B_MIN_WIDTH_MQ = `@media (min-width: ${GROUP_B_MIN_WIDTH_BP}rem)`;
const GROUP_C_MIN_WIDTH_MQ = `@media (min-width: ${GROUP_C_MIN_WIDTH_BP}rem)`;

export const baseStyles = ({ colours }: Theme): SerializedStyles =>
  css({
    color: colours.BLACK,
  });

export const primaryFontFamilyStyles = ({
  typography,
}: Theme): SerializedStyles =>
  css({
    fontFamily: typography.fontFamilyVariants.primary,
  });

export const secondaryFontFamilyStyles = ({
  typography,
}: Theme): SerializedStyles =>
  css({
    fontFamily: typography.fontFamilyVariants.secondary,
  });

export const atlasStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.atlas.groupA.fontSize}rem`,
    lineHeight: `${typography.script.atlas.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.atlas.groupB.fontSize}rem`,
      lineHeight: `${typography.script.atlas.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.atlas.groupD.fontSize}rem`,
      lineHeight: `${typography.script.atlas.groupD.lineHeight}rem`,
    },
  });

export const elephantStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.elephant.groupA.fontSize}rem`,
    lineHeight: `${typography.script.elephant.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.elephant.groupB.fontSize}rem`,
      lineHeight: `${typography.script.elephant.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.elephant.groupD.fontSize}rem`,
      lineHeight: `${typography.script.elephant.groupD.lineHeight}rem`,
    },
  });

export const imperialStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.imperial.groupA.fontSize}rem`,
    lineHeight: `${typography.script.imperial.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.imperial.groupB.fontSize}rem`,
      lineHeight: `${typography.script.imperial.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.imperial.groupD.fontSize}rem`,
      lineHeight: `${typography.script.imperial.groupD.lineHeight}rem`,
    },
  });

export const royalStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.royal.groupA.fontSize}rem`,
    lineHeight: `${typography.script.royal.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.royal.groupB.fontSize}rem`,
      lineHeight: `${typography.script.royal.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.royal.groupD.fontSize}rem`,
      lineHeight: `${typography.script.royal.groupD.lineHeight}rem`,
    },
  });

export const foolscapStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.foolscap.groupA.fontSize}rem`,
    lineHeight: `${typography.script.foolscap.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.foolscap.groupB.fontSize}rem`,
      lineHeight: `${typography.script.foolscap.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.foolscap.groupD.fontSize}rem`,
      lineHeight: `${typography.script.foolscap.groupD.lineHeight}rem`,
    },
  });

export const canonStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.canon.groupA.fontSize}rem`,
    lineHeight: `${typography.script.canon.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.canon.groupB.fontSize}rem`,
      lineHeight: `${typography.script.canon.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.canon.groupD.fontSize}rem`,
      lineHeight: `${typography.script.canon.groupD.lineHeight}rem`,
    },
  });

export const trafalgarStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.trafalgar.groupA.fontSize}rem`,
    lineHeight: `${typography.script.trafalgar.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.trafalgar.groupB.fontSize}rem`,
      lineHeight: `${typography.script.trafalgar.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.trafalgar.groupD.fontSize}rem`,
      lineHeight: `${typography.script.trafalgar.groupD.lineHeight}rem`,
    },
  });

export const paragonStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.paragon.groupA.fontSize}rem`,
    lineHeight: `${typography.script.paragon.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.paragon.groupB.fontSize}rem`,
      lineHeight: `${typography.script.paragon.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.paragon.groupD.fontSize}rem`,
      lineHeight: `${typography.script.paragon.groupD.lineHeight}rem`,
    },
  });

export const doublePicaStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.doublePica.groupA.fontSize}rem`,
    lineHeight: `${typography.script.doublePica.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.doublePica.groupB.fontSize}rem`,
      lineHeight: `${typography.script.doublePica.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.doublePica.groupD.fontSize}rem`,
      lineHeight: `${typography.script.doublePica.groupD.lineHeight}rem`,
    },
  });

export const greatPrimerStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.greatPrimer.groupA.fontSize}rem`,
    lineHeight: `${typography.script.greatPrimer.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.greatPrimer.groupB.fontSize}rem`,
      lineHeight: `${typography.script.greatPrimer.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.greatPrimer.groupD.fontSize}rem`,
      lineHeight: `${typography.script.greatPrimer.groupD.lineHeight}rem`,
    },
  });

export const bodyCopyStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.bodyCopy.groupA.fontSize}rem`,
    lineHeight: `${typography.script.bodyCopy.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.bodyCopy.groupB.fontSize}rem`,
      lineHeight: `${typography.script.bodyCopy.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.bodyCopy.groupD.fontSize}rem`,
      lineHeight: `${typography.script.bodyCopy.groupD.lineHeight}rem`,
    },
  });

export const picaStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.pica.groupA.fontSize}rem`,
    lineHeight: `${typography.script.pica.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.pica.groupB.fontSize}rem`,
      lineHeight: `${typography.script.pica.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.pica.groupD.fontSize}rem`,
      lineHeight: `${typography.script.pica.groupD.lineHeight}rem`,
    },
  });

export const longPrimerStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.longPrimer.groupA.fontSize}rem`,
    lineHeight: `${typography.script.longPrimer.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.longPrimer.groupB.fontSize}rem`,
      lineHeight: `${typography.script.longPrimer.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.longPrimer.groupD.fontSize}rem`,
      lineHeight: `${typography.script.longPrimer.groupD.lineHeight}rem`,
    },
  });

export const brevierStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.brevier.groupA.fontSize}rem`,
    lineHeight: `${typography.script.brevier.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.brevier.groupB.fontSize}rem`,
      lineHeight: `${typography.script.brevier.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.brevier.groupD.fontSize}rem`,
      lineHeight: `${typography.script.brevier.groupD.lineHeight}rem`,
    },
  });

export const minionStyles = ({ typography }: Theme): SerializedStyles =>
  css({
    fontSize: `${typography.script.minion.groupA.fontSize}rem`,
    lineHeight: `${typography.script.minion.groupA.lineHeight}rem`,

    [GROUP_B_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.minion.groupB.fontSize}rem`,
      lineHeight: `${typography.script.minion.groupB.lineHeight}rem`,
    },

    [GROUP_C_MIN_WIDTH_MQ]: {
      fontSize: `${typography.script.minion.groupD.fontSize}rem`,
      lineHeight: `${typography.script.minion.groupD.lineHeight}rem`,
    },
  });

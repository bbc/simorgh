import { css, Theme } from '@emotion/react';

const GEL_SPACING_DEC = '5rem';
const BGC_TRANSITION_DURATION = '300ms';

const styles = {
  button: ({ palette, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.minion,
      ...fontVariants.sansBold,
      backgroundColor: palette.EBON,
      border: 'none',
      color: palette.WHITE,
      cursor: 'pointer',
      display: 'block',
      height: GEL_SPACING_DEC,
      width: GEL_SPACING_DEC,
      padding: 0,
      transition: `background-color ${BGC_TRANSITION_DURATION}`,
      '&:hover, &:focus': {
        backgroundColor: palette.POSTBOX,
        transition: `background-color ${BGC_TRANSITION_DURATION}`,
      },
    }),
  iconWrapper: ({ palette, spacings }: Theme) =>
    css({
      '> svg': {
        color: palette.WHITE,
        fill: 'currentColor',
        height: `${spacings.TRIPLE}rem`,
        width: `${spacings.TRIPLE}rem`,
      },
    }),
  iconWrapperWithDate: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.FULL}rem`,
    }),
  timeDuration: ({ spacings }: Theme) =>
    css({
      display: 'block',
      marginTop: `${spacings.FULL}rem`,
    }),
};
export default styles;

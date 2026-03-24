import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export const HIDDEN_CLASS_NAME = 'si-nav-scrollable-hidden';

export const MAX_NAV_ITEM_HEIGHT = 44;

export default {
  brandDivider: ({ palette }: Theme) =>
    css({
      position: 'relative',
      width: '100%',
      margin: '0 auto',
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.POSTBOX}`,
      opacity: 0.7,
    }),
  bottomDivider: ({ palette }: Theme) =>
    css({
      position: 'relative',
      // ::after breaks out of the constrained navWrapper to span the full viewport,
      // using the same centre-overflow trick as the POSTBOX topRow background.
      '&::after': {
        content: "''",
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      },
    }),
  navStack: css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  topRow: ({ palette }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 0,

      '&::before': {
        content: "''",
        position: 'absolute',
        zIndex: -1,
        top: 0,
        bottom: 0,
        width: '100vw',
        left: '50%',
        transform: 'translateX(-50%)',
        background: palette.POSTBOX,
        pointerEvents: 'none' /* ensure it never interferes with clicks */,
      },
    }),
  lowerNavWrapper: css({
    width: '100%',
    position: 'relative',
    zIndex: 1,
  }),
};

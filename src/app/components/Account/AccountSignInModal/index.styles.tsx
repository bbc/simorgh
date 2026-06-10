import { Theme, css } from '@emotion/react';
import {
  GROUP_A_MAX_WIDTH,
  GROUP_B_MIN_WIDTH,
  GROUP_B_ONLY,
} from '#app/components/ThemeProvider/fontMediaQueries';
import {
  GROUP_3_ONLY,
  GROUP_4_MIN_WIDTH,
} from '#app/components/ThemeProvider/mediaQueries';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  modal: css({
    position: 'fixed',
    inset: 0,
    zIndex: 2147483647,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  backdrop: css({
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    backdropFilter: 'blur(0.2rem)',
    zIndex: 0,
  }),

  modalContent: ({ palette }: Theme) =>
    css({
      position: 'relative',
      zIndex: 1,
      width: `${pixelsToRem(288)}rem`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(to bottom left, ${palette.POSTBOX} 0%, ${palette.BLACK} 50%, ${palette.POSTBOX} 100%)`,
      // 0px - 319px
      [GROUP_A_MAX_WIDTH]: {
        width: `${pixelsToRem(222)}rem`,
      },
      // 320px - 599px
      [GROUP_B_ONLY]: {
        width: `${pixelsToRem(288)}rem`,
      },
      // 600px - 1007px
      [GROUP_3_ONLY]: {
        width: `${pixelsToRem(510)}rem`,
      },
      // 1008px and above
      [GROUP_4_MIN_WIDTH]: {
        width: `${pixelsToRem(792)}rem`,
        minHeight: `${pixelsToRem(488)}rem`,
      },
    }),

  promotionalBannerOverrides: {
    banner: css({
      background: 'transparent',
    }),

    content: ({ spacings }: Theme) =>
      css({
        alignItems: 'center',
        textAlign: 'center',
        paddingInlineStart: '1rem',
        paddingInlineEnd: '1rem',
        paddingBottom: `${pixelsToRem(20)}rem`,
        // 0px - 319px
        [GROUP_A_MAX_WIDTH]: {
          paddingInlineStart: `${spacings.FULL}rem`,
          paddingInlineEnd: `${spacings.FULL}rem`,
          paddingBottom: `${pixelsToRem(20)}rem`,
        },
        // 600px - 1007px
        [GROUP_3_ONLY]: {
          paddingInlineStart: `${pixelsToRem(56)}rem`,
          paddingInlineEnd: `${pixelsToRem(56)}rem`,
          paddingBottom: `${pixelsToRem(24)}rem`,
        },
        // 1008px and above
        [GROUP_4_MIN_WIDTH]: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'start',
          textAlign: 'start',
          paddingTop: `${pixelsToRem(44)}rem`,
          paddingInlineStart: `${pixelsToRem(48)}rem`,
          paddingInlineEnd: `${pixelsToRem(48)}rem`,
          paddingBottom: 0,
        },
      }),

    textContainer: css({
      width: '100%',
      // 1008px and above
      [GROUP_4_MIN_WIDTH]: {
        gridColumn: 1,
        gridRow: 1,
        width: '100%',
      },
    }),

    title: ({ fontSizes }: Theme) =>
      css({
        // 0px - 319px
        [GROUP_A_MAX_WIDTH]: {
          marginTop: `${pixelsToRem(16)}rem`,
          paddingTop: `${pixelsToRem(20)}rem`,
          ...fontSizes.trafalgar,
        },
        // 320px - 599px
        [GROUP_B_ONLY]: {
          marginTop: 0,
          paddingTop: 0,
        },
        // 1008px and above
        [GROUP_4_MIN_WIDTH]: {
          marginTop: `${pixelsToRem(36)}rem`,
          paddingTop: 0,
        },
      }),

    description: ({ fontSizes }: Theme) =>
      css({
        // 0px - 319px
        [GROUP_A_MAX_WIDTH]: {
          ...fontSizes.longPrimer,
          paddingTop: `${pixelsToRem(6)}rem`,
        },
        // 320px - 599px
        [GROUP_B_ONLY]: {
          paddingTop: `${pixelsToRem(16)}rem`,
          marginTop: 0,
        },
        // 600px - 1007px
        [GROUP_3_ONLY]: {
          paddingTop: `${pixelsToRem(16)}rem`,
          marginTop: 0,
        },
        // 1008px and above
        [GROUP_4_MIN_WIDTH]: {
          paddingTop: `${pixelsToRem(16)}rem`,
          marginTop: 0,
        },
      }),

    actionsContainer: css({
      // 0px - 319px
      [GROUP_A_MAX_WIDTH]: {
        marginTop: `${pixelsToRem(20)}rem`,
      },
      // 320px - 599px
      [GROUP_B_ONLY]: {
        marginTop: `${pixelsToRem(32)}rem`,
      },
      // 600px - 1007px
      [GROUP_3_ONLY]: {
        marginTop: `${pixelsToRem(32)}rem`,
      },
      // 1008px and above
      [GROUP_4_MIN_WIDTH]: {
        gridRow: 2,
        width: '100%',
        marginTop: 0,
        paddingBottom: 0,
      },
    }),

    closeButton: css({
      display: 'none',
    }),

    signInImage: css({
      display: 'none',
      // 320px and above
      [GROUP_B_MIN_WIDTH]: {
        display: 'block',
      },
      // 320px - 599px
      [GROUP_B_ONLY]: {
        marginBottom: `${pixelsToRem(20)}rem`,
        marginTop: `${pixelsToRem(16)}rem`,
        width: '100%',
        aspectRatio: '256 / 242',
        backgroundImage: 'var(--sign-in-image-mobile)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      // 600px - 1007px
      [GROUP_3_ONLY]: {
        marginBottom: `${pixelsToRem(24)}rem`,
        marginTop: `${pixelsToRem(16)}rem`,
        display: 'block',
        width: '100%',
        aspectRatio: '395 / 328',
        backgroundImage: 'var(--sign-in-image-tablet)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      // 1008px and above
      [GROUP_4_MIN_WIDTH]: {
        gridColumn: 2,
        gridRow: '1 / span 2',
        display: 'block',
        width: '100%',
        marginTop: `${pixelsToRem(36)}rem`,
        alignSelf: 'start',
        aspectRatio: '274 / 400;',
        backgroundImage: 'var(--sign-in-image-desktop)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
    }),
  },

  closeButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(4)}rem`,
      insetInlineEnd: `${pixelsToRem(4)}rem`,
      background: 'none',
      border: 'none',
      color: palette.WHITE,
      fill: palette.WHITE,
      cursor: 'pointer',
      zIndex: 2,
      width: `${pixelsToRem(38)}rem`,
      height: `${pixelsToRem(38)}rem`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
};

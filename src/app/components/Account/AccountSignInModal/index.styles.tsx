import { Theme, css } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const {
  SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
} = getEnvConfig();
const imagesPath = `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images`;

export default {
  bodyOverflowHidden: () =>
    css({
      body: {
        overflow: 'hidden',
      },
    }),

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

  modalContainer: ({ palette, mq, spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      zIndex: 1,
      overflow: 'hidden',
      background: `linear-gradient(to bottom left, ${palette.POSTBOX} 0%, ${palette.BLACK} 50%, ${palette.POSTBOX} 100%)`,
      paddingTop: `${spacings.DOUBLE}rem`,
      paddingBottom: `${pixelsToRem(20)}rem`,
      paddingInline: `${spacings.DOUBLE}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        width: `${pixelsToRem(288)}rem`,
        paddingTop: `${spacings.QUADRUPLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(510)}rem`,
        paddingTop: `${pixelsToRem(46)}rem`,
        paddingInline: `${pixelsToRem(56)}rem`,
        paddingBottom: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        width: `${pixelsToRem(792)}rem`,
        minHeight: `${pixelsToRem(488)}rem`,
        flexDirection: 'row',
        alignItems: 'stretch',
        textAlign: 'start',
        paddingTop: `${pixelsToRem(44)}rem`,
        paddingBottom: 0,
      },
    }),

  textSection: ({ spacings, mq }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingBottom: `${spacings.TRIPLE}rem`,
      },
    }),

  title: ({ palette, spacings, mq }: Theme) =>
    css({
      color: palette.WHITE,
      margin: 0,
      marginTop: `${pixelsToRem(30)}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        marginTop: `${pixelsToRem(20)}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginTop: `${pixelsToRem(80)}rem`,
      },
    }),

  description: ({ palette, spacings, mq }: Theme) =>
    css({
      color: palette.GREY_2,
      paddingTop: `${spacings.FULL}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        paddingTop: `${spacings.DOUBLE}rem`,
      },
    }),

  actionsContainer: ({ spacings, mq }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: `${spacings.FULL}rem`,
      marginTop: `${pixelsToRem(20)}rem`,
      justifyContent: 'center',
      [mq.GROUP_1_MIN_WIDTH]: {
        marginTop: `${spacings.QUADRUPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        justifyContent: 'flex-start',
      },
    }),

  closeButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(6)}rem`,
      insetInlineEnd: `${pixelsToRem(6)}rem`,
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${pixelsToRem(44)}rem`,
      height: `${pixelsToRem(44)}rem`,
      color: palette.WHITE,
      '&:hover, &:focus': {
        outlineOffset: `${pixelsToRem(2)}rem`,
        backgroundColor: palette.POSTBOX,
        fill: palette.WHITE,
        color: palette.WHITE,
      },
    }),

  closeButtonIcon: ({ mq, palette }: Theme) =>
    css({
      position: 'absolute',
      color: palette.WHITE,
      fill: 'currentColor',
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      [mq.FORCED_COLOURS]: {
        forcedColorAdjust: 'none',
        color: 'ButtonText',
        fill: 'ButtonText',
      },
    }),

  imageSection: ({ mq }: Theme) =>
    css({
      display: 'none',
      [mq.GROUP_1_MIN_WIDTH]: {
        display: 'block',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        aspectRatio: '256 / 242',
        backgroundImage: `url(${imagesPath}/news_mobile_image.webp)`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        aspectRatio: '395 / 328',
        backgroundImage: `url(${imagesPath}/news_tablet_image.webp)`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        order: 1,
        alignSelf: 'flex-end',
        aspectRatio: '680 / 802',
        backgroundImage: `url(${imagesPath}/news_desktop_image.webp)`,
      },
    }),
};

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

  modalContent: ({ palette, mq }: Theme) =>
    css({
      position: 'relative',
      zIndex: 1,
      width: 'auto',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(to bottom left, ${palette.POSTBOX} 0%, ${palette.BLACK} 50%, ${palette.POSTBOX} 100%)`,
      [mq.GROUP_1_MIN_WIDTH]: {
        width: `${pixelsToRem(288)}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(510)}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        width: `${pixelsToRem(792)}rem`,
        minHeight: `${pixelsToRem(488)}rem`,
      },
    }),

  closeButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(6)}rem`,
      insetInlineEnd: `${pixelsToRem(6)}rem`,
      background: 'none',
      border: 'none',
      color: palette.WHITE,
      fill: palette.WHITE,
      cursor: 'pointer',
      zIndex: 2,
      width: `${pixelsToRem(44)}rem`,
      height: `${pixelsToRem(44)}rem`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // TBC
      '&:hover, &:focus': {
        backgroundColor: palette.POSTBOX,
      },
    }),

  banner: css({
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    width: '100%',
  }),

  innerContainer: css({
    width: '100%',
    position: 'relative',
    maxWidth: `${pixelsToRem(1008)}rem`,
  }),

  content: ({ spacings, mq }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: `${spacings.DOUBLE}rem`,
      paddingBottom: `${pixelsToRem(20)}rem`,
      paddingInline: `${spacings.DOUBLE}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        paddingTop: `${spacings.QUADRUPLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingTop: `${pixelsToRem(46)}rem`,
        paddingInline: `${spacings.SEXTUPLE}rem`,
        paddingBottom: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'start',
        textAlign: 'start',
        paddingTop: `${pixelsToRem(44)}rem`,
        paddingBottom: `${spacings.QUADRUPLE}rem`,
      },
    }),

  textContainer: ({ mq }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: 1,
        gridRow: 1,
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
        marginTop: `${pixelsToRem(90)}rem`,
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
      [mq.GROUP_1_MIN_WIDTH]: {
        marginTop: `${spacings.QUADRUPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: 1,
        gridRow: '2 / 4',
        width: '100%',
      },
    }),

  image: ({ mq }: Theme) =>
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
        gridColumn: 2,
        gridRow: '1 / span 2',
        aspectRatio: '274 / 400',
        // TODO: Fix so that the image is at the bottom
        backgroundImage: `url(${imagesPath}/news_desktop_image.webp)`,
      },
    }),
};

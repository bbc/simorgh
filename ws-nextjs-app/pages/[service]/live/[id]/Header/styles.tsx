import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

const maskColours = {
  black: '0,0,0',
  white: '255,255,255',
};

const unwrappedGroup4Mask = `linear-gradient(
  270deg,
  rgba(${maskColours.black}) 0%,
  rgba(${maskColours.black}) 50%,
  rgba(${maskColours.black}) 54%,
  rgba(${maskColours.white}, 0.98) 56%,
  rgba(${maskColours.white}, 0.96) 58%,
  rgba(${maskColours.white}, 0.93) 60%,
  rgba(${maskColours.white}, 0.89) 62%,
  rgba(${maskColours.white}, 0.84) 64%,
  rgba(${maskColours.white}, 0.8) 66%,
  rgba(${maskColours.white}, 0.74) 68%,
  rgba(${maskColours.white}, 0.68) 70%,
  rgba(${maskColours.white}, 0.62) 72%,
  rgba(${maskColours.white}, 0.56) 74%,
  rgba(${maskColours.white}, 0.5) 76%,
  rgba(${maskColours.white}, 0.44) 78%,
  rgba(${maskColours.white}, 0.38) 80%,
  rgba(${maskColours.white}, 0.32) 82%,
  rgba(${maskColours.white}, 0.26) 84%,
  rgba(${maskColours.white}, 0.2) 86%,
  rgba(${maskColours.white}, 0.16) 88%,
  rgba(${maskColours.white}, 0.11) 90%,
  rgba(${maskColours.white}, 0.07) 92%,
  rgba(${maskColours.white}, 0.04) 94%,
  rgba(${maskColours.white}, 0.02) 96%,
  rgba(${maskColours.white}, 0) 98%,
  rgba(${maskColours.white}, 0) 100%
)`;

const ExtraWideMask = `linear-gradient(
  270deg,
  rgba(${maskColours.white}, 0) 0%,
  rgba(${maskColours.white}, 0.01) 2%,
  rgba(${maskColours.white}, 0.02) 3%,
  rgba(${maskColours.white}, 0.05) 4%,
  rgba(${maskColours.white}, 0.08) 5%,
  rgba(${maskColours.white}, 0.12) 6%,
  rgba(${maskColours.white}, 0.16) 7%,
  rgba(${maskColours.white}, 0.21) 8%,
  rgba(${maskColours.white}, 0.26) 9%,
  rgba(${maskColours.white}, 0.32) 10%,
  rgba(${maskColours.white}, 0.38) 11%,
  rgba(${maskColours.white}, 0.44) 12%,
  rgba(${maskColours.white}, 0.5) 13%,
  rgba(${maskColours.white}, 0.56) 14%,
  rgba(${maskColours.white}, 0.63) 15%,
  rgba(${maskColours.white}, 0.69) 16%,
  rgba(${maskColours.white}, 0.74) 17%,
  rgba(${maskColours.white}, 0.8) 18%,
  rgba(${maskColours.white}, 0.85) 19%,
  rgba(${maskColours.white}, 0.89) 20%,
  rgba(${maskColours.white}, 0.93) 21%,
  rgba(${maskColours.white}, 0.96) 22%,
  rgba(${maskColours.white}, 0.98) 23%,
  rgba(${maskColours.black}) 24%,
  rgba(${maskColours.black}) 25%,
  rgba(${maskColours.black}) 50%,
  rgba(${maskColours.black}) 54%,
  rgba(${maskColours.white}, 0.98) 56%,
  rgba(${maskColours.white}, 0.96) 58%,
  rgba(${maskColours.white}, 0.93) 60%,
  rgba(${maskColours.white}, 0.89) 62%,
  rgba(${maskColours.white}, 0.84) 64%,
  rgba(${maskColours.white}, 0.8) 66%,
  rgba(${maskColours.white}, 0.74) 68%,
  rgba(${maskColours.white}, 0.68) 70%,
  rgba(${maskColours.white}, 0.62) 72%,
  rgba(${maskColours.white}, 0.56) 74%,
  rgba(${maskColours.white}, 0.5) 76%,
  rgba(${maskColours.white}, 0.44) 78%,
  rgba(${maskColours.white}, 0.38) 80%,
  rgba(${maskColours.white}, 0.32) 82%,
  rgba(${maskColours.white}, 0.26) 84%,
  rgba(${maskColours.white}, 0.2) 86%,
  rgba(${maskColours.white}, 0.16) 88%,
  rgba(${maskColours.white}, 0.11) 90%,
  rgba(${maskColours.white}, 0.07) 92%,
  rgba(${maskColours.white}, 0.04) 94%,
  rgba(${maskColours.white}, 0.02) 96%,
  rgba(${maskColours.white}, 0) 98%,
  rgba(${maskColours.white}, 0) 100%
)`;

const mobileImageMask = `linear-gradient(
  180deg,
  rgba(${maskColours.black}) 0%,
  rgba(${maskColours.white}, 0.99) 7%,
  rgba(${maskColours.white}, 0.98) 13%,
  rgba(${maskColours.white}, 0.97) 19%,
  rgba(${maskColours.white}, 0.96) 24%,
  rgba(${maskColours.white}, 0.95) 29%,
  rgba(${maskColours.white}, 0.93) 34%,
  rgba(${maskColours.white}, 0.91) 39%,
  rgba(${maskColours.white}, 0.89) 43%,
  rgba(${maskColours.white}, 0.87) 47%,
  rgba(${maskColours.white}, 0.84) 51%,
  rgba(${maskColours.white}, 0.82) 55%,
  rgba(${maskColours.white}, 0.78) 59%,
  rgba(${maskColours.white}, 0.75) 62%,
  rgba(${maskColours.white}, 0.7) 65%,
  rgba(${maskColours.white}, 0.65) 69%,
  rgba(${maskColours.white}, 0.61) 72%,
  rgba(${maskColours.white}, 0.55) 75%,
  rgba(${maskColours.white}, 0.49) 79%,
  rgba(${maskColours.white}, 0.42) 82%,
  rgba(${maskColours.white}, 0.35) 85%,
  rgba(${maskColours.white}, 0.27) 89%,
  rgba(${maskColours.white}, 0.19) 92%,
  rgba(${maskColours.white}, 0.1) 96%,
  rgba(${maskColours.white}, 0) 100%
)`;

export default {
  headerContainer: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }),
  backgroundContainer: () =>
    css({
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '100%',
      overflow: 'hidden',
    }),
  backgroundColor: ({ palette, mq }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
      width: '100%',
      top: 0,
      bottom: 0,
      position: 'absolute',
      [mq.HIGH_CONTRAST]: {
        borderBottom: `solid ${pixelsToRem(1)}rem transparent`,
      },
    }),
  contentWrapper: ({ mq, gridWidths }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
        margin: '0 auto',
        position: 'relative',
        width: '100%',
      },
    }),
  headerImage: ({ mq }: Theme) =>
    css({
      maskSize: '100% 100%',
      maskImage: `${mobileImageMask}`,
      // minHeight: '27.5rem', // fix
      [mq.GROUP_4_MIN_WIDTH]: {
        position: 'absolute',
        right: '0',
        top: '0',
        // minHeight: '25.3125rem', // fix
        // width: '60%',
        // maxWidth: '45rem',
        height: '100%',
        aspectRatio: '16 / 9', // check
        overflow: 'hidden', // check
        maskImage: `${unwrappedGroup4Mask}`,
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        maskImage: `${ExtraWideMask}`,
      },
    }),
  textContainer: ({ mq, gridWidths }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      margin: '0 auto',
      padding: `${pixelsToRem(16)}rem ${pixelsToRem(8)}rem`,
      // zIndex: 1, // needed for non-image
      position: 'relative',

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${pixelsToRem(16)}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(16)}rem`,
        paddingInlineEnd: `${pixelsToRem(16)}rem`,
        paddingTop: `${pixelsToRem(24)}rem`,
        paddingBottom: `${pixelsToRem(32)}rem`,
      },
    }),
  textStylesWithImage: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        minHeight: '20.3125rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: '1', // not 4?
        maxWidth: '50%', // fix?
      },
    }),
  rowAlign: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'flex-start',
        width: '100%',
      },
    }),
  label: ({ palette, mq }: Theme) =>
    css({
      color: palette.LIVE_LIGHT,
      marginBottom: `${pixelsToRem(16)}rem`,
      textTransform: 'uppercase',
      display: 'block',

      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'flex',
        flex: '1 auto',
        minWidth: 'calc(100% / 3)',
        maxWidth: 'calc(100% / 3)',
        paddingInlineEnd: '16px', // fix
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        minWidth: 'calc(100% / 4)',
        maxWidth: 'calc(100% / 4)',
      },
    }),
  removeLabelMargin: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: 0,
      },
    }),
  title: ({ mq, palette }: Theme) =>
    css({
      color: palette.GREY_1,
      [mq.GROUP_4_MIN_WIDTH]: {
        flex: '1 auto',
      },
    }),
  description: ({ palette }: Theme) =>
    css({
      color: palette.GREY_2,
      margin: 0,
      marginTop: `${pixelsToRem(16)}rem`,
    }),
  layoutWithLiveLabelNoImage: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: 'calc(100% / 3)', // this feels janky
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        marginInlineStart: 'calc(100% / 4)', // this feels janky
      },
    }),
};

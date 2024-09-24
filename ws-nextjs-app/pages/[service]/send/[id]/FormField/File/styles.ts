import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';
import formFieldStyles from '../styles';

export default {
  fileInput: () =>
    css({
      display: 'none',
    }),
  fileUploadButton: ({ spacings, palette, fontVariants, fontSizes }: Theme) => {
    const topBottomPadding = `${spacings.HALF + spacings.FULL}rem`;
    const leftRightPadding = `${spacings.DOUBLE}rem`;

    return css({
      display: 'block',
      padding: `${topBottomPadding} ${leftRightPadding} ${topBottomPadding} ${leftRightPadding}`,
      border: `${pixelsToRem(1)}rem solid transparent`,
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      color: palette.WHITE,
      cursor: 'pointer',
      ...fontVariants.sansBold,
      ...fontSizes.bodyCopy,
      '&:hover, &:focus': {
        backgroundColor: '#0e5ec5',
        textDecoration: 'underline',
      },
      svg: {
        color: palette.WHITE,
        fill: 'currentcolor',
      },
    });
  },
  fileUploadIcon: ({ spacings }: Theme) => {
    const iconPadding = `${spacings.HALF + spacings.FULL}rem`;
    const iconSize = `${pixelsToRem(14)}rem`;

    return css({
      marginInlineEnd: `${iconPadding}`,
      width: iconSize,
      height: iconSize,
    });
  },
  fileList: () =>
    css({
      padding: '0',
      margin: '0',
    }),
  fileListItem: () => css({ listStyleType: 'none' }),
  fileDetails: ({ spacings, palette, fontVariants, fontSizes, mq }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      backgroundColor: palette.GREY_2,
      marginBlockStart: `${spacings.FULL}rem`,
      paddingBlock: `${pixelsToRem(13)}rem`,
      paddingInlineEnd: `${pixelsToRem(17)}rem`,
      height: `${spacings.QUADRUPLE * 2}rem`,

      [mq.GROUP_3_MIN_WIDTH]: {
        width: '85%',
      },
      span: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: 1,
        marginInlineEnd: `${spacings.DOUBLE}rem`,
        ...fontVariants.sansBold,
        ...fontSizes.bodyCopy,
      },
      button: {
        width: `${spacings.QUADRUPLE}rem`,
        height: `${spacings.QUADRUPLE}rem`,
        backgroundColor: '#E11B52',
        border: `${pixelsToRem(1)}rem solid transparent`,
        cursor: 'pointer',
        svg: {
          color: palette.WHITE,
          fill: 'currentcolor',
          verticalAlign: 'middle',
        },
        '&:hover, &:focus': {
          svg: {
            color: palette.BLACK,
            fill: 'currentcolor',
            [mq.FORCED_COLOURS]: { stroke: palette.WHITE },
          },
        },
      },
    }),
  fileThumbnailContainer: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${spacings.QUADRUPLE * 2}rem`,
      height: `${spacings.QUADRUPLE * 2}rem`,
      marginInlineEnd: `${spacings.DOUBLE}rem`,
    }),
  fileThumbnailImg: ({ spacings }: Theme) =>
    css({
      maxWidth: `${spacings.QUADRUPLE * 2}rem`,
      maxHeight: `${spacings.QUADRUPLE * 2}rem`,
    }),
  fileThumbnailSvg: ({ spacings }: Theme) =>
    css({
      width: `${spacings.QUADRUPLE}rem`,
      height: `${spacings.QUADRUPLE}rem`,
    }),
  focusIndicatorInput: formFieldStyles.focusIndicatorInput,
};

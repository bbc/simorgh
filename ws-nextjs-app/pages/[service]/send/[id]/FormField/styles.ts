import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';

export default {
  formField: ({ spacings, palette, mq }: Theme) =>
    css({
      marginTop: `${spacings.DOUBLE}rem`,

      '&:nth-child(5)': {
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_5}`,
        paddingBottom: `${spacings.DOUBLE}rem`,
        marginBottom: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        '&:nth-child(5)': {
          paddingBottom: `${spacings.TRIPLE}rem`,
          marginBottom: `${spacings.TRIPLE}rem`,
        },
      },
    }),
  fieldLabel: ({ spacings }: Theme) =>
    css({
      display: 'inline-block',
      marginBottom: `${spacings.FULL}rem`,
    }),
  focusIndicator: ({ palette }: Theme) =>
    css({
      '&:focus': {
        outline: `${focusIndicatorThickness} solid ${palette.WHITE}`,
        boxShadow: `0 0 0 ${focusIndicatorThickness} ${palette.BLACK}`,
        outlineOffset: `${focusIndicatorThickness}`,
      },
    }),
  textField: ({ spacings, fontVariants, fontSizes, palette }: Theme) =>
    css({
      border: `solid 0.0625rem ${palette.GREY_10}`,
      width: '100%',
      minHeight: `2.75rem`,
      padding: `${spacings.FULL}rem`,
      ...fontVariants.sansRegular,
      ...fontSizes.pica,
    }),
  textArea: () =>
    css({
      resize: 'none',
    }),
  fileInput: () =>
    css({
      display: 'none',
    }),
  fileUploadButton: ({ spacings, palette, fontVariants, fontSizes }: Theme) => {
    const topBottomPadding = `${spacings.HALF + spacings.FULL}rem`;
    const leftRightPadding = `${spacings.DOUBLE}rem`;

    return css({
      padding: `${topBottomPadding} ${leftRightPadding} ${topBottomPadding} ${leftRightPadding}`,
      border: 'none',
      backgroundColor: '#0071F1',
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
  fileListParagraph: ({ fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
    }),
  fileList: () =>
    css({
      padding: '0',
      margin: '0',
    }),
  fileListItem: ({ spacings, palette, fontVariants, fontSizes }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      backgroundColor: palette.GREY_2,
      marginBlockStart: `${spacings.FULL}rem`,
      paddingBlock: `${pixelsToRem(13)}rem`,
      paddingInlineEnd: `${pixelsToRem(17)}rem`,
      height: `${spacings.QUADRUPLE * 2}rem`,
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
        border: 0,
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
          },
        },
      },
    }),
  fileThumbnailContainer: ({ spacings }: Theme) => {
    const imgSize = `${spacings.QUADRUPLE * 2}rem`;

    return css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: imgSize,
      height: imgSize,
      marginInlineEnd: `${spacings.DOUBLE}rem`,
      img: {
        maxWidth: imgSize,
        maxHeight: imgSize,
      },
    });
  },
};

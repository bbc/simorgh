import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

//   border: `${pixelsToRem(7)}rem solid transparent`,
//   borderImage: `url(https://www.dropbox.com/scl/fi/5p4y98asfvgrxksxlgwqs/back23.png?rlkey=cu9mmwhnxq5vph4lvcacy2v15&st=z3pwywc4&raw=1) 33% round`,
//   borderRadius: `${pixelsToRem(7)}rem`,

export default {
  container: ({ mq }: Theme) =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      [mq.GROUP_2_MAX_WIDTH]: {
        flexDirection: 'column-reverse',
      },
    }),
  playArea: ({ spacings, palette }: Theme) =>
    css({
      color: palette.GHOST,
      background: palette.POSTBOX,
      flex: 1,
      padding: `${spacings.FULL}rem`,
    }),
  question: ({ palette }: Theme) =>
    css({
      background: palette.GHOST,
    }),
  inputContainer: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      alignTracks: 'flex-end',
      marginBottom: `${spacings.FULL}rem`,
    }),
  inputUnderline: () =>
    css({
      display: 'flex',
      alignTracks: 'flex-end',
      position: 'relative',
    }),
  underline: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '0.1rem',
      backgroundColor: palette.GHOST,
    }),
  input: ({ fontSizes, fontVariants, palette }: Theme) =>
    css({
      ...fontSizes.greatPrimer,
      ...fontVariants.serifLight,
      color: palette.GHOST,
      outline: 0,
      border: 0,
      background: palette.POSTBOX,
      '&::placeholder': {
        ...fontVariants.serifLight,
        fontStyle: 'oblique',
        color: palette.GHOST,
      },
      '&:focus + div': {
        height: '0.20rem',
        backgroundColor: palette.GHOST,
      },
    }),
  submitButton: ({ palette, spacings }: Theme) =>
    css({
      cursor: 'pointer',
      padding: `${spacings.FULL}rem`,
      marginInlineStart: `${spacings.FULL}rem`,
      border: `${0.15}rem solid ${palette.GHOST}`,
      background: palette.POSTBOX,
      '& span': {
        color: palette.GHOST,
      },
      '&:hover': {
        background: palette.GHOST,
        '& span': {
          color: palette.BLACK,
        },
      },
    }),
  hintsArea: ({ palette, spacings }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem 0 ${2.5}rem`,
    }),
  hintContainer: ({ spacings, palette }: Theme) =>
    css({
      position: 'relative',
      cursor: 'pointer',
      margin: `${spacings.HALF}rem 0`,
    }),
  hintSummary: ({ palette }: Theme) =>
    css({
      listStyle: 'none',
      display: 'flex',
    }),
  hintSummaryText: ({ palette, spacings }: Theme) =>
    css({
      flexGrow: 1,
      padding: `${0.6}rem ${spacings.FULL}rem`,
      background: palette.GHOST,
    }),
  hintPrice: ({ palette }: Theme) =>
    css({
      width: `${3.5}rem`,
      padding: `${0.6}rem ${1}rem`,
      background: palette.GREY_3,
      textAlign: 'center',
    }),
  // hintAnswerContainer: ({ palette, spacings }: Theme) => css({}),
  hintAnswerText: ({ palette, spacings }: Theme) =>
    css({
      position: 'absolute',
      top: 0,
      right: 0,
      left: `${5.5}rem`,
      padding: `${0.6}rem ${spacings.FULL}rem`,
    }),
  detailsArea: ({ spacings, mq, palette }: Theme) =>
    css({
      padding: `${spacings.FULL}rem`,
      minWidth: `${pixelsToRem(200)}rem`,
      backgroundColor: `${palette.GREY_2}`,
      [mq.GROUP_2_MAX_WIDTH]: {
        minWidth: '100%',
      },
    }),
  detail: ({ palette }: Theme) => css({}),
};

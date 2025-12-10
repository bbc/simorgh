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
  hintsArea: ({ spacings }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem 0 ${2.5}rem`,
    }),
  detailsArea: ({ spacings, mq, palette }: Theme) =>
    css({
      padding: `${spacings.FULL}rem`,
      minWidth: `${pixelsToRem(200)}rem`,
      backgroundColor: `${palette.GREY_2}`,
      display: 'grid',
      gridTemplateColumns: '1fr',
      [mq.GROUP_2_MAX_WIDTH]: {
        minWidth: '100%',
        gridTemplateColumns: '1fr 1fr 1fr',
      },
    }),
};

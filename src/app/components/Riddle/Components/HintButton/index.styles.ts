import { css, Theme } from '@emotion/react';
import { focusIndicatorThickness } from '../../../ThemeProvider/focusIndicator';

export default {
  hintContainer: ({ spacings }: Theme) =>
    css({
      position: 'relative',
      cursor: 'pointer',
      margin: `${spacings.HALF}rem 0`,
    }),
  hintButton: ({ palette }: Theme) =>
    css({
      all: 'unset',
      display: 'flex',
      width: '100%',
      '&:focus-visible': {
        outline: `${focusIndicatorThickness} solid ${palette.BLACK}`,
        boxShadow: `0 0 0 ${focusIndicatorThickness} ${palette.WHITE}`,
        outlineOffset: `${focusIndicatorThickness}`,
        position: 'relative',
        zIndex: '1',
      },
    }),
  hintSummaryText: ({ palette, spacings }: Theme) =>
    css({
      flexGrow: 1,
      padding: `${0.6}rem ${spacings.FULL}rem`,
      background: palette.GHOST,
      'details:open &': {
        display: 'none',
      },
    }),
  hintPrice: ({ palette }: Theme) =>
    css({
      width: `${4}rem`,
      padding: `${0.6}rem ${1}rem`,
      background: palette.GREY_3,
      textAlign: 'center',
    }),
  paidIcon: () =>
    css({
      position: 'absolute',
      top: 0,
      insetInlineStart: 0,
      width: `${2.5}rem`,
      background: 'cyan',
      textAlign: 'center',
    }),
  notEnough: () =>
    css({
      position: 'absolute',
      top: 0,
      insetInlineStart: 0,
      background: 'yellow',
      textAlign: 'center',
    }),
  hintAnswerText: ({ spacings }: Theme) =>
    css({
      position: 'absolute',
      top: 0,
      insetInlineEnd: 0,
      insetInlineStart: `${6}rem`,
      padding: `${0.6}rem ${spacings.FULL}rem`,
      background: '#FEFAE0',
    }),
};

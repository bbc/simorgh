import { Theme, css } from '@emotion/react';

export default {
  actionLinkWrapper: ({ mq }) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      alignItems: 'center',
      gap: '1rem',
      [mq.GROUP_2_MIN_WIDTH]: {
        flexDirection: 'row',
      },
    }),
  callToActionLink: () =>
    css({
      padding: '1rem',
    }),

  orText: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
    }),

  signInLnk: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: '#0071F1',
      '&:hover, &:focus': {
        backgroundColor: '#0051AD',
        color: palette.WHITE,
      },
    }),
  registerLink: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      backgroundColor: palette.WHITE,
      '&:hover, &:focus': {
        backgroundColor: '#F6F6F6',
        color: palette.BLACK,
      },
    }),
};

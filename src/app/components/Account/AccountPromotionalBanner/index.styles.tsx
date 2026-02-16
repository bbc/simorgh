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

  buttonSeparatorText: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
    }),

  signInLink: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      '&:hover, &:focus': {
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
        color: palette.WHITE,
      },
    }),
  registerLink: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      backgroundColor: palette.WHITE,
      '&:hover, &:focus': {
        backgroundColor: palette.GREY_2,
        color: palette.BLACK,
      },
    }),
};

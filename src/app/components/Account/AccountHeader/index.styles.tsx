import { Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  wrapper: {
    paddingBlock: '0.5rem',
  },
  link: ({ palette }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minHeight: `${pixelsToRem(44)}rem`,
    paddingInline: `${pixelsToRem(12)}rem`,
    color: palette.WHITE,
    textDecoration: 'none',
    border: `1px solid ${palette.WHITE}`,

    '&:hover, &:focus': {
      outline: `4px solid ${palette.WHITE}`,
      textDecoration: 'underline',
      boxShadow: 'none',
      outlineOffset: 0,
    },
  }),

  icon: {
    fill: 'currentColor',
    flexShrink: 0,
  },

  wrapperDefault: ({ mq }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    marginInlineStart: 'auto',

    [mq.GROUP_4_MIN_WIDTH]: {
      marginInlineStart: `${pixelsToRem(23)}rem`,
    },
  }),
  linkDefault: ({ palette, mq, spacings, fontSizes }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: `${pixelsToRem(5)}rem`,
    height: `${spacings.QUINTUPLE}rem`,
    padding: `${spacings.HALF}rem 0`,
    color: palette.BLACK,
    ...fontSizes.pica,
    textDecoration: 'none',
    border: `${pixelsToRem(2)}rem solid transparent`,

    '&:hover': {
      boxShadow: 'none',
      textDecoration: 'none',
      borderBottomColor: palette.SERVICE_NEUTRAL_CORE,
    },

    '&:focus, &:focus-visible': {
      outline: 'none',
      boxShadow: 'none',
      borderColor: palette.BLACK,
    },

    [mq.GROUP_0_MAX_WIDTH]: {
      marginLeft: `${pixelsToRem(22)}rem`,
      span: {
        display: 'none',
      },
    },
  }),

  iconDefault: ({ palette }: Theme) => ({
    fill: palette.SERVICE_NEUTRAL_CORE,
    flexShrink: 0,
    width: `${pixelsToRem(32)}rem`,
    height: `${pixelsToRem(32)}rem`,
  }),
};

export default styles;

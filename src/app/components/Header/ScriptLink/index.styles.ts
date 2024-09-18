import { css, Theme } from '@emotion/react';

const styles = {
  link: ({ fontSizes, fontVariants, palette, spacings, mq }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.sansRegular,
      display: 'inline-block',
      color: palette.WHITE,
      textDecoration: 'none',
      height: '2.75rem',
      border: `0.0625rem solid ${palette.WHITE}`,
      margin: `${spacings.FULL}rem 0 ${spacings.FULL}rem ${spacings.FULL}rem`,
      minWidth: '2.75rem',
      textAlign: 'center',
      '&:focus, &:hover': {
        span: {
          margin: '0',
          border: `0.1875rem solid ${palette.WHITE}`,
        },
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        lineHeight: `calc(2.25rem - ${spacings.FULL}rem)`,
      },
      [mq.GROUP_1_MAX_WIDTH]: {
        margin: `${spacings.FULL}rem 0 ${spacings.FULL}rem 0`,
      },
    }),
  container: ({ spacings }: Theme) =>
    css({
      marginTop: '0.1875rem',
      width: '100%',
      display: 'inline-block',
      height: 'calc(100%)',
      lineHeight: `calc(2.75rem - ${spacings.FULL}rem)`,
    }),
};
export default styles;

import { css, Theme } from '@emotion/react';

const styles = {
  link: ({ fontSizes, fontVariants, palette, spacings, mq }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.sansRegular,
      display: 'inline-block',
      color: palette.WHITE,
      textDecoration: 'none',
      height: '2.25rem',
      border: `0.0625rem solid ${palette.WHITE}`,
      margin: `${spacings.FULL}rem 0 ${spacings.FULL}rem ${spacings.FULL}rem`,
      '&:focus, &:hover': {
        span: {
          margin: '0',
          border: `0.1875rem solid ${palette.WHITE}`,
        },
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        lineHeight: `calc(2.25rem - ${spacings.FULL}rem)`,
      },
      [mq.GROUP_2_MAX_WIDTH]: {
        height: `${spacings.QUINTUPLE}rem`,
      },
    }),
  container: ({ spacings, mq }: Theme) =>
    css({
      margin: '0.1875rem',
      display: 'inline-block',
      height: 'calc(100%)',
      padding: `0 ${spacings.FULL}rem`,
      [mq.GROUP_2_MAX_WIDTH]: {
        lineHeight: `calc(${spacings.QUINTUPLE}rem - ${spacings.FULL}rem)`,
      },
    }),
};
export default styles;

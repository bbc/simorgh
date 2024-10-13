import { css, Theme } from '@emotion/react';

const styles = {
  promoWrapper: ({ mq, spacings }: Theme) =>
    css({
      marginBottom: `${spacings.FULL}rem`,
      marginTop: `${spacings.FULL}rem`,
      height: '100%',
      [mq.GROUP_3_ONLY]: {
        marginBottom: `0`,
        marginTop: `0`,
      },
    }),
  textWrapper: ({ mq }: Theme) =>
    css({
      width: '67%',
      display: 'inline-block',
      verticalAlign: 'top',
      paddingInlineStart: '0.5rem',
      [mq.GROUP_3_ONLY]: {
        width: '100%',
      },
    }),
  promoTitle: ({ mq, fontSizes }: Theme) =>
    css({
      ...fontSizes.pica,
      [mq.GROUP_3_ONLY]: {
        marginTop: `0.75rem`,
      },
    }),
  imageWrapper: ({ mq }: Theme) =>
    css({
      width: '33%',
      display: 'inline-block',
      verticalAlign: 'top',
      [mq.GROUP_3_ONLY]: {
        width: '100%',
      },
    }),
  promoLink: ({ palette }: Theme) =>
    css({
      color: palette.GREY_2,
      '&:visited': {
        color: palette.GREY_5,
      },
    }),
  promoStyle: () =>
    css({
      backgroundColor: 'transparent',
    }),
  timeStamp: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.FULL}rem`,
    }),
};

export default styles;

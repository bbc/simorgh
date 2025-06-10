import { getInlineLinkStyles } from '#app/components/InlineLink/index.styles';
import { css, Theme } from '@emotion/react';

export default {
  outerContainer: ({ palette, fontVariants }: Theme) =>
    css({
      a: {
        ...getInlineLinkStyles(palette),
        ...fontVariants.sansBold,
      },
    }),
  messageContainer: () =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
    }),
  messageTextContainer: () =>
    css({
      display: 'flex',
      alignItems: 'center',
    }),
  tickIcon: ({ spacings, mq, palette }: Theme) =>
    css({
      marginInlineEnd: `${spacings.FULL}rem`,
      fill: palette.SUCCESS_CORE,
      [mq.FORCED_COLOURS]: {
        path: {
          fill: 'currentColor',
        },
      },
    }),
  heading: () =>
    css({
      '&:focus': {
        outline: 'none',
      },
    }),
  descriptionContainer: ({ spacings }: Theme) =>
    css({
      '& > p, & > div': {
        marginTop: `${spacings.DOUBLE}rem`,
      },
    }),
};

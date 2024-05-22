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
  tickIcon: ({ spacings }: Theme) =>
    css({
      width: '66px',
      height: '66px',
      marginRight: `${spacings.FULL}rem`,
    }),
  descriptionContainer: ({ spacings }: Theme) =>
    css({
      '& > p, & > div': {
        marginTop: `${spacings.DOUBLE}rem`,
      },
    }),
};

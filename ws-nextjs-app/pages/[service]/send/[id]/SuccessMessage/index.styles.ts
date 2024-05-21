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
  heading: ({ fontSizes }: Theme) =>
    css({
      ...fontSizes.trafalgar,
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
      marginRight: `${spacings.FULL}rem`,
    }),
  descriptionContainer: ({ spacings }: Theme) =>
    css({
      '& > p, & > div': {
        marginTop: `${spacings.DOUBLE}rem`,
      },
    }),
};

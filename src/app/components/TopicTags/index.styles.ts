import { css, Theme } from '@emotion/react';
import { POSTBOX, WHITE } from '#app/components/ThemeProvider/palette';

const MIN_TAG_HEIGHT = '2.75rem'; // 44px

const containerBase = ({ spacings }: Theme) =>
  css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: `${spacings.HALF}rem`,
    margin: 0,
    padding: 0,
  });

const styles = {
  singleContainer: containerBase,
  topicsList: ({ spacings }: Theme) =>
    css({
      ...containerBase({ spacings } as Theme),
      listStyleType: 'none',
    }),
  topicTagItem:
    (backgroundColour = WHITE) =>
    ({ fontVariants, fontSizes, palette, isDarkUi, spacings }: Theme) =>
      css({
        ...fontVariants.sansBold,
        ...fontSizes.bodyCopy,
        wordBreak: 'break-word',
        minWidth: 0,
        a: {
          display: 'inline-flex',
          minHeight: MIN_TAG_HEIGHT,
          padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem`,
          alignItems: 'center',
          backgroundColor: isDarkUi ? palette.GREY_7 : backgroundColour,
          border: `1px solid ${isDarkUi ? palette.GREY_6 : palette.GREY_3}`,
          textDecoration: 'none',
          color: isDarkUi ? palette.GREY_2 : palette.EBON,
          '&:hover, &:focus': {
            color: palette.POSTBOX || POSTBOX,
            textDecoration: 'underline',
          },
        },
      }),
};

export default styles;

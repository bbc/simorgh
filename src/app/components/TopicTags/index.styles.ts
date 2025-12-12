import { css, Theme } from '@emotion/react';
import { WHITE } from '#app/components/ThemeProvider/palette';

const MIN_TAG_HEIGHT = '2.75rem'; // 44px

const containerStyles = ({ spacings }: Theme) =>
  css({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: `-${spacings.FULL}rem`,
    marginLeft: `-${spacings.HALF}rem`,
    marginRight: `-${spacings.HALF}rem`,
    padding: 0,
    listStyleType: 'none',
  });

const styles = {
  singleContainer: containerStyles,
  topicsList: containerStyles,
  topicTagItem:
    (backgroundColour = WHITE) =>
    ({ fontVariants, fontSizes, palette, isDarkUi, spacings }: Theme) =>
      css({
        ...fontVariants.sansBold,
        ...fontSizes.bodyCopy,
        wordBreak: 'break-word',
        minWidth: 0,
        marginTop: `${spacings.FULL}rem`,
        marginLeft: `${spacings.HALF}rem`,
        marginRight: `${spacings.HALF}rem`,
        a: {
          display: 'inline-flex',
          minHeight: MIN_TAG_HEIGHT,
          padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem`,
          alignItems: 'center',
          backgroundColor: isDarkUi ? palette.GREY_7 : backgroundColour,
          border: 'none',
          textDecoration: 'none',
          color: isDarkUi ? palette.GREY_2 : palette.EBON,
          '&:hover, &:focus': {
            color: palette.POSTBOX,
            textDecoration: 'underline',
          },
        },
      }),
};

export default styles;

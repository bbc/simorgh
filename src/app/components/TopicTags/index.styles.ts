import { css, Theme } from '@emotion/react';

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
  topicTagItem: ({
    fontVariants,
    fontSizes,
    palette,
    isDarkUi,
    spacings,
  }: Theme) =>
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
        backgroundColor: isDarkUi ? palette.GREY_7 : palette.WHITE,
        border: 'none',
        textDecoration: 'none',
        color: isDarkUi ? palette.GREY_2 : palette.EBON,
        '&:hover, &:focus': {
          textDecoration: 'underline',
        },
      },
    }),
};

export default styles;

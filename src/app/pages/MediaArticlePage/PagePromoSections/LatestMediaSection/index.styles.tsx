import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';

const styles = {
  latestMediaSection: ({ mq, isDarkUi, palette }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_10 : palette.GREY_2,
      margin: '0 0.5rem',
      [mq.GROUP_3_ONLY]: {
        margin: '0 1rem',
      },
    }),
  latestMediaGridWrapper: ({ mq }: Theme) =>
    css({
      [mq.GROUP_3_ONLY]: {
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '3%',
        rowGap: '1.5rem',
      },
    }),
  latestMediaPromoBorderAndWidth: ({ mq, palette }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem ${palette.GREY_2} solid`,
      marginBottom: '0',
      [mq.GROUP_3_ONLY]: {
        borderBottom: '0',
        width: '48.5%',
      },
      '&:last-child': {
        borderBottom: 'none',
      },
    }),
  sectionTitle: ({ mq, spacings }: Theme) =>
    css({
      marginTop: `0rem`,
      marginBottom: `0rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: '0rem',
        marginBottom: `${spacings.HALF}rem`,
      },
      [mq.GROUP_3_ONLY]: {
        marginTop: '0rem',
        marginBottom: `${spacings.DOUBLE}rem`,
      },
    }),
};

export default styles;

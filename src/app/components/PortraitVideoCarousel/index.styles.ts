import { css, Theme } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import { OPERA_MINI_CLASSNAME } from '#app/lib/utilities/addOperaMiniClassScript';
import { calculateVariedNavContainerWidths } from './utils/styleUtils';

const styles = {
  section: ({ mq, spacings }: Theme) =>
    css({
      margin: `${spacings.DOUBLE}rem 0`,
      [mq.GROUP_1_MIN_WIDTH]: {
        margin: `${spacings.TRIPLE}rem 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.DOUBLE}rem 0`,
      },
      [`.${OPERA_MINI_CLASSNAME} &`]: {
        display: 'none',
      },
    }),
  heading: ({ palette, mq, spacings }: Theme) =>
    css({
      display: 'inline-block',
      color: palette.GREY_10,
      margin: `0`,
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.DOUBLE}rem 0 0 0`,
      },
    }),
  carouselContainer: () =>
    css({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
    }),
  carousel: ({ spacings, mq }: Theme) =>
    css({
      display: 'flex',
      flex: 1,
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      columnGap: `${spacings.FULL}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        columnGap: `${spacings.DOUBLE}rem`,
        padding: `${spacings.FULL}rem 0`,
      },
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
      '&:after': {
        content: '""',
        display: 'none',
        flexGrow: 0,
        flexShrink: 0,
        ...calculateVariedNavContainerWidths({
          mq,
          display: 'block',
          widthParameter: 'flexBasis',
        }),
      },
    }),
};

export default styles;

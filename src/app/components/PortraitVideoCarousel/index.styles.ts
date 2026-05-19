import { css, type Theme } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import { OPERA_MINI_CLASSNAME } from '#app/lib/utilities/addOperaMiniClassScript';
import { calculateVariedNavContainerWidths } from './utils/styleUtils';

const styles = {
  section: () =>
    css({
      [`.${OPERA_MINI_CLASSNAME} &`]: {
        display: 'none',
      },
      '& > h2:has(a)': {
        marginBottom: 0,
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
      containerType: 'inline-size', // required for container query
      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
    }),
  carousel: ({ spacings, mq, gridWidths }: Theme) =>
    css({
      containerType: 'inline-size', // required for container query
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
          gridWidths,
        }),
      },
    }),
};

export default styles;

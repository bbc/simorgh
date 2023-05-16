import { css, Theme } from '@emotion/react';

const styles = {
  oneColumn: css({
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    gridAutoFlow: 'column',
  }),

  twoColumn: ({ mq }: Theme) =>
    css({
      [mq.GROUP_3_MIN_WIDTH]: {
        gridTemplateRows: 'auto',
      },
    }),

  multiColumn: ({ mq }: Theme) =>
    css({
      [mq.GROUP_5_MIN_WIDTH]: {
        gridAutoFlow: 'row',
      },
    }),
};

export const gridTemplateRows = (numberOfItems: number) =>
  css({ gridTemplateRows: `repeat(${numberOfItems}, auto)` });

export const multiColumnGridTemplateRows = (numberOfItems: number) => {
  css({
    gridTemplateRows: `repeat(${Math.ceil(numberOfItems / 2)}, auto)`,
  });
};

export default styles;

import { ColumnLayout } from '../types';

const mostReadListGridProps = (columnLayout: ColumnLayout) => ({
  enableGelGutters: true,
  enableGelMargins: true,
  columns: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: {
      oneColumn: 1,
      twoColumn: 6,
      multiColumn: 6,
    }[columnLayout],
    group4: {
      oneColumn: 1,
      twoColumn: 8,
      multiColumn: 8,
    }[columnLayout],
    group5: {
      oneColumn: 1,
      twoColumn: 8,
      multiColumn: 20,
    }[columnLayout],
  },
});

const mostReadItemGridProps = (columnLayout: ColumnLayout) => ({
  item: true,
  columns: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: {
      oneColumn: 1,
      twoColumn: 3,
      multiColumn: 3,
    }[columnLayout],
    group4: {
      oneColumn: 1,
      twoColumn: 4,
      multiColumn: 4,
    }[columnLayout],
    group5: {
      oneColumn: 1,
      twoColumn: 4,
      multiColumn: 4,
    }[columnLayout],
  },
});

export { mostReadListGridProps, mostReadItemGridProps };

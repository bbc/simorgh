const mostReadListGridProps = maxTwoColumns => ({
  enableGelGutters: true,
  enableGelMargins: true,
  columns: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: maxTwoColumns ? 8 : 20,
  },
});

export { mostReadListGridProps };

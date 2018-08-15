const pageWidths = [320, 400, 600, 1008, 1280];
const urls = [
  'http://localhost:7080/article/scenario-25',
  'http://localhost:7080/article/scenario-27',
];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width }),
  ),
);

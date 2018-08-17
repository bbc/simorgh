const pageWidths = [320, 400, 600, 1008, 1280];
const urls = [
  'http://localhost:7080/articles/c0000000025o',
  'http://localhost:7080/articles/c0000000027o',
];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width }),
  ),
);

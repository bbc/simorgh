const pageWidths = [320, 400, 600, 1008, 1280];
const urls = [
  'http://localhost:7080/news/articles/c9rpqy7pmypo',
  'http://localhost:7080/news/articles/c85pqyj5m2ko',
];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width }),
  ),
);

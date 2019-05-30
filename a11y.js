const pageWidths = [320, 400, 600, 1008, 1280];
const urls = [
  'http://localhost:7080/news/articles/c6v11qzyv8po',
  'http://localhost:7080/news/articles/c0g992jmmkko',
];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width }),
  ),
);

const pageWidths = [320, 400, 600, 1008, 1280];
const urls = [
  'http://localhost:7080/news/articles/cl55zn0w0l4o',
  'http://localhost:7080/news/articles/cn7769kpk9mo',
];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width }),
  ),
);

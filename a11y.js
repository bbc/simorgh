const pageWidths = [320, 400, 600, 1008, 1280];
const urls = [
  'http://localhost.bbc.com:7080/news/articles/c6v11qzyv8po',
  'http://localhost.bbc.com:7080/news/articles/c0g992jmmkko',
  'http://localhost.bbc.com:7080/igbo',
  'http://localhost.bbc.com:7080/yoruba',
  'http://localhost.bbc.com:7080/pidgin',
];

// Added to prevent false negatives from mPulse beacon
// which creates iframe in document head
const hide = ['/html/head/iframe'];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width, hide }),
  ),
);

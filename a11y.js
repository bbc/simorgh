const pageWidths = [320, 400, 600, 1008, 1280];
const skipTests = [
  // 'Design: Content resizing: Text must be styled with units that are resizable in all browsers',
  // 'Structure: Containers and landmarks: Exactly one main landmark',
];
const urls = [
  'http://localhost:7080/article/scenario-25',
  'http://localhost:7080/article/scenario-27',
];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, {
      skip: skipTests,
      width,
    }),
  ),
);

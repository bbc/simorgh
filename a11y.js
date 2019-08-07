const fs = require('fs');

const getServiceNames = () => {
  const dataDir = 'data';
  return fs
    .readdirSync(dataDir, { withFileTypes: true })
    .filter(file => file.isDirectory())
    .map(dir => dir.name);
};

const pageWidths = [320, 400, 600, 1008, 1280];
const baseUrl = 'http://localhost.bbc.com:7080/';
const services = getServiceNames();
const urls = services.map(service => `${baseUrl}${service}`);

// Added to prevent false negatives from mPulse beacon
// which creates iframe in document head
const hide = ['/html/head/iframe'];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width, hide }),
  ),
);

const fs = require('fs');

const dataDir = `${__dirname}/data`;
const dirNames = fs.readdirSync(dataDir);
const getServiceDir = service => fs.readdirSync(`${dataDir}/${service}`);
const getServiceNames = () =>
  dirNames.filter(file => fs.statSync(`${dataDir}/${file}`).isDirectory());

const serviceHasFrontPage = service =>
  getServiceDir(service).find(file => file === 'frontpage');

const pageWidths = [320, 400, 600, 1008, 1280];
const baseUrl = 'http://localhost.bbc.com:7080/';
const services = getServiceNames();

const urls = services
  .filter(serviceHasFrontPage)
  .map(service => `${baseUrl}${service}`);

// Added to prevent false negatives from mPulse beacon
// which creates iframe in document head
const hide = ['/html/head/iframe'];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width, hide }),
  ),
);

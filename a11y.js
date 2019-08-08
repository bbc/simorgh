const fs = require('fs');
const path = require('path');

const dataDir = `${__dirname}/data`;
const dirNames = fs.readdirSync(dataDir);
const getServiceDir = service => fs.readdirSync(`${dataDir}/${service}`);
const getServiceNames = () =>
  dirNames.filter(file => fs.statSync(`${dataDir}/${file}`).isDirectory());

const serviceHasArticles = service =>
  getServiceDir(service).find(file => file === 'articles');

const serviceHasFrontPage = service =>
  getServiceDir(service).find(file => file === 'frontpage');

const pageWidths = [320, 400, 600, 1008, 1280];
const baseUrl = 'http://localhost.bbc.com:7080/';
const services = getServiceNames();

const frontPagesUrls = services
  .filter(serviceHasFrontPage)
  .map(service => `${baseUrl}${service}`);

const getArticleUrls = service => {
  const files = fs.readdirSync(`${dataDir}/${service}/articles`);

  // filter out articles files which contain `0000` in their file names
  // since most of them do not have real test data
  const articleFile = files.find(file => !file.includes('0000'));
  const article = path.basename(articleFile, path.extname(articleFile));
  return `${baseUrl}${service}/articles/${article}`;
};

const articlePagesUrls = services
  .filter(serviceHasArticles)
  .map(getArticleUrls);

const urls = [...frontPagesUrls, ...articlePagesUrls];

// Added to prevent false negatives from mPulse beacon
// which creates iframe in document head
const hide = ['/html/head/iframe'];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width, hide }),
  ),
);

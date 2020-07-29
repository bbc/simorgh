const fs = require('fs');
const { extractBundlesForPageType } = require('./pageTypeBundleExtractor');

const pages = [
  'ArticlePage',
  'MediaAssetPage',
  'PhotoGalleryPage',
  'StoryPage',
  'FrontPage',
  'MostReadPage',
  'LiveRadioPage',
  'OnDemandRadioPage',
  'OnDemandTvPage',
];

const getFileSize = filePath => fs.statSync(filePath).size;

const getPageData = ({ pageName, regex, jsFiles }) => {
  const filenames = jsFiles.filter(fileName => fileName.match(regex));

  const bundleSizes = filenames
    .map(fileName => getFileSize(`build/public/static/js/${fileName}`))
    .map(sizeInBytes => Math.round(sizeInBytes / 1000));

  const totalBundleSizes = bundleSizes.reduce(
    (totalKB, fileSizeInKB) => totalKB + fileSizeInKB,
    0,
  );

  return [pageName, bundleSizes.join(', '), totalBundleSizes];
};

const getPageBundleData = ({ jsFiles }) => {
  return pages.map(pageName => {
    const pageBundleRegex = extractBundlesForPageType(pageName).reduce(
      (acc, file) => {
        return acc ? `${file}|${acc}` : file;
      },
    );
    return getPageData({
      pageName,
      regex: `^main|^vendor|${pageBundleRegex}`,
      jsFiles,
    });
  });
};

exports.getPageBundleData = getPageBundleData;

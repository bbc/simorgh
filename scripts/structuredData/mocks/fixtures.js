const urlPrefix = 'http://localhost:7080';

const expectedUrls = [
  `${urlPrefix}/afaanoromoo/articles/c4g19kgl85ko`,
  `${urlPrefix}/afaanoromoo`,
  `${urlPrefix}/afaanoromoo/bbc_afaanoromoo_radio/liveradio`,
  `${urlPrefix}/afaanoromoo/bbc_afaanoromoo_radio/w3cszx1y`,
  `${urlPrefix}/afaanoromoo/23149891`,
  `${urlPrefix}/afaanoromoo/oduu-41217768`,
  `${urlPrefix}/amharic/articles/czqverekrldo`,
  `${urlPrefix}/amharic`,
  `${urlPrefix}/amharic/bbc_amharic_radio/liveradio`,
  `${urlPrefix}/amharic/bbc_amharic_radio/w3csz5r9`,
  `${urlPrefix}/amharic/news-23263266`,
  `${urlPrefix}/amharic/42743191`,
];

const results = [
  {
    url: 'mock-url-1',
    failed: ['failed-test'],
    passed: ['passed-test'],
  },
  {
    url: 'mock-url-2',
    passed: ['passed-test'],
    failed: [],
  },
  {
    url: 'mock-url-3',
    passed: ['passed-test'],
    failed: [],
  },
  {
    url: 'mock-url-4',
    passed: ['passed-test'],
    failed: [],
  },
];

module.exports = {
  expectedUrls,
  results,
};

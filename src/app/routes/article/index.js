import { ArticlePage } from '#pages';
import getInitialData from './getInitialData';
import { ARTICLE_PAGE } from '#utils/pageTypes';
import { allServices, serviceRegex, variantRegex } from '../utils/regex';

const CANONICAL_PATHS = allServices.map(service => `/${service}/articles/:id`);
const CANONICAL_SERVICE_VARIANT_PATHS = [
  '/zhongwen/simp/articles/:id',
  '/zhongwen/trad/articles/:id',
  '/serbian/cyr/articles/:id',
  '/serbian/lat/articles/:id',
];
const CANONICAL_UK_PATHS = [
  '/cymrufyw/erthyglau/:id',
  '/scotland/sgeulachdan/:id',
];

const AMP_PATHS = CANONICAL_PATHS.map(path => `${path}.amp`);
const AMP_SERVICE_VARIANT_PATH = CANONICAL_SERVICE_VARIANT_PATHS.map(
  path => `${path}.amp`,
);
const AMP_UK_PATHS = CANONICAL_UK_PATHS.map(path => `${path}.amp`);

const component = ArticlePage;
const pageType = ARTICLE_PAGE;

const articleLocalRegex = ['articles', 'erthyglau', 'sgeulachdan'].join('|');
const articleIdRegex = 'c[a-zA-Z0-9]{10}o';

// I wrote this regex matching function for potentially matching routes with it but I didn't find a way to do this
const matchPath = pathname =>
  new RegExp(
    `^/(${serviceRegex})/(${articleLocalRegex})/(${articleIdRegex})(${variantRegex})?(.amp)?$`,
  ).test(pathname);

const articleRoutes = [
  CANONICAL_PATHS,
  CANONICAL_SERVICE_VARIANT_PATHS,
  AMP_PATHS,
  AMP_SERVICE_VARIANT_PATH,
  CANONICAL_UK_PATHS,
  AMP_UK_PATHS,
]
  .flat()
  .map(path => ({
    path,
    component,
    getInitialData,
    pageType,
    matchPath,
  }));

export default articleRoutes;

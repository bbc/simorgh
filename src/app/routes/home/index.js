import { FrontPage } from '#pages';
import getInitialData from './getInitialData';
import { FRONT_PAGE } from '#utils/pageTypes';
import { allServices, serviceRegex, variantRegex } from '../utils/regex';

const CANONICAL_PATHS = allServices.map(service => `/${service}`);
const CANONICAL_SERVICE_VARIANT_PATHS = [
  '/zhongwen/simp',
  '/zhongwen/trad',
  '/serbian/cyr',
  '/serbian/lat',
];

const AMP_PATHS = CANONICAL_PATHS.map(path => `${path}.amp`);
const AMP_SERVICE_VARIANT_PATH = CANONICAL_SERVICE_VARIANT_PATHS.map(
  path => `${path}.amp`,
);

const component = FrontPage;
const pageType = FRONT_PAGE;

// I wrote this regex matching function for potentially matching routes with it but I didn't find a way to do this
const matchPath = pathname =>
  new RegExp(`^/(${serviceRegex})(${variantRegex})?(.amp)?$`).test(pathname);

const frontPageRoutes = [
  CANONICAL_PATHS,
  CANONICAL_SERVICE_VARIANT_PATHS,
  AMP_PATHS,
  AMP_SERVICE_VARIANT_PATH,
]
  .flat()
  .map(path => ({
    path,
    component,
    getInitialData,
    pageType,
    matchPath,
  }));

export default frontPageRoutes;

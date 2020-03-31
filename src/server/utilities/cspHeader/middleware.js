import csp from 'helmet-csp';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import routes from '#app/routes';
import getOriginContext from '#contexts/RequestContext/getOriginContext';
import { constructCspHeader } from './index';

export const localInjectHostCspHeader = (_req, _res, next) => {
  next();
};

const injectCspHeader = (req, res, next) => {
  const { isAmp } = getRouteProps(routes, req.url);
  const originHeader = req.headers['bbc-origin'];
  const { origin, isUK } = getOriginContext(originHeader);

  const isLive = origin === 'https://bbc.co.uk' || origin === 'https://bbc.com';

  const middleware = csp(constructCspHeader({ isAmp, isLive, isUK }));
  middleware(req, res, next);
};

export default injectCspHeader;

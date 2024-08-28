import csp from 'helmet-csp';
import getRouteProps from '#routes/utils/fetchPageData/utils/getRouteProps';
import isLiveEnv from '#lib/utilities/isLive';
import { cspDirectives } from './directives';

const injectCspHeader = (req, res, next) => {
  const { isAmp, service } = getRouteProps(req.url);

  res.setHeader(
    'report-to',
    JSON.stringify({
      group: 'worldsvc',
      max_age: 2592000,
      endpoints: [
        {
          url: process.env.SIMORGH_CSP_REPORTING_ENDPOINT,
          priority: 1,
        },
      ],
      include_subdomains: true,
    }),
  );

  const middleware = csp(
    cspDirectives({
      isAmp,
      isLive: isLiveEnv(),
      service,
    }),
  );
  middleware(req, res, next);
};

export default injectCspHeader;

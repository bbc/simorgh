import csp from 'helmet-csp';
import crypto from 'crypto';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import isLiveEnv from '#lib/utilities/isLive';
import { cspDirectives } from './directives';

const injectCspHeader = (req, res, next, nonce = crypto.randomBytes(16).toString("hex")) => {
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

  const { directives } = cspDirectives({
    isAmp,
    isLive: isLiveEnv(),
    service,
    nonce
  });

  const middleware = csp({
    directives,
    useDefaults: false,
  });

  middleware(req, res, next);
};

export default injectCspHeader;

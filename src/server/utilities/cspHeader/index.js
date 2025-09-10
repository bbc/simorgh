import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import isLiveEnv from '#lib/utilities/isLive';
import { cspDirectives } from './directives';

const injectCspHeader = ({ isAmp, service, nonce, res }) => {
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
    nonce,
  });
  let cspHeader = '';
  Object.keys(directives).forEach(directive => {
    cspHeader += `${directive} `;
    if (directives[directive] && Array.isArray(directives[directive])) {
      cspHeader += directives[directive].join(' ');
    } else {
      cspHeader += directives[directive];
    }
    cspHeader += ';';
  });
  res.set('Content-Security-Policy', cspHeader);
};

export default injectCspHeader;

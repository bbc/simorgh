import { NextPageContext } from 'next/types';
import getAssetOrigins from '#utilities/getAssetOrigins';

const addLinkHeader = ({ ctx }: { ctx: NextPageContext }) => {
  const { dnsPrefetchOrigins, preconnectOrigins } = getAssetOrigins(
    ctx.pathname,
  );

  const resourceHintsConfig = [
    ...dnsPrefetchOrigins.map(
      domainName => `<${domainName}>; rel="dns-prefetch"`,
    ),
    ...preconnectOrigins.map(
      domainName => `<${domainName}>; rel="preconnect"; crossorigin`,
    ),
  ];

  ctx.res?.setHeader('Link', resourceHintsConfig.join(','));
};

export default addLinkHeader;

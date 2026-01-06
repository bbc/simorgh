import { NextPageContext } from 'next/types';
import getAssetOrigins from '#server/utilities/getAssetOrigins';

const addLinkHeader = ({ ctx }: { ctx: NextPageContext }) => {
  const assetOrigins = getAssetOrigins();

  ctx.res?.setHeader(
    'Link',
    assetOrigins
      .map(domainName => {
        const crossOrigin =
          domainName === 'https://static.files.bbci.co.uk'
            ? `,<${domainName}>; rel="preconnect"; crossorigin`
            : '';
        return `<${domainName}>; rel="dns-prefetch", <${domainName}>; rel="preconnect"${crossOrigin}`;
      })
      .join(','),
  );
};

export default addLinkHeader;

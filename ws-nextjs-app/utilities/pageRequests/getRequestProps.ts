import { NextPageContext } from 'next';
import { Navigation, PageTypes } from '#app/models/types/global';
import extractHeaders from '#utilities/extractHeaders';
import { getServerExperiments } from '#utilities/experimentHeader';
import fetchToggles from '#app/lib/utilities/fetchToggles';
import fetchConfig from '#app/lib/utilities/fetchConfig';
import getPathExtension from '#app/utilities/getPathExtension';
import parseRoute from '#app/routes/utils/parseRoute';
import addCspHeader from '#utilities/addCspHeader';
import derivePageType from '#utilities/derivePageType';
import addServiceChainHeader from '#utilities/addServiceChainHeader';
import addOnionLocationHeader from '#utilities/addOnionLocationHeader';
import addVaryHeader from '#utilities/addVaryHeader';
import addLinkHeader from '#utilities/addLinkHeader';
import getIdctaConfig from '#app/lib/idcta/getIdctaConfig';

const getRequestProps = async (
  ctx: Pick<NextPageContext, 'req' | 'res' | 'asPath' | 'pathname'>,
) => {
  const { asPath = '' } = ctx;
  const { isApp, isAmp, isLite } = getPathExtension(asPath);
  const { service: routeService, variant } = parseRoute(asPath);
  const service = routeService || 'news';

  const [togglesResult, navResult] = await Promise.allSettled([
    fetchToggles({ service, isAmp }),
    fetchConfig<{ data: { items: Navigation[] } }>({
      service,
      pagePath: asPath,
      configType: 'navigation',
      variant: variant || undefined,
    }),
  ]);

  const toggles =
    togglesResult.status === 'fulfilled' ? togglesResult.value : {};
  const navItems =
    navResult.status === 'fulfilled' && navResult.value
      ? (navResult.value.data?.items ?? null)
      : null;

  const requestHeaders = ctx.req?.headers;
  const extractedHeaders = extractHeaders(requestHeaders || {});
  const idctaConfig = await getIdctaConfig(toggles, service, requestHeaders);
  const pageType =
    (requestHeaders?.['page-type'] as PageTypes) || derivePageType(asPath);
  const serverSideExperiments = getServerExperiments({
    headers: requestHeaders || {},
    service,
    pageType,
  });

  addServiceChainHeader({ ctx });
  const { nonce, cspHeader } = addCspHeader({
    ctx,
    service,
    toggles,
    country: extractedHeaders.country,
    showAdsBasedOnLocation: extractedHeaders.showAdsBasedOnLocation,
  });
  addOnionLocationHeader({ ctx });
  addVaryHeader({ ctx, serverSideExperiments });
  addLinkHeader({ ctx });

  return {
    ...extractedHeaders,
    cspHeader,
    nonce,
    isApp,
    isAmp,
    isLite,
    isNextJs: true,
    serverSideExperiments,
    toggles,
    idctaConfig: idctaConfig
      ? { ...idctaConfig, availability: idctaConfig.availability ?? {} }
      : null,
    navItems,
    service,
    variant,
    pageType,
    pathname: asPath.split('?')[0],
  };
};

export default getRequestProps;

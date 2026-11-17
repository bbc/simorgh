import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import nodeLogger from '#lib/logger.node';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import getRequestProps from './getRequestProps';
import getRequestUrl from './getRequestUrl';

const logger = nodeLogger(__filename);

type RequestProps = Awaited<ReturnType<typeof getRequestProps>>;

const getHeaderRendererEnv = (context: GetServerSidePropsContext) => {
  const { SIMORGH_APP_ENV } = getEnvConfig();
  const header = context.req.headers['x-renderer-env'];

  if (
    !['local', 'test'].includes(SIMORGH_APP_ENV) ||
    context.query.renderer_env !== undefined ||
    header === undefined
  ) {
    return undefined;
  }

  if (header === 'live' || header === 'test') {
    return header;
  }

  logger.warn(ROUTING_INFORMATION, {
    message:
      'Ignoring unsupported X-Renderer-Env header; expected live or test',
    url: context.resolvedUrl,
  });
  return undefined;
};

const withRequestProps =
  <Result extends GetServerSidePropsResult<Record<string, unknown>>>(
    handler: (
      context: GetServerSidePropsContext,
      requestProps: RequestProps,
    ) => Promise<Result>,
  ) =>
  async (context: GetServerSidePropsContext) => {
    const rendererEnv = getHeaderRendererEnv(context);
    const pageContext = rendererEnv
      ? {
          ...context,
          query: { ...context.query, renderer_env: rendererEnv },
        }
      : context;
    const asPath = getRequestUrl(context);
    const requestProps = await getRequestProps({
      ...pageContext,
      asPath,
      pathname: asPath.split('?')[0],
      ...(rendererEnv && { rendererEnv }),
    });
    const result = await handler(pageContext, requestProps);

    if ('props' in result) {
      return {
        ...result,
        props: {
          ...requestProps,
          ...(await result.props),
        },
      };
    }

    return result;
  };

export default withRequestProps;

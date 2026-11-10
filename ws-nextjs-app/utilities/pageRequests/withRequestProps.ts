import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import getRequestProps from './getRequestProps';
import getRequestUrl from './getRequestUrl';

type RequestProps = Awaited<ReturnType<typeof getRequestProps>>;

const withRequestProps =
  <Result extends GetServerSidePropsResult<Record<string, unknown>>>(
    handler: (
      context: GetServerSidePropsContext,
      requestPropsPromise: Promise<RequestProps>,
    ) => Promise<Result>,
  ) =>
  async (context: GetServerSidePropsContext) => {
    const asPath = getRequestUrl(context);
    const requestPropsPromise = getRequestProps({
      ...context,
      asPath,
      pathname: asPath.split('?')[0],
    });
    const [result, requestProps] = await Promise.all([
      handler(context, requestPropsPromise),
      requestPropsPromise,
    ]);

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

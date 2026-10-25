import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import getRequestProps from './getRequestProps';

type RequestProps = Awaited<ReturnType<typeof getRequestProps>>;

const withRequestProps =
  <Result extends GetServerSidePropsResult<Record<string, unknown>>>(
    handler: (
      context: GetServerSidePropsContext,
      requestProps: RequestProps,
    ) => Promise<Result>,
  ) =>
  async (context: GetServerSidePropsContext) => {
    const requestProps = await getRequestProps({
      ...context,
      asPath: context.resolvedUrl,
      pathname: context.resolvedUrl.split('?')[0],
    });
    const result = await handler(context, requestProps);

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

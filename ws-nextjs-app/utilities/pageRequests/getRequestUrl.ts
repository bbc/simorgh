import { GetServerSidePropsContext } from 'next';

const getRequestUrl = ({
  req,
  resolvedUrl,
}: Pick<GetServerSidePropsContext, 'req' | 'resolvedUrl'>) =>
  req.url && !req.url.startsWith('/_next/data/') ? req.url : resolvedUrl;

export default getRequestUrl;

import { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildArticleATIUrl } from './buildParams';

const ArticleAtiParams = articleData => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);

  return buildArticleATIUrl(articleData, requestContext, serviceContext);
};

export default ArticleAtiParams;

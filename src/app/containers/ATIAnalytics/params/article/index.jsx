import { useContext } from 'react';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { RequestContext } from '../../../../contexts/RequestContext';
import { buildArticleATIParams } from './buildParams';

const ArticleAtiParams = articleData => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);

  return buildArticleATIParams(articleData, requestContext, serviceContext);
};

export default ArticleAtiParams;

import { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { buildMediaATIUrl } from './buildParams';

const Params = pageData => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);

  return buildMediaATIUrl(pageData, requestContext, serviceContext);
};

export default Params;

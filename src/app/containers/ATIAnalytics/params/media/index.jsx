import { useContext } from 'react';
import { RequestContext } from '../../../../contexts/RequestContext';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { buildMediaATIParams } from './buildParams';

const Params = pageData => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);

  return buildMediaATIParams(pageData, requestContext, serviceContext);
};

export default Params;

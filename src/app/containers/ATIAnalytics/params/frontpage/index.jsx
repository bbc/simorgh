import { useContext } from 'react';
import { RequestContext } from '../../../../contexts/RequestContext';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { buildFrontPageATIUrl } from './buildParams';

const FrontPageAtiParams = frontpageData => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);

  return buildFrontPageATIUrl(frontpageData, requestContext, serviceContext);
};

export default FrontPageAtiParams;

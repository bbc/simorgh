import curry from 'ramda/src/curry';
import pathSatisfies from 'ramda/src/pathSatisfies';
import servicesConfig from '../config/services';

export default curry((pageType, service) =>
  pathSatisfies(
    Boolean,
    [service, 'pageTypes', pageType, 'path'],
    servicesConfig,
  ),
);

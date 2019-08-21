import pathSatisfies from 'ramda/src/pathSatisfies';
import servicesConfig from '../config/services';

export default (pageType, service) =>
  pathSatisfies(
    Boolean,
    [service, 'pageTypes', pageType, 'path'],
    servicesConfig,
  );

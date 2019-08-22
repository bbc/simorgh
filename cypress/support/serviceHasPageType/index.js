import pathSatisfies from 'ramda/src/pathSatisfies';
import servicesConfig from '../config/services';

export default (service, pageType) =>
  pathSatisfies(
    Boolean,
    [service, 'pageTypes', pageType, 'path'],
    servicesConfig,
  );

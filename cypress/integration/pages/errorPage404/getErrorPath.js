import getPaths from '../../../support/helpers/getPaths';

export default (service, pageType) => {
  const paths = getPaths(service, pageType);
  return paths.length > 0 ? paths[0] : null;
};

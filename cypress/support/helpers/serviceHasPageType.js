import getPaths from './getPaths';

export default (service, pageType) => {
  return getPaths(service, pageType).length > 0;
};

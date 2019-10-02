const mediaIdRegex = '[a-z0-9]+';
const ampRegex = '.amp';

const buildRadioAndTvRoutes = servicesWithTvAndRadio =>
  Object.keys(servicesWithTvAndRadio).map(service => {
    return `/:service(${service})/:serviceId(${servicesWithTvAndRadio[
      service
    ].join('|')})/:mediaId(${mediaIdRegex}):amp(${ampRegex})?`;
  });

export const buildRadioAndTvDataRoutes = servicesWithTvAndRadio =>
  Object.keys(servicesWithTvAndRadio).map(service => {
    return `/:service(${service})/:serviceId(${servicesWithTvAndRadio[
      service
    ].join('|')})/:mediaId(${mediaIdRegex}).json`;
  });

export default buildRadioAndTvRoutes;

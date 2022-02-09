/* eslint-disable no-param-reassign */
export default service => {
  if (service === 'ukchinaTrad' || service === 'ukchinaSimp') {
    service = 'ukchina';
  }
  if (service === 'zhongwenTrad' || service === 'zhongwenSimp') {
    service = 'zhongwen';
  }
  if (service === 'serbianCyr' || service === 'serbianLat') {
    service = 'serbian';
  }
  return service;
};

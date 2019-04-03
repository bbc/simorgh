import deepClone from '../json/deepClone';

export const setLocationValue = value => {
  const windowLocation = deepClone(window.location);
  delete window.location;

  let locationValue = value;

  if (typeof value === 'object') {
    locationValue = {
      ...windowLocation,
      ...value,
    };
  }

  Object.defineProperty(window, 'location', {
    value: locationValue,
  });
};

export const resetLocationValue = value => {
  Object.defineProperty(window, 'location', {
    value,
  });
};

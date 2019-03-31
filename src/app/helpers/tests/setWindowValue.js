import deepClone from '../json/deepClone';

export const setWindowValue = (key, value) => {
  const windowValue = window[key];
  delete window[key];

  const newValue =
    value && typeof value === 'object'
      ? {
          ...deepClone(windowValue),
          ...value,
        }
      : value;

  Object.defineProperty(window, key, {
    value: newValue,
  });
};

export const resetWindowValue = (key, value) => {
  Object.defineProperty(window, key, {
    value,
  });
};

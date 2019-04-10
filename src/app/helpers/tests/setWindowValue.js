import deepClone from '../json/deepClone';

export const setWindowValue = (key, value) => {
  const windowValue = window[key];
  delete window[key];

  let newValue = value;

  if (value && typeof value === 'object') {
    newValue = {
      ...deepClone(windowValue),
      ...value,
    };
  }

  Object.defineProperty(window, key, {
    value: newValue,
  });
};

export const resetWindowValue = (key, value) => {
  Object.defineProperty(window, key, {
    value,
  });
};

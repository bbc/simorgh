export const setWindowObject = (key, object) => {
  const windowLocation = typeof window[key] === 'object' ? JSON.parse(JSON.stringify(window[key])): window[key];
  delete window[key];

  const newValue =
    object && typeof object === 'object'
      ? {
          ...windowLocation,
          ...object,
        }
      : object;

  Object.defineProperty(window, key, {
    value: newValue,
  });
};

export const resetWindowObject = (key, object) => {
  Object.defineProperty(window, key, {
    value: object,
  });
};

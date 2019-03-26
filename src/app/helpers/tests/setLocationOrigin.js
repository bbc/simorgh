export const setLocationOrigin = origin => {
  const windowLocation = JSON.parse(JSON.stringify(window.location));
  delete window.location;
  windowLocation.origin = origin;
  Object.defineProperty(window, 'location', {
    value: windowLocation,
  });
};

export const resetWindowLocation = windowLocation => {
  Object.defineProperty(window, 'location', {
    value: windowLocation,
  });
};

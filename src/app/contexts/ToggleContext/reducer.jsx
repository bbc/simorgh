export const updateToggles = data => ({
  type: 'UPDATE_TOGGLE_STATE',
  data,
});

export const toggleReducer = (toggleState, action) => {
  const { type, data } = action;
  switch (type) {
    case 'UPDATE_TOGGLE_STATE':
      return { ...toggleState, ...data.toggles };
    default:
      return toggleState;
  }
};

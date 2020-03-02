// toggle actions
export const updateToggles = data => ({
  type: 'UPDATE_TOGGLE_STATE',
  data,
});

export const toggleReducer = (toggleState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'UPDATE_TOGGLE_STATE':
      // TODO: In future update toggles with the data passed in, this would be from a 3rd party API.
      console.log('toggleState', toggleState);
      console.log('data', data);
      // {...toggleState, ads: action.data.adValue}
      return toggleState;
    default:
      return toggleState;
  }
};

// toggle actions
// const updateToggles = data => ({
//   type: 'UPDATE_TOGGLE_STATE',
//   data,
// });

const toggleReducer = (toggleState, action) => {
  const { type } = action;

  switch (type) {
    case 'UPDATE_TOGGLE_STATE':
      // TODO: In future update toggles with the data passed in, this would be from a 3rd party API.
      return toggleState;
    default:
      return toggleState;
  }
};

export default { toggleReducer };

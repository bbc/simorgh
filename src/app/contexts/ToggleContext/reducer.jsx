export const updateToggles = data => ({
  type: 'UPDATE_TOGGLE_STATE',
  data,
});

const adsEnabled = ({ data }) => data?.toggles?.ads?.enabled || false;

export const toggleReducer = (toggleState, action) => {
  const { type, data } = action;
  switch (type) {
    case 'UPDATE_TOGGLE_STATE':
      return {
        ...toggleState,
        ...data.toggles,
        ads: {
          enabled: adsEnabled({ data }),
        },
      };
    default:
      return toggleState;
  }
};

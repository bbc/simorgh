import pathOr from 'ramda/src/pathOr';

type ReducerProps = {
  toggleState: {
    [key: string]: {
      enabled: boolean;
      value?: string;
    };
  };
  action: {
    type: string;
    data: {
      toggles: object;
    };
  };
};

const adsEnabled = ({ data }: { data: ReducerProps['action']['data'] }) =>
  pathOr(false, ['toggles', 'ads', 'enabled'], data);

export default (
  toggleState: ReducerProps['toggleState'],
  action: ReducerProps['action'],
) => {
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

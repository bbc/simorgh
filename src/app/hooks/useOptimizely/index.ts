/* eslint-disable react-hooks/rules-of-hooks */
import useServerSide from './useServerSide';
import useClientSide from './useClientSide';

type Props = {
  experimentName?: string;
  overrideAttributes?: Record<string, string>;
  runtimeType: ExperimentState;
};

export enum ExperimentState {
  CLIENT_SIDE = 'client side experiment',
  SERVER_SIDE = 'server side experiment',
}

export default ({ experimentName, overrideAttributes, runtimeType }: Props) => {
  if (experimentName == null) return null;

  let variation = null;
  if (runtimeType === ExperimentState.SERVER_SIDE) {
    variation = useServerSide(experimentName);
  } else {
    variation = useClientSide({
      experimentName,
      overrideAttributes,
    });
  }

  return variation;
};

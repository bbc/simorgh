/* eslint-disable react-hooks/rules-of-hooks */
import useServerSide from './useServerSide';
import useClientSide from './useClientSide';

type Props = {
  experimentName: string;
  overrideAttributes?: Record<string, string>;
  experimentType: ExperimentState;
};

export enum ExperimentState {
  CLIENT_SIDE = 'client side experiment',
  SERVER_SIDE = 'server side experiment',
}

export default ({
  experimentName,
  overrideAttributes,
  experimentType,
}: Props) => {
  if (!experimentName) return null;

  let variation = null;
  if (experimentType === ExperimentState.SERVER_SIDE) {
    variation = useServerSide(experimentName);
  } else {
    variation = useClientSide({
      experimentName,
      overrideAttributes,
    });
  }

  return variation;
};

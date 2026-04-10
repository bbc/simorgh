/* eslint-disable react-hooks/rules-of-hooks */
import useServerSide from './useServerSide';
import useClientSide from './useClientSide';

export enum ExperimentType {
  CLIENT_SIDE = 'client side experiment',
  SERVER_SIDE = 'server side experiment',
}

type Props = {
  experimentName: string;
  overrideAttributes?: Record<string, string>;
  experimentType: ExperimentType;
};

export default ({
  experimentName,
  overrideAttributes,
  experimentType,
}: Props) => {
  if (!experimentName) return null;

  let variation: string | null;
  if (experimentType === ExperimentType.SERVER_SIDE) {
    variation = useServerSide(experimentName);
  } else {
    variation = useClientSide({
      experimentName,
      overrideAttributes,
    });
  }

  return variation;
};

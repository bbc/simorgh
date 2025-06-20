/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useServerSide from './useServerSide';
import useClientSide from './useClientSide';

type Props = {
  flagKey?: string;
  overrideAttributes?: Record<string, string>;
};

export enum ExperimentState {
  CLIENT_SIDE = 'client side experiment',
  SERVER_SIDE = 'server side experiment',
  NO_EXPERIMENT = 'no experiment',
}

export default ({ flagKey, overrideAttributes }: Props) => {
  const { serverSideExperiments } = useContext(RequestContext);

  if (flagKey == null) return null;

  let variation = null;
  if (serverSideExperiments && serverSideExperiments.length > 0) {
    variation = useServerSide({
      serverSideExperiments,
      flagKey,
    });
  } else {
    variation = useClientSide({
      flagKey,
      overrideAttributes,
    });
  }

  return variation;
};

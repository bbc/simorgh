/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useServerSide from './useServerSide';
import useClientSide from './useClientSide';

type Props = {
  experimentName?: string;
  overrideAttributes?: Record<string, string>;
};

export default ({ experimentName: flagKey, overrideAttributes }: Props) => {
  const { serverSideExperiments } = useContext(RequestContext);

  if (flagKey == null) return null;

  let variation = null;
  const isServerSide =
    serverSideExperiments && serverSideExperiments.length > 0;
  if (isServerSide) {
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

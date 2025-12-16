import { NextPageContext } from 'next/types';
import { ServerSideExperiment } from '#app/models/types/global';
import { getExperimentVaryHeaders } from '#src/server/utilities/experimentHeader';

const addVaryHeaders = ({
  ctx,
  serverSideExperiments,
}: {
  ctx: NextPageContext;
  serverSideExperiments: ServerSideExperiment[] | null;
}) => {
  const allVaryHeaders = ['X-Country'];
  const experimentVaryHeaders =
    serverSideExperiments && getExperimentVaryHeaders(serverSideExperiments);
  if (experimentVaryHeaders) allVaryHeaders.push(experimentVaryHeaders);

  ctx.res?.setHeader('Vary', allVaryHeaders);
};

export default addVaryHeaders;

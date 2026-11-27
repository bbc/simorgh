import { NextPageContext } from 'next/types';
import { ServerSideExperiment } from '#app/models/types/global';
import { getExperimentVaryHeaders } from '#utilities/experimentHeader';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const addVaryHeader = ({
  ctx,
  serverSideExperiments,
}: {
  ctx: Pick<NextPageContext, 'res'>;
  serverSideExperiments: ServerSideExperiment[] | null;
}) => {
  const allVaryHeaders = ['X-Country'];
  if (['local', 'test'].includes(getEnvConfig().SIMORGH_APP_ENV)) {
    allVaryHeaders.push('X-Renderer-Env');
  }
  const experimentVaryHeaders =
    serverSideExperiments && getExperimentVaryHeaders(serverSideExperiments);
  if (experimentVaryHeaders) allVaryHeaders.push(experimentVaryHeaders);

  ctx.res?.setHeader('Vary', allVaryHeaders);
};

export default addVaryHeader;

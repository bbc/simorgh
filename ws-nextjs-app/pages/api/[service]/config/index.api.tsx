import getToggles from '#app/lib/utilities/getToggles/withCache';
import fetchConfig from '#app/lib/utilities/fetchConfig';
import { Services } from '#app/models/types/global';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { service } = req.query as { service: Services };

  const [togglesResult, navigationResult] = await Promise.allSettled([
    getToggles(service),
    fetchConfig({ service, configType: 'navigation' }),
  ]);

  return res.status(200).json({
    toggles: togglesResult.status === 'fulfilled' ? togglesResult.value : {},
    navigation:
      navigationResult.status === 'fulfilled' ? navigationResult.value : {},
  });
}

import getToggles from '#app/lib/utilities/getToggles/withCache';
import fetchConfig from '#app/lib/utilities/fetchConfig';
import { Services, Toggles } from '#app/models/types/global';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { service } = req.query as { service: Services };

    if (!service) {
      return res.status(400).json({ error: 'Service parameter is required' });
    }

    const shouldFetchNavigation = service === 'indonesia';

    const [togglesResult, navigationResult] = await Promise.allSettled([
      getToggles(service),
      ...(shouldFetchNavigation
        ? [fetchConfig({ service, configType: 'navigation' })]
        : []),
    ]);

    const toggles =
      togglesResult?.status === 'fulfilled'
        ? (togglesResult.value as Toggles)
        : {};

    const navigation =
      navigationResult?.status === 'fulfilled' ? navigationResult.value : {};

    if (
      togglesResult.status === 'rejected' &&
      navigationResult.status === 'rejected'
    ) {
      return res.status(500).json({
        error: 'Failed to fetch toggles and navigation config',
      });
    }

    return res.status(200).json({ toggles, navigation });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

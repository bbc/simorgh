import nodeLogger from '#app/lib/logger.node';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const logger = nodeLogger(__filename);

type FetchPolledDataParams = {
  params: Record<string, string | number | boolean>;
};

type FetchPolledDataResponse = {
  data: unknown;
  status: number;
} | null;

export default async (
  module: string,
  { params }: FetchPolledDataParams,
): Promise<FetchPolledDataResponse> => {
  try {
    const webCdnHost = getEnvConfig().WEB_CDN_URL;

    if (!webCdnHost) {
      logger.error('poll_data_missing_cdn_host', {
        module,
      });
      return null;
    }

    const fetchUrl = new URL(`${webCdnHost}/ws/poll-data/${module}`);

    Object.entries(params).forEach(([key, value]) => {
      fetchUrl.searchParams.append(key, String(value));
    });

    const response = await fetch(fetchUrl.toString());
    const { status } = response;

    if (status !== 200) {
      logger.error('poll_data_non_200_status', {
        module,
        status,
        url: fetchUrl.toString(),
      });
      return null;
    }

    const { data } = await response.json();
    return { data, status };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));

    if (err instanceof TypeError) {
      logger.error('poll_data_fetch_error', {
        module,
        error: error.message,
      });
    } else {
      logger.error('poll_data_parse_error', {
        module,
        error: error.message,
      });
    }

    return null;
  }
};

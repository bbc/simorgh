import { useEffect, useState } from 'react';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, ACTIVITY_TYPE } from '#app/lib/uasApi/uasUtility';
import { HTTP_NO_CONTENT } from '#app/lib/statusCodes.const';

/** A hook that fetches an article’s saved status from the UAS API,
 * returning the saved status, loading state, and any error encountered. */

interface UseUASFetchSaveStatusReturn {
  isSaved: boolean;
  isLoading: boolean;
  error: Error | null;
}

const useUASFetchSaveStatus = (
  articleId: string,
): UseUASFetchSaveStatusReturn => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!articleId) return;
    const abortController = new AbortController();

    const fetchArticleSaveStatus = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const globalId = buildGlobalId(articleId);
        const response = await uasApiRequest('GET', ACTIVITY_TYPE, {
          globalId,
          signal: abortController.signal,
        });

        // If response is successful and not 204 (No Content), article is saved
        // 204 means no content found - article not saved
        const articleIsSaved =
          response.ok && response.status !== HTTP_NO_CONTENT;
        setIsSaved(articleIsSaved);
      } catch (err) {
        // If the request was aborted, don't update state
        const isAbort = (err as { name?: string })?.name === 'AbortError';
        if (isAbort) return;

        // If API call fails or returns error, treat as not saved
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsSaved(false);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleSaveStatus();

    // eslint-disable-next-line consistent-return
    return () => {
      abortController.abort();
    };
  }, [articleId]);

  return { isSaved, isLoading, error };
};

export default useUASFetchSaveStatus;

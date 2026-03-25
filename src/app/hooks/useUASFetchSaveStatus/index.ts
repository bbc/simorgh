import { useEffect, useState } from 'react';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, ACTIVITY_TYPE } from '#app/lib/uasApi/uasUtility';

/** A hook that fetches an article’s saved status from the UAS API,
 * returning the saved status, loading state, and any error encountered. */

interface useUASFetchSaveStatusReturn {
  isSaved: boolean;
  loading: boolean;
  error: Error | null;
}

const useUASFetchSaveStatus = (
  articleId: string,
): useUASFetchSaveStatusReturn => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!articleId) return;
    const fetchArticleSaveStatus = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const globalId = buildGlobalId(articleId);
        const response = await uasApiRequest('GET', ACTIVITY_TYPE, {
          globalId,
        });

        // If response is successful and not 204 (No Content), article is saved
        // 204 means no content found - article not saved
        const articleIsSaved = response.ok && response.status !== 204;
        setIsSaved(articleIsSaved);
      } catch (err) {
        // If API call fails or returns error, treat as not saved
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsSaved(false);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleSaveStatus();
  }, [articleId]);

  return { isSaved, loading, error };
};

export default useUASFetchSaveStatus;

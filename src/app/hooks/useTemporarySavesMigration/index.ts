import { use, useEffect, useState } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import type { Services } from '#app/models/types/global';
import uasApiRequest from '#app/lib/uasApi';
import { FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';

/* eslint-disable no-console */

interface TemporarySavedArticle {
  id: string;
  title: string;
  link: string;
  imageUrl?: string;
  imageAlt?: string;
  promoImage?: string;
  type: string;
  description: string;
  savedAt: number;
}

const STORAGE_KEY = 'bbc_temp_saved_articles';
const EXPIRY_KEY = 'bbc_temp_saved_articles_expiry';
const MIGRATION_FLAG_KEY = 'bbc_temp_saves_migrated';
const MIGRATION_BANNER_KEY = 'bbc_show_migration_banner';

/**
 * Hook to automatically migrate temporary saved articles to UAS when user signs in.
 * This ensures articles saved during guest preview are persisted after registration/sign-in.
 *
 * NOTE: This hook must be used within a dynamic import boundary where TanStack Query is available.
 */
const useTemporarySavesMigration = () => {
  const { isPersonalizationEnabled, hashedUserId, isRefreshAvailable } =
    use(AccountContext);
  const { service } = use(ServiceContext);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);

  useEffect(() => {
    const migrateTemporarySaves = async () => {
      // Only migrate if:
      // 1. User is now signed in (personalization enabled)
      // 2. Not already migrating
      // 3. Migration hasn't been completed in this session
      // 4. We have a hashed user ID
      if (
        !isPersonalizationEnabled ||
        isMigrating ||
        migrationComplete ||
        !hashedUserId
      ) {
        return;
      }

      // Check if migration already happened for this user
      const migrationFlag = sessionStorage.getItem(MIGRATION_FLAG_KEY);
      if (migrationFlag === hashedUserId) {
        setMigrationComplete(true);
        return;
      }

      // Get temporary saved articles from localStorage
      const storedArticles = localStorage.getItem(STORAGE_KEY);
      if (!storedArticles) {
        return; // No temporary saves to migrate
      }

      try {
        const articles: TemporarySavedArticle[] = JSON.parse(storedArticles);

        if (articles.length === 0) {
          return; // No articles to migrate
        }

        setIsMigrating(true);

        // Migrate each article to UAS using direct API calls
        const migrationPromises = articles.map(async article => {
          try {
            // Build metadata for the article
            const metadata = {
              articleId: article.id,
              service: (article.description as Services) || service,
              title: article.title,
              promoImage: article.promoImage || article.imageUrl,
              promoImageAltText: article.imageAlt,
              locatorUrl: article.link,
            };

            // Create the UAS payload
            const body = {
              activityType: FAVOURITES_CONFIG.activityType,
              resourceDomain: FAVOURITES_CONFIG.resourceDomain,
              resourceType: FAVOURITES_CONFIG.resourceType,
              resourceId: article.id,
              action: FAVOURITES_CONFIG.action,
              resourceTitle: (article.description as Services) || service,
              metaData: metadata,
            };

            // POST to UAS
            await uasApiRequest('POST', FAVOURITES_CONFIG.activityType, {
              body,
              isRefreshAvailable,
            });

            return { success: true, articleId: article.id };
          } catch (error) {
            // Log error but continue with other articles
            console.error(
              `Failed to migrate article ${article.id}:`,
              error instanceof Error ? error.message : error,
            );
            return { success: false, articleId: article.id };
          }
        });

        const results = await Promise.allSettled(migrationPromises);

        // Count successful migrations
        const successCount = results.filter(
          result => result.status === 'fulfilled' && result.value.success,
        ).length;

        if (successCount > 0) {
          // Set flag to show migration success banner
          sessionStorage.setItem(MIGRATION_BANNER_KEY, 'true');
        }

        // Clear temporary storage after migration
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(EXPIRY_KEY);

        // Mark migration as complete for this session
        sessionStorage.setItem(MIGRATION_FLAG_KEY, hashedUserId);
        setMigrationComplete(true);

        // Force a page reload to refresh the My News content from UAS
        if (successCount > 0 && typeof window !== 'undefined') {
          window.location.reload();
        }
      } catch (error) {
        console.error(
          'Failed to migrate temporary saves:',
          error instanceof Error ? error.message : error,
        );
      } finally {
        setIsMigrating(false);
      }
    };

    migrateTemporarySaves();
  }, [
    isPersonalizationEnabled,
    hashedUserId,
    service,
    isRefreshAvailable,
    isMigrating,
    migrationComplete,
  ]);

  return {
    isMigrating,
    migrationComplete,
  };
};

export default useTemporarySavesMigration;

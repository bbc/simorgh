import dynamic from 'next/dynamic';

const DeleteSavedArticleIfDeletedClient = dynamic(
  () => import('./DeleteSavedArticleIfDeletedClient'),
  { ssr: false },
);

interface DeleteSavedArticleIfDeletedProps {
  errorCode?: number;
}

/**
 * Wrapper component for DeleteSavedArticleIfDeleted.
 * Uses Next.js dynamic import with ssr: false to ensure the component
 * is only rendered on the client after hydration, avoiding SSR errors
 * from React Query hooks.
 */
const DeleteSavedArticleIfDeleted = ({
  errorCode,
}: DeleteSavedArticleIfDeletedProps) => (
  <DeleteSavedArticleIfDeletedClient errorCode={errorCode} />
);

export default DeleteSavedArticleIfDeleted;

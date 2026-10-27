import dynamic from 'next/dynamic';

// TanStack Query must not be bundled server-side — ssr: false ensures the
// client component (and its useQueryClient call) only loads after hydration.
const ArticleNotFoundUASCleanup = dynamic(
  () => import('./ArticleNotFoundUASCleanup'),
  { ssr: false },
);

export default ArticleNotFoundUASCleanup;

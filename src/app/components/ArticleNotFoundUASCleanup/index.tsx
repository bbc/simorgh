import dynamic from 'next/dynamic';
import loadQueryConsumer from '#app/contexts/QueryContext/loadQueryConsumer';

const ArticleNotFoundUASCleanup = dynamic(
  () => loadQueryConsumer(import('./ArticleNotFoundUASCleanup')),
  { ssr: false },
);

export default ArticleNotFoundUASCleanup;

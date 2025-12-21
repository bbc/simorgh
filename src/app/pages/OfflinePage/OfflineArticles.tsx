/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { use } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import styles from './index.styles';

 const OFFLINE_ARTICLE_IDS = [
  'cwl08rd38l6o',
  'cwkvd1410e9o',
  'crd2mn2lyqqo',
  'c1x0rq3r97ko',
  'c578zj113e9o',
];

const OfflineArticles = () => {
  const { service } = use(ServiceContext);

  const handleArticleClick = async (articleId: string) => {
    // Pre-fetch and store article data in sessionStorage for offline access
    try {
      const url = `/${service}/articles/${articleId}.json`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem(`offlineArticle_${articleId}`, JSON.stringify(data));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Could not pre-fetch article ${articleId}:`, error);
    }
  };

  return (
    <div css={styles.container}>
      <h2 css={styles.heading}>Available Offline Articles</h2>
      <ul css={styles.grid}>
        {OFFLINE_ARTICLE_IDS.map(articleId => (
          <li key={articleId}>
            <a
              css={styles.articleBox}
              href={`/${service}/articles/${articleId}`}
              onClick={() => handleArticleClick(articleId)}
            >
              <h3 css={styles.articleTitle}>
                Article ${articleId}
              </h3>
              <span css={styles.articleContent}>.......</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfflineArticles;

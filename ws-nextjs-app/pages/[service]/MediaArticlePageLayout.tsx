import React from 'react';
import { MediaArticlePage } from '../../../src/app/pages/index';
import { 
  MEDIA_ARTICLE_PAGE, 
  MEDIA_ASSET_PAGE 
} from '#app/routes/utils/pageTypes';
import { Article } from '#app/models/types/optimo';

type MediaArticlePageProps = {
  pageData: Article;
  pageType: typeof MEDIA_ARTICLE_PAGE | typeof MEDIA_ASSET_PAGE;
  error?: string;
  status?: number;
  isAmp?: boolean;
  isApp?: boolean;
  isLite?: boolean;
  isNextJs?: boolean;
  pathname?: string;
  service?: string;
  toggles?: any;
  variant?: string;
  timeOnServer?: number;
  id?: string;
};

const MediaArticlePageLayout = (props: MediaArticlePageProps) => {
  const { pageData, pageType, error, status, ...restProps } = props;
  
  // If there's an error or no page data, return error state
  if (error || !pageData || status !== 200) {
    return (
      <div>
        <h1>Error loading page</h1>
        <p>{error || 'Page not found'}</p>
      </div>
    );
  }

  // Use the existing MediaArticlePage component
  return <MediaArticlePage pageData={pageData} pageType={pageType} {...restProps} />;
};

export default MediaArticlePageLayout;
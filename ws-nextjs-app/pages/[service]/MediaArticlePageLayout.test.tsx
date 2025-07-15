import React from 'react';
import { render } from '@testing-library/react';
import { MEDIA_ARTICLE_PAGE, MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import MediaArticlePageLayout from './MediaArticlePageLayout';

// Mock the MediaArticlePage component
jest.mock('../../../src/app/pages/index', () => ({
  MediaArticlePage: ({ pageData, pageType }: any) => (
    <div>
      <h1>MediaArticlePage</h1>
      <p>Page Type: {pageType}</p>
      <p>Page Data: {JSON.stringify(pageData)}</p>
    </div>
  ),
}));

describe('MediaArticlePageLayout', () => {
  const mockPageData = {
    metadata: {
      type: MEDIA_ARTICLE_PAGE,
    },
    content: {
      model: {
        blocks: [],
      },
    },
  };

  it('renders MediaArticlePage with correct props for MEDIA_ARTICLE_PAGE', () => {
    const { getByText } = render(
      <MediaArticlePageLayout 
        pageData={mockPageData} 
        pageType={MEDIA_ARTICLE_PAGE}
        status={200}
      />
    );

    expect(getByText('MediaArticlePage')).toBeInTheDocument();
    expect(getByText(`Page Type: ${MEDIA_ARTICLE_PAGE}`)).toBeInTheDocument();
  });

  it('renders MediaArticlePage with correct props for MEDIA_ASSET_PAGE', () => {
    const { getByText } = render(
      <MediaArticlePageLayout 
        pageData={mockPageData} 
        pageType={MEDIA_ASSET_PAGE}
        status={200}
      />
    );

    expect(getByText('MediaArticlePage')).toBeInTheDocument();
    expect(getByText(`Page Type: ${MEDIA_ASSET_PAGE}`)).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    const { getByText } = render(
      <MediaArticlePageLayout 
        pageData={mockPageData} 
        pageType={MEDIA_ARTICLE_PAGE}
        error="Test error"
        status={500}
      />
    );

    expect(getByText('Error loading page')).toBeInTheDocument();
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('renders error state when pageData is null', () => {
    const { getByText } = render(
      <MediaArticlePageLayout 
        pageData={null as any} 
        pageType={MEDIA_ARTICLE_PAGE}
        status={404}
      />
    );

    expect(getByText('Error loading page')).toBeInTheDocument();
    expect(getByText('Page not found')).toBeInTheDocument();
  });

  it('renders error state when status is not 200', () => {
    const { getByText } = render(
      <MediaArticlePageLayout 
        pageData={mockPageData} 
        pageType={MEDIA_ARTICLE_PAGE}
        status={404}
      />
    );

    expect(getByText('Error loading page')).toBeInTheDocument();
    expect(getByText('Page not found')).toBeInTheDocument();
  });
});
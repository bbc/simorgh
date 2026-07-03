import { renderHook } from '#app/components/react-testing-library-with-providers';
import * as uasUtility from '#app/lib/uasApi/uasUtility';
import { ArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import useUASMetadataSync from './index';

jest.mock('#app/lib/uasApi/uasUtility');

const mockBuildCurrentMetadata = uasUtility.buildCurrentMetadata as jest.Mock;
const mockCompareMetadataWithSaved =
  uasUtility.compareMetadataWithSaved as jest.Mock;

describe('useUASMetadataSync', () => {
  const mockArticlePageData: ArticlePageData = {
    contentBlocks: [{ type: 'text', model: { blocks: [{ text: 'Content' }] } }],
    canonicalUrl: 'https://bbc.com/article',
  };

  const mockSavedMetadata = {
    title: 'Old Title',
    promoImage: 'https://ichef.bbc.co.uk/image.jpg',
    locatorUrl: 'https://bbc.com/article',
  };

  const mockOnMetadataOutOfDate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockBuildCurrentMetadata.mockReturnValue({
      title: 'New Title',
      promoImage: 'https://ichef.bbc.co.uk/image.jpg',
    });
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: false,
    });
  });

  it('calls buildCurrentMetadata with correct arguments', () => {
    renderHook(() =>
      useUASMetadataSync({
        articlePageData: mockArticlePageData,
        articleId: 'c123456789o',
        service: 'hindi',
        isSaved: true,
        savedArticleMetadata: mockSavedMetadata,
        onMetadataOutOfDate: mockOnMetadataOutOfDate,
      }),
    );

    expect(mockBuildCurrentMetadata).toHaveBeenCalledWith(mockArticlePageData, {
      articleId: 'c123456789o',
      service: 'hindi',
    });
  });

  it('calls compareMetadataWithSaved with current and saved metadata', () => {
    const currentMetadata = {
      title: 'New Title',
      promoImage: 'https://ichef.bbc.co.uk/image.jpg',
    };
    mockBuildCurrentMetadata.mockReturnValue(currentMetadata);

    renderHook(() =>
      useUASMetadataSync({
        articlePageData: mockArticlePageData,
        articleId: 'c123456789o',
        service: 'hindi',
        isSaved: true,
        savedArticleMetadata: mockSavedMetadata,
        onMetadataOutOfDate: mockOnMetadataOutOfDate,
      }),
    );

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledWith(
      currentMetadata,
      mockSavedMetadata,
    );
  });

  it('calls onMetadataOutOfDate when metadata has changes', () => {
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: true,
    });

    const mockCallback = jest.fn();

    renderHook(() =>
      useUASMetadataSync({
        articlePageData: mockArticlePageData,
        articleId: 'c123456789o',
        service: 'hindi',
        isSaved: true,
        savedArticleMetadata: mockSavedMetadata,
        onMetadataOutOfDate: mockCallback,
      }),
    );

    expect(mockCallback).toHaveBeenCalled();
  });

  it('does not call onMetadataOutOfDate when metadata has no changes', () => {
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: false,
    });

    renderHook(() =>
      useUASMetadataSync({
        articlePageData: mockArticlePageData,
        articleId: 'c123456789o',
        service: 'hindi',
        isSaved: true,
        savedArticleMetadata: mockSavedMetadata,
        onMetadataOutOfDate: mockOnMetadataOutOfDate,
      }),
    );

    expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
  });

  it('does not call onMetadataOutOfDate when article is not saved', () => {
    renderHook(() =>
      useUASMetadataSync({
        articlePageData: mockArticlePageData,
        articleId: 'c123456789o',
        service: 'hindi',
        isSaved: false,
        savedArticleMetadata: mockSavedMetadata,
        onMetadataOutOfDate: mockOnMetadataOutOfDate,
      }),
    );

    expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
  });

  it('does not call onMetadataOutOfDate when savedArticleMetadata is missing', () => {
    renderHook(() =>
      useUASMetadataSync({
        articlePageData: mockArticlePageData,
        articleId: 'c123456789o',
        service: 'hindi',
        isSaved: true,
        savedArticleMetadata: undefined,
        onMetadataOutOfDate: mockOnMetadataOutOfDate,
      }),
    );

    expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
  });

  it('prevents duplicate syncs on same article load', () => {
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: true,
    });

    const stableCallback = jest.fn();

    const { rerender } = renderHook(() =>
      useUASMetadataSync({
        articlePageData: mockArticlePageData,
        articleId: 'c123456789o',
        service: 'hindi',
        isSaved: true,
        savedArticleMetadata: mockSavedMetadata,
        onMetadataOutOfDate: stableCallback,
      }),
    );

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
    expect(stableCallback).toHaveBeenCalledTimes(1);

    // Rerender with same props - should not sync again due to hasSyncedRef
    rerender();

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
    expect(stableCallback).toHaveBeenCalledTimes(1);
  });

  it('allows new sync when article changes', () => {
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: true,
    });

    const stableCallback = jest.fn();

    const { rerender } = renderHook(
      ({ articleId }: { articleId: string }) =>
        useUASMetadataSync({
          articlePageData: mockArticlePageData,
          articleId,
          service: 'hindi',
          isSaved: true,
          savedArticleMetadata: mockSavedMetadata,
          onMetadataOutOfDate: stableCallback,
        }),
      { initialProps: { articleId: 'c123456789o' } },
    );

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);

    // Rerender with new articleId - should sync again
    rerender({ articleId: 'c987654321o' });

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
  });

  it('resets sync state when saved state changes from true to false', () => {
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: true,
    });

    const stableCallback = jest.fn();

    const { rerender } = renderHook(
      ({ isSaved }: { isSaved: boolean }) =>
        useUASMetadataSync({
          articlePageData: mockArticlePageData,
          articleId: 'c123456789o',
          service: 'hindi',
          isSaved,
          savedArticleMetadata: mockSavedMetadata,
          onMetadataOutOfDate: stableCallback,
        }),
      { initialProps: { isSaved: true } },
    );

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);

    // Change to unsaved - should not call sync
    rerender({ isSaved: false });

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);

    // Change back to saved - should call sync again (hasSyncedRef reset)
    rerender({ isSaved: true });

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(2);
  });

  it('handles missing onMetadataOutOfDate callback gracefully', () => {
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: true,
    });

    expect(() => {
      renderHook(() =>
        useUASMetadataSync({
          articlePageData: mockArticlePageData,
          articleId: 'c123456789o',
          service: 'hindi',
          isSaved: true,
          savedArticleMetadata: mockSavedMetadata,
          onMetadataOutOfDate: undefined,
        }),
      );
    }).not.toThrow();
  });
});

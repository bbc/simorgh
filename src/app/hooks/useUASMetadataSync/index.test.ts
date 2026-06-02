import { renderHook } from '#app/components/react-testing-library-with-providers';
import * as uasUtility from '#app/lib/uasApi/uasUtility';
import useUASMetadataSync from './index';

jest.mock('#app/lib/uasApi/uasUtility');

const mockBuildCurrentMetadata = uasUtility.buildCurrentMetadata as jest.Mock;
const mockBuildMetadataFieldExtractors =
  uasUtility.buildMetadataFieldExtractors as jest.Mock;
const mockCompareMetadataWithSaved =
  uasUtility.compareMetadataWithSaved as jest.Mock;

describe('useUASMetadataSync', () => {
  const mockArticlePageData = {
    id: 'c123456789o',
    metadata: {
      canonicalUrl: 'https://bbc.com/article',
    },
    promo: {
      images: {
        defaultPromoImage: {
          path: '/image.jpg',
        },
      },
    },
    content: [{ type: 'text', model: { blocks: [{ text: 'Content' }] } }],
    mostRead: [],
  } as unknown as import('#app/models/types/optimo').Article;

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
    mockBuildMetadataFieldExtractors.mockReturnValue({});
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: false,
      changedFields: [],
      fieldDetails: {},
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

  it('calls buildMetadataFieldExtractors with articlePageData', () => {
    renderHook(() =>
      useUASMetadataSync({
        articlePageData: mockArticlePageData,
        articleId: 'c123456789o',
        service: 'portuguese',
        isSaved: true,
        savedArticleMetadata: mockSavedMetadata,
        onMetadataOutOfDate: mockOnMetadataOutOfDate,
      }),
    );

    expect(mockBuildMetadataFieldExtractors).toHaveBeenCalledWith(
      mockArticlePageData,
    );
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
      {},
    );
  });

  it('calls onMetadataOutOfDate when metadata has changes', () => {
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: true,
      changedFields: ['title', 'promoImage'],
      fieldDetails: {
        title: { old: 'Old Title', new: 'New Title' },
        promoImage: {
          old: 'https://ichef.bbc.co.uk/old.jpg',
          new: 'https://ichef.bbc.co.uk/new.jpg',
        },
      },
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

    expect(mockOnMetadataOutOfDate).toHaveBeenCalled();
  });

  it('does not call onMetadataOutOfDate when metadata has no changes', () => {
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: false,
      changedFields: [],
      fieldDetails: {},
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

  it('does not call onMetadataOutOfDate when articlePageData is missing', () => {
    renderHook(() =>
      useUASMetadataSync({
        articlePageData: undefined,
        articleId: 'c123456789o',
        service: 'hindi',
        isSaved: true,
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
    const { rerender } = renderHook(() =>
      useUASMetadataSync({
        articlePageData: mockArticlePageData,
        articleId: 'c123456789o',
        service: 'hindi',
        isSaved: true,
        savedArticleMetadata: mockSavedMetadata,
        onMetadataOutOfDate: mockOnMetadataOutOfDate,
      }),
    );

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);

    // Rerender with same props - should not sync again due to hasSyncedRef
    rerender();

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
  });

  it('allows new sync when article changes', () => {
    const { rerender } = renderHook(
      ({ articleId }: { articleId: string }) =>
        useUASMetadataSync({
          articlePageData: mockArticlePageData,
          articleId,
          service: 'hindi',
          isSaved: true,
          savedArticleMetadata: mockSavedMetadata,
          onMetadataOutOfDate: mockOnMetadataOutOfDate,
        }),
      { initialProps: { articleId: 'c123456789o' } },
    );

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);

    // Rerender with new articleId - should sync again
    rerender({ articleId: 'c987654321o' });

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(2);
  });

  it('resets sync state when saved state changes from true to false', () => {
    const { rerender } = renderHook(
      ({ isSaved }: { isSaved: boolean }) =>
        useUASMetadataSync({
          articlePageData: mockArticlePageData,
          articleId: 'c123456789o',
          service: 'hindi',
          isSaved,
          savedArticleMetadata: mockSavedMetadata,
          onMetadataOutOfDate: mockOnMetadataOutOfDate,
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
      changedFields: ['title'],
      fieldDetails: { title: { old: 'Old', new: 'New' } },
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

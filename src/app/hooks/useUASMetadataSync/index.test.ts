import { renderHook } from '#app/components/react-testing-library-with-providers';
import * as uasUtility from '#app/lib/uasApi/uasUtility';
import { SaveArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import useUASMetadataSync from './index';

jest.mock('#app/lib/uasApi/uasUtility');

const mockBuildCurrentMetadata = uasUtility.buildCurrentMetadata as jest.Mock;
const mockBuildTopicMetadata = uasUtility.buildTopicMetadata as jest.Mock;
const mockCompareMetadataWithSaved =
  uasUtility.compareMetadataWithSaved as jest.Mock;

describe('useUASMetadataSync', () => {
  const mockArticlePageData: SaveArticlePageData = {
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
        saveArticlePageData: mockArticlePageData,
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
        saveArticlePageData: mockArticlePageData,
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
        saveArticlePageData: mockArticlePageData,
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
        saveArticlePageData: mockArticlePageData,
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
        saveArticlePageData: mockArticlePageData,
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
        saveArticlePageData: mockArticlePageData,
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
        saveArticlePageData: mockArticlePageData,
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
          saveArticlePageData: mockArticlePageData,
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

    expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(2);
    expect(stableCallback).toHaveBeenCalledTimes(2);
  });

  it('resets sync state when saved state changes from true to false', () => {
    mockCompareMetadataWithSaved.mockReturnValue({
      hasChanges: true,
    });

    const stableCallback = jest.fn();

    const { rerender } = renderHook(
      ({ isSaved }: { isSaved: boolean }) =>
        useUASMetadataSync({
          saveArticlePageData: mockArticlePageData,
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
          saveArticlePageData: mockArticlePageData,
          articleId: 'c123456789o',
          service: 'hindi',
          isSaved: true,
          savedArticleMetadata: mockSavedMetadata,
          onMetadataOutOfDate: undefined,
        }),
      );
    }).not.toThrow();
  });

  describe('followed topics', () => {
    const topicData = {
      topicId: 'climate-change',
      title: 'Climate change',
      url: '/hindi/topics/climate-change',
    };
    const currentMetadata = {
      topicId: topicData.topicId,
      title: topicData.title,
      locatorUrl: topicData.url,
      service: 'hindi',
    };
    const topicParams = {
      followTopicPageData: topicData,
      topicId: topicData.topicId,
      service: 'hindi' as const,
      isFollowed: true,
      savedTopicMetadata: { ...currentMetadata, title: 'Old title' },
      onMetadataOutOfDate: mockOnMetadataOutOfDate,
    };

    beforeEach(() => {
      mockBuildTopicMetadata.mockReturnValue(currentMetadata);
    });

    it('builds and compares topic metadata before syncing changes', () => {
      mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });

      renderHook(() => useUASMetadataSync(topicParams));

      expect(mockBuildTopicMetadata).toHaveBeenCalledWith(topicData, 'hindi');
      expect(mockBuildCurrentMetadata).not.toHaveBeenCalled();
      expect(mockCompareMetadataWithSaved).toHaveBeenCalledWith(
        currentMetadata,
        topicParams.savedTopicMetadata,
      );
      expect(mockOnMetadataOutOfDate).toHaveBeenCalledTimes(1);
    });

    it('does not sync unchanged topic metadata', () => {
      renderHook(() => useUASMetadataSync(topicParams));

      expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
      expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
    });

    it.each([{ isFollowed: false }, { savedTopicMetadata: undefined }])(
      'does not compare or sync when unavailable: %o',
      overrides => {
        renderHook(() => useUASMetadataSync({ ...topicParams, ...overrides }));

        expect(mockBuildTopicMetadata).not.toHaveBeenCalled();
        expect(mockCompareMetadataWithSaved).not.toHaveBeenCalled();
        expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
      },
    );

    it('prevents duplicate syncs when inputs are recreated', () => {
      mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });
      const { rerender } = renderHook(() =>
        useUASMetadataSync({
          ...topicParams,
          followTopicPageData: { ...topicData },
          savedTopicMetadata: { ...topicParams.savedTopicMetadata },
        }),
      );

      rerender();

      expect(mockOnMetadataOutOfDate).toHaveBeenCalledTimes(1);
      expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
    });

    it('allows syncing another topic', () => {
      mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });
      const { rerender } = renderHook(
        ({ topicId }) =>
          useUASMetadataSync({
            ...topicParams,
            topicId,
            followTopicPageData: { ...topicData, topicId },
          }),
        { initialProps: { topicId: topicData.topicId } },
      );

      rerender({ topicId: 'science' });

      expect(mockOnMetadataOutOfDate).toHaveBeenCalledTimes(2);
    });

    it('allows syncing the same topic for a different service', () => {
      mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });
      const { rerender } = renderHook(
        ({ service }: { service: 'hindi' | 'arabic' }) =>
          useUASMetadataSync({ ...topicParams, service }),
        { initialProps: { service: 'hindi' } },
      );

      rerender({ service: 'arabic' });

      expect(mockBuildTopicMetadata).toHaveBeenLastCalledWith(
        topicData,
        'arabic',
      );
      expect(mockOnMetadataOutOfDate).toHaveBeenCalledTimes(2);
    });

    it.each(['unfollowed', 'missing metadata'])(
      'resets sync protection when %s',
      state => {
        mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });
        const { rerender } = renderHook(
          ({ unavailable }) =>
            useUASMetadataSync({
              ...topicParams,
              isFollowed: !(unavailable && state === 'unfollowed'),
              savedTopicMetadata:
                unavailable && state === 'missing metadata'
                  ? undefined
                  : topicParams.savedTopicMetadata,
            }),
          { initialProps: { unavailable: false } },
        );

        rerender({ unavailable: true });
        expect(mockOnMetadataOutOfDate).toHaveBeenCalledTimes(1);

        rerender({ unavailable: false });
        expect(mockOnMetadataOutOfDate).toHaveBeenCalledTimes(2);
      },
    );
  });
});

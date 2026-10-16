import { renderHook } from '#app/components/react-testing-library-with-providers';
import * as uasUtility from '#app/lib/uasApi/uasUtility';
import { SaveArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import useUASMetadataSync from './index';

jest.mock('#app/lib/uasApi/uasUtility');

const mockBuildCurrentMetadata = uasUtility.buildCurrentMetadata as jest.Mock;
const mockBuildTopicMetadata = uasUtility.buildTopicMetadata as jest.Mock;
const mockCompareMetadataWithSaved =
  uasUtility.compareMetadataWithSaved as jest.Mock;
const mockOnMetadataOutOfDate = jest.fn();
const stableCallback = jest.fn();

describe('useUASMetadataSync', () => {
  describe('for saved articles', () => {
    const mockArticlePageData: SaveArticlePageData = {
      canonicalUrl: 'https://bbc.com/article',
    };

    const mockSavedMetadata = {
      title: 'Old Title',
      promoImage: 'https://ichef.bbc.co.uk/image.jpg',
      locatorUrl: mockArticlePageData.canonicalUrl,
    };

    const mockArticleParams = {
      saveArticlePageData: mockArticlePageData,
      articleId: 'c123456789o',
      service: 'hindi' as const,
      isSaved: true,
      savedArticleMetadata: mockSavedMetadata,
      onMetadataOutOfDate: mockOnMetadataOutOfDate,
    };

    beforeEach(() => {
      jest.clearAllMocks();
      mockBuildCurrentMetadata.mockReturnValue({
        title: 'New Title',
        promoImage: mockSavedMetadata.promoImage,
      });
      mockCompareMetadataWithSaved.mockReturnValue({
        hasChanges: false,
      });
    });

    it('calls buildCurrentMetadata with correct arguments', () => {
      renderHook(() => useUASMetadataSync(mockArticleParams));

      expect(mockBuildCurrentMetadata).toHaveBeenCalledWith(
        mockArticlePageData,
        {
          articleId: mockArticleParams.articleId,
          service: mockArticleParams.service,
        },
      );
    });

    it('calls compareMetadataWithSaved with current and saved metadata', () => {
      const currentMetadata = {
        title: 'New Title',
        promoImage: mockSavedMetadata.promoImage,
      };
      mockBuildCurrentMetadata.mockReturnValue(currentMetadata);

      renderHook(() => useUASMetadataSync(mockArticleParams));

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
          ...mockArticleParams,
          onMetadataOutOfDate: mockCallback,
        }),
      );

      expect(mockCallback).toHaveBeenCalled();
    });

    it('does not call onMetadataOutOfDate when metadata has no changes', () => {
      mockCompareMetadataWithSaved.mockReturnValue({
        hasChanges: false,
      });

      renderHook(() => useUASMetadataSync(mockArticleParams));

      expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
    });

    it('does not call onMetadataOutOfDate when article is not saved', () => {
      renderHook(() =>
        useUASMetadataSync({
          ...mockArticleParams,
          isSaved: false,
        }),
      );

      expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
    });

    it('does not call onMetadataOutOfDate when savedArticleMetadata is missing', () => {
      renderHook(() =>
        useUASMetadataSync({
          ...mockArticleParams,
          savedArticleMetadata: undefined,
        }),
      );

      expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
    });

    it('prevents duplicate syncs on same article load', () => {
      mockCompareMetadataWithSaved.mockReturnValue({
        hasChanges: true,
      });

      

      const { rerender } = renderHook(() =>
        useUASMetadataSync({
          ...mockArticleParams,
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

      const { rerender } = renderHook(
        ({ articleId }: { articleId: string }) =>
          useUASMetadataSync({
            ...mockArticleParams,
            articleId,
            onMetadataOutOfDate: stableCallback,
          }),
        { initialProps: { articleId: mockArticleParams.articleId } },
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

      const { rerender } = renderHook(
        ({ isSaved }: { isSaved: boolean }) =>
          useUASMetadataSync({
            ...mockArticleParams,
            isSaved,
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
            ...mockArticleParams,
            onMetadataOutOfDate: undefined,
          }),
        );
      }).not.toThrow();
    });
  });

  describe('for followed topics', () => {
    const mockTopicPageData = {
      topicId: 'climate-change',
      title: 'Climate change',
      url: '/hindi/topics/climate-change',
    };

    const mockSavedMetadata = {
      topicId: mockTopicPageData.topicId,
      title: mockTopicPageData.title,
      locatorUrl: mockTopicPageData.url,
      service: 'hindi',
    };

    const mockTopicParams = {
      followTopicPageData: mockTopicPageData,
      topicId: mockTopicPageData.topicId,
      service: 'hindi' as const,
      isFollowed: true,
      savedTopicMetadata: { ...mockSavedMetadata, title: 'Old title' },
      onMetadataOutOfDate: mockOnMetadataOutOfDate,
    };

    beforeEach(() => {
      jest.clearAllMocks();
      mockBuildTopicMetadata.mockReturnValue(mockSavedMetadata);
      mockCompareMetadataWithSaved.mockReturnValue({
        hasChanges: false,
      });
    });

    it('calls buildTopicMetadata with correct arguments', () => {
      renderHook(() => useUASMetadataSync(mockTopicParams));

      expect(mockBuildTopicMetadata).toHaveBeenCalledWith(
        mockTopicPageData,
        mockTopicParams.service,
      );
    });

    it('calls compareMetadataWithSaved with current and saved metadata', () => {
      const currentMetadata = {
        topicId: 'new-topic-id',
        title: 'New topic title',
        locatorUrl: mockTopicPageData.url,
        service: 'hindi',
      };
      mockBuildTopicMetadata.mockReturnValue(currentMetadata);

      renderHook(() => useUASMetadataSync(mockTopicParams));

      expect(mockBuildCurrentMetadata).not.toHaveBeenCalled();
      expect(mockCompareMetadataWithSaved).toHaveBeenCalledWith(
        currentMetadata,
        mockTopicParams.savedTopicMetadata,
      );
    });

    it('calls onMetadataOutOfDate when metadata has changes', () => {
      mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });

      const mockCallback = jest.fn();

      renderHook(() =>
        useUASMetadataSync({
          ...mockTopicParams,
          onMetadataOutOfDate: mockCallback,
        }),
      );

      expect(mockCallback).toHaveBeenCalled();
    });

    it('does not call onMetadataOutOfDate when metadata has no changes', () => {
      mockCompareMetadataWithSaved.mockReturnValue({
        hasChanges: false,
      });

      renderHook(() => useUASMetadataSync(mockTopicParams));

      expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
    });

    it('does not call onMetadataOutOfDate when topic is not followed', () => {
      renderHook(() =>
        useUASMetadataSync({
          ...mockTopicParams,
          isFollowed: false,
        }),
      );

      expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
    });

    it('does not call onMetadataOutOfDate when savedTopicMetadata is missing', () => {
      renderHook(() =>
        useUASMetadataSync({
          ...mockTopicParams,
          savedTopicMetadata: undefined,
        }),
      );

      expect(mockOnMetadataOutOfDate).not.toHaveBeenCalled();
    });

    it('prevents duplicate syncs on same topic load', () => {
      mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });

      const { rerender } = renderHook(() =>
        useUASMetadataSync({
          ...mockTopicParams,
          onMetadataOutOfDate: stableCallback,
        }),
      );

      expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
      expect(stableCallback).toHaveBeenCalledTimes(1);

      rerender();

      expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
      expect(stableCallback).toHaveBeenCalledTimes(1);
    });

    it('allows new sync when topic changes', () => {
      mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });

      const { rerender } = renderHook(
        ({ topicId }) =>
          useUASMetadataSync({
            ...mockTopicParams,
            topicId,
            followTopicPageData: { ...mockTopicPageData, topicId },
            onMetadataOutOfDate: stableCallback,
          }),
        { initialProps: { topicId: mockTopicPageData.topicId } },
      );

      expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);

      rerender({ topicId: 'science' });

      expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
      expect(stableCallback).toHaveBeenCalledTimes(1);
    });

    it('allows new sync when service changes', () => {
      mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });

      const { rerender } = renderHook(
        ({ service }: { service: 'hindi' | 'mundo' }) =>
          useUASMetadataSync({
            ...mockTopicParams,
            service,
            onMetadataOutOfDate: stableCallback,
          }),
        { initialProps: { service: 'hindi' } },
      );

      expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);

      rerender({ service: 'mundo' });

      expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
      expect(stableCallback).toHaveBeenCalledTimes(1);
    });

    it.each(['unfollowed', 'missing metadata'])(
      'resets sync state when %s',
      state => {
        mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });

        const { rerender } = renderHook(
          ({ unavailable }) =>
            useUASMetadataSync({
              ...mockTopicParams,
              onMetadataOutOfDate: stableCallback,
              isFollowed: !(unavailable && state === 'unfollowed'),
              savedTopicMetadata:
                unavailable && state === 'missing metadata'
                  ? undefined
                  : mockTopicParams.savedTopicMetadata,
            }),
          { initialProps: { unavailable: false } },
        );

        expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
        expect(stableCallback).toHaveBeenCalledTimes(1);

        rerender({ unavailable: true });

        expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(1);
        expect(stableCallback).toHaveBeenCalledTimes(1);

        rerender({ unavailable: false });

        expect(mockCompareMetadataWithSaved).toHaveBeenCalledTimes(2);
        expect(stableCallback).toHaveBeenCalledTimes(2);
      },
    );

    it('handles missing onMetadataOutOfDate callback gracefully', () => {
      mockCompareMetadataWithSaved.mockReturnValue({ hasChanges: true });

      expect(() => {
        renderHook(() =>
          useUASMetadataSync({
            ...mockTopicParams,
            onMetadataOutOfDate: undefined,
          }),
        );
      }).not.toThrow();
    });
  });
});

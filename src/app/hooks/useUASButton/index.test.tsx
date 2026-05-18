import { use } from 'react';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import isLocal from '#app/lib/utilities/isLocal';
import uasApiRequest from '#app/lib/uasApi';
import { Article } from '#app/models/types/optimo';
import useUASButton, { UASAction } from './index';
import useToggle from '../useToggle';

jest.mock('#app/hooks/useUASFetchSaveStatus');
jest.mock('../useToggle');
jest.mock('#app/lib/utilities/isLocal');
jest.mock('#app/lib/uasApi');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

const mockUseUASFetchSaveStatus = useUASFetchSaveStatus as jest.Mock;
const mockUseToggle = useToggle as jest.Mock;
const mockIsLocal = isLocal as jest.Mock;
const mockUasApiRequest = uasApiRequest as jest.Mock;

describe('useUASButton', () => {
  const defaultProps = {
    articleId: '123',
    articleTitle: 'Test Article',
  };

  beforeEach(() => {
    mockUseUASFetchSaveStatus.mockReturnValue({
      isSaved: false,
      isLoading: false,
      error: null,
      setIsSaved: jest.fn(),
    });

    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext) return { hashedUserId: 'user-123' };
      if (context === ServiceContext) return { service: 'hindi' };
      return {};
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns showButton = false when feature toggle is off', () => {
    mockUseToggle.mockReturnValue({ enabled: false });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true, service: 'hindi' });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(false);
  });

  it('returns showButton = false when user is not signed in', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: false, service: 'hindi' });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(false);
  });

  it('returns showButton = true when feature enabled and signed in', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true, service: 'hindi' });

    mockUseUASFetchSaveStatus.mockReturnValue({
      isSaved: true,
      isLoading: false,
      error: null,
      setIsSaved: jest.fn(),
    });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(true);
  });

  it('passes articleId to useUASFetchSaveStatus when showButton is true', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true, service: 'hindi' });

    renderHook(() => useUASButton(defaultProps));

    expect(mockUseUASFetchSaveStatus).toHaveBeenCalledWith('123');
  });

  it('passes empty string when showButton is false', () => {
    mockUseToggle.mockReturnValue({ enabled: false });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: false, service: 'hindi' });

    renderHook(() => useUASButton(defaultProps));

    expect(mockUseUASFetchSaveStatus).toHaveBeenCalledWith('');
  });

  it('respects local environment service filtering', () => {
    mockUseToggle.mockReturnValue({
      enabled: true,
      value: 'hindi|sport',
    });
    mockIsLocal.mockReturnValue(true);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true, service: 'hindi' });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(true);
  });

  it('hides button if service not in toggle value in local', () => {
    mockUseToggle.mockReturnValue({
      enabled: true,
      value: 'mundo',
    });
    mockIsLocal.mockReturnValue(true);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true, service: 'hindi' });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(false);
  });

  describe('handleSaveAction', () => {
    beforeEach(() => {
      mockUseToggle.mockReturnValue({ enabled: true });
      mockIsLocal.mockReturnValue(false);
      (use as jest.Mock).mockReturnValue({
        isSignedIn: true,
        service: 'hindi',
      });
      mockUasApiRequest.mockResolvedValue({ ok: true, status: 202 });
    });

    it('sends POST request when saving', async () => {
      const articlePageData = {
        metadata: {
          locators: {
            canonicalUrl: 'https://bbc.com/article',
          },
        },
      } as unknown as Article;

      const { result } = renderHook(() =>
        useUASButton({ ...defaultProps, articlePageData }),
      );

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });

      expect(mockUasApiRequest).toHaveBeenCalledWith(
        'POST',
        'favourites',
        expect.objectContaining({
          body: expect.objectContaining({
            resourceId: defaultProps.articleId,
            activityType: 'favourites',
            action: 'favourited',
            resourceType: 'article',
          }),
        }),
      );
    });

    it('sets isSaving to false and calls setIsSaved(true) after successful save', async () => {
      const mockSetIsSaved = jest.fn();
      mockUseUASFetchSaveStatus.mockReturnValue({
        isSaved: false,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });

      expect(result.current.isSaving).toBe(false);
      expect(mockSetIsSaved).toHaveBeenCalledWith(true);
    });

    it('sets isRemoving to false and calls setIsSaved(false) after successful remove', async () => {
      const mockSetIsSaved = jest.fn();
      mockUseUASFetchSaveStatus.mockReturnValue({
        isSaved: true,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(result.current.isRemoving).toBe(false);
      expect(mockSetIsSaved).toHaveBeenCalledWith(false);
    });

    it('sends DELETE request when removing', async () => {
      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(mockUasApiRequest).toHaveBeenCalledWith(
        'DELETE',
        'favourites',
        expect.objectContaining({
          globalId: 'urn:bbc:articles:article:123',
        }),
      );
    });

    it('sets error and isRemoving to false when request fails', async () => {
      mockUasApiRequest.mockRejectedValueOnce(
        new Error('UAS request failed with status 500'),
      );

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(result.current.isRemoving).toBe(false);
      expect(result.current.error).toEqual(
        new Error('UAS request failed with status 500'),
      );
    });
  });
});

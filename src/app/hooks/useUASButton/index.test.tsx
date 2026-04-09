import { use } from 'react';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import isLocal from '#app/lib/utilities/isLocal';
import uasApiRequest from '#app/lib/uasApi';
import useUASButton from './index';

import useToggle from '../useToggle';

jest.mock('#app/hooks/useUASFetchSaveStatus');
jest.mock('../useToggle');
jest.mock('#app/lib/utilities/isLocal');
jest.mock('#app/lib/uasApi');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

const mockuseUASFetchSaveStatus = useUASFetchSaveStatus as jest.Mock;
const mockUseToggle = useToggle as jest.Mock;
const mockIsLocal = isLocal as jest.Mock;
const mockUasApiRequest = uasApiRequest as jest.Mock;

describe('useUASButton', () => {
  const defaultProps = {
    articleId: '123',
    service: 'hindi',
    title: 'Test Article',
  };

  const mockSetIsSaved = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockuseUASFetchSaveStatus.mockReturnValue({
      isSaved: false,
      isLoading: false,
      error: null,
      setIsSaved: mockSetIsSaved,
    });

    (use as jest.Mock).mockReturnValue({
      isSignedIn: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns showButton = false when feature toggle is off', () => {
    mockUseToggle.mockReturnValue({ enabled: false });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(false);
  });

  test('returns showButton = false when user is not signed in', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: false });

    const { result } = renderHook(() => useUASButton({ ...defaultProps }));

    expect(result.current.showButton).toBe(false);
  });

  test('returns showButton = true when feature enabled and signed in', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true });

    mockuseUASFetchSaveStatus.mockReturnValue({
      isSaved: true,
      isLoading: false,
      error: null,
      setIsSaved: mockSetIsSaved,
    });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(true);
  });

  test('passes articleId to useUASFetchSaveStatus when showButton is true', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true });

    renderHook(() => useUASButton(defaultProps));

    expect(mockuseUASFetchSaveStatus).toHaveBeenCalledWith('123');
  });

  test('passes empty string when showButton is false', () => {
    mockUseToggle.mockReturnValue({ enabled: false });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: false });

    renderHook(() => useUASButton(defaultProps));

    expect(mockuseUASFetchSaveStatus).toHaveBeenCalledWith('');
  });

  test('respects local environment service filtering', () => {
    mockUseToggle.mockReturnValue({
      enabled: true,
      value: 'hindi|sport',
    });
    mockIsLocal.mockReturnValue(true);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(true);
  });

  test('hides button if service not in toggle value in local', () => {
    mockUseToggle.mockReturnValue({
      enabled: true,
      value: 'mundo',
    });
    mockIsLocal.mockReturnValue(true);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(false);
  });

  describe('handleSaveArticle', () => {
    beforeEach(() => {
      mockUseToggle.mockReturnValue({ enabled: true });
      mockIsLocal.mockReturnValue(false);
      (use as jest.Mock).mockReturnValue({ isSignedIn: true });
      mockUasApiRequest.mockResolvedValue({ ok: true, status: 202 });
    });

    test('sends POST request with correct payload when clicked', async () => {
      mockuseUASFetchSaveStatus.mockReturnValue({
        isSaved: false,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveArticle();
      });

      expect(mockUasApiRequest).toHaveBeenCalledWith('POST', 'favourites', {
        body: {
          activityType: 'favourites',
          resourceDomain: 'articles',
          resourceType: 'article',
          resourceId: '123',
          action: 'favourited',
          metaData: {
            service: 'hindi',
            articleId: '123',
            title: 'Test Article',
          },
        },
      });
    });

    test('sets isSaved to true on successful POST', async () => {
      mockuseUASFetchSaveStatus.mockReturnValue({
        isSaved: false,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveArticle();
      });

      expect(mockSetIsSaved).toHaveBeenCalledWith(true);
    });

    test('does not send POST if article is already saved', async () => {
      mockuseUASFetchSaveStatus.mockReturnValue({
        isSaved: true,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveArticle();
      });

      expect(mockUasApiRequest).not.toHaveBeenCalled();
    });

    test('returns handleSaveArticle function', () => {
      mockuseUASFetchSaveStatus.mockReturnValue({
        isSaved: false,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      expect(typeof result.current.handleSaveArticle).toBe('function');
    });
  });
});

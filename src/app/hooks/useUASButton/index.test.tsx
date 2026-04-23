import { use } from 'react';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import isLocal from '#app/lib/utilities/isLocal';
import uasApiRequest from '#app/lib/uasApi';
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

const mockuseUASFetchSaveStatus = useUASFetchSaveStatus as jest.Mock;
const mockUseToggle = useToggle as jest.Mock;
const mockIsLocal = isLocal as jest.Mock;
const mockUasApiRequest = uasApiRequest as jest.Mock;

describe('useUASButton', () => {
  const defaultProps = {
    articleId: '123',
    articleTitle: 'Test Article',
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
      service: 'hindi',
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

    const { result } = renderHook(() => useUASButton({ ...defaultProps }));

    expect(result.current.showButton).toBe(false);
  });

  it('returns showButton = true when feature enabled and signed in', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true, service: 'hindi' });

    mockuseUASFetchSaveStatus.mockReturnValue({
      isSaved: true,
      isLoading: false,
      error: null,
      setIsSaved: mockSetIsSaved,
    });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(true);
  });

  it('passes articleId to useUASFetchSaveStatus when showButton is true', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: true, service: 'hindi' });

    renderHook(() => useUASButton(defaultProps));

    expect(mockuseUASFetchSaveStatus).toHaveBeenCalledWith('123');
  });

  it('passes empty string when showButton is false', () => {
    mockUseToggle.mockReturnValue({ enabled: false });
    mockIsLocal.mockReturnValue(false);
    (use as jest.Mock).mockReturnValue({ isSignedIn: false, service: 'hindi' });

    renderHook(() => useUASButton(defaultProps));

    expect(mockuseUASFetchSaveStatus).toHaveBeenCalledWith('');
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

    it('sends POST request with correct payload when saving', async () => {
      mockuseUASFetchSaveStatus.mockReturnValue({
        isSaved: false,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
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
            promoImage: '',
            promoImageAltText: '',
            locatorUrl: '',
          },
        },
      });
    });

    it('sets isSaved to true on successful save', async () => {
      mockuseUASFetchSaveStatus.mockReturnValue({
        isSaved: false,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.SAVE);
      });

      expect(mockSetIsSaved).toHaveBeenCalledWith(true);
    });

    it('sends DELETE request with correct globalId when removing', async () => {
      mockuseUASFetchSaveStatus.mockReturnValue({
        isSaved: true,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(mockUasApiRequest).toHaveBeenCalledWith('DELETE', 'favourites', {
        globalId: 'urn:bbc:articles:article:123',
      });
    });

    it('sets isSaved to false on successful remove', async () => {
      mockuseUASFetchSaveStatus.mockReturnValue({
        isSaved: true,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(mockSetIsSaved).toHaveBeenCalledWith(false);
    });

    it('captures error when DELETE request fails', async () => {
      mockUasApiRequest.mockRejectedValueOnce(
        new Error('UAS request failed with status 500'),
      );

      mockuseUASFetchSaveStatus.mockReturnValue({
        isSaved: true,
        isLoading: false,
        error: null,
        setIsSaved: mockSetIsSaved,
      });

      const { result } = renderHook(() => useUASButton(defaultProps));

      await act(async () => {
        await result.current.handleSaveAction(UASAction.REMOVE);
      });

      expect(result.current.error).toEqual(
        new Error('UAS request failed with status 500'),
      );
      expect(mockSetIsSaved).not.toHaveBeenCalled();
    });
  });
});

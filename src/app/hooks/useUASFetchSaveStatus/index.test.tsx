import { renderHook } from '#app/components/react-testing-library-with-providers';
import { waitFor } from '@testing-library/react';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, ACTIVITY_TYPE } from '#app/lib/uasApi/uasUtility';
import useUASFetchSaveStatus from './index';

jest.mock('#app/lib/uasApi');
jest.mock('#app/lib/uasApi/uasUtility');

const mockUasApiRequest = uasApiRequest as jest.Mock;
const mockBuildGlobalId = buildGlobalId as jest.Mock;

describe('useUASFetchSaveStatus', () => {
  const defaultArticleId = '123';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns isSaved = true when API returns 200', async () => {
    mockBuildGlobalId.mockReturnValue('global-123');
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 200 });

    const { result } = renderHook(() =>
      useUASFetchSaveStatus(defaultArticleId),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isSaved).toBe(true);
    expect(result.current.error).toBeNull();
    expect(mockUasApiRequest).toHaveBeenCalledWith('GET', ACTIVITY_TYPE, {
      globalId: 'global-123',
    });
  });

  test('returns isSaved = false when API returns 204', async () => {
    mockBuildGlobalId.mockReturnValue('global-123');
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 204 });

    const { result } = renderHook(() =>
      useUASFetchSaveStatus(defaultArticleId),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isSaved).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('returns error and isSaved = false when API fails', async () => {
    mockBuildGlobalId.mockReturnValue('global-123');
    const apiError = new Error('API failed');
    mockUasApiRequest.mockRejectedValue(apiError);

    const { result } = renderHook(() =>
      useUASFetchSaveStatus(defaultArticleId),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isSaved).toBe(false);
    expect(result.current.error).toBe(apiError);
  });

  test('does not call API when articleId is empty', () => {
    renderHook(() => useUASFetchSaveStatus(''));

    expect(mockUasApiRequest).not.toHaveBeenCalled();
  });
});
